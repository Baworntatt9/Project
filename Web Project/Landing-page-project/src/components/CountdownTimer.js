import React, { useState, useEffect } from "react";

const CountdownTimer = ({ initialTime }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  return (
    <div>
      <h2>Flash Sale Countdown</h2>
      <p>{timeLeft > 0 ? formatTime(timeLeft) : "Sale Ended!"}</p>
    </div>
  );
};

export default CountdownTimer;
