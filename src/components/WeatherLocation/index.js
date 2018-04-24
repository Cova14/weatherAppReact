import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import Location from './Location';
import WeatherData from './WeatherData';
import transformWeather from '../../services/transformWeather';
import './styles.css';

const api_key = '05f6b1bc88c3c2f57908a0003b934318';
const url = 'http://api.openweathermap.org/data/2.5/weather';



class WeatherLocation extends Component {

    constructor({ city }) {
      super();
      this.state = {
          city,
          data: null
      };

      console.log('constructor');
    }

    handleUpdateClick = () => {
      const { city } = this.state;
      const api_weather = `${url}?q=${city}&appid=${api_key}`;
      fetch(api_weather).then( data => {
          return data.json();
      }).then( weather_data => {
          const data = transformWeather(weather_data);
          this.setState({ data });
      });
    }

    componentWillMount() {
      this.handleUpdateClick();
    }

    render = () => {
      console.log('render');

      const { city, data } = this.state;
      return(
        <div className='weatherLocationContainer'>
            <Location city={city}/>
            {data ? <WeatherData data={data}/> :
            <CircularProgress size={60} thickness={5} />}
        </div>
      );
    };
};

WeatherLocation.propTypes = {
  city: PropTypes.string,
}

export default WeatherLocation;
