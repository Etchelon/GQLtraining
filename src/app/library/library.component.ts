import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import _ from 'lodash';
import { filter, map } from 'rxjs/operators';
import { BookService } from './book.service';
import { IBook, LibraryService } from './generated/graphql';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-library',
	templateUrl: './library.component.html',
	styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
	@ViewChild('editBookForm') editBookForm: TemplateRef<any>;

	books: IBook[] = [];
	docById: IBook;
	docById$: Observable<IBook>;

	constructor(
		private readonly dialog: MatDialog,
		private readonly libraryService: LibraryService,
		private readonly bookService: BookService
	) {}

	ngOnInit(): void {
		this.libraryService.getAllBooksWatch().valueChanges.subscribe(res => (this.books = res.data.books));
		this.libraryService.getBookWatch({ id: '1' }).valueChanges.subscribe(res => (this.docById = res.data.book));
		this.docById$ = this.libraryService.getBookWatch({ id: '1' }).valueChanges.pipe(map(res => res.data.book));

		// const queryRef = this.bookService.watchAllBooks();
		// (window as any).__qref__ = queryRef;
		// queryRef.valueChanges.subscribe(res => {
		// 	console.log({ updatedQueryResult: res });
		// 	this.books = res.data.books;
		// });

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
				isNew
					? this.libraryService.createBook({ info: { title: editedBook.title } }).subscribe()
					: this.libraryService
							.updateReleaseInfo({
								info: {
									id: editedBook.id,
									author: editedBook.author,
									releaseYear: editedBook.releaseYear,
								},
							})
							.subscribe();
				// ? this.bookService.createOne(editedBook.title)
				// : this.bookService.updateReleaseInfo(editedBook.id, editedBook.author, editedBook.releaseYear);
			});
	}
}
