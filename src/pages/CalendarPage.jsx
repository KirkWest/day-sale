import React, { useState, useEffect, useContext } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import UserContext from '../contexts/UserContext';
import fetchWithToken, { fetchWithoutToken } from '../services/apiFunctions';
import AddChildModal from '../components/AddChildModal';
import ManageChildrenModal from '../components/ManageChildrenModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CalendarPage.css';

const localizer = momentLocalizer(moment);

const setEventsHelper = (data) => data?.map(event => ({...event,
  start: new Date(event.date),
  end: new Date(event.date),
  childrenNames: event.childNames || []
}))

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAddChildModalOpen, setIsAddChildModalOpen] = useState(false);
  const [isManageChildrenModalOpen, setIsManageChildrenModalOpen] = useState(false);
  const { isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    fetchEvents();
  }, [isAuthenticated]);
  
  // this will fetch any events children and the date as well in database)
  const fetchEvents = async () => {
    setIsLoading(true);

    if (isAuthenticated) {
      const response = await fetchWithToken(`${process.env.REACT_APP_API_URL}/calendar/events`);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Events:", data);
        setEvents(setEventsHelper(data));
      } else {
        console.error('Error fetching events');
      }
    }

    if (!isAuthenticated) {
      const response = await fetchWithoutToken(`${process.env.REACT_APP_API_URL}/calendar/eventsAvailable`);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Events:", data);
        setEvents(setEventsHelper(data));
      } else {
        console.error('Error fetching events');
      }
    }
    // if response is ok this should set the calendar events(buy buttons)
    setIsLoading(false);
  };

  const refreshEvents = async () => {
    await fetchEvents(); // this will refresh the calendar events upon updating in modals
  }

  useEffect(() => {
    const eventForDate = events.find(event => moment(event.start).isSame(selectedDate, "day"));
    setSelectedEvent(eventForDate); // 
  }, [events, selectedDate])

  // this will handle the sell button click with authentication
  const handleSellClick = (date) => {
    setSelectedDate(date);
    if (isAuthenticated) {
      setIsAddChildModalOpen(true);
    } else {
      window.location.href = generateMailToLink(date, 'sell');
    }
  };
  
  // handles our buy button click, if auth eventForDate will find corrosponding dates in DB
  const handleBuyClick = (date) => {
    setSelectedDate(date);
    if (isAuthenticated) {
      const eventForDate = events.find(event => moment(event.start).isSame(date, "day"));
      setSelectedEvent(eventForDate); // stores our retrieved data
      setIsManageChildrenModalOpen(true);
    } else {
      window.location.href = generateMailToLink(date, 'buy');
    }
  };

  // using mailto for the email system for guests
  const generateMailToLink = (date, actionType) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const subject = actionType === 'buy' ? `Buy Request for ${formattedDate}` : `Sell Request for ${formattedDate}`;
    const mailBody = `Hello,\n\nI would like to ${actionType} this date ${formattedDate}. Please fill in any additional information you want.`;
    return `mailto:admin@adamstownchildren.org.au?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
  };


  // this function checks for the date in database
  const hasDateInDatabase = (date) => {
    const momentDate = moment(date);
    return events.some(event => moment(event.start).isSame(momentDate, 'day'));
  };
  
  // this adds in the sell button to each individual cell of the big calendar
  // as well as a buy button for any day that has a corresponding date is our database
  const CustomDayCellSell = ({ children, value }) => {
    const showBuyButton = hasDateInDatabase(value);
    return (
      <div className="rbc-day-bg custom-day-cell">
        {children}
        {showBuyButton && (
          <button onClick={() => handleBuyClick(value)} className="buy-button">Buy</button>
        )}
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
        isLoading={isLoading}
        isOpen={isAddChildModalOpen}
        onRequestClose={() => setIsAddChildModalOpen(false)}
        date={selectedDate}
        refreshEvents={refreshEvents} // need this to pass refreshEvents
      />

      <ManageChildrenModal
        isLoading={isLoading}
        isOpen={isManageChildrenModalOpen}
        onRequestClose={() => setIsManageChildrenModalOpen(false)}
        childrenNames={selectedEvent ? selectedEvent.childNames : []}
        date={selectedDate}
        refreshEvents={refreshEvents} // passing refreshEvents again
      />
    </div>
  );
};

export default CalendarPage;
