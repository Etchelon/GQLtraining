import { Component, TemplateRef, ViewChild } from '@angular/core';
import { LazyComponentsService } from './lazy-components.service';

@Component({
	selector: 'lib-lazy-components',
	template: `
		<p>lazy-components works! <span (click)="greet()">Click me for an additional greeting!</span></p>
		<ng-template #greeter>
			<h5>Hello from the ng-library!</h5>
		</ng-template>
	`,
	styles: [],
})
export class LazyComponentsComponent {
	@ViewChild('greeter') template: TemplateRef<any>;

	constructor(private readonly service: LazyComponentsService) {}

	greet(): void {
		this.service.greet(this.template);
	}
}
