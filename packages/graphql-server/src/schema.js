import {gql} from "apollo-server";

const typeDefs = gql`
type Query {
    getBooks: [Book]!
    getBook(id: ID!): Book!
    getCharacter(id: ID!): Character!
    getHouse(id: ID!): House!
}

type Book {
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
  }
  
  type Character {
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
  }
  
  type House {
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
  }

  type Mutation {
    addFavorite(url: String!): Boolean
  }
`;
  export {typeDefs as default}