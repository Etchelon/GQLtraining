import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClientOptions } from 'apollo-client';

const uri = 'http://localhost:4042'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
	return {
		link: httpLink.create({ uri }),
		cache: new InMemoryCache(),
		connectToDevTools: true,
	};
}

@NgModule({
	exports: [ApolloModule, HttpLinkModule],
	providers: [
		{
			provide: APOLLO_OPTIONS,
			useFactory: createApollo,
			deps: [HttpLink],
		},
	],
})
export class GraphQLModule {}
