import { MongoDataSource } from 'apollo-datasource-mongodb';
import { ApolloError } from 'apollo-server-express';
import { compare } from 'bcryptjs';


export default class Todos extends MongoDataSource {

  // Get all the tasks on the to-do list
  async getTodos() {
    return await this.model.find();
  }

  // Get only the task with a specific ID
  async getTodo(args) {
    let id = args.id
    const existingTodo = await this.model.findOne({ id });
    if (!existingTodo) {
      throw new ApolloError("There is no task with this ID.", "INVALID_ID")
    }
    return existingTodo;
  }

  // Create a new task
  async createTodo({id, description, urgency, username, password}) {
    const existingTodo = await this.model.findOne({ id });
    if (existingTodo) {
        throw new ApolloError("Please choose a different ID, this is already taken.", "ID_ALREADY_EXISTS")
    }
    return await this.model.create({id, description, urgency, username, password});
  }

  // Update a task. Can only be done by user that created the task.
  async updateTodo(args) {
    let id = args.id
    const existingTodo = await this.model.findOne({ id });
    if (!existingTodo) {
        throw new ApolloError("A todo with this ID does not exist.","INVALID_TODO_ID")
    }
    const existingPwd = existingTodo.password;
    const existingUsername = existingTodo.username;
    
    // Authenticating user that created the task
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

  // Delete a task from the to-do list. Can only be done by user that created the task.
  async deleteTodo(args) {
    let id = args.id
    const existingTodo = await this.model.findOne({ id });
    const existingPwd = existingTodo.password;
    const existingUsername = existingTodo.username;
    if (!existingTodo) {
        throw new ApolloError("A todo with this ID does not exist.","INVALID_TODO_ID")
    }

    // Authenticating user that created the task
    if (!((await compare(args.password,existingPwd)) && (args.username == existingUsername))) {
        throw new ApolloError("Incorrect username or password. You can only delete if you have created this task.", "USER_VALIDATION_ERROR")
    } else {
        await this.model.deleteOne(existingTodo);
    }
    return "Successfully deleted!";
  }

  // Return all the tasks with a specific urgency (1-10)
  async filterTodoUrgency(args) {
    return await this.model.find({"urgency": args.urgency});
  }

}