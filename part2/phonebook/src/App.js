import React, { useState, useEffect } from "react";
import "./App.css";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialNotes) => {
      setPersons(initialNotes);
    });
  }, []);

  const searchedNumbers = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addNumber = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      setErrorMessage(`${newName} is already added to phonebook`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return;
    }
    const personObject = { name: newName, number: newNumber };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
      setErrorMessage(`Added ${returnedPerson.name}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure?")) return;
    let person = persons.find((p) => p.id === id);
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      })
      .catch((error) => {
        setErrorMessage(
          `Failed to remove ${person.name} from the server. ${error}`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };
  return (
    <div>
      <Notification message={errorMessage} />
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
      <h2>add a number</h2>
      <PersonForm
        addNumber={addNumber}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={searchedNumbers} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
