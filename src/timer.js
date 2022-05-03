import React, { Component }  from 'react';
import './timer.css'
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      currentTime: null,
      remainTimeInDay: null,
      remainTimeInYear: null
    }

    this.updateTimer = this.updateTimer.bind(this);
    this.getRemainTimeInDay = this.getRemainTimeInDay.bind(this);
    this.getRemainDayInYear = this.getRemainDayInYear.bind(this);
    this.updateBackground = this.updateBackground.bind(this);
    this.calcTime = this.calcTime.bind(this);
  }

  componentWillUnmount() {
    this.updateTimer();
  }

  componentDidMount() {
    this.updateTimer();
    this.updateBackground()
  }

  updateTimer() {
    this.calcTime()
    setInterval(() => {
      this.calcTime();
    }, 1000)
  }

  calcTime() {
    const newDate = new Date();
    const remainTimeInDay = this.getRemainTimeInDay(newDate);
    const remainDayOfTheYear = this.getRemainDayInYear();
    this.setState({
      isLoaded: true,
      currentTime: newDate,
      remainTimeInDay: remainTimeInDay,
      remainTimeInYear: remainDayOfTheYear
    })
  }

  updateBackground() {
    document.body.style.backgroundImage = "url(/bgg.jpeg)";
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
    const endOfYear = new Date(currentYear, 9, 28, 23, 59, 59);
    const remainingDays = Math.floor((endOfYear - currentTime) / 1000 / 3600 / 24);
    return remainingDays;
  }

  render() {
    const { isLoaded ,currentTime, remainTimeInDay, remainTimeInYear } = this.state;
    return (
      <div className="timer">
        <h1>Count Down</h1>
        <div className="time-group">
        <div className="text">{isLoaded && 'Current Time: '}</div>
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
          <div className="text">{ isLoaded && 'Remain Time of Today:' }</div>
          <div className="date-time">
            { remainTimeInDay }
          </div>
        </div>

        <div className="time-group">
          <div className="text">{ isLoaded && 'Remain day for first 6 months target:' }</div>
          <div className="date-time">
            { remainTimeInYear }
          </div>
        </div>
      </div>
    )
  }
}

export default Timer;
