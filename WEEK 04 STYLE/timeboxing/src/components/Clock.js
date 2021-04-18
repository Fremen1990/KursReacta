import React from "react";

function Clock({
  className = "",
  hours = 0,
  minutes = 0,
  seconds = 0,
  miliseconds = 0,
}) {
  // const { minutes, seconds } = props;

  // if (minutes > 59) {
  //   hours = Math.floor(minutes / 60);
  //   minutes = minutes - hours * 60;
  // } else if (minutes < 0) {
  //   minutes = 0;
  // }

  // if (seconds > 59) {
  //   minutes = Math.floor(seconds / 60);
  //   seconds = seconds - minutes * 60;
  // } else if (seconds < 0) {
  //   seconds = 0;
  // }

  // if (miliseconds > 999) {
  //   seconds = Math.floor(miliseconds / 1000);
  //   miliseconds = miliseconds - seconds * 1000;
  // } else if (miliseconds < 0) {
  //   miliseconds = 0;
  // }

  if (minutes < 9) {
    minutes = `0${+minutes}`;
  }

  if (seconds < 9) {
    seconds = `0${seconds}`;
  }

  // if (hours < 9) {
  //   hours = `0${hours}`;
  // }

  // if (miliseconds < 9) {
  //   miliseconds = `00${miliseconds}`;
  // } else if ((miliseconds < 99) & (miliseconds > 9)) {
  //   miliseconds = `0${miliseconds}`;
  // }

  return (
    <h2 className={"Clock " + className}>
      Time left: {minutes}:{seconds}
    </h2>
  );
}

export default Clock;
