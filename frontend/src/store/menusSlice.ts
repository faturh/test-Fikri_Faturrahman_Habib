import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/lib/api';

export interface MenuItem {
  id: string;
  name: string;
  depth: number;
  parentId?: string | null;
  children?: MenuItem[];
  parent?: MenuItem | null;
}

interface MenusState {
  items: MenuItem[];
  selectedItem: MenuItem | null;
  expandedIds: string[];
  loading: boolean;
  error: string | null;
  notification: { message: string, type: 'success' | 'error' | 'info' } | null;
}

const initialState: MenusState = {
  items: [],
  selectedItem: null,
  expandedIds: [],
  loading: false,
  error: null,
  notification: null,
};

// Async Thunks
export const fetchMenus = createAsyncThunk('menus/fetchMenus', async () => {
  const response = await api.get('/menus');
  return response.data;
});

export const addMenu = createAsyncThunk('menus/addMenu', async (newMenu: { name: string; depth: number; parentId?: string | null }, { dispatch }) => {
  try {
    const response = await api.post('/menus', newMenu);
    dispatch(setNotification({ message: 'Menu item added successfully', type: 'success' }));
    dispatch(fetchMenus());
    return response.data;
  } catch (err: any) {
    dispatch(setNotification({ message: 'Failed to add menu item', type: 'error' }));
    throw err;
  }
});

export const updateMenu = createAsyncThunk('menus/updateMenu', async ({ id, data }: { id: string; data: Partial<MenuItem> }, { dispatch }) => {
  try {
    const response = await api.patch(`/menus/${id}`, data);
    dispatch(setNotification({ message: 'Menu item updated successfully', type: 'success' }));
    dispatch(fetchMenus());
    return response.data;
  } catch (err: any) {
    dispatch(setNotification({ message: 'Failed to update menu item', type: 'error' }));
    throw err;
  }
});

export const deleteMenu = createAsyncThunk('menus/deleteMenu', async (id: string, { dispatch }) => {
  try {
    await api.delete(`/menus/${id}`);
    dispatch(setNotification({ message: 'Menu item deleted successfully', type: 'success' }));
    dispatch(fetchMenus());
    return id;
  } catch (err: any) {
    dispatch(setNotification({ message: 'Failed to delete menu item', type: 'error' }));
    throw err;
  }
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
    },
    setNotification: (state, action: PayloadAction<{ message: string, type: 'success' | 'error' | 'info' } | null>) => {
        state.notification = action.payload;
    },
    clearNotification: (state) => {
        state.notification = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMenus.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMenus.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
      if (state.expandedIds.length === 0 && action.payload.length > 0) {
          state.expandedIds = action.payload.map((i: MenuItem) => i.id);
      }
    });
    builder.addCase(fetchMenus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch menus';
    });
    builder.addCase(deleteMenu.fulfilled, (state, action) => {
        if (state.selectedItem?.id === action.payload) {
            state.selectedItem = null;
        }
    });
  },
});

export const { selectItem, toggleExpand, expandAll, collapseAll, setNotification, clearNotification } = menusSlice.actions;
export default menusSlice.reducer;
