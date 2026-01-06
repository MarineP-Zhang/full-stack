import StatisticsLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
  let sum = good + neutral + bad;
  if (sum === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={sum} />
        <StatisticsLine text="average" value={(good - bad) / sum} />
        <StatisticsLine text="postive" value={good / sum} />
      </table>
    </div>
  );
};

export default Statistics;
