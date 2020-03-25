import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LazyModuleRoutingModule } from './lazy-module-routing.module';
import { Route66Component } from './route66/route66.component';

@NgModule({
	imports: [CommonModule, LazyModuleRoutingModule],
	declarations: [Route66Component],
})
export class LazyModuleModule {}
