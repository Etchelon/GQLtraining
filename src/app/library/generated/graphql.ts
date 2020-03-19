import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import * as ApolloCore from 'apollo-client';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
}

export interface IBook {
	__typename?: 'Book';
	id: Scalars['ID'];
	title: Scalars['String'];
	author?: Maybe<Scalars['String']>;
	releaseYear?: Maybe<Scalars['Float']>;
}

export interface IMutation {
	__typename?: 'Mutation';
	addOne: IBook;
	setReleaseInfo: IBook;
}

export interface IMutationAddOneArgs {
	book: INewBookInput;
}

export interface IMutationSetReleaseInfoArgs {
	info: IUpdateReleaseInfoInput;
}

export interface INewBookInput {
	title: Scalars['String'];
}

export interface IQuery {
	__typename?: 'Query';
	books: Array<IBook>;
	book: IBook;
}

export interface IQueryBookArgs {
	id: Scalars['ID'];
}

export interface IUpdateReleaseInfoInput {
	id: Scalars['ID'];
	author: Scalars['String'];
	releaseYear: Scalars['Int'];
}

export interface IGetAllBooksQueryVariables {}

export type IGetAllBooksQueryGql = { __typename?: 'Query' } & {
	books: Array<{ __typename?: 'Book' } & Pick<IBook, 'id' | 'title' | 'author' | 'releaseYear'>>;
};

export interface IGetBookQueryVariables {
	id: Scalars['ID'];
}

export type IGetBookQueryGql = { __typename?: 'Query' } & {
	book: { __typename?: 'Book' } & Pick<IBook, 'id' | 'title' | 'author' | 'releaseYear'>;
};

export interface ICreateBookMutationVariables {
	info: INewBookInput;
}

export type ICreateBookMutationGql = { __typename?: 'Mutation' } & {
	addOne: { __typename?: 'Book' } & Pick<IBook, 'id' | 'title'>;
};

export interface IUpdateReleaseInfoMutationVariables {
	info: IUpdateReleaseInfoInput;
}

export type IUpdateReleaseInfoMutationGql = { __typename?: 'Mutation' } & {
	setReleaseInfo: { __typename?: 'Book' } & Pick<IBook, 'author' | 'releaseYear'>;
};

export const GetAllBooksDocument = gql`
	query GetAllBooks {
		books {
			id
			title
			author
			releaseYear
		}
	}
`;

@Injectable({
	providedIn: 'root',
})
export class IGetAllBooksGQL extends Apollo.Query<IGetAllBooksQueryGql, IGetAllBooksQueryVariables> {
	document = GetAllBooksDocument;
}
export const GetBookDocument = gql`
	query GetBook($id: ID!) {
		book(id: $id) {
			id
			title
			author
			releaseYear
		}
	}
`;

@Injectable({
	providedIn: 'root',
})
export class IGetBookGQL extends Apollo.Query<IGetBookQueryGql, IGetBookQueryVariables> {
	document = GetBookDocument;
}
export const CreateBookDocument = gql`
	mutation CreateBook($info: NewBookInput!) {
		addOne(book: $info) {
			id
			title
		}
	}
`;

@Injectable({
	providedIn: 'root',
})
export class ICreateBookGQL extends Apollo.Mutation<ICreateBookMutationGql, ICreateBookMutationVariables> {
	document = CreateBookDocument;
}
export const UpdateReleaseInfoDocument = gql`
	mutation UpdateReleaseInfo($info: UpdateReleaseInfoInput!) {
		setReleaseInfo(info: $info) {
			author
			releaseYear
		}
	}
`;

@Injectable({
	providedIn: 'root',
})
export class IUpdateReleaseInfoGQL extends Apollo.Mutation<
	IUpdateReleaseInfoMutationGql,
	IUpdateReleaseInfoMutationVariables
> {
	document = UpdateReleaseInfoDocument;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface WatchQueryOptionsAlone<V> extends Omit<ApolloCore.WatchQueryOptions<V>, 'query' | 'variables'> {}

interface QueryOptionsAlone<V> extends Omit<ApolloCore.QueryOptions<V>, 'query' | 'variables'> {}

interface MutationOptionsAlone<T, V> extends Omit<ApolloCore.MutationOptions<T, V>, 'mutation' | 'variables'> {}

interface SubscriptionOptionsAlone<V> extends Omit<ApolloCore.SubscriptionOptions<V>, 'query' | 'variables'> {}

@Injectable()
export class LibraryService {
	constructor(
		private iGetAllBooksGql: IGetAllBooksGQL,
		private iGetBookGql: IGetBookGQL,
		private iCreateBookGql: ICreateBookGQL,
		private iUpdateReleaseInfoGql: IUpdateReleaseInfoGQL
	) {}

	getAllBooks(variables?: IGetAllBooksQueryVariables, options?: QueryOptionsAlone<IGetAllBooksQueryVariables>) {
		return this.iGetAllBooksGql.fetch(variables, options);
	}

	getAllBooksWatch(
		variables?: IGetAllBooksQueryVariables,
		options?: WatchQueryOptionsAlone<IGetAllBooksQueryVariables>
	) {
		return this.iGetAllBooksGql.watch(variables, options);
	}

	getBook(variables: IGetBookQueryVariables, options?: QueryOptionsAlone<IGetBookQueryVariables>) {
		return this.iGetBookGql.fetch(variables, options);
	}

	getBookWatch(variables: IGetBookQueryVariables, options?: WatchQueryOptionsAlone<IGetBookQueryVariables>) {
		return this.iGetBookGql.watch(variables, options);
	}

	createBook(
		variables: ICreateBookMutationVariables,
		options?: MutationOptionsAlone<ICreateBookMutationGql, ICreateBookMutationVariables>
	) {
		return this.iCreateBookGql.mutate(variables, options);
	}

	updateReleaseInfo(
		variables: IUpdateReleaseInfoMutationVariables,
		options?: MutationOptionsAlone<IUpdateReleaseInfoMutationGql, IUpdateReleaseInfoMutationVariables>
	) {
		return this.iUpdateReleaseInfoGql.mutate(variables, options);
	}
}
