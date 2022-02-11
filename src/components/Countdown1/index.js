import React, { Component } from "react";

class Countdown1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      moment: 0,
      message: "",
      isReady: false
    };
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }
  componentWillUpdate(props, state) {
    if (props.moment !== state.moment) {
      this.setState({ moment: this.props.moment });
    }
    return null;
  }
  calculateTimeLeft() {
    var startDateVal = new Date(this.state.moment);
    var currentDateVal = new Date();
    var difference = startDateVal.getTime() - currentDateVal.getTime();

    if (difference > 0) {
      this.setState({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isReady: true
      });
    }
  }
  convertToSeconds = (days, hours, minutes, seconds) => {
    return seconds + minutes * 60 + hours * 60 * 60 + days * 60 * 60 * 24;
  };

  startTimer = () => {
    this.timer = setInterval(this.countDown, 1000);
  };

  countDown = () => {
    this.calculateTimeLeft();
    const { days, hours, minutes, seconds } = this.state;
    let c_seconds = this.convertToSeconds(days, hours, minutes, seconds);
    console.log("sec" + c_seconds);

    if (c_seconds > 0 && this.state.isReady) {
      seconds
        ? this.setState({ seconds: seconds - 1 })
        : this.setState({ seconds: 59 });

      if (c_seconds % 60 === 0 && minutes) {
        this.setState({ minutes: minutes - 1 });
      }
      if (!minutes && hours) {
        this.setState({ minutes: 59 });
      }
      if (c_seconds % 3600 === 0 && hours) {
        this.setState({ hours: hours - 1 });
      }
    } else if (c_seconds <= 0 && this.state.isReady) {
      this.setState({ message: this.props.readyMessage });
      this.stopTimer();
    } else if (c_seconds <= 0 && !this.state.isReady) {
      this.setState({ message: this.props.errorMessage });
      this.stopTimer();
    }
  };

  stopTimer = () => {
    clearInterval(this.timer);
  };

  resetTimer = () => {
    this.setState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      moment: 0
    });
  };
  setMessageHeader = (message) => {
    if (message !== "") {
      return <h5>{message}</h5>;
    }
  };
  addLeadingZeros(value) {
    value = String(value);
    while (value.length < 2) {
      value = "0" + value;
    }
    return value;
  }

  render() {
    const { days, hours, minutes, seconds } = this.state;

    return (
      <div>
        <p>Select the date and time and press Start</p>
        <div>
          <button onClick={this.startTimer} className="start">
            start
          </button>
          <button onClick={this.stopTimer} className="stop">
            stop
          </button>
          <button onClick={this.resetTimer} className="reset">
            reset
          </button>
        </div>
        <h2>
          {" "}
          Timer{" "}
          {days > 0 ? (
            <span> {this.addLeadingZeros(days)} Days, </span>
          ) : null}{" "}
          {this.addLeadingZeros(hours)}: {this.addLeadingZeros(minutes)} :{" "}
          {this.addLeadingZeros(seconds)}{" "}
        </h2>
        {this.state.message !== "" ? (
          <h3 style={{ color: "red" }}> {this.state.message} </h3>
        ) : null}
      </div>
    );
  }
}

export default Countdown1;
