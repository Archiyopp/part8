import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState('');
  const { loading, data } = useQuery(ALL_BOOKS);
  if (!props.show) {
    return null;
  }

  if (loading) return <div>...loading</div>;

  const books = genreFilter
    ? data.allBooks.filter((book) =>
        book.genres.includes(genreFilter)
      )
    : data.allBooks;

  let genres = [];
  data.allBooks.forEach((book) => {
    for (const genre of book.genres) {
      if (!genres.includes(genre)) {
        genres.push(genre);
      }
    }
  });

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button onClick={() => setGenreFilter(genre)} key={genre}>
          {genre}
        </button>
      ))}
      <button onClick={() => setGenreFilter('')}>all genres</button>
    </div>
  );
};

export default Books;
