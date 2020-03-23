import { InputType, Field, Int } from "type-graphql";

@InputType()
export class UpdateReleaseInfoInput {
	@Field(type => Int)
	id: number;
	@Field(type => String)
	author: string;
	@Field(type => Int)
	releaseYear: number;
}
