import {gql} from "apollo-server";

const typeDefs = gql`
interface Item {
  id: ID
  url: String
  name: String
}

type Query {
    getBooks: [Book]!
    getBook(id: ID!): Book!
    getCharacter(id: ID!): Character!
    getHouse(id: ID!): House!
}

type Book implements Item {
    id: ID
    url: String
    name: String
    isbn: String
    authors: [String]
    numberOfPages: Int
    publisher: String
    country: String
    mediaType: String
    released: String
    characters: [Character]
    povCharacters: [Character]
    numberOfFavorites: Int
    isFavorite: Boolean
  }
  
  type Character implements Item {
    id: ID
    url: String
    name: String
    gender: String
    culture: String
    born: String
    died: String
    titles: [String]
    aliases: [String]
    spouse: Character
    allegiances: [House]
    books: [Book]
    povBooks: [Book]
    tvSeries: [String]
    playedBy: [String]
    numberOfFavorites: Int
    isFavorite: Boolean
  }
  
  type House implements Item {
    id: ID
    url: String
    name: String
    region: String
    coatOfArms: String
    words: String
    titles: [String]
    seats: [String]
    currentLord: Character
    heir: Character
    overlord: House
    founded: String
    founder: Character
    diedOut: String
    ancestralWeapons: [String]
    cadetBranches: [House]
    swornMembers: [Character]
    numberOfFavorites: Int
    isFavorite: Boolean
  }

  type Mutation {
    addFavorite(url: String!): Boolean
    removeFavorite(url: String!): Boolean
  }
`;
  export {typeDefs as default}