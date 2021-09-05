import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { ME, SOME_BOOKS } from '../queries';

export default function Recommendations({ show }) {
  const { loading, data } = useQuery(ME);
  const [getBooks, result] = useLazyQuery(SOME_BOOKS);
  const [books, setBooks] = useState(null);
  useEffect(() => {
    if (data?.me) {
      getBooks({ variables: { genre: data?.me?.favoriteGenre } });
      setBooks((b) => result?.data?.allBooks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, result?.data?.allBooks]);
  if (!books || !show || loading || result.loading || !data?.me)
    return null;
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
          {books.map((a) => (
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
