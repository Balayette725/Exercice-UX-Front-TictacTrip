import React from "react";
import CityProposition from "./CityProposition";

class CityForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cities: [],
      showMenu: false,
      cardTitle: <h3>Les plus Consultés</h3>,
      menuActual: "",
      menuFrom: "",
    };
    this.inputMenu = React.createRef();
    this.inputMenuEnd = React.createRef();
  }


  componentDidMount(){
    this.getTop9Countries()
  }

  
  getTop9Countries = () => {
    fetch("https://api.comparatrip.eu/cities/popular/9")
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          cities: result,
          cardTitle: <h3>Les plus Consultés</h3>,
        });
      });
  };

  getCountriesAutocomplete = (event) => {
    fetch(
      `https://api.comparatrip.eu/cities/autocomplete/?q="${event.target.value}"`
    )
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          cities: result,
          cardTitle: "",
        });
      });
  };

  getCountriesFrom = () => {
    console.log(this.state.menuFrom.value);
    fetch(
      `https://api.comparatrip.eu/cities/popular/from/${this.state.menuFrom.value}/5`
    )
      .then((res) => res.json())
      .then((result) => {
        this.setState({ cities: result });
      });
  };

  getCountrieById = (id) => {
    const menu = this.state.menuActual;
    const citySearched = [...this.state.cities];
    const value = citySearched.find((city) => city.city_id === id);
    menu.value = value.unique_name;
    fetch(
      `https://api.comparatrip.eu/cities/autocomplete/?q=${this.state.menuActual.value}`
    )
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          cities: result,
          cardTitle: "",
        });
      });
  };


  showMenu = (event) => {
    event.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
    if (!this.state.menuFrom) {
      this.setState({ menuFrom: event.target });
    }
    this.setState({ menuActual: event.target });
    this.handleChange(event);
  };

  closeMenu = (event) => {
    if (
      !this.inputMenu.contains(event.target) &&
      !this.inputMenuEnd.contains(event.target)
    ) {
      this.setState({ showMenu: false });
      document.removeEventListener("click", this.closeMenu);
    }
  };

  

  handleChange = (event) => {
    if (event.target.value === "") {
      if (this.state.menuFrom.value) {
        this.getCountriesFrom();
      } else if (
        event.target !== this.state.menuFrom &&
        this.state.menuFrom.value === ""
      ) {
        this.setState({ menuFrom: event.target });
        this.getTop9Countries();
      } else {
        this.getTop9Countries();
      }
    } else {
      this.getCountriesAutocomplete(event);
    }
  };

  render() {
      const {showMenu} = this.state
    return (
      <form className="inputs" onSubmit={this.handleSubmit}>
        <div className="input-container">
          <span className="inputLabel">Départ</span>
          <input
            type="text"
            placeholder="Gare ou ville"
            className="input"
            onFocus={this.showMenu}
            ref={(element) => {
              this.inputMenu = element;
            }}
            onChange={this.handleChange}
          />
          {showMenu ? (
            <CityProposition
              cardTitle={this.state.cardTitle}
              cities={this.state.cities}
              onGetCountrie={this.getCountrieById}
            />
          ) : null}
        </div>

        <div className="separation"></div>

        <div className="input-container">
          <span className="inputLabel">Arrivée</span>
          <input
            type="text"
            className="input"
            placeholder="Gare ou ville"
            onFocus={this.showMenu}
            ref={(element) => {
              this.inputMenuEnd = element;
            }}
            onChange={this.handleChange}
          />
        </div>
      </form>
    );
  }
}

export default CityForm