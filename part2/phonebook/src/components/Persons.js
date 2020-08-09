import React from "react";

const Persons = ({ persons, handleDelete }) => {
  return (
    <>
      {persons.map((person) => (
        <div key={person.name}>
          <span>
            {person.name} {person.number}
          </span>
          <button onClick={() => handleDelete(person.id)}>Delete</button>
        </div>
      ))}
    </>
  );
};

export default Persons;
