import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import _ from 'lodash';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const BooksQuery = gql`
	query GetAllBooks {
		books {
			id
			title
			author
			releaseYear
		}
	}
`;

const BookQuery = gql`
	query GetBook($id: ID!) {
		book(id: $id) {
			id
			title
			author
			releaseYear
		}
	}
`;

export interface IBook {
	id: string;
	title: string;
	author?: string;
	releaseYear?: number;
}

@Injectable()
export class BookService {
	constructor(private readonly apollo: Apollo) {}

	getAllBooks(): Observable<IBook[]> {
		return this.apollo
			.query<{ books: IBook[] }>({ query: BooksQuery })
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
			.query<{ book: IBook }>({ query: BookQuery, variables: { id } })
			.pipe(
				tap(res => res.errors && throwError(res.errors)),
				map(res => res.data.book)
			);
	}
}
