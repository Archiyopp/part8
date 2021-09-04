import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { ALL_AUTHORS, SET_BORN_TO } from '../queries';

export default function AuthorBirth({ authors }) {
  const [name, setName] = useState('Robert Martin');
  const [born, setBorn] = useState('');
  const [setBornTo] = useMutation(SET_BORN_TO, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  const submit = (event) => {
    event.preventDefault();
    setBornTo({ variables: { name, born: Number(born) } });
    setBorn('');
  };
  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          Author:{' '}
          <select
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            {authors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born{' '}
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
}
