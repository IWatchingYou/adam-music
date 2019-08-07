import { ApolloServer } from 'apollo-server';
import { importSchema } from 'graphql-import';

const typeDefs = importSchema('./src/graphql/schema.graphql');

const resolvers = {
    Query: {
        root: () => 'welcome to koa.'
    },
    Mutation: {
        createRoot: (parent: any, args: any) => args.name
    }
}

const server = new ApolloServer({ typeDefs, resolvers, introspection: true, playground: true });

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});