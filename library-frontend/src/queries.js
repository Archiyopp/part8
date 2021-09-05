import { gql } from '@apollo/client';

export const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    id
    name
    born
    bookCount
  }
`;

export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    genres
    published
    author {
      name
      born
      bookCount
    }
  }
`;

export const ALL_AUTHORS = gql`
  ${AUTHOR_DETAILS}
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
`;

export const ALL_BOOKS = gql`
  ${BOOK_DETAILS}
  query {
    allBooks {
      ...BookDetails
    }
  }
`;

export const SOME_BOOKS = gql`
  ${BOOK_DETAILS}
  query ($genre: String!) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
`;

export const CREATE_BOOK = gql`
  ${BOOK_DETAILS}
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }
`;

export const SET_BORN_TO = gql`
  ${AUTHOR_DETAILS}
  mutation setBornTo($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      ...AuthorDetails
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;

export const BOOK_ADDED = gql`
  ${BOOK_DETAILS}
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
`;
