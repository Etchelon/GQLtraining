import { Injectable } from '@angular/core';

@Injectable()
export class Lazy2Service {
	log(): void {
		console.log('Lazy2 Service is working.');
	}
}
