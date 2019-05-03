import React, {Component} from 'react';

class DisplayData extends Component {
    render(){
           
        return(
            <div className="weather-data">
       
                       
                   
                <div className="temp">{this.props.temp}</div>
                <div className="display-location">{this.props.location}</div>
                <div className="cond-icon"><img src={this.props.icon}/></div>
                <div className="display-weather"><h2>{this.props.weather}</h2></div>
                
                    
                    
                
                
                
            </div>
           
        )
}
}

export default DisplayData;