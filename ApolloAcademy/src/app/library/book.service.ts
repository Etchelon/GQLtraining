import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import _ from 'lodash';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
	CreateBookDocument,
	GetAllBooksDocument,
	GetBookDocument,
	IBook,
	IGetAllBooksQueryGql,
	UpdateReleaseInfoDocument,
} from './generated/graphql';

@Injectable()
export class BookService {
	constructor(private readonly apollo: Apollo) {}

	getAllBooks(): Observable<IBook[]> {
		return this.apollo
			.query<{ books: IBook[] }>({ query: GetAllBooksDocument })
			.pipe(
				tap(res => {
					if (_.isEmpty(res.errors)) {
						return;
					}
					console.info('Erroring from inside the query.');
					throwError(res.errors);
				}),
				map(res => res.data.books)
			);
	}

	getBook(id: string): Observable<IBook> {
		return this.apollo
			.query<{ book: IBook }>({ query: GetBookDocument, variables: { id } })
			.pipe(
				tap(res => res.errors && throwError(res.errors)),
				map(res => res.data.book)
			);
	}

	createOne(title: string) {
		return this.apollo.mutate<IBook>({
			mutation: CreateBookDocument,
			variables: { info: { title } },
			update: (proxy, { data }) => {
				try {
					const dataToUpdate = proxy.readQuery({ query: GetAllBooksDocument }) as any;
					dataToUpdate.books.push((data as any).addOne);
					proxy.writeQuery({ query: GetAllBooksDocument, data: dataToUpdate });
				} catch (err) {
					console.error(err);
				}
			},
		});
	}

	updateReleaseInfo(bookId: number, author: string, year: number) {
		return this.apollo.mutate<IBook>({
			mutation: UpdateReleaseInfoDocument,
			variables: { info: { id: bookId, author, releaseYear: year } },
		});
	}

	watchAllBooks(): QueryRef<{ books: IBook[] }> {
		return this.apollo.watchQuery({ query: GetAllBooksDocument });
	}

	getAllBooksWatch() {
		return this.apollo
			.watchQuery<IGetAllBooksQueryGql>({ query: GetAllBooksDocument })
			.valueChanges.pipe(map(res => res.data.books));
	}
}
