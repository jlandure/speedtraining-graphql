import { DisplayItem } from '../components/DisplayItem';
import {
  useQuery,
  gql
} from "@apollo/client"
import fragment from '../fragment';

const BOOKS = gql`query getBooks {
  getBooks {
    ...ItemFields
    isFavorite
    numberOfFavorites
  }
}
${fragment}`

export const Books = () => {
  const { loading, error, data } = useQuery(BOOKS);
  const addToFavorite = () => {}; // TODO mutation
  const removeFromFavorite = () => {}; // TODO mutation
  console.log(data)
  return (
    <section>
      <h2>Books</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        data.getBooks.map((book) => (
          <DisplayItem
            title={book.name}
            key={book.id}
            url={'/books/' + book.id}
            isFavorite={book.isFavorite}
            nbOfFavorites={book.numberOfFavorites}
            addToFavorite={() => addToFavorite({ variables: { url: book.url } })}
            removeFromFavorite={() => removeFromFavorite({ variables: { url: book.url } })}
          />
        ))
      )}
    </section>
  );
};
