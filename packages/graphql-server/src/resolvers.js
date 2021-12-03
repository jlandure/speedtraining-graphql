import fetch from 'node-fetch'

const resolvers = {
    Query: {
      getBooks() {
        return fetch("http://34.76.108.27/api/books").then(response => response.json())
      },
      getBook(_, {id}) {
        return fetch(`http://34.76.108.27/api/books/${id}`).then(response => response.json())
      },
      getCharacter(_, {id}) {
        return fetch(`http://34.76.108.27/api/characters/${id}`).then(response => response.json())
      },
      getHouse(_, {id}) {
        return fetch(`http://34.76.108.27/api/house/${id}`).then(response => response.json())
    }
    }
  };

export {resolvers as default};