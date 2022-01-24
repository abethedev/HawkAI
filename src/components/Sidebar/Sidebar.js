import React, { Component, createRef } from "react";
import App from "../../App";
import { SideItems } from "./SideItems";
import { Button } from "../buttons";
import "./Sidebar.css";

class sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tick: false,
      test: [],
      forest1: [],
      forest2: [],
      forest3: [],
      max: 25,
    };
  }

  componentDidMount() {
    fetch(
      "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10"
    )
      .then((res) => res.json())

      .then((json) => {
        this.setState({
          test: json,
          forest1: json,
          forest2: json,
          forest3: json,
        });
      });
  }

  toggleInput() {
    const isTicked = this.state.tick;
  }

  state = { clicked: false };

  handleClick = (data) => {
    // console.log(data, "event");
    this.props.parentCallback(data);
    // this.setState({ clicked: !this.state.clicked });
  };

  handleDisplay = (display) => {
    this.props.tick(display);
  };

  openPopUp(marker, id) {
    if (marker && marker.leafletElement) {
      marker.leafletElement.openPopup(id);
    }
  }

  clickAction(id, lat, lng) {
    this.setState({ marker: id, zoom: 16, center: [lat, lng] });
    this.markerRefs[id].leafletElement.openPopup();
  }

  render() {
    var { test, max, forest1, forest2, forest3, positions } = this.state;
    test = test.slice(0, max);
    forest1 = forest1.slice(0, 10);
    forest2 = forest2.slice(11, 20);
    forest3 = forest3.slice(21, 30);

    return (
      <div className={this.state.clicked ? "sidebar active" : "sidebar"}>
        {/* <div className="sidemenu-icon" onClick={this.handleClick}>
          <i
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div> */}
        <h1 className="sidebar-logo">Locations</h1>
        <div className="sideList">
          <ul>
            {test.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={
                    () =>
                      this.handleClick([
                        item.location.latitude,
                        item.location.longitude,
                        (positions = [
                          Number(item.location.latitude),
                          Number(item.location.longitude),
                        ]),
                      ])

                    // this.handleClick([
                    //   item.location.latitude,
                    //   item.location.longitude,
                    //   this.setState({
                    //     positions: [
                    //       Number(item.location.latitude),
                    //       Number(item.location.longitude),
                    //     ],
                    //   }),
                    // ])
                  }
                >
                  <div className="side-links">
                    <a>
                      {item.location.street.name}{" "}
                      <p>
                        {item.location.street.id}
                        {(item.location.latitude, item.location.longitude)}
                      </p>
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default sidebar;
