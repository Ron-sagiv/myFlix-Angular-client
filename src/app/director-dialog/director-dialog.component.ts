import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
/**
 * DirectorDialogComponent
 * used to display detailed information
 * about a movie director.
 *
 * This component is intended to be opened via Angular Material's
 * MatDialog service and receives its data through dependency injection.
 * @remarks
 * - Uses MAT_DIALOG_DATA injection token to receive data
 * - Typically displays director name, biography, and related details
 */
@Component({
  selector: 'app-director-dialog',
  templateUrl: './director-dialog.component.html',
})
export class DirectorDialogComponent {
  /**
   * Creates an instance of DirectorDialogComponent.
   *
   * The dialog data is injected via Angular Material's MAT_DIALOG_DATA token.
   *
   * @param data - Data passed into the dialog when opened.
   *               Usually contains director details .
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
