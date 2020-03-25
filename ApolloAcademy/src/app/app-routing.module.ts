import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'library', pathMatch: 'full' },
	{ path: 'library', loadChildren: () => import('./library/library.module').then(m => m.LibraryModule) },
	{ path: 'lazy', loadChildren: () => import('lazy-components').then(m => m.LazyModuleModule) },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
