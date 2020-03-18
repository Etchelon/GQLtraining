import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BookService } from './book.service';
import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './library.component';

@NgModule({
	declarations: [LibraryComponent],
	imports: [CommonModule, LibraryRoutingModule],
	providers: [BookService],
})
export class LibraryModule {}
