import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class Book {
	@Field(type => Int)
	id: number;
	@Field()
	title: string;
	@Field({ nullable: true })
	author?: string;
	@Field({ nullable: true })
	releaseYear?: number;
}
