import { useQuery } from '@apollo/client';
import React from 'react';
import { ALL_AUTHORS } from '../queries';
import AuthorBirth from './AuthorBirth';

const Authors = (props) => {
  const { loading, data } = useQuery(ALL_AUTHORS);
  if (!props.show) {
    return null;
  }
  if (loading) {
    return <div>...loading</div>;
  }
  const authors = data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token && <AuthorBirth authors={authors} />}
    </div>
  );
};

export default Authors;
