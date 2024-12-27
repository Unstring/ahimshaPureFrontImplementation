import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bannerService } from '../../services/bannerService';

const initialState = {
  items: [],
  loading: false,
  error: null,
  lastFetched: null
};

// Async thunks
export const fetchBanners = createAsyncThunk(
  'banners/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await bannerService.getAllBanners();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createBanner = createAsyncThunk(
  'banners/create',
  async (bannerData, { rejectWithValue }) => {
    try {
      const response = await bannerService.createBanner(bannerData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateBanner = createAsyncThunk(
  'banners/update',
  async ({ uuid, data }, { rejectWithValue }) => {
    try {
      const response = await bannerService.updateBanner(uuid, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteBanner = createAsyncThunk(
  'banners/delete',
  async (uuid, { rejectWithValue }) => {
    try {
      await bannerService.deleteBanner(uuid);
      return uuid;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const toggleBannerStatus = createAsyncThunk(
  'banners/toggle',
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await bannerService.toggleBannerStatus(uuid);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const bannerSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {
    clearBanners: (state) => {
      state.items = [];
      state.lastFetched = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch banners
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastFetched = new Date().toISOString();
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create banner
      .addCase(createBanner.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Update banner
      .addCase(updateBanner.fulfilled, (state, action) => {
        const index = state.items.findIndex(banner => banner.uuid === action.payload.uuid);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete banner
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.items = state.items.filter(banner => banner.uuid !== action.payload);
      })
      // Toggle banner status
      .addCase(toggleBannerStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(banner => banner.uuid === action.payload.uuid);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  }
});

// Selectors
export const selectAllBanners = (state) => state.banners.items;
export const selectActiveBanners = (state) => 
  state.banners.items.filter(banner => banner.isActive);
export const selectBannersByPosition = (state, position) => 
  state.banners.items.filter(banner => banner.position === position && banner.isActive);

export const { clearBanners } = bannerSlice.actions;
export default bannerSlice.reducer; 