import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class Type1 {
	@Field(type => Int)
	id: number;
	@Field()
	title: string;
	@Field({ nullable: true })
	code?: string;
}
