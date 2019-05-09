import React, {Component} from 'react';
import DisplayData from './displayData.js';
import Forecast from './forecast.js';
import Details from './details.js';



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherLocation: 'Chicago',
            temp: '',
            tempC: '',
            tempF: '',
            location: '',
            weather: '',
            unit: '',
            tempDayKelv: [],
            tempDay: [],
            tempDayC: [],
            tempDayF: [],
            tempDayWeather: [],
            pressure: '',
            humidity: '',
            temp_min: '',
            temp_minC: '',
            temp_minF: '',
            temp_max: '',
            temp_maxC: '',
            temp_maxF: '',
            wind_speed: '',
            wind_deg:'',
            sunrise: '',
            sunset: '',
            placeholder: "Enter City name and press Enter",
            latitude: '43.474731',
            longitude: '-89.744186',
            currentWeatherAPIcity: 'https://api.openweathermap.org/data/2.5/weather?q=',
            forecastWeatherAPIcity: 'https://api.openweathermap.org/data/2.5/forecast?q='
        };
        
        this.changeLocation = this.changeLocation.bind(this);
        this.switchUnits = this.switchUnits.bind(this);
        this.forecastTemperature = this.forecastTemperature.bind(this);
        this.convertToC = this.convertToC.bind(this);
        this.convertToF = this.convertToF.bind(this);
        this.forecastTemperature = this.forecastTemperature.bind(this);
 
    }

    componentWillMount() {
        this.getData(this.state.currentWeatherAPIcity, this.state.forecastWeatherAPIcity, this.state.weatherLocation); 
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.weatherLocation !== this.state.weatherLocation  || prevState.units !== this.state.units) {
            this.temperature();
            this.getData(this.state.currentWeatherAPIcity, this.state.forecastWeatherAPIcity, this.state.weatherLocation);
        }
        
    }

    getData(currentW, forecastW, weatherL){ //gets weather data from api
        const key = process.env.REACT_APP_WEATHER_API_KEY; //gets data from .env file
        let current = currentW + weatherL +'&APPID=' + key;
        let forecast = forecastW + weatherL +'&APPID=' + key;
        
        fetch(current)   //gets current weather data
        .then(response => response.json()) // Convert data to json
        .then(data => this.setState({
            temp: Math.round(parseFloat(data.main.temp)-273.15) + '\xBAC',
            tempC: Math.round(parseFloat(data.main.temp)-273.15) + '\xBAC',
            tempF:Math.round(((parseFloat(data.main.temp)-273.15)*1.8)+32) + '\xBAF',
            location: data.name,
            weather: data.weather[0].main,
            pressure: data.main.pressure +' hPa',
            humidity: data.main.humidity+'%',
            temp_min: Math.round(parseFloat(data.main.temp_min)-273.15) + '\xBAC',
            temp_minC: Math.round(parseFloat(data.main.temp_min)-273.15) + '\xBAC',
            temp_minF: Math.round(((parseFloat(data.main.temp_min)-273.15)*1.8)+32) + '\xBAF',
            temp_max: Math.round(parseFloat(data.main.temp_max)-273.15) + '\xBAC',
            temp_maxC: Math.round(parseFloat(data.main.temp_max)-273.15) + '\xBAC',
            temp_maxF: Math.round(((parseFloat(data.main.temp_max)-273.15)*1.8)+32) + '\xBAF',
            wind_speed: data.wind.speed +' m/s',
            wind_deg: data.wind.deg +'\xBA',
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset

        })).catch(function(error) {
            alert("Can't find this location, Try Again");   
        });
        
        fetch(forecast)  //gets forecast data
        .then(response => response.json()) // Convert data to json
        .then(data => this.setState({

            tempDayKelv: this.forecastTemperature(data),
            tempDay: this.convertToC(this.forecastTemperature(data)),
            tempDayC: this.convertToC(this.forecastTemperature(data)),
            tempDayF: this.convertToF(this.forecastTemperature(data)),
            tempDayWeather: this.forecastWeather(data)
            
        }));
        
    }

    forecastTemperature(temp) { //gets temperature for next 5 days from API and saves it to array
        let i;
        let arr = [];
            for (i = 0; i < 5; i++) {
                arr = arr.concat(temp.list[i].main.temp);
            }
            return arr;
    }

    forecastWeather(weather){ //gets weather condition for next 5 days from API and saves it to array
        let i;
        let arr = [];
            for (i = 1; i < 6; i++) {
                arr = arr.concat((weather.list[i].weather[0].main));
            }
            return arr;
    }

    changeLocation(e){ //takes data from input and saves new location to state
        e.preventDefault();
       if(this._inputElement.value !== "") {
           this.setState({
               weatherLocation: this._inputElement.value
           })
       } 
    }

    switchUnits(e){  
        e.preventDefault();
        if(this.state.unit === 'C'){
            this.setState({
                unit: 'F'
            })
            this.temperature();
        } else {
            this.setState({
                unit: 'C'
            })
            this.temperature();
        }
    }

    convertToC(kelv){  //converting default API temperature (kelvin) to celsius
        for(let i = 0; i<5; i++){
            console.log(kelv[i]);
            kelv[i] = Math.round(parseFloat(kelv[i])-273.15) + '\xBAC';
            console.log(kelv[i]);
        }
        return kelv;   
    }

    convertToF(kelv){ //converting default API temperature (kelvin) to farenheit
        for(let i = 0; i<5; i++){
            kelv[i] = Math.round(((parseFloat(kelv[i])-273.15)*1.8)+32) + '\xBAF';
        }
        return kelv;   
    }

    temperature(){ //switching temperature units C <=> F
        if(this.state.unit === 'C') {
            this.setState({
                temp: this.state.tempC,
                tempDay: this.state.tempDayC,
                temp_min: this.state.temp_minC,
                temp_max: this.state.temp_maxC
            })
        } else {
            this.setState({
                temp: this.state.tempF,
                tempDay: this.state.tempDayF,
                temp_min: this.state.temp_minF,
                temp_max: this.state.temp_maxF
            })
        }
    }

    
    conditionIcon(condition){ //changing weather icon according to weather data from API
        switch(condition) {
            case 'Rain':
                return require('./icons/rainy-6.svg')
            
            case 'Clear':
                return require('./icons/day.svg')

            case 'Thunderstorm':
                return require('./icons/thunder.svg')

            case 'Drizzle':
                return require('./icons/rainy-4.svg')

            case 'Snow':
                return require('./icons/snowy-6.svg')

            case 'Mist':
            return require('./icons/cloudy.svg')

            case 'Shower Rain':
                return require('./icons/rainy-7.svg')

            case 'scattered clouds':
                return require('./icons/cloudy-day-1.svg')

            case 'few clouds':
                return require('./icons/cloudy-day-2.svg')

            case 'broken clouds':
                return require('./icons/cloudy-day-3.svg')

            case 'Clouds':
                return require('./icons/cloudy.svg')

            case 'Haze':
                return require('./icons/cloudy.svg')
                
            default:
 
        }
    }

    render(){     
        return(
            <div  className="wrapper">
            
               <div className="header">
                   
                   <div className="title">WeatherApp</div>
                   <form className="location-input" onSubmit={this.changeLocation}>
                            <input
                            ref={(a) => this._inputElement = a} 
                            placeholder={this.state.placeholder}>
                        </input>
                    </form>
                    <button onClick={this.switchUnits} className='switch-units'>C|F</button>
               </div>

               <DisplayData //displaying current weather data
               units = {this.switchUnits}
               temp = {[this.state.temp]}
               location = {[this.state.location]}
               weather = {[this.state.weather]}
               forecast = 'Forecast'
               icon = {[this.conditionIcon(this.state.weather)]} 
              
               />
               
                <Forecast {...this.state} //displaying forecast weather data
                    conditionIcon1={this.conditionIcon(this.state.tempDayWeather[0])}
                    conditionIcon2={this.conditionIcon(this.state.tempDayWeather[1])}
                    conditionIcon3={this.conditionIcon(this.state.tempDayWeather[2])}
                    conditionIcon4={this.conditionIcon(this.state.tempDayWeather[3])}
                    conditionIcon5={this.conditionIcon(this.state.tempDayWeather[4])}
                />
                 
                <Details {...this.state} //displaying current weather details
                /> 
                     
            </div>
           
        )
    }

}

export default App;