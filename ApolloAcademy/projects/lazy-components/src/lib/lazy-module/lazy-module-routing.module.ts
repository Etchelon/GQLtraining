import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Route66Component } from './route66/route66.component';

const routes: Routes = [
	{ path: '', redirectTo: 'route-66', pathMatch: 'full' },
	{ path: 'route-66', component: Route66Component },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LazyModuleRoutingModule {}
