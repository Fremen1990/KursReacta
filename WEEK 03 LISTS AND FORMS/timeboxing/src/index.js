import React from "react";
import ReactDOM from "react-dom";
import uuid from "uuid";

import Clock from "./components/Clock";

function TimeboxEditor(props) {
  const {
    title,
    totalTimeInMinutes,
    isEditable,
    onTitleChange,
    onTotalTimeInMinutesChange,
    onConfirm,
  } = props;
  return (
    <div className={`TimeboxEditor ${isEditable ? "" : "inactive"}`}>
      <label>
        What are you doing:
        <input disabled={!isEditable} value={title} onChange={onTitleChange} />
      </label>
      <label>
        How much time you want to spend for that:
        <input
          disabled={!isEditable}
          value={totalTimeInMinutes}
          onChange={onTotalTimeInMinutesChange}
        />
      </label>
      <button onClick={onConfirm} disabled={!isEditable}>
        Accept changess
      </button>
    </div>
  );
}

function ProgressBar({ className = "", percent = 0, trackRemaining = true }) {
  return (
    <>
      <div className={"ProgressBar " + className}>
        <div
          style={{ width: `${percent}%` }}
          // style="width: 10%;"
          // style={trackRemaining ? { float: "left" } : { float: "right" }}
        ></div>
      </div>
    </>
  );
}

class CurrentTimebox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRunning: false,
      isPaused: false,
      pausesCaunt: 0,
      elapsedTimeInSeconds: 0,
    };

    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.togglePause = this.togglePause.bind(this);
  }

  handleStart(event) {
    console.log("start click");

    this.setState({
      isRunning: true,
      isPaused: false,
      pausesCaunt: 0,
      // elapsedTimeInSeconds: 15 * 60 + 25,
    });

    this.startTimer();
  }

  handleStop(event) {
    console.log("stop click");

    this.setState({
      isRunning: false,
      isPaused: false,
      elapsedTimeInSeconds: 0,
    });

    this.stopTimer();
  }

  startTimer() {
    this.intervalID = window.setInterval(
      () => {
        this.setState((prevState) => ({
          elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.1,
        }));
      },

      100
    );
  }

  stopTimer() {
    window.clearInterval(this.intervalID);
  }

  togglePause() {
    console.log("toggle pause");

    this.setState(function (prevState) {
      const isPaused = !prevState.isPaused;
      if (isPaused) {
        this.stopTimer();
      } else if (!isPaused) {
        this.startTimer();
      }
      return {
        isPaused,
        pausesCaunt: isPaused
          ? prevState.pausesCaunt + 1
          : prevState.pausesCaunt,
      };
    });
  }

  render() {
    const {
      isRunning,
      isPaused,
      pausesCaunt,
      elapsedTimeInSeconds,
    } = this.state;

    const { title, totalTimeInMinutes, isEditable, onEdit } = this.props;

    const totalTimeInSeconds = totalTimeInMinutes * 60;
    const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
    const minutesLeft = Math.floor(timeLeftInSeconds / 60);
    const secondsLeft = Math.floor(timeLeftInSeconds % 60);
    const progressInPercent = (elapsedTimeInSeconds / totalTimeInSeconds) * 100;

    return (
      <div className={`CurrentTimebox ${isEditable ? "inactive" : ""} `}>
        <h1>{title}</h1>
        <Clock
          minutes={minutesLeft}
          seconds={secondsLeft}
          className={isPaused ? "inactive" : ""}
        />
        <ProgressBar
          percent={progressInPercent}
          className={isPaused ? "inactive" : ""}
        />
        <button onClick={onEdit} disabled={isEditable}>
          Edit
        </button>
        <button onClick={this.handleStart} disabled={isRunning}>
          Start
        </button>
        <button onClick={this.handleStop} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={this.togglePause} disabled={!isRunning}>
          {isPaused ? "Continue" : "Pause"}
        </button>
        How many breaks: {pausesCaunt}
      </div>
    );
  }
}

