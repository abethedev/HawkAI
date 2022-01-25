import React, { createRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import L from "leaflet";
import "./App.css";
import { Component } from "react/cjs/react.production.min";
import { useEffect, useState } from "react";
import { getElementError } from "@testing-library/react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: [],
      positions: [52.632, -1.13],
      forest1: [],
      forest2: [],
      forest3: [],
    };
  }

  componentDidMount() {
    fetch(
      "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10"
    )
      .then((res) => res.json())

      .then((json) => {
        this.setState({
          item: json,
          forest1: json,
          forest2: json,
          forest3: json,
        });
      });
  }

  handleCallback = (childData) => {
    console.log(childData, "data from child");
    this.setState({ positions: childData });
  };

  render() {
    var {
      item,
      positions,
      forest1,
      forest2,
      forest3,
      clicked = false,
    } = this.state;
    item = item.slice(0, 25);
    forest1 = forest1.slice(0, 10);
    forest2 = forest2.slice(11, 20);
    forest3 = forest3.slice(21, 30);

    function LocationMarker() {
      const map = useMapEvents({
        click() {
          map.locate();
        },
        locationfound(e) {
          map.flyTo(positions, 13);
        },
      });
      return null;
    }

    return (
      <div>
        <Navbar />
        <div id="content" className="App">
          <Sidebar parentCallback={this.handleCallback}></Sidebar>
          <MapContainer
            center={[positions[0], positions[1]]}
            zoom={14}
            scrollWheelZoom={true}
          >
            {/* <button id="trigger">
              <LocationMarker></LocationMarker>click
            </button> */}
            <LocationMarker></LocationMarker>

            <LayersControl
              // parentCallback={this.handleCallback}
              position="topright"
            >
              <LayersControl.BaseLayer checked name="Base Map">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>
              {forest3.map((item) => (
                <LayersControl.Overlay name={item.location.street.name}>
                  <LayerGroup>
                    {forest3.map((forest) => (
                      <Marker
                        key={forest.id}
                        position={[
                          item.location.latitude,
                          item.location.longitude,
                        ]}
                      >
                        <Popup>
                          {"latitude: " +
                            positions[0] +
                            " longitude: " +
                            positions[1]}
                        </Popup>
                      </Marker>
                    ))}
                  </LayerGroup>
                </LayersControl.Overlay>
              ))}
              {/* <LayersControl.Overlay checked name={item.location.street.name}>
                <LayerGroup>
                  {forest1.map((item) => (
                    <Marker
                      key={item.id}
                      position={[
                        item.location.latitude,
                        item.location.longitude,
                      ]}
                    >
                      <Popup>
                        {"latitude: " +
                          positions[0] +
                          " longitude: " +
                          positions[1]}
                      </Popup>
                    </Marker>
                  ))}
                </LayerGroup>
              </LayersControl.Overlay>

              <LayersControl.Overlay checked name="Forest 2">
                <LayerGroup>
                  {forest2.map((item) => (
                    <Marker
                      key={item.id}
                      position={[
                        item.location.latitude,
                        item.location.longitude,
                      ]}
                    >
                      <Popup>
                        {"latitude: " +
                          positions[0] +
                          " longitude: " +
                          positions[1]}
                      </Popup>
                    </Marker>
                  ))}
                </LayerGroup>
              </LayersControl.Overlay>

              <LayersControl.Overlay checked name="Forest 3">
                <LayerGroup>
                  {forest3.map((item) => (
                    <Marker
                      key={item.id}
                      position={[
                        item.location.latitude,
                        item.location.longitude,
                      ]}
                    >
                      <Popup>
                        {"latitude: " +
                          positions[0] +
                          " longitude: " +
                          positions[1]}
                      </Popup>
                    </Marker>
                  ))}
                </LayerGroup>
              </LayersControl.Overlay> */}

              {/* <LocationFinder /> */}
            </LayersControl>
            <Marker position={[positions[0], positions[1]]}>
              <Popup>
                {"latitude: " + positions[0] + " longitude: " + positions[1]}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    );
  }
}
export default App;
