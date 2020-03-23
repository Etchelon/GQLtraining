import { Resolver, Query, Arg, Mutation, Int } from "type-graphql";
import { BookService } from "../services/book.service";
import { Book } from "../types/book.type";
import { UpdateReleaseInfoInput } from "../types/release-info.input";
import { NewBookInput } from "../types/new-book.input";

@Resolver(Book)
export class BookResolver {
	private bookService = new BookService();

	@Query(returns => [Book])
	async books(): Promise<Book[]> {
		const ret = await this.bookService.getAll();
		return ret;
	}

	@Query(returns => Book)
	async book(@Arg("id", type => Int) id: number): Promise<Book> {
		const ret = await this.bookService.get(id);
		return ret;
	}

	@Mutation(returns => Book)
	async addOne(@Arg("book") newBookData: NewBookInput): Promise<Book> {
		const { title } = newBookData;
		const ret = await this.bookService.createOne(title);
		return ret;
	}

	@Mutation(returns => Book)
	async setReleaseInfo(@Arg("info") input: UpdateReleaseInfoInput): Promise<Book> {
		const { id, author, releaseYear } = input;
		const ret = await this.bookService.updateReleaseInfo(id, author, releaseYear);
		return ret;
	}
}
