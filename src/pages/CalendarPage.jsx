import React, { useState, useEffect, useContext } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import UserContext from '../contexts/UserContext';
import fetchWithToken from '../services/apiFunctions';
import AddChildModal from '../components/AddChildModal';
// import ManageChildrenModal from '../components/ManageChildrenModal';
import SendEmailModal from '../components/EmailModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CalendarPage.css';

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isAddChildModalOpen, setIsAddChildModalOpen] = useState(false);
  const [isSendEmailModalOpen, setIsSendEmailModalOpen] = useState(false);
  const { isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    fetchEvents();
  }, []);
  
  // this should fetch any events(children and the date as well in database)
  const fetchEvents = async () => {
    const response = await fetchWithToken('process.env.REACT_APP_API_URL/calendar/events');
    if (response.ok) {
      const data = await response.json();
      console.log("Fetched Events:", data);
      setEvents(data.map(event => ({...event, start: new Date(event.date), end: new Date(event.date)})));
    } else {
      console.error('Error fetching events');
    }
  };

  // this will handle the sell button click
  const handleSellClick = (date) => {
    setSelectedDate(date);
    if (isAuthenticated) {
      setIsAddChildModalOpen(true);
    } else {
      setIsSendEmailModalOpen(true);
    }
  };
  
  // this adds in the sell button to each individual cell of the big calendar
  const CustomDayCellSell = ({ children, value }) => {
    return (
      <div className="rbc-day-bg custom-day-cell">
        {children}
        <button onClick={() => handleSellClick(value)} className="sell-button">Sell</button>
      </div>
    );
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        views={{ month: true }}
        style={{ height: 500 }}
        className="my-calendar"
        components={{ dateCellWrapper: CustomDayCellSell }}
      />

      <AddChildModal
        isOpen={isAddChildModalOpen}
        onRequestClose={() => setIsAddChildModalOpen(false)}
        date={selectedDate}
      />
{/* 
      <ManageChildrenModal
        isOpen={isManageChilrenModalOpen}
        onRequestClose={closeManageChildrenModal}
        childrenNames={selectedEvent ? selectedEvent.childNames : []}
        onRemoveChild={handleRemoveChild}
        onAddChild={handleAddChild}
        date={selectedEvent ? selectedEvent.date : null}
      /> */}

      <SendEmailModal
        isOpen={isSendEmailModalOpen}
        onRequestClose={() => setIsSendEmailModalOpen(false)}
        date={selectedDate}
      />
    </div>
  );
};

export default CalendarPage;