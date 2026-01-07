import { useState, useEffect } from "react";
import personsService from "./services/persons";
import Filter from "./components/Filter";
import PersonsForm from "./components/PersonsForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const TIMEOUT = 5000;
  // Fetch persons from server
  useEffect(() => {
    personsService.getAll().then((data) => setPersons(data));
  }, []);

  // handle different change from input
  const handleChange = (event, setFunc) => {
    setFunc(event.target.value);
  };

  const handleNotification = (message, type, func) => {
    setMessage(message);
    setType(type);
    func();
  };

  const setNotificationTimeout = () => {
    setTimeout(() => {
      setMessage("");
      setType("");
    }, TIMEOUT);
  };

  // delete person once click button
  const handleClickDelete = (id) => {
    // double check
    const deletedPerson = persons.find((person) => person.id === id);
    const decision = window.confirm(`Delete ${deletedPerson.name}?`);
    // delete from server and remove it from fontend to refresh and render
    if (decision) {
      personsService
        .deleteById(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          handleNotification(
            `Deleted ${deletedPerson.name}`,
            "success",
            setNotificationTimeout
          );
        })
        .catch(() => {
          handleNotification(
            `Information of ${deletedPerson.name} has already been removed from server`,
            "error",
            setNotificationTimeout
          );
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  //handle sumbit
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
            handleNotification(
              `Changed ${newName}'s number to ${newNumber}`,
              "success",
              setNotificationTimeout
            );
          })
          .catch(
            (error) =>
              handleNotification(
                `Fail to change ${newName}'s number. Because: ${error.message}`
              ),
            "error",
            setNotificationTimeout
          );
      }
    } else {
      personsService
        .createPerson(newPerson)
        .then((data) => {
          setPersons(persons.concat(data));
          handleNotification(
            `Created ${newName}'s number`,
            "success",
            setNotificationTimeout
          );
        })
        .catch(
          () => handleNotification(`Fail to create ${newName}'s number`),
          "error",
          setNotificationTimeout
        );
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={type} />
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
