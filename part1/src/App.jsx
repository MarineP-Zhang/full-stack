const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <div>
      <Part name={props.name[0]} num={props.num[0]} />
      <Part name={props.name[1]} num={props.num[1]} />
      <Part name={props.name[2]} num={props.num[2]} />
    </div>
  );
};

const Total = (props) => {
  let sum = 0;
  for (let i = 0; i < props.data.length; i++) {
    sum += props.data[i];
  }
  return <p>Number of exercise: {sum}</p>;
};

const Part = (props) => {
  return (
    <p>
      {props.name}: {props.num}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Foundamentals of React";
  const exercise1 = 10;
  const part2 = "Using props to pass data";
  const exercise2 = 7;
  const part3 = "State of a component";
  const exercise3 = 14;

  return (
    <>
      <Header course={course} />
      <Content
        name={[part1, part2, part3]}
        num={[exercise1, exercise2, exercise3]}
      />
      <Total data={[exercise1, exercise2, exercise3]} />
    </>
  );
};

export default App;
