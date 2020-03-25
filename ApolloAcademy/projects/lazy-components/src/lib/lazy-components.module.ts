import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { LazyComponentsComponent } from './lazy-components.component';

@NgModule({
	imports: [MatDialogModule],
	declarations: [LazyComponentsComponent],
	exports: [LazyComponentsComponent],
})
export class LazyComponentsModule {}
