import "./App.css";
import React from "react";
import CityForm from "./CityForm/CityForm"
import DateForm from "./DateForm"
import PassengerForm from "./PassengerForm/PassengerForm";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
    };
  }

  componentDidMount (){
    this.setState({isLoaded : true})
  }

  
  
  render() {
    const { error, isLoaded } = this.state;

    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <div className='main'>
          <div className="title">
          <h1>Vos billets de train et de bus, en toute simplicité</h1>
          <h4>Vacances d’automne, Noël, Nouvel An : profitez d’une fin d’année placée sous le signe du voyage.</h4></div>
        <div className="container">
          <div className="card cardleft">
            <div className='innerCard'>
              <CityForm/>
              <DateForm/>
              <PassengerForm/>
              <button type="submit" className='research'>Rechercher</button>
            </div>
              
          </div>
          <div className="card"></div>
        </div>
        </div>
      );
    }
  }
}
export default App;
