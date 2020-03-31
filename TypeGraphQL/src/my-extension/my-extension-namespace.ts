import { ObjectType, Field } from "type-graphql";
import { Type1 } from './types/type1.type';
import { Type2 } from './types/type2.type';

@ObjectType()
export class MyExtensionNamespace {
    @Field(type => [Type1])
    query1: Type1[];

    @Field(type => [Type2])
    query2: Type2[];
}
