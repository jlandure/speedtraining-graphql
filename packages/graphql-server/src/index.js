import {ApolloServer} from "apollo-server";
import {BaseRedisCache} from 'apollo-server-cache-redis'
import Redis from 'ioredis'
import {MySampleDatasource} from "./sample-datasources.js"
import {MyFavoriteDatasource} from "./favorite-datasources.js"

import typeDefs from "./schema.js"
import resolvers from "./resolvers.js"

const server = new ApolloServer({
  resolvers,
  typeDefs,
  // cache: new BaseRedisCache({
  //   client: new Redis({
  //     host: 'localhost',
  //   }),
  // }),
  dataSources: () => ({
    sample: new MySampleDatasource(),
    favorite: new MyFavoriteDatasource()
  }),
  context: () => ({token: "ju"})
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
