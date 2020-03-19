import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
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

const CreateBook = gql`
	mutation CreateBook($info: NewBookInput!) {
		addOne(book: $info) {
			id
			title
		}
	}
`;

const UpdateReleaseInfo = gql`
	mutation UpdateReleaseInfo($info: UpdateReleaseInfoInput!) {
		setReleaseInfo(info: $info) {
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

	createOne(title: string) {
		return this.apollo.mutate<IBook>({
			mutation: CreateBook,
			variables: { info: { title } },
			awaitRefetchQueries: true,
			update: (proxy, { data }) => {
				try {
					const dataToUpdate = proxy.readQuery({ query: BooksQuery }) as any;
					dataToUpdate.books.push((data as any).addOne);
					proxy.writeQuery({ query: BooksQuery, data: dataToUpdate });
				} catch (err) {
					console.error(err);
				}
			},
		});
	}

	updateReleaseInfo(bookId: string, author: string, year: number) {
		return this.apollo.mutate<IBook>({
			mutation: UpdateReleaseInfo,
			variables: { info: { id: bookId, author, releaseYear: year } },
		});
	}

	watchAllBooks(): QueryRef<{ books: IBook[] }> {
		return this.apollo.watchQuery({ query: BooksQuery });
	}
}
