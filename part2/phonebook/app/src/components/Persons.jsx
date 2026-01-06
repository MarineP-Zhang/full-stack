const Persons = ({ persons, filter, clickDelete }) => {
  return (
    <div>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
            <button
              type="submit"
              onClick={() => {
                clickDelete(person.id);
              }}
            >
              delete
            </button>
          </p>
        ))}
    </div>
  );
};

export default Persons;
