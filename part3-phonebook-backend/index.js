const express = require("express");
const app = express();
const morgan = require("morgan");

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());

morgan.token("body", (request, response) => {
  return JSON.stringify(request.body);
});

app.use(
  morgan(":method :url :status :res[content-length] :response-time ms :body")
);
app.get("/", (request, response) => {
  response.send("<h1>Hello, world!</h1>");
});

// 3.1: get all notes
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

//3.2: show info
app.get("/info", (request, response) => {
  response.send(`<div>
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    </div>`);
});

//3.3: get specific person's info
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const targetPerson = persons.find((person) => person.id === id);

  if (!targetPerson) {
    response.status(404).end();
  } else {
    response.json(targetPerson);
  }
});

//3.4: delete
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);
  response.end();
});

//3.5: add new number
app.post("/api/persons", (request, response) => {
  const body = request.body;
  const addedPerson = persons.find((person) => person.name === body.name);
  if (!body.name || !body.number) {
    response.status(404).end("Missing name or number");
  } else if (addedPerson) {
    response.status(404).end("name must be unique");
  } else {
    const id = Math.floor(Math.random() * 1000);
    const newPerson = {
      name: body.name,
      number: body.number,
      id: id,
    };

    persons = persons.concat(newPerson);
    response.json(newPerson);
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
