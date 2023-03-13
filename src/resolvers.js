import { hashSync} from 'bcryptjs';

export const resolvers = {
    Query: {
      getTodos: async (_, _args, { dataSources: { todos } }) => {
        return todos.getTodos();
      },
      getTodo: async (_, args, { dataSources: { todos } }) => {
        return todos.getTodo(args);
      },
      filterTodoUrgency: async (_, args, {dataSources: { todos }}) => {
        return todos.filterTodoUrgency(args);
      }
    },
    Mutation: {
      createTodo: async (_, args, {dataSources: { todos }}) => {
        args.password = hashSync(args.password,10);
        return todos.createTodo(args);
      },
      updateTodo: async (_, args, {dataSources: { todos }}) => {
        return todos.updateTodo(args)
      },
      deleteTodo: async (_, args, {dataSources: { todos }}) => {
        return todos.deleteTodo(args)
      }
    }
  }