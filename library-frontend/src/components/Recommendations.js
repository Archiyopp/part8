import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { ME, SOME_BOOKS } from '../queries';

export default function Recommendations({ show }) {
  const { loading, data } = useQuery(ME);
  const [getBooks, result] = useLazyQuery(SOME_BOOKS);
  useEffect(() => {
    if (data?.me) {
      getBooks({ variables: { genre: data.me.favoriteGenre } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  if (!show || loading || result.loading) return null;
  const books = result;
  console.log(books);
  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre{' '}
        <strong>{data.me.favoriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
