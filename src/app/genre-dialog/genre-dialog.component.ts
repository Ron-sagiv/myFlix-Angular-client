import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
/**
 * GenreDialogComponent
 * used to display detailed information
 * about a movie's genre.
 *
 * This component is intended to be opened via Angular Material's
 * MatDialog service and receives its data through dependency injection.
 * @remarks
 * - Uses MAT_DIALOG_DATA injection token to receive data
 * - Typically displays genre name and description.
 */
@Component({
  selector: 'app-genre-dialog',
  templateUrl: './genre-dialog.component.html',
})
export class GenreDialogComponent {
  /**
   * Creates an instance of GenreDialogComponent.
   *
   * The dialog data is injected via Angular Material's MAT_DIALOG_DATA token.
   *
   * @param data - Data passed into the dialog when opened.
   *               Contains genre description .
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
