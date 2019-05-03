import React, {Component} from 'react';

class Date extends Component {

    
    

    render(){
        getTime(dayNumber){
            let day = new Date()+dayNumber;
            var dd = String(day.getDate()).padStart(2, '0');
            var mm = String(day.getMonth() + 1).padStart(2, '0');
            var yyyy = day.getFullYear();
            day = mm + '/' + dd + '/' + yyyy;
            return day;
        }
        return(
            <p>{getTime(this.props.dayNumber)}</p>
        )
    }
}

export default Date;
