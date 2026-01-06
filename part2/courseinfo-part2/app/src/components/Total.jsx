const Total = ({ parts }) => {
  let sum = 0;
  for (let i = 0; i < parts.length; i++) {
    sum += parts[i].exercises;
  }
  return <strong>Number of exercises: {sum}</strong>;
};

export default Total;
