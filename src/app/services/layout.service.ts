import { Injectable } from '@angular/core';

interface ILayoutService {
  headerTitle: string;
}

// It is a decorator that allows us to inject this service into other components. if we don't use this decorator, we can't inject this service into other components. if it's not a root, we need to add it to the providers array in the module.ts file.
@Injectable({
  providedIn: 'root',
})
export class LayoutService implements ILayoutService {
  private _headerTitle: string = '';

  constructor() {}

  public get headerTitle(): string {
    return this._headerTitle;
  }

  public set headerTitle(value: string) {
    this._headerTitle = value;
  }
}
