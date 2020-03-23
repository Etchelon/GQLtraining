import * as _ from "lodash";
import { Book } from "../types/book.type";

const books: Book[] = [
	{
		id: 1,
		title: "Harry Potter and the Sorcerer's stone",
		author: "J.K. Rowling",
	},
	{
		id: 2,
		title: "Jurassic Park",
		author: "Michael Crichton",
	},
];

export class BookService {
	async getAll(): Promise<Book[]> {
		return _.cloneDeep(books);
	}

	async get(id: number): Promise<Book> {
		const book = _.find(books, b => b.id === id);
		return _.cloneDeep(book);
	}

	async createOne(title: string): Promise<Book> {
		const newId = +_.maxBy(books, b => b.id).id + 1;
		const newBook: Book = { id: newId, title };
		books.push(newBook);
		return newBook;
	}

	async updateReleaseInfo(id: number, author: string, year: number): Promise<Book> {
		const book = _.find(books, b => b.id === id);
		if (!book) {
			throw new Error(`Book with id ${id} not found. Cannot update.`);
		}
		book.author = author;
		book.releaseYear = year;
		return _.cloneDeep(book);
	}
}
