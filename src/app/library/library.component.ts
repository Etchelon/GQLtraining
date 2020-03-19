import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import _ from 'lodash';
import { filter } from 'rxjs/operators';
import { BookService, IBook } from './book.service';

@Component({
	selector: 'app-library',
	templateUrl: './library.component.html',
	styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
	@ViewChild('editBookForm') editBookForm: TemplateRef<any>;

	books: IBook[] = [];

	constructor(private readonly dialog: MatDialog, private readonly bookService: BookService) {}

	ngOnInit(): void {
		const queryRef = this.bookService.watchAllBooks();
		(window as any).__qref__ = queryRef;
		queryRef.valueChanges.subscribe(res => {
			console.log({ updatedQueryResult: res });
			this.books = res.data.books;
		});

		// this.bookService.getAllBooks().subscribe(
		// 	books => (this.books = books),
		// 	err => console.error('Error retrieving books!', err)
		// );
	}

	createBook(): void {
		this.addOrEditBook({} as any);
	}

	editBook(book: IBook): void {
		const selectedBook = _.cloneDeep(book);
		this.addOrEditBook(selectedBook);
	}

	private addOrEditBook(book: IBook): void {
		this.dialog
			.open(this.editBookForm, { data: book })
			.afterClosed()
			.pipe(filter(_.identity))
			.subscribe((editedBook: IBook) => {
				const isNew = !editedBook.id;
				const obs = isNew
					? this.bookService.createOne(editedBook.title)
					: this.bookService.updateReleaseInfo(editedBook.id, editedBook.author, editedBook.releaseYear);
				obs.subscribe(
					({ data }) => {
						console.log('got data', data);
					},
					error => {
						console.log('there was an error sending the query', error);
					}
				);
			});
	}
}
