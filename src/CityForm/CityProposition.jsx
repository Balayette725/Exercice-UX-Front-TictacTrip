import React from 'react'

class CountryProposition extends React.Component{

constructor(props){
    super(props)
    this.dropdownMenu  = React.createRef()
}



render(){
    const {cardTitle, cities, onGetCountrie} = this.props
    return <div className="popover_visible"ref={(element) => {this.dropdownMenu = element;} } id="popover">
      
       {cardTitle}
        {cities.map((city) => {
          return (
            <button
              className="popover-button"
              onClick={() => onGetCountrie(city.city_id)}
              id={city.id}
            >
              {city.unique_name}
            </button>
          )})}
  </div>
  
    }
}

export default CountryProposition
    
