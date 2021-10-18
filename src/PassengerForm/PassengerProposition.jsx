import React from "react";

export default function PassengerProposition(props) {
  const {
    passengers,
    setPassengers,
    onGetPassengerById,
    passengerOptions,
    setInputPassenger,
  } = props;

  const inputValue = () => {
    let value = "";
    let nbAdultes = 0;
    let nbSenior = 0;
    let nbJunior = 0;
    if (passengers.length > 1) {
      passengers.map((passenger) => {
        if (passenger.type == "Adulte (26-59)") {
          nbAdultes += 1;
        } else if (passenger.type == "Jeune (0-25)") {
          nbJunior += 1;
        } else {
          nbSenior += 1;
        }
      });
      value =
        nbAdultes + "adultes, " + nbJunior + "jeunes, " + nbSenior + "senior";
      setInputPassenger(value);
    } else if (passengers.length <= 1) {
      setInputPassenger(passengers[0].type);
    }
  };

  const handleClickAdd = (event) => {
    event.preventDefault();
    let passengersTab = [...passengers];
    if (passengersTab.length < 9) {
      passengersTab.push({ id: Date.now(), type: event.currentTarget.value });
      setPassengers(passengersTab);
    }
  };

  const handleClickDelete = (event, id) => {
    event.preventDefault();
    let passengersTab = [...passengers];
    const indexOf = passengersTab.findIndex((passenger) => passenger.id === id);
    passengersTab.splice(indexOf, 1);
    setPassengers(passengersTab);
  };

  return (
    <div onChange={inputValue()} className="popover_visible">
      {passengers.map((passenger) => {
        return (
          <div className="select-container">
            {passengers.length > 1 ? (
              <button
                className="select_erase-button"
                onClick={(event) => handleClickDelete(event, passenger.id)}
                id={passenger.id}
              >
                X
              </button>
            ) : null}
            <select id={passenger.id} className="select-input">
              <option
                value={passenger.type}
                onClick={(event) => onGetPassengerById(event)}
                className=""
              >
                {passenger.type}
              </option>
              {passengerOptions.map((passengerOption) => {
                if (passengerOption !== passenger.type) {
                  return (
                    <option
                      onClick={(event) => onGetPassengerById(event)}
                      value={passengerOption}
                      id={passenger.id}
                      className=""
                    >
                      {passengerOption}
                    </option>
                  );
                }
              })}
            </select>
          </div>
        );
      })}
      <h3>Ajouter un autre passager</h3>
      <div className="button__group">
        {passengerOptions.map((passengerOption) => {
          return (
            <button
              className="button-addPassenger"
              onClick={(event) => handleClickAdd(event)}
              value={passengerOption}
            >
              {passengerOption}
            </button>
          );
        })}
      </div>
    </div>
  );
}
