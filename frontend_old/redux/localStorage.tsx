// utils/localStorage.js

import { RootState } from './store';

export const loadState = () => {
  try {
    if (typeof window !== 'undefined') {
      console.log('You are on the browser');
      return undefined;
    } else {
      console.log('You are on the server');
      // 👉️ can't use localStorage
    }
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};
