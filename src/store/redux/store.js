import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './datareducer';

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;
