import { FieldResolver, Resolver, Root, ResolverInterface } from "type-graphql";
import { MyExtensionNamespace } from "../my-extension-namespace";
import { Type1 } from '../types/type1.type';
import { Type2 } from '../types/type2.type';

@Resolver(of => MyExtensionNamespace)
export class MyExtensionResolver implements ResolverInterface<MyExtensionNamespace> {
	@FieldResolver(type => [Type1])
	query1(): Type1[] {
		return [];
	}

	@FieldResolver(type => [Type2])
	query2(): Type2[] {
		return [];
	}
}
