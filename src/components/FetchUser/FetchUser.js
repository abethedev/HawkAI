import React, { Component } from "react";

export default class FetchRandomUser extends Component {
  state = {
    loading: true,
    person: null,
    lat: 0,
    long: 0,
  };

  async componentDidMount() {
    const url = "https://api.randomuser.me/";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ person: data.results[0], loading: false });
    this.setState({ lat: this.state.person.location.coordinates.latitude });
    this.setState({ long: this.state.person.location.coordinates.longitude });
  }

  render() {
    var { lat, long } = this.state;

    return (
      <div>
        {this.state.loading || !this.state.person ? (
          <div>loading...</div>
        ) : (
          <div>
            {lat}
            <br></br>
            {long}
          </div>
        )}
      </div>
    );
  }
}
