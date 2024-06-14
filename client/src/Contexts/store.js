import { configureStore, createSlice } from '@reduxjs/toolkit'

const initialPageState = {
  value: 0,
}
const pageSlice = createSlice({
  name: 'page',
  initialState: initialPageState,
  reducers: {
    update: (state, action) => {
      state = action.payload
    },
  },
})
export const { update } = pageSlice.actions
export const store = configureStore({
  reducer: {
    page: pageSlice.reducer,
  },
})
