import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class Type2 {
	@Field(type => Int)
	id: number;
	@Field(type => Date)
	timestamp: Date;
}
