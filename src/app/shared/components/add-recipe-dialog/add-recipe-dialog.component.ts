import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DialogData } from '../../models/dialog-data';

@Component({
    selector: 'app-add-recipe-dialog',
    templateUrl: './add-recipe-dialog.component.html',
    styleUrls: ['./add-recipe-dialog.component.css'],
})
export class AddRecipeDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<AddRecipeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) { }

    cancel(): void {
        this.dialogRef.close();
    }
}
