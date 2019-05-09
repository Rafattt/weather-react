import React, {Component} from 'react';

class Details extends Component {
    getTimeHM(time){ //gets time and shows it in hh:mm:ss format
        let d = new Date(time*1000);
        let h = d.getHours();
        if (h < 10) {
            h = "0" + h;
        } else if ( h === 0) {
            h ='00';
        }
        let m = d.getMinutes();
        if (m < 10) {
            m = "0" + m;
        } else if (m === 0) {
            m = '00';
        }
        let s = d.getSeconds();
        if (s < 10) {
            s ='0' + s;
        } else if (s === 0) {
            s = '00';
        }
        d = h  + ':' + m + ':' +s;
        return d;
    }
    render() {
        return(
                    <div className="weather-details">
                        <div className="details">
                            <div className='pressure'><span className="detail-title">Pressure: </span>{this.props.pressure}</div>
                            <div className='humidity'><span className="detail-title">Humidity: </span>{this.props.humidity}</div>
                            <div className='temp_min'><span className="detail-title">Min Temp: </span>{this.props.temp_min}</div>
                            <div className='temp_max'><span className="detail-title">Max Temp: </span>{this.props.temp_max}</div>
                            <div className='wind_speed'><span className="detail-title">Wind speed: </span>{[this.props.wind_speed]}</div>
                            <div className='wind_deg'><span className="detail-title">Wind deg: </span>{[this.props.wind_deg]}</div>
                            <div className='sunrise'><span className="detail-title">Sunrise: </span>{this.getTimeHM(this.props.sunrise)} GMT-5</div>
                            <div className='sunset'><span className="detail-title">Sunset: </span>{this.getTimeHM(this.props.sunset)} GMT-5</div>
                        </div>
                    
                    </div>
        )
    }
}

export default Details