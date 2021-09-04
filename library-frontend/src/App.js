import { useApolloClient } from '@apollo/client';
import React, { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import LoginForm from './components/LoginForm';
import NewBook from './components/NewBook';
import Recommendations from './components/Recommendations';

const getToken = () => {
  const token = localStorage.getItem('libraryUserToken') || null;
  return token;
};

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(getToken());
  const client = useApolloClient();
  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommendations')}>
              recommendations
            </button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>
      <Authors show={page === 'authors'} token={token} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={() => setPage('authors')}
      />
      <Recommendations show={page === 'recommendations'} />
    </div>
  );
};

export default App;
