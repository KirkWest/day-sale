import React, { useState, useEffect, useContext } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import UserContext from '../contexts/UserContext';
import fetchWithToken, { addCalendarChild, removeCalendarChild } from '../services/apiFunctions';
import AddChildModal from '../components/AddChildModal';
import ManageChildrenModal from '../components/ManageChildrenModal';
import SendEmailModal from '../components/EmailModal';

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAddChildModalOpen, setIsAddChildModalOpen] = useState(false);
  const [isManageChilrenModalOpen, setIsManageChildrenModalOpen] = useState(false);
  const [isSendEmailModalOpen, setIsSendEmailModalOpen] = useState(false);
  const { isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const response = await fetchWithToken('http://localhost:3000/calendar/events');
    if (response.ok) {
      const data = await response.json();
      setEvents(data.map(event => ({...event, start: new Date(event.date), end: new Date(event.date)})));
    } else {
      console.error('Error fetching events');
    }
  };

  const handleAddChild = async (date, childName) => {
    const response = await addCalendarChild(date, childName);
    if (response.ok) {
      fetchEvents();
    } else {
      console.error('Failed to add a child');
    }
  };

  const handleRemoveChild = async (date, childName) => {
    const response = await removeCalendarChild(date, childName);
    if (response.ok) {
      fetchEvents();
    } else {
      console.error('Failed to remove a child');
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    // function changed depending on if admin or not, opsn different modals
    if (isAuthenticated) {
      if (event.childNames && event.childNames.length > 0) {
        setIsManageChildrenModalOpen(true);
      } else {
        setIsAddChildModalOpen(true);
      }
    } else {
      setIsSendEmailModalOpen(true);
    }
  };

  const closeAddChildModal = () => setIsAddChildModalOpen(false);
  const closeManageChildrenModal = () => setIsManageChildrenModalOpen(false);
  const closeSendEmailModal = () => setIsSendEmailModalOpen(false);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleEventClick}
        style={{ height: 500 }}
      />

      <AddChildModal
        isOpen={isAddChildModalOpen}
        onRequestClose={closeAddChildModal}
        date={selectedEvent ? selectedEvent.date : null}
      />

      <ManageChildrenModal
        isOpen={isManageChilrenModalOpen}
        onRequestClose={closeManageChildrenModal}
        childrenNames={selectedEvent ? selectedEvent.childNames : []}
        onRemoveChild={handleRemoveChild}
        onAddChild={handleAddChild}
        date={selectedEvent ? selectedEvent.date : null}
      />

      <SendEmailModal
        isOpen={isSendEmailModalOpen}
        onRequestClose={closeSendEmailModal}
        eventType={selectedEvent ? selectedEvent.eventType : 'sell'}
        clickedDate={selectedEvent ? selectedEvent.date : null}
      />
    </div>
  );
};

export default CalendarPage;