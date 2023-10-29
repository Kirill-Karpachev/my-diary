import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { diaryAPI } from "../services/diary-service";

const rootReducer = combineReducers({
  [diaryAPI.reducerPath]: diaryAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(diaryAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
