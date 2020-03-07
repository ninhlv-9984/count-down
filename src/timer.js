import React, { Component }  from 'react';
import './timer.css'


class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: null,
      remainTimeInDay: null,
      remainTimeInYear: null
    }

    this.updateTimer = this.updateTimer.bind(this);
    this.getRemainTimeInDay = this.getRemainTimeInDay.bind(this);
    this.getRemainDayInYear = this.getRemainDayInYear.bind(this);
  }

  componentDidMount() {
    this.updateTimer();
  }

  updateTimer() {
    setInterval(() => {
      const newDate = new Date();
      const remainTimeInDay = this.getRemainTimeInDay(newDate);
      const remainDayOfTheYear = this.getRemainDayInYear();
      this.setState({
        currentTime: newDate,
        remainTimeInDay: remainTimeInDay,
        remainTimeInYear: remainDayOfTheYear
      })
    }, 1000)
  }

  getRemainTimeInDay(newDate) {
    const endTimeOfDate = (new Date()).setHours(23, 59, 59);
    const remainTimeInSeconds = (endTimeOfDate - newDate) / 1000;
    const remainTime = new Date(Date.UTC(0, 0, 0, 0, 0, 0));
    remainTime.setSeconds(remainTimeInSeconds);

    return remainTime.toISOString().substr(11, 8);
  }

  getRemainDayInYear() {
    const currentTime = new Date();
    const currentYear = currentTime.getFullYear();
    const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59);
    const remainingDays = Math.floor((endOfYear - currentTime) / 1000 / 3600 / 24);
    return remainingDays;
  }

  render() {
    const { currentTime, remainTimeInDay, remainTimeInYear } = this.state;
    return (
      <div className="timer">
        <h1>Count Down</h1>
        <div className="time-group">
        <div className="text">Current Time: </div>
        <div className="current-time">
          <div className="date-time">
            { currentTime && currentTime.toLocaleDateString()}
          </div>
          <div className="date-time current-hour">
            { currentTime && currentTime.toLocaleTimeString()}
          </div>
        </div>
        </div>

        <div className="time-group">
          <div className="text">Remain Time of Today:</div>
          <div className="date-time">
            { remainTimeInDay }
          </div>
        </div>

        <div className="time-group">
          <div className="text">Remain day of the this year:</div>
          <div className="date-time">
            { remainTimeInYear }
          </div>
        </div>
      </div>
    )
  }
}

export default Timer;
