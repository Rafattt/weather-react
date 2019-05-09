import React, {Component} from 'react';

class Forecast extends Component {
     getTime(dayNumber){ //gets date and shows it in mm:dd:yyyy format
          let today = new Date();
          let nextDay = new Date();
          let day = nextDay.setDate(today.getDate()+dayNumber);
          var dd = String(nextDay.getDate()).padStart(2, '0');
          var mm = String(nextDay.getMonth() + 1).padStart(2, '0');
          var yyyy = nextDay.getFullYear();
          day = mm + '/' + dd + '/' + yyyy;
          return day;
      }
    render() {
        
        

        return(
            <div className="forecast-grid">
            <div className="forecast">
                
               
            {console.log(this.props.tempDay)}
                        <div className='display-date'>{this.getTime(1)}</div>
                        <div className='forecast-temp'>{this.props.tempDay[0]}</div>
                        <div className='forecast-icon'><img src={this.props.conditionIcon1}/></div>
                        <div className='forecast-cond'>{this.props.tempDayWeather[0]}</div>
                    </div>
                    <div className="forecast">
                        <div className='display-date'>{this.getTime(2)}</div>
                        <div className='forecast-temp'>{this.props.tempDay[1]}</div>
                        <div className='forecast-icon'><img src={this.props.conditionIcon2}/></div>
                        <div className='forecast-cond'>{this.props.tempDayWeather[1]}</div>
                    </div>
                    <div className="forecast">
                        <div className='display-date'>{this.getTime(3)}</div>
                        <div className='forecast-temp'>{this.props.tempDay[2]}</div>
                        <div className='forecast-icon'><img src={this.props.conditionIcon3}/></div>
                        <div className='forecast-cond'>{this.props.tempDayWeather[2]}</div>
                    </div>
                    <div className="forecast">
                        <div className='display-date'>{this.getTime(4)}</div>
                        <div className='forecast-temp'>{this.props.tempDay[3]}</div>
                        <div className='forecast-icon'><img src={this.props.conditionIcon4}/></div>
                        <div className='forecast-cond'>{this.props.tempDayWeather[3]}</div>
                    </div>
                    <div className="forecast">
                        <div className='display-date'>{this.getTime(5)}</div>
                        <div className='forecast-temp'>{this.props.tempDay[4]}</div>
                        <div className='forecast-icon'><img src={this.props.conditionIcon5}/></div>
                        <div className='forecast-cond'>{this.props.tempDayWeather[4]}</div>
                    </div>
                   
                      
            </div>
        )
    }
}

export default Forecast