import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { continents, countries, languages } from "./data.js";

const typeDefs = `#graphql
  type Language {
    code: ID!
    name: String!
    native: String!
    rtl: String!
  }

  type Country {
    code: ID!
    name: String!
    awsRegion: String!
    capital: String
    continent: Continent!
    currencies: [String!]!
    currency: String
    emoji: String!
    emojiU: String!
    languages: [Language!]!
    native: String!
    phone: String!
    phones: [String!]!
  }

  type Continent {
    code: ID!
    name: String!
    countries: [Country!]
  }

  type Query {
    languages: [Language]
    continents: [Continent]
    countries: [Country]
    language(code: ID!): Language
    continent(code: ID!): Continent
    country(code: ID!): Country
  }
`;

const resolvers = {
  Query: {
    languages: () => languages,
    continents: () => continents,
    countries: () => countries,
    language: (_, { code }) =>
      languages.find((language) => language.code === code),
    continent: (_, { code }) =>
      continents.find((continent) => continent.code === code),
    country: (_, { code }) =>
      countries.find((country) => country.code === code),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
