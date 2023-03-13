import { gql } from 'apollo-server';

export const typeDefs = gql`

  type Todo {
    _id: ID!
    description: String!
    urgency: Int!
    username: String!
    password: String!
  }

  type Query {
    getTodos: [Todo!]!,
    getTodo(id: Int!): Todo!
    filterTodoUrgency(urgency: Int!): [Todo!]!
  }

  type Mutation {
    createTodo(id: Int!, description: String!, urgency: Int!, username: String!, password: String!): Todo!
    updateTodo(id: Int!, description: String!, urgency: Int!, username: String!, password: String!): Todo!
    deleteTodo(id: Int!, username: String!, password: String!): String!
  }
`;