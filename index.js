const { ApolloServer, gql } = require('apollo-server');
const StationsAPI = require('./apis/stationsapi');

const typeDefs = gql`
  # Non nullable fields are just assumptions
  type Station {
    station_ID: Int!
    location_ID: Int
    seller_ID: Int!
    name: String!
    connected: Int!
    available: Int!
    sockets: Int
    maxpower: String
    status: String
    currency: String
  }

  type Query {
    stations(limit: Int): [Station!]!
    station(id: Int): Station!
  }
`;

const resolvers = {
  Query: {
    stations: async (_, __, { dataSources }) => {
      return dataSources.stationsAPI.getStations();
    },
    station: async (_, { id }, { dataSources }) => {
      return dataSources.stationsAPI.getStation(id);
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      stationsAPI: new StationsAPI(),
    };
  },
});

server.listen({ port: process.env.PORT || 4000}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
