import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";
import "bootswatch/journal/bootstrap.css";


class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData:null
    };
  }
  componentDidMount(){
    const name = this.props.name;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" + name + 
    "&appid=748aa894b12b957e3c059bf501cb8f6c&units=metric";
    fetch(URL).then(res => res.json()).then(json=> {
      this.setState({ weatherData : json});
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    if(!weatherData) return <div>Loading</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
          <p>Current: {weatherData.main.temp}°</p>
          <p>High: {weatherData.main.temp_max}°</p>
          <p>Low: {weatherData.main.temp_min}°</p>
          <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>
      </div>
      );
  }
}

const PLACES = [
{ name: "Singapore", zip:"546080"},
{ name: "Bali", zip:"80361"},
{ name: "Kuala Lumpur", zip:"50400"},
{ name: "Gold Coast", zip:"4217"}
]

class App extends Component {
  constructor(){
    super();
    this.state={
      activePlace:0,
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              React Simple Weather App
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>
            <Col md={4} sm={4}>
              <h3>Select a city</h3>
              <Nav
                bsStyle="pills"
                stacked
                activeKey={activePlace}
                onSelect={index => {
                  this.setState({ activePlace: index });
                }}
              >
                {PLACES.map((place, index) => (
              <NavItem key={index} eventKey={index}>{place.name}</NavItem>
                ))}
              </Nav>
            </Col>
            <Col md={8} sm={8}>
              <WeatherDisplay key={activePlace} name={PLACES[activePlace].name} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;