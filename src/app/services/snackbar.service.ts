import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackbar: MatSnackBar) {}

  public openSnackBar(message: string, action?: string): void {
    this._snackbar.open(message, action, {
      duration: 5000,
    });
  }

  public errorSnackBar(message: string, action?: string): void {
    this._snackbar.open(message + ', Please try again', action, {
      duration: 9000,
    });
  }
}