class EditableTimebox extends React.Component {
  state = {
    title: "Learning React to PRO level! :) ",
    totalTimeInMinutes: 25,
    isEditable: true,
  };

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  handleTotalTimeInMinutesChange = (event) => {
    this.setState({ totalTimeInMinutes: event.target.value });
  };

  handleConfirm = () => {
    this.setState({ isEditable: false });
  };

  handleEdit = () => {
    this.setState({ isEditable: true });
  };

  render() {
    const { title, totalTimeInMinutes, isEditable } = this.state;

    return (
      <>
        <TimeboxEditor
          title={title}
          totalTimeInMinutes={totalTimeInMinutes}
          isEditable={isEditable}
          onConfirm={this.handleConfirm}
          onTitleChange={this.handleTitleChange}
          onTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}
        />
        <CurrentTimebox
          isEditable={isEditable}
          totalTimeInMinutes={totalTimeInMinutes}
          title={title}
          onEdit={this.handleEdit}
        />
      </>
    );
  }
}

class TimeboxCreator extends React.Component {
  constructor(props) {
    super(props);
    this.titleInput = React.createRef();
    this.totalTimeInMinutesInput = React.createRef();
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onCreate({
      id: uuid.v4(),
      title: this.titleInput.current.value,
      totalTimeInMinutes: this.totalTimeInMinutesInput.current.value,
    });
    this.titleInput.current.value = "";
    this.totalTimeInMinutesInput.current.value = "";
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="TimeboxCreator">
        <label>
          What are you doing:
          <input ref={this.titleInput} type="text" />
        </label>
        <label>
          How much time you want to spend for that:
          <input ref={this.totalTimeInMinutesInput} type="number" />
        </label>
        <button>Add Timebox</button>
      </form>
    );
  }
}

class TimeboxList extends React.Component {
  state = {
    timeboxes: [
      { id: "a", title: "Learning lists", totalTimeInMinutes: 25 },
      { id: "b", title: "Learning forms etc", totalTimeInMinutes: 10 },
      { id: "c", title: "Learning components", totalTimeInMinutes: 15 },
      { id: "d", title: "Doing homework", totalTimeInMinutes: 25 },
    ],
  };

  addTimebox = (timebox) => {
    this.setState((prevState) => {
      const timeboxes = [timebox, ...prevState.timeboxes];
      return { timeboxes };
    });
  };

  removeTimebox(indexToRemove) {
    this.setState((prevState) => {
      const timeboxes = prevState.timeboxes.filter(
        (timebox, index) => index !== indexToRemove
      );
      return { timeboxes };
    });
  }

  updateTimebox = (indexToUpdate, updatedTimebox) => {
    this.setState((prevState) => {
      const timeboxes = prevState.timeboxes.map((timebox, index) =>
        index === indexToUpdate ? updatedTimebox : timebox
      );

      return { timeboxes };
    });
  };

  handleCreate = (createdTimebox) => {
    this.addTimebox(createdTimebox);
  };

  render() {
    return (
      <>
        <TimeboxCreator
          onCreate={this.handleCreate}
          onUpdate={this.handleUpdate}
        />
        {this.state.timeboxes.map((timebox, index) => (
          <Timebox
            key={timebox.id}
            title={timebox.title}
            totalTimeInMinutes={timebox.totalTimeInMinutes}
            onDelete={() => this.removeTimebox(index)}
            onEdit={() => {
              this.updateTimebox(index, {
                ...timebox,
                title: "TIMEBOX UPDATER COMPONENT",
              });
            }}
          />
        ))}
      </>
    );
  }
}

function Timebox({ title, totalTimeInMinutes, onDelete, onEdit }) {
  return (
    <div className="Timebox">
      <h3>
        {title} - {totalTimeInMinutes} min.
      </h3>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onEdit}>Edit</button>
      <input />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <TimeboxList />
      <EditableTimebox />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
