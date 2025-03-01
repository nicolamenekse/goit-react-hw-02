import React, { useEffect, useState } from "react";
import "./App.css";

const Description = () => {
  return (
    <div className="description">
      <h1>Sip Happens Café</h1>
      <p>
        Please leave your feedback about our service by selecting one of the
        options below
      </p>
    </div>
  );
};

const Options = ({ updateFeedBack, resetFeedBack, total }) => {
  return (
    <div className="options">
      <button onClick={() => updateFeedBack("good")}>Good</button>
      <button onClick={() => updateFeedBack("bad")}>Bad</button>
      <button onClick={() => updateFeedBack("neutral")}>Neutral</button>
      {total > 0 && <button onClick={resetFeedBack}>Reset</button>}
    </div>
  );
};

const FeedBack = ({ good, bad, neutral, total, average }) => {
  return (
    <div className="feedBack">
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>Total: {total}</p>
      <p>Positive: {average}%</p>
    </div>
  );
};

const Notification = () => {
  return <h3 className="notification">No feedback yet</h3>;
};

export default function App() {
  const [good, setGood] = useState(() => {
    const savedGood = window.localStorage.getItem("good");
    return savedGood ? JSON.parse(savedGood) : 0;
  });
  const [bad, setBad] = useState(() => {
    const savedBad = window.localStorage.getItem("bad");
    return savedBad ? JSON.parse(savedBad) : 0;
  });

  const [neutral, setNeutral] = useState(() => {
    const savedNeutral = window.localStorage.getItem("neutral");
    return savedNeutral ? JSON.parse(savedNeutral) : 0;
  });

  useEffect(() => {
    localStorage.setItem("good", JSON.stringify(good));
    localStorage.setItem("bad", JSON.stringify(bad));
    localStorage.setItem("neutral", JSON.stringify(neutral));
  }, [good, bad, neutral]);

  const updateFeedBack = (type) => {
    if (type === "good") setGood((good) => good + 1);
    if (type === "bad") setBad((bad) => bad + 1);
    if (type === "neutral") setNeutral((neutral) => neutral + 1);
  };

  const resetFeedBack = () => {
    setGood(0);
    setBad(0);
    setNeutral(0);
  };

  const total = good + bad + neutral;

  const average = total ? Math.round((good / total) * 100) : 0;

  return (
    <div className="App">
      <Description />
      <Options
        updateFeedBack={updateFeedBack}
        resetFeedBack={resetFeedBack}
        total={total}
      />
      {total > 0 ? (
        <FeedBack
          good={good}
          bad={bad}
          neutral={neutral}
          total={total}
          average={average}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
