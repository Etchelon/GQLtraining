import { Component, OnInit } from '@angular/core';
import { Lazy2Service } from './lazy2.service';

@Component({
	templateUrl: './lazy2.component.html',
	styleUrls: ['./lazy2.component.scss'],
	providers: [{ provide: Lazy2Service, useClass: Lazy2Service }],
})
export class Lazy2Component implements OnInit {
	constructor(private readonly service: Lazy2Service) {}

	ngOnInit(): void {
		this.service.log();
	}
}
