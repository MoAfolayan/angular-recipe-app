import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DialogData } from '../../models/dialog-data';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-add-recipe-dialog',
    templateUrl: './add-recipe-dialog.component.html',
    styleUrls: ['./add-recipe-dialog.component.css'],
    standalone: true,
    imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
    ],
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
