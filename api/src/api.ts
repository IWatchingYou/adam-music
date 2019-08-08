import { ApolloServer, gql } from 'apollo-server';
import { importSchema } from 'graphql-import';
import { resolvers } from './graphql/resolvers';

const basicType = gql`${importSchema('./src/graphql/schema.graphql')}`;
const port = 3003;

const mutationUpload = gql`
    extend type Mutation {
        singleUpload(file: Upload!): File
    }
`

const server = new ApolloServer({ 
    typeDefs: [basicType, mutationUpload], 
    resolvers
});

server.listen(port).then(({ url }: any) => {
    console.log(`🚀 Server ready at ${url}`);
});