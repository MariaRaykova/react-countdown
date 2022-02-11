import React from "react";
import "./styles.css";
import Countdown from "./components/Countdown1";
import Countdown2 from "./components/Countdown2";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      moment: 0,
      errorMessage: "Date and time should be in the future",
      readyMessage: "Time's up",
      momentDay: 0,
      momentYear: 0
    };
  }
  componentWillMount() {
    var today = new Date();
    today.setHours(23);
    today.setMinutes(59);
    today.setSeconds(59);
    this.setState({
      momentDay: today
    });
    var endOfTheYear = new Date();
    endOfTheYear.setMonth(11);
    endOfTheYear.setDate(31);
    endOfTheYear.setHours(23);
    endOfTheYear.setMinutes(59);
    endOfTheYear.setSeconds(59);
    this.setState({
      momentYear: endOfTheYear
    });
  }
  inputHandler = (e) => {
    var dateString = e.target.value;
    this.setState({
      moment: dateString
    });
  };
  render() {
    return (
      <div className="App">
        <h1>Countdown Subtask 1</h1>
        <div className="inputGroup">
          <input
            type="datetime-local"
            name="start"
            onChange={this.inputHandler}
          />
        </div>
        <div>
          <div>
            <Countdown
              moment={this.state.moment}
              errorMessage={this.state.errorMessage}
              readyMessage={this.state.readyMessage}
            />
            <h1>Countdown Subtask 2</h1>
            <Countdown2
              moment={this.state.momentDay}
              errorMessage={this.state.errorMessage}
              readyMessage="The day has ended"
            />
            <Countdown2
              moment={this.state.momentYear}
              errorMessage={this.state.errorMessage}
              readyMessage="The year has ended"
            />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
