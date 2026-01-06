import { useState, useEffect } from "react";
import personsService from "./services/persons";
import axios from "axios";
import Filter from "./components/Filter";
import PersonsForm from "./components/PersonsForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personsService.getAll().then((data) => setPersons(data));
  }, []);

  const handleChange = (event, setFunc) => {
    setFunc(event.target.value);
  };

  const handleClickDelete = (id) => {
    const decision = window.confirm(
      `Delete ${persons.find((person) => person.id === id).name}?`
    );
    if (decision) {
      personsService
        .deleteById(id)
        .then(setPersons(persons.filter((person) => person.id !== id)));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const addedPerson = persons.find((person) => person.name === newName);
    const newPerson = { name: newName, number: newNumber };

    if (addedPerson) {
      if (
        window.confirm(
          `${addedPerson.name} is already added to phonebook, replace the old number with an new one?`
        )
      ) {
        personsService
          .replacePerson(addedPerson.id, newPerson)
          .then((repalcedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === addedPerson.id ? repalcedPerson : person
              )
            );
          });
      }
    } else {
      personsService.createPerson(newPerson).then((data) => {
        setPersons(persons.concat(data));
      });
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filter={filter}
        onChange={(event) => {
          handleChange(event, setFilter);
        }}
      />

      <h2>add a new</h2>
      <PersonsForm
        name={newName}
        number={newNumber}
        nameChange={(event) => {
          handleChange(event, setNewName);
        }}
        numberChange={(event) => {
          handleChange(event, setNewNumber);
        }}
        onSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        clickDelete={handleClickDelete}
      />
    </div>
  );
};

export default App;
