const PersonsForm = ({ name, number, nameChange, numberChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input onChange={nameChange} value={name} />
      </div>
      <div>
        number: <input onChange={numberChange} value={number} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonsForm;
