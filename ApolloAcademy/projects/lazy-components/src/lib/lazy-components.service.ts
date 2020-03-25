import { Injectable, TemplateRef } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Injectable({
	providedIn: 'root',
})
export class LazyComponentsService {
	constructor(private readonly bs: MatBottomSheet) {}

	greet(template: TemplateRef<any>) {
		this.bs.open(template);
	}
}
