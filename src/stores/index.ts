import { configureStore } from "@reduxjs/toolkit";
import { productService } from "@product-page-opt/services/product_service";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [productService.reducerPath]: productService.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productService.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
