import { useParams } from 'react-router-dom';
import { DisplayItem, DisplayItemList } from '../components/DisplayItem';
import {
  useQuery,
  gql
} from "@apollo/client"

const BOOK = gql`query getBook($id: ID!) {
  book:getBook(id: $id) {
    name
    isFavorite
    numberOfFavorites
    characters {
      id
      name
    }
  }
}`

export const Book = () => {
  let { id } = useParams();

  const { loading, error, data } = useQuery(BOOK, {
    variables: { id },
  });
  const addToFavorite = () => {}; // TODO mutation
  const removeFromFavorite = () => {}; // TODO mutation

  return (
    <section>
      <h2>
        Book#{id} {loading ? null : `: ${data.book.name}`}
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DisplayItem
          title={data.book.name}
          isFavorite={data.book.isFavorite}
          nbOfFavorites={data.book.numberOfFavorites}
          addToFavorite={addToFavorite}
          removeFromFavorite={removeFromFavorite}
        >
          <DisplayItemList
            summary="Characters"
            list={data.book.characters.map((it) => ({ id: it.id, name: it.name, url: `/characters/${it.id}` }))}
          />
        </DisplayItem>
      )}
    </section>
  );
};
