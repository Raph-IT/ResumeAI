import { StateCreator } from 'zustand';

declare module 'zustand' {
  interface StoreApi<T> {
    getState: () => T;
    setState: (partial: T | Partial<T> | ((state: T) => T | Partial<T>), replace?: boolean) => void;
    subscribe: (listener: (state: T, prevState: T) => void) => () => void;
    destroy: () => void;
  }

  export function create<T>(
    stateCreator: StateCreator<T>
  ): UseBoundStore<StoreApi<T>>;
} 