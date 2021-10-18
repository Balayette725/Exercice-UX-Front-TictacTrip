import React, { useState, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function DateForm() {
  const [menu, setMenu] = useState(null);
  const [value, onChange] = useState(new Date());
  const [calendarFrom, setCalendarFrom] = useState();

  const dateOptions = { weekday: "short", day: "2-digit", month: "short" };
  const [dateReturnLabel, setDateReturnLabel] = useState();
  const inputRef = useRef();
  const inputRefEnd = useRef();
  const calendarRef = useRef()

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("fr-FR", dateOptions).format(date);
  };

  const showMenu = (event) => {
    event.preventDefault();
    setMenu((menu) => true);
    setCalendarFrom((calendarFrom) => event.target);
    document.addEventListener("click", closeMenu);
    if (inputRefEnd.current.contains(event.target)) {
      setDateReturnLabel((dateReturnLabel) => "Retour");
    }
  };

  const closeMenu = (event) => {
    if (
      !inputRef.current.contains(event.target) &&
      !inputRefEnd.current.contains(event.target)&&
      !calendarRef.current.contains(event.target) && 
      event.target.localName !== 'abbr' && 
      event.target.localName !== 'button'

    ) {
      setMenu((menu) => false);
      document.removeEventListener("click", closeMenu);
      if (!inputRefEnd.current.value) {
        setDateReturnLabel((dateReturnLabel) => null);
      }
    }
  };

  const handleClickDay = (event) => {
    calendarFrom.value = formatDate(event);
  };

  const handleClickErase = (event) => {
    event.preventDefault();
    inputRefEnd.current.value = "";
  };

  const disabledDates = [
    new Date(2018, 0, 1),
    new Date(2018, 1, 2),
  ];

  return (
    <form className="inputs">
      <div className="input-container">
        <span className="inputLabel">Aller</span>
        <input
          readOnly
          type="text"
          className="input"
          onFocus={(event) => showMenu(event)}
          ref={inputRef}
          defaultValue={formatDate(value)}
        />
        <div  ref={calendarRef} >

        
        {menu ? (
          <Calendar
         
            onClickDay={handleClickDay}
            onChange={onChange}
            value={value}
            className="calendar"
            
          />
        ) : null}
        </div>
      </div>

      <div className="separation"></div>

      <div className="input-container">
        <span className="inputLabel">{dateReturnLabel}</span>
        <input
          readOnly
          type="text"
          className="input"
          placeholder="+ Ajouter"
          ref={inputRefEnd}
          onFocus={showMenu}
        />
        <button  className='erase-button' onClick={(event) => handleClickErase(event)}>X</button>
      </div>
    </form>
  );
}
