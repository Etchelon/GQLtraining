import { InputType, Field } from "type-graphql";

@InputType()
export class NewBookInput {
	@Field(type => String)
	title: string;
}
