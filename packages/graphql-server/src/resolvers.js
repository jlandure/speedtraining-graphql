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
      getBooks(_, __, {dataSources}) {
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
      id(book) {
        return getIdFromUrl(book.url);
      },
      characters(book, _, {dataSources}) {
        return urlIdsToType(book.characters, charactersType, dataSources)
      },
      povCharacters(book, _, {dataSources}) {
        return urlIdsToType(book.characters, charactersType, dataSources)
      },
      async numberOfFavorites(book, _, {dataSources}) {
        const result = await dataSources.favorite.getNumberOfFavorites(book.url);
        return result
      },
      async isFavorite(book, _, {dataSources}) {
        const result = await dataSources.favorite.isFavorite(book.url);
        return Boolean(result)
      },
    },
    Character: {
      id(character) {
        return getIdFromUrl(character.url);
      },
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
      },
      async numberOfFavorites(character, _, {dataSources}) {
        const result = await dataSources.favorite.getNumberOfFavorites(character.url);
        return result
      },
      async isFavorite(character, _, {dataSources}) {
        const result = await dataSources.favorite.isFavorite(character.url);
        return Boolean(result)
      },
    },
    House: {
      id(house) {
        return getIdFromUrl(house.url);
      },
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
      async numberOfFavorites(house, _, {dataSources}) {
        const result = await dataSources.favorite.getNumberOfFavorites(house.url);
        return result
      },
      async isFavorite(house, _, {dataSources}) {
        const result = await dataSources.favorite.isFavorite(house.url);
        return Boolean(result)
      }
    },
    Mutation: {
      async addFavorite(_, {url}, {dataSources}) {
        const result = await dataSources.favorite.addFavorite(url);
        return Boolean(result)
      },
      async removeFavorite(_, {url}, {dataSources}) {
        const result = await  dataSources.favorite.removeFavorite(url);
        return Boolean(result)
      }
    }
  };

export {resolvers as default};