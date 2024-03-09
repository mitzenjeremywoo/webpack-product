import { buildSubgraphSchema } from '@apollo/subgraph';
//let buildSubgraphSchema = require('@apollo/subgraph');
import { ApolloServer } from 'apollo-server';
import Debug from 'debug';
import { typeDefs } from './product-schema';
import { gql } from 'apollo-server';

// const typeDefs = gql`
//   extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])
//   type Product @key(fields: "id") {
//     id: ID!
//     title: String!
//     description: String
//     price: Int!
//     category: Category!
//   }
//   type Category {
//     id: ID!
//     title: String!
//   }
//   type Query {
//     product(id: ID!): Product
//   }
// `;

const debug = Debug('product');

const products: any = [{
  id: '1',
  title: 'Blender',
  description: "",
  price: 40,
  categoryId: '2'
}]

const categories = [{
  id: '2',
  title: 'Kitchen tools'
}]

const resolvers = {
  Query: {
    product: (_: any, { id }: any) => {
      debug(`resolving product by id '${id}'`);
      return products.find((product: { id: any; }) => product.id === id);
    }
  },
  Product: {
    category(product: any) {
      debug(`resolving product category for product '${JSON.stringify(product)}'`);
      return categories.find(category => category.id === product.categoryId);
    },
  }
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers })
});

server.listen({ port: 4001 }).then(() => {
  debug('service started');
});