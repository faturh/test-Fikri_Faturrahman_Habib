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
  loading: boolean;
  error: string | null;
}

const initialState: MenusState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
};

// Async Thunks
export const fetchMenus = createAsyncThunk('menus/fetchMenus', async () => {
  const response = await api.get('/menus');
  return response.data;
});

export const addMenu = createAsyncThunk('menus/addMenu', async (newMenu: { name: string; depth: number; parentId?: string }) => {
  const response = await api.post('/menus', newMenu);
  return response.data;
});

export const updateMenu = createAsyncThunk('menus/updateMenu', async ({ id, data }: { id: string; data: Partial<MenuItem> }) => {
  const response = await api.patch(`/menus/${id}`, data);
  return response.data;
});

export const deleteMenu = createAsyncThunk('menus/deleteMenu', async (id: string) => {
  await api.delete(`/menus/${id}`);
  return id;
});

const menusSlice = createSlice({
  name: 'menus',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<MenuItem | null>) => {
      state.selectedItem = action.payload;
    },
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
    });
    builder.addCase(fetchMenus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch menus';
    });

    // Add
    builder.addCase(addMenu.fulfilled, (state) => {
      // Re-fetch to simpler update tree? Or manually insert?
      // For simplicity in tree structures, re-fetching is safer unless optimized.
      // But let's try to optimistic update or just trigger re-fetch in component?
      // Let's just append for now, but tree structure makes it hard.
      // We'll rely on fetching again or simple state reload for now.
    });

    // Update
    builder.addCase(updateMenu.fulfilled, (state, action) => {
        // Complex to update deeply nested tree.
        // We will rely on re-fetching in the component or refined logic later.
    });
    
    // Delete
    builder.addCase(deleteMenu.fulfilled, (state, action) => {
       // Same here, tree deletion is complex.
    });
  },
});

export const { selectItem } = menusSlice.actions;
export default menusSlice.reducer;
