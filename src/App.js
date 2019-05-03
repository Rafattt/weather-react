import React, {Component} from 'react';
import DisplayData from './displayData.js';



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
            tempDay1: '',
            tempDay2: '',
            tempDay3: '',
            tempDay4: '',
            tempDay5: '',
            tempDay1F: '',
            tempDay1C: '',
            tempDay2F: '',
            tempDay2C: '',
            tempDay3F: '',
            tempDay3C: '',
            tempDay4F: '',
            tempDay4C: '',
            tempDay5F: '',
            tempDay5C: '',
            tempDay1Weather: '',
            tempDay2Weather: '',
            tempDay3Weather: '',
            tempDay4Weather: '',
            tempDay5Weather: '',
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
            placeholder: "Enter City name",
            latitude: '43.474731',
            longitude: '-89.744186',
            currentWeatherAPIcity: 'https://api.openweathermap.org/data/2.5/weather?q=',
            forecastWeatherAPIcity: 'https://api.openweathermap.org/data/2.5/forecast?q='
        };
        
        this.changeLocation = this.changeLocation.bind(this);
        this.switchUnits = this.switchUnits.bind(this);
        this.getTimeHM = this.getTimeHM.bind(this);
        
    }

 
    componentWillMount(){
        
    }

    componentDidMount() {
        this.getCoordinates();
        
        this.getData(this.state.currentWeatherAPIcity, this.state.forecastWeatherAPIcity, this.state.weatherLocation);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.weatherLocation !== this.state.weatherLocation  || prevState.units !== this.state.units) {
            
            this.temperature();
            this.getData(this.state.currentWeatherAPIcity, this.state.forecastWeatherAPIcity, this.state.weatherLocation);
        }
        
    }

    getCoordinates(){
        const geoLocation = 'https://cors-anywhere.herokuapp.com/https://api.ipstack.com/check?access_key=4a259666da80eb87ee33bcda027d4d57'

        fetch(geoLocation)  
        .then(response => response.json()) // Convert data to json
        .then(data => this.setState({
          latitude: data.latitude,
          longitude: data.longitude

        })).catch(function(error) {  
            console.log("Can't locate");
        });
        
        console.log('now'+this.state.longitude);
    }
    

    getData(currentW, forecastW, weatherL){
        const key = '77cbd5a8a802c2ea563adff930f81ab4';
        let current = currentW + weatherL +'&APPID=' + key;
        let forecast = forecastW + weatherL +'&APPID=' + key;
        console.log('current: '+current);
        console.log('current: '+forecast);
        

        fetch(current)  
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
        
      

        fetch(forecast)  
        .then(response => response.json()) // Convert data to json
        .then(data => this.setState({
            tempDay1: Math.round(parseFloat(data.list[1].main.temp)-273.15) + '\xBAC',
            tempDay1C: Math.round(parseFloat(data.list[1].main.temp)-273.15) + '\xBAC',
            tempDay1F:Math.round(((parseFloat(data.list[1].main.temp)-273.15)*1.8)+32) + '\xBAF',
            tempDay2: Math.round(parseFloat(data.list[2].main.temp)-273.15) + '\xBAC',
            tempDay2C: Math.round(parseFloat(data.list[2].main.temp)-273.15) + '\xBAC',
            tempDay2F:Math.round(((parseFloat(data.list[2].main.temp)-273.15)*1.8)+32) + '\xBAF',
            tempDay3: Math.round(parseFloat(data.list[3].main.temp)-273.15) + '\xBAC',
            tempDay3C: Math.round(parseFloat(data.list[3].main.temp)-273.15) + '\xBAC',
            tempDay3F:Math.round(((parseFloat(data.list[3].main.temp)-273.15)*1.8)+32) + '\xBAF',
            tempDay4: Math.round(parseFloat(data.list[4].main.temp)-273.15) + '\xBAC',
            tempDay4C: Math.round(parseFloat(data.list[4].main.temp)-273.15) + '\xBAC',
            tempDay4F:Math.round(((parseFloat(data.list[4].main.temp)-273.15)*1.8)+32) + '\xBAF',
            tempDay5: Math.round(parseFloat(data.list[5].main.temp)-273.15) + '\xBAC',
            tempDay5C: Math.round(parseFloat(data.list[5].main.temp)-273.15) + '\xBAC',
            tempDay5F:Math.round(((parseFloat(data.list[5].main.temp)-273.15)*1.8)+32) + '\xBAF',
            tempDay1Weather: (data.list[1].weather[0].main),
            tempDay2Weather: (data.list[2].weather[0].main),
            tempDay3Weather: (data.list[3].weather[0].main),
            tempDay4Weather: (data.list[4].weather[0].main),
            tempDay5Weather: (data.list[5].weather[0].main)
        }));
        
    }

    changeLocation(e){
        e.preventDefault();
       if(this._inputElement.value !== "") {
           this.setState({
               weatherLocation: this._inputElement.value

           })
           //this.getData();
           
       } 
      
    }

    switchUnits(e){
        
        e.preventDefault();
        console.log(this.state.latitude);
        console.log(this.state.longitude)
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

    temperature(){
      
        if(this.state.unit === 'C') {
            this.setState({
                temp: this.state.tempC,
                tempDay1: this.state.tempDay1C,
                tempDay2: this.state.tempDay2C,
                tempDay3: this.state.tempDay3C,
                tempDay4: this.state.tempDay4C,
                tempDay5: this.state.tempDay5C,
                temp_min: this.state.temp_minC,
                temp_max: this.state.temp_maxC
            })
        } else {
            this.setState({
                temp: this.state.tempF,
                tempDay1: this.state.tempDay1F,
                tempDay2: this.state.tempDay2F,
                tempDay3: this.state.tempDay3F,
                tempDay4: this.state.tempDay4F,
                tempDay5: this.state.tempDay5F,
                temp_min: this.state.temp_minF,
                temp_max: this.state.temp_maxF
            })
        }
    }

    

    getTime(dayNumber){
        let today = new Date();
        let nextDay = new Date();
        let day = nextDay.setDate(today.getDate()+dayNumber);
        var dd = String(nextDay.getDate()).padStart(2, '0');
        var mm = String(nextDay.getMonth() + 1).padStart(2, '0');
        var yyyy = nextDay.getFullYear();
        day = mm + '/' + dd + '/' + yyyy;
        return day;
    }

    

    getTimeHM(time){
        let d = new Date(time*1000);
        let h = d.getHours();
        if (h < 10) {
            h = "0" + h;
        }
        let m = d.getMinutes();
        if (m < 10) {
            m = "0" + m;
        }
        let s = d.getSeconds();
        d = h  + ':' + m + ':' +s;
        return d;
    }

    conditionIcon(condition){
   
        const iconUrl = 'http://openweathermap.org/img/w/';
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
               <DisplayData
               units = {this.switchUnits}
               temp = {[this.state.temp]}
               location = {[this.state.location]}
               weather = {[this.state.weather]}
               forecast = 'Forecast'
               icon = {[this.conditionIcon(this.state.weather)]} 
              
                />
                
                    
                   
                    
                    
                    <div className="forecast-grid">
                    <div className="forecast">
                        <div className='display-date'>{this.getTime(1)}</div>
                        <div className='forecast-temp'>{this.state.tempDay1}</div>
                        <div className='forecast-icon'><img src={this.conditionIcon(this.state.tempDay1Weather)}/></div>
                        <div className='forecast-cond'>{this.state.tempDay1Weather}</div>
                    </div>
                    <div className="forecast">
                        <div className='display-date'>{this.getTime(2)}</div>
                        <div className='forecast-temp'>{this.state.tempDay2}</div>
                        <div className='forecast-icon'><img src={this.conditionIcon(this.state.tempDay2Weather)}/></div>
                        <div className='forecast-cond'>{this.state.tempDay2Weather}</div>
                    </div>
                    <div className="forecast">
                        <div className='display-date'>{this.getTime(3)}</div>
                        <div className='forecast-temp'>{this.state.tempDay3}</div>
                        <div className='forecast-icon'><img src={this.conditionIcon(this.state.tempDay3Weather)}/></div>
                        <div className='forecast-cond'>{this.state.tempDay3Weather}</div>
                    </div>
                    <div className="forecast">
                        <div className='display-date'>{this.getTime(4)}</div>
                        <div className='forecast-temp'>{this.state.tempDay4}</div>
                        <div className='forecast-icon'><img src={this.conditionIcon(this.state.tempDay4Weather)}/></div>
                        <div className='forecast-cond'>{this.state.tempDay4Weather}</div>
                    </div>
                    <div className="forecast">
                        <div className='display-date'>{this.getTime(5)}</div>
                        <div className='forecast-temp'>{this.state.tempDay5}</div>
                        <div className='forecast-icon'><img src={this.conditionIcon(this.state.tempDay5Weather)}/></div>
                        <div className='forecast-cond'>{this.state.tempDay5Weather}</div>
                    </div>
                      
                    </div>
                    <div className="weather-details">
                    <div className="details">
                        <div className='pressure'><span className="detail-title">Pressure: </span>{this.state.pressure}</div>
                        <div className='humidity'><span className="detail-title">Humidity: </span>{this.state.humidity}</div>
                        <div className='temp_min'><span className="detail-title">Min Temp: </span>{this.state.temp_min}</div>
                        <div className='temp_max'><span className="detail-title">Max Temp: </span>{this.state.temp_max}</div>
                        <div className='wind_speed'><span className="detail-title">Wind speed: </span>{[this.state.wind_speed]}</div>
                        <div className='wind_deg'><span className="detail-title">Wind deg: </span>{[this.state.wind_deg]}</div>
                        <div className='sunrise'><span className="detail-title">Sunrise: </span>{this.getTimeHM(this.state.sunrise)}</div>
                        <div className='sunset'><span className="detail-title">Sunset: </span>{this.getTimeHM(this.state.sunset)}</div>
                    </div>
                    
                    </div>
                
                   
            </div>
           
        )
    }

}

export default App;

