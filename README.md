# To-do list API (Back-end project)

# Introduction

This is a simple CRUD API made using GraphQL, MongoDB and NodeJS that maintains a to-do list.

# A few notes:

* Each task on the to-do list is comprised of a unique ID, description, urgency, username and password.
* The urgency is on a scale of 1-10 and describes how urgent the task is.
* Everytime a user creates a task to add to the to-do list, they are required to also provide a username and password.
* Everytime a user wants to update or delete a task, they must authenticate themselves by the username and password that was used when the task was created. In essence, only the person that created the task can update or delete it.
* Tasks on the list can be read by anyone without authentication.
* A user can filter the tasks by urgency.
* .env intentionally not in .gitignore file.

# Following are possible queries:
* **getTodos**: Returns a list of all the tasks on the list.
* **getTodo(id: Int!)**: Returns a specific task on the list based on its ID.
* **filterTodoUrgency(urgency: Int!)**: Returns a list of tasks that have the same urgency.

# Following are possible mutations: 
* **createTodo(id, description, urgency, username, password)**: Creates a new task and adds it to the to-do list. Takes in description, urgency of the task and username + password that will later be used for authentication.
* **updateTodo(id, description, urgency, username, password)**: Updates an exisiting task with a valid ID. Can only be performed by person that created the task.
* **deleteTodo(id, username, password)**: Deletes a task with a valid ID from the to-do list. Can only be performed by person that created the task.


# Usage


First, clone the repository and navigate to the project directory:

    $ git clone https://github.com/Sahaj0312/convergenceCoopAssessmentBE.git

Next, install all the dependencies:

    $ npm install

Then, start the application:

    $ npm start
    
This will start the GrapQL explorer on port 4000. Navigate to http://localhost:4000/graphql to test the API.