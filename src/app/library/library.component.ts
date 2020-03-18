import { Component, OnInit } from '@angular/core';
import { BookService, IBook } from './book.service';

@Component({
	selector: 'app-library',
	templateUrl: './library.component.html',
	styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
	books: IBook[] = [];

	constructor(private readonly bookService: BookService) {}

	ngOnInit(): void {
		this.bookService.getAllBooks().subscribe(
			books => (this.books = books),
			err => console.error('Error retrieving books!', err)
		);
	}
}
