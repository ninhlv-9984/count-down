import React, { Component }  from 'react';
import Unsplash, { toJson } from 'unsplash-js';
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
  }

  componentDidMount() {
    this.updateTimer();
    this.updateBackground()
  }

  updateTimer() {
    setInterval(() => {
      const newDate = new Date();
      const remainTimeInDay = this.getRemainTimeInDay(newDate);
      const remainDayOfTheYear = this.getRemainDayInYear();
      this.setState({
        isLoaded: true,
        currentTime: newDate,
        remainTimeInDay: remainTimeInDay,
        remainTimeInYear: remainDayOfTheYear
      })
    }, 1000)
  }

  updateBackground() {
    const unsplash = new Unsplash({ accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY, secret: process.env.REACT_APP_UNSPLASH_SECRET_KEY })
    const page = Math.round(Math.random() * 50)
    unsplash.search.photos("peaceful", page, 10, {orientation: "portrait"})
      .then(toJson)
      .then(json => {
        const result = json.results;
        const maxWidth = Math.max.apply(null, result.map(o => o.width));
        const lagrestImage = result.filter(image => image.width === maxWidth);
        document.body.style.backgroundImage = `url(${lagrestImage[0].urls.full})`
      })
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
          <div className="text">{ isLoaded && 'Remain day of the this year:' }</div>
          <div className="date-time">
            { remainTimeInYear }
          </div>
        </div>
      </div>
    )
  }
}

export default Timer;
