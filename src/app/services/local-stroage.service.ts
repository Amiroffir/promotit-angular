import { Injectable } from '@angular/core';

interface ILocalStorageService {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): void;
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements ILocalStorageService {
  constructor() {}

  public get<T>(key: string): T {
    const localStorageValue: string | null = localStorage.getItem(key);
    if (localStorageValue === null) {
      return [] as unknown as T;
    } else {
      return localStorageValue as T;
    }
  }

  public set<T>(key: string, value: T): void {
    let valueToStore: string = JSON.stringify(value);

    if (value === null) {
      this.remove(key);
      return;
    }

    if (valueToStore) {
      localStorage.setItem(key, valueToStore);
    } else {
      this.remove(key);
    }
  }

  private remove(key: string): void {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
    }
  }
}
