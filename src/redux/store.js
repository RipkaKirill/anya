import { configureStore } from "@reduxjs/toolkit"

import { doneApi } from "./doneApi"
import { favoriteApi } from "./favoriteApi"

export const store = configureStore({
  reducer: {
    [doneApi.reducerPath]: doneApi.reducer,
    [favoriteApi.reducerPath]: favoriteApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(doneApi.middleware, favoriteApi.middleware)
})