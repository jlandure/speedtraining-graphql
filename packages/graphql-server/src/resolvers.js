const booksType = "books";
const charactersType = "characters";
const housesType = "houses";

const getIdFromUrl = (url) => {
  const urlStatements = url.split('/');
  return urlStatements[urlStatements.length - 1];
};

const urlIdsToType = (urlIds, type, dataSources) => {
  console.log("⚠️ "+urlIds);
  const ids = urlIds.map? urlIds.map((id => getIdFromUrl(id))) : getIdFromUrl(urlIds)
  console.log("☁️ "+ids);
  return urlIds.map? dataSources.sample.getAllItemsById(ids, type) : dataSources.sample.getById(ids, type)
}

const resolvers = {
    Query: {
      getBooks(_, {dataSources}) {
        return dataSources.sample.getAllByTypes(booksType)
      },
      getBook(_, {id}, {dataSources}) {
        return dataSources.sample.getById(id, booksType)
      },
      getCharacter(_, {id} ,{dataSources}) {
        return dataSources.sample.getById(id, charactersType)
      },
      getHouse(_, {id}, {dataSources}) {
        return dataSources.sample.getById(id, housesType)
    }
    },
    Book: {
      characters(book, _, {dataSources}) {
        return urlIdsToType(book.characters, charactersType, dataSources)
      },
      povCharacters(book, _, {dataSources}) {
        return urlIdsToType(book.characters, charactersType, dataSources)
      }
    },
    Character: {
      spouse(character, _, {dataSources}) {
        return urlIdsToType(character.spouse, charactersType, dataSources)
      },
      allegiances(character, _, {dataSources}) {
        return urlIdsToType(character.allegiances, housesType, dataSources);
      },
      books(character, _, {dataSources}) {
        return urlIdsToType(character.books, booksType, dataSources);
      },
      povBooks(character, _, {dataSources}) {
        return urlIdsToType(character.povBooks, booksType, dataSources);
      }
    },
    House: {
      founder(house, _, {dataSources}) {
        return urlIdsToType(house.founder, charactersType, dataSources)
      },
      currentLord(house, _, {dataSources}) {
        return urlIdsToType(house.currentLord, charactersType, dataSources)
      },
      heir(house, _, {dataSources}) {
        return urlIdsToType(house.heir, charactersType, dataSources)
      },
      swornMembers(house, _, {dataSources}) {
        return urlIdsToType(house.swornMembers, charactersType, dataSources)
      },
      cadetBranches(house, _, {dataSources}) {
        return urlIdsToType(house.cadetBranches, housesType, dataSources)
      },
    },
    Mutation: {
      addFavorite(_, url, {dataSources}) {
        return Boolean(dataSources.favorite.addFavorite(url));
      }
    }
  };

export {resolvers as default};