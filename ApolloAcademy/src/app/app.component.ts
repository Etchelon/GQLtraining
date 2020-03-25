import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	@ViewChild('lazyOutput', { read: ViewContainerRef }) lazyOutput: ViewContainerRef;
	title = 'ApolloAcademy';

	constructor(private cfr: ComponentFactoryResolver, private readonly snack: MatSnackBar) {}

	loadLazyComponent(n: 1 | 2 | 'FromLib'): void {
		const method = `getLazy${n}`;
		this[method]().then(() => this.snack.open('Component loaded!'));
	}

	private async getLazy1() {
		this.lazyOutput.clear();
		const { Lazy1Component } = await import('./lazy1/lazy1.component');
		this.lazyOutput.createComponent(this.cfr.resolveComponentFactory(Lazy1Component));
	}

	private async getLazy2() {
		this.lazyOutput.clear();
		const { Lazy2Component } = await import('./lazy2/lazy2.component');
		this.lazyOutput.createComponent(this.cfr.resolveComponentFactory(Lazy2Component));
	}

	private async getLazyFromLib() {
		this.lazyOutput.clear();
		const { LazyComponentsComponent } = await import('lazy-components');
		this.lazyOutput.createComponent(this.cfr.resolveComponentFactory(LazyComponentsComponent));
	}
}
