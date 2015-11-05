import React from 'react';
import ReactDOM from 'react-dom';

var UserWeekRuns = React.createClass({
  getInitialState: function() {
    this.state = {workouts: []};
    return this.state;
  },

  componentDidMount: function() {
    var request = this.props.source
    $.ajax({
      url: request,
      dataType: 'jsonp',
      data: {
        access_token: "c8ffe7c4c71de2ce6a87abcd1ce8c1b3813b2e64",
        per_page: this.props.workouts
      },
      type: "GET",
      success: this.loadWorkouts
    });
  },

  loadWorkouts: function(data) {
    this.setState({
      workouts: data.reverse() // does this need a this.workouts?
    })
  },

  render: function() {
    var runs = []
    console.log("this.state.workouts", this.state.workouts);
    this.state.workouts.forEach(function(workout) {
      var miles = (workout.distance * 0.000621371).toFixed(1);
      var barHeight = miles * 10;
      var month = moment(workout.start_date_local).format('MMM');
      var day = moment(workout.start_date_local).format('D');

      runs.push(<div className="workout"><span className="distance-text">{miles}</span><div style={{height: barHeight}} className="distance"></div> <span className="date">{month}<br/>{day}</span></div>)
    });
    return (
      <div className="strava-card">
        {runs}
      </div>
    )
  }
})

ReactDOM.render(<UserWeekRuns source="https://www.strava.com/api/v3/athlete/activities" workouts="8" />, document.getElementById('content'));
