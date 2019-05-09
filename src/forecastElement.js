import React, {Component} from 'react';

class ForecastElement extends Component {
    render() {
        return(
            <div className="forecast">
                        <div className='display-date'>{this.getTime.props}</div>
                        <div className='forecast-temp'>{this.tempDay.props}</div>
                        <div className='forecast-icon'><img alt="weather icon" src={this.conditionIcon.props}/></div>
                        <div className='forecast-cond'>{this.tempDayWeather.props}</div>
                    </div>
        )
    }
}

export default ForecastElement;