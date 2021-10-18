import React, { useEffect, useState, useRef } from "react";
import PassengerProposition from "./PassengerProposition";

export default function PassengerForm() {
  const [passengers, setPassengers] = useState([
    { id: Date.now(), type: "Adulte (26-59)" },
  ]);
  const [menu, setMenu] = useState(false);
  const [inputPassenger, setInputPassenger] = useState(passengers[0].type);

  let passengerOptions = ["Jeune (0-25)", "Adulte (26-59)", "Senior (60+)"];

  const inputRef = useRef();
  const passengerRef = useRef();

  useEffect(() => {}, []);

  const showMenu = (event) => {
    event.preventDefault();
    setMenu((menu) => true);
    document.addEventListener("click", closeMenu);
  };

  const closeMenu = (event) => {
    if (
      !inputRef.current.contains(event.target) &&
      !passengerRef.current.contains(event.target) &&
      event.target.localName !== "option" && event.target.localName !== "button"
    ) {
      setMenu((menu) => false);
      document.removeEventListener("click", closeMenu);
    }
  };

  const updatePassengerById = (event) => {
    event.preventDefault();
    const passengersTab = passengers.slice();
    const indexOf = passengersTab.findIndex(
      (passenger) => passenger.id === event.target.id
    );
    passengersTab.splice(indexOf, 1, {
      id: parseInt(event.target.id),
      type: event.target.value,
    });
    setPassengers(passengersTab);
  };
  
  return (
    <form className="inputs">
      <div className="input-container">
        <input
          className="input"
          ref={inputRef}
          onFocus={(event) => showMenu(event)}
          readOnly
          value={inputPassenger}
        />
        <div ref={passengerRef}>
        {menu ? (
          <div>
            <PassengerProposition
              passengerOptions={passengerOptions}
              onGetPassengerById={(event, id) => updatePassengerById(event, id)}
              passengers={passengers}
              setPassengers={setPassengers}
              setInputPassenger={setInputPassenger}
            />
          </div>
        ) : null}
        </div>
      </div>
    </form>
  );
}
