import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'library', pathMatch: 'full' },
	{ path: 'library', loadChildren: () => import('./library/library.module').then(m => m.LibraryModule) },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
