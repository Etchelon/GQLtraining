import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { BookResolver } from "./resolvers/book.resolver";

buildSchema({
	resolvers: [BookResolver],
	emitSchemaFile: {
		path: `${__dirname}/../generated/schema.graphql`,
		commentDescriptions: true,
	},
	validate: false,
})
	.then(
		schema =>
			new ApolloServer({
				schema,
				cors: true,
			})
	)
	.then(server => server.listen({ port: 4042 }))
	.then(({ url }) => {
		console.log(`🚀  Server ready at ${url}`);
	});
