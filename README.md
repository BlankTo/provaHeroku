# BigLab 2 - Class: 2021 WA1

## Team name: GoogleIsMyBff

Team members:
* s287549 Stefano Giannuzzi
* s292490 Giorgio Mongardi 
* S286286 Giuseppe Gagliardi
* s287572 Gambino Matteo

## Instructions

A general description of the BigLab 2 is avaible in the `course-materials` repository, [under _labs_](https://github.com/polito-WA1-AW1-2021/course-materials/tree/main/labs/BigLab2/BigLab2.pdf). In the same repository, you can find the [instructions for GitHub Classroom](https://github.com/polito-WA1-AW1-2021/course-materials/tree/main/labs/GH-Classroom-BigLab-Instructions.pdf), covering this and the next BigLab.

Once cloned this repository, instead, write your names in the above section.

When committing on this repository, please, do **NOT** commit the `node_modules` directory, so that it is not pushed to GitHub.
This should be already automatically excluded from the `.gitignore` file, but double-check.

When another member of the team pulls the updated project from the repository, remember to run `npm install` in the project directory to recreate all the Node.js dependencies locally, in the `node_modules` folder.

Finally, remember to add the `final` tag for the final submission, otherwise it will not be graded.

## List of APIs offered by the server

Provide a short description for API with the required parameters, follow the proposed structure.

* [HTTP Method] [URL, with any parameter]
* [One-line about what this API is doing]
* [Sample request, with body (if any)]
* [Sample response, with body (if any)]
* [Error responses, if any]

- retrieve the list of all the available tasks <br>
  GET '/api/tasks' <br>
  <br>
  Response:<br>
  {"id":1, "description":"prova", "important":1, "private":0, "deadline":"2021-05-09", "completed":0}<br>
  {"id":2,"description":"prova2", "important":1, "private":0, "deadline":"2021-05-09", "completed":0}<br>
- retrieve a list of all the tasks that fulfill a given filter (e.g., all the important tasks, all the tasks with a given deadline, etc.)<br>
    GET '/api/tasks/:filter'<br>
      <br>
  Response:<br>
  {"id":1, "description":"prova", "important":1, "private":0, "deadline":"2021-05-09", "completed":0}<br>
  {"id":2,"description":"prova2", "important":1, "private":0, "deadline":"2021-05-09", "completed":0}<br>
- retrieve task, given its “id” <br>
    GET '/api/tasks/:id'<br>
      <br>
  Response:<br>
  {"id":1, "description":"prova", "important":1, "private":0, "deadline":"2021-05-09", "completed":0}<br>
- create new task, by providing all relevant information –except the “id” that will be automatically assigned by the back-end <br>
    POST '/api/tasks'<br>
    <br>
    {"description":"prova", "important":1, "private":0, "deadline":"2021-05-09", "completed":0}
- update an existing task, by providing all relevant information (all the properties except the “id”will overwrite the current properties of the existing task. The “id” will not change after the update) <br>
    PUT '/api/tasks/:id'<br>
    <br>
    {"description":"prova", "important":1, "private":0, "deadline":"2021-05-09", "completed":0}
- mark an existing task as completed/uncompleted <br>
    PUT '/api/tasks/:id/mark' <br>
    <br>

- delete an existing task, given its “id” <br>
    DELETE '/api/tasks/:id'

- login<br>
  POST /api/sessions<br>
  <br>
  {username:"username", password:"password"}<br>

  response:<br>
  {"id":2,"username":"prova@polito.it","name":"Maurizio"}<br>
- logout<br>
  DELETE /api/sessions/current<br>

- Get current session<br>
  GET /api/sessions/current<br>

  response:<br>
  {"id":2,"username":"prova@polito.it","name":"Maurizio"}


## Users in the DB
- email: john.doe@polito.it<br>
  passowrd: password

- email: prova@polito.it<br>
  password: provam