import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'
import { Todo as TodoModel } from './models/todo';
import Todos from './dataSources/todos';
require('dotenv').config();

// MongoDB connection
const db = async () => {
    await mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
}

const app = express();

const dataSources = () => ({
    todos: new Todos(TodoModel)
  });

  const server = new ApolloServer({ typeDefs, resolvers, dataSources});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  db()
    .then(console.log('Connected to database successfully!'))
    .catch(error => console.error(error));

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();