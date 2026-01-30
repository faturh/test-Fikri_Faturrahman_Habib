import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/lib/api';

export interface MenuItem {
  id: string;
  name: string;
  depth: number;
  parentId?: string | null;
  children?: MenuItem[];
  parent?: MenuItem | null; // For display purposes
}

interface MenusState {
  items: MenuItem[];
  selectedItem: MenuItem | null;
  expandedIds: string[];
  loading: boolean;
  error: string | null;
}

const initialState: MenusState = {
  items: [],
  selectedItem: null,
  expandedIds: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchMenus = createAsyncThunk('menus/fetchMenus', async () => {
  const response = await api.get('/menus');
  return response.data;
});

export const addMenu = createAsyncThunk('menus/addMenu', async (newMenu: { name: string; depth: number; parentId?: string | null }, { dispatch }) => {
  const response = await api.post('/menus', newMenu);
  dispatch(fetchMenus());
  return response.data;
});

export const updateMenu = createAsyncThunk('menus/updateMenu', async ({ id, data }: { id: string; data: Partial<MenuItem> }, { dispatch }) => {
  const response = await api.patch(`/menus/${id}`, data);
  dispatch(fetchMenus());
  return response.data;
});

export const deleteMenu = createAsyncThunk('menus/deleteMenu', async (id: string, { dispatch }) => {
  await api.delete(`/menus/${id}`);
  dispatch(fetchMenus());
  return id;
});

const menusSlice = createSlice({
  name: 'menus',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<MenuItem | null>) => {
      state.selectedItem = action.payload;
    },
    toggleExpand: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.expandedIds.includes(id)) {
        state.expandedIds = state.expandedIds.filter(i => i !== id);
      } else {
        state.expandedIds.push(id);
      }
    },
    expandAll: (state) => {
        // We'll collect all IDs from the items recursively
        const allIds: string[] = [];
        const collectIds = (items: MenuItem[]) => {
            items.forEach(item => {
                allIds.push(item.id);
                if (item.children) collectIds(item.children);
            });
        };
        collectIds(state.items);
        state.expandedIds = allIds;
    },
    collapseAll: (state) => {
        state.expandedIds = [];
    }
  },
  extraReducers: (builder) => {
    // Fetch
    builder.addCase(fetchMenus.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMenus.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
      // Optionally expand top level by default
      if (state.expandedIds.length === 0 && action.payload.length > 0) {
          state.expandedIds = action.payload.map((i: MenuItem) => i.id);
      }
    });
    builder.addCase(fetchMenus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch menus';
    });
  },
});

export const { selectItem, toggleExpand, expandAll, collapseAll } = menusSlice.actions;
export default menusSlice.reducer;
