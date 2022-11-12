import { MatListModule } from '@angular/material/list';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';


const modules:MatIconModule[] = [
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatMenuModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatSnackBarModule,
  MatInputModule,
  MatListModule,
  MatDividerModule
  



];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modules
  ],
  exports: [
    modules

  ]
}
)
export class MaterialModule { }
