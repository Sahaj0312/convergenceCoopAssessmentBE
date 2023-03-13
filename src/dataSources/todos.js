import { MongoDataSource } from 'apollo-datasource-mongodb';
import { ApolloError } from 'apollo-server-express';
import { compare } from 'bcryptjs';


export default class Todos extends MongoDataSource {
  async getTodos() {
    return await this.model.find();
  }

  async getTodo(args) {
    let id = args.id
    const existingTodo = await this.model.findOne({ id });
    if (!existingTodo) {
      throw new ApolloError("There is no task with this ID.", "INVALID_ID")
    }
    return existingTodo;
  }

  async createTodo({id, description, urgency, username, password}) {
    const existingTodo = await this.model.findOne({ id });
    if (existingTodo) {
        throw new ApolloError("Please choose a different ID, this is already taken.", "ID_ALREADY_EXISTS")
    }
    return await this.model.create({id, description, urgency, username, password});
  }

  async updateTodo(args) {
    let id = args.id
    const existingTodo = await this.model.findOne({ id });
    if (!existingTodo) {
        throw new ApolloError("A todo with this ID does not exist.","INVALID_TODO_ID")
    }
    const existingPwd = existingTodo.password;
    const existingUsername = existingTodo.username;
    
    if (!((await compare(args.password,existingPwd)) && (args.username == existingUsername))) {
        throw new ApolloError("Incorrect username or password. You can only update if you have created this task.", "USER_VALIDATION_ERROR")
    } else {
        await this.model.updateOne(existingTodo,
            {
                $set: {
                    id: id,
                    description: args.description,
                    urgency: args.urgency,
                    username: args.username,
                    password: existingPwd
                }
            })
    }
    return await this.model.findOne({ id });
  }

  async deleteTodo(args) {
    let id = args.id
    const existingTodo = await this.model.findOne({ id });
    const existingPwd = existingTodo.password;
    const existingUsername = existingTodo.username;
    if (!existingTodo) {
        throw new ApolloError("A todo with this ID does not exist.","INVALID_TODO_ID")
    }
    if (!((await compare(args.password,existingPwd)) && (args.username == existingUsername))) {
        throw new ApolloError("Incorrect username or password. You can only delete if you have created this task.", "USER_VALIDATION_ERROR")
    } else {
        await this.model.deleteOne(existingTodo);
    }
    return "Successfully deleted!";
  }

  async filterTodoUrgency(args) {
    return await this.model.find({"urgency": args.urgency});
  }

}