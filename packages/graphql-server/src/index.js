import {ApolloServer} from "apollo-server";
import {BaseRedisCache} from 'apollo-server-cache-redis'
import Redis from 'ioredis'
import {MySampteDatasource} from "./sample-datasources.js"

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
    sample: new MySampteDatasource()
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
