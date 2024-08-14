import React, { useState, useEffect } from 'react';
import { firestore, collection, addDoc, getDocs } from '../firebase'; // Adjusted path
import './Calendar.css';
import Navbar from './Navbar';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState([]);
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ type: '', category: '', amount: '' });
  const [months] = useState([
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]);

  useEffect(() => {
    generateCalendar();
    fetchEvents();
  }, [currentDate]);

  const fetchEvents = async () => {
    const querySnapshot = await getDocs(collection(firestore, 'events'));
    const eventsData = {};

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const dateKey = new Date(data.date).toDateString();
      if (!eventsData[dateKey]) {
        eventsData[dateKey] = [];
      }
      eventsData[dateKey].push({ id: doc.id, ...data });
    });

    setEvents(eventsData);
  };

  const handleDelete = async (eventId, eventDate) => {
    try {
      await firestore.collection('events').doc(eventId).delete();
      setEvents((prev) => {
        const updatedEvents = { ...prev };
        updatedEvents[eventDate] = updatedEvents[eventDate].filter(event => event.id !== eventId);
        if (updatedEvents[eventDate].length === 0) {
          delete updatedEvents[eventDate];
        }
        return updatedEvents;
      });
    } catch (error) {
      console.error("Error deleting event: ", error);
      alert("Failed to delete event. Please try again.");
    }
  };

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const daysArray = [];
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null);
    }
    for (let i = 1; i <= lastDate; i++) {
      daysArray.push(i);
    }
    setDays(daysArray);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const openModal = (day) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString());
    setForm({ type: '', category: '', amount: '' });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!form.type || !form.category || !form.amount) {
      alert('Please fill out all fields');
      return;
    }

    const event = {
      type: form.type,
      category: form.category,
      amount: parseFloat(form.amount),
      date: selectedDate,
    };

    try {
      await addDoc(collection(firestore, 'events'), event);
      setEvents((prev) => ({
        ...prev,
        [selectedDate]: [...(prev[selectedDate] || []), { id: Date.now().toString(), ...event }],
      }));
      setShowModal(false);
    } catch (error) {
      console.error("Error saving event: ", error);
      alert("Failed to save event. Please try again.");
    }
  };

  const calculateBalance = (date) => {
    const eventList = events[date] || [];
    let totalIncome = 0;
    let totalExpenses = 0;

    eventList.forEach((event) => {
      if (event.type === 'income') {
        totalIncome += parseFloat(event.amount) || 0;
      } else if (event.type === 'expense') {
        totalExpenses += parseFloat(event.amount) || 0;
      }
    });

    return totalIncome - totalExpenses;
  };

  const getMonthName = (monthIndex) => {
    return months[monthIndex];
  };

  return (
    <div className="calendar-container">
       <Navbar/>
      <div className="calendar">
        <div className="calendar-header">
          <button className="nav-button" onClick={handlePrevMonth}>←</button>
          <h2>{getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}</h2>
          <button className="nav-button" onClick={handleNextMonth}>→</button>
        </div>
        <div className="calendar-grid">
          <div className="calendar-day">Sun</div>
          <div className="calendar-day">Mon</div>
          <div className="calendar-day">Tue</div>
          <div className="calendar-day">Wed</div>
          <div className="calendar-day">Thu</div>
          <div className="calendar-day">Fri</div>
          <div className="calendar-day">Sat</div>
        </div>
        <div className="calendar-days">
          {days.map((day, index) => {
            const dateKey = day ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString() : null;
            const balance = dateKey ? calculateBalance(dateKey) : null;

            return (
              <div
                key={index}
                className={`calendar-day-cell ${day ? '' : 'empty-cell'}`}
                onClick={() => day && openModal(day)}
              >
                {day || ''}
                <div className="events">
                  {(events[dateKey] || []).map((event, idx) => (
                    <div key={idx} className={`event ${event.type}`}>
                      {event.type}: ₹{event.amount}
                      <button className="delete-button" onClick={() => handleDelete(event.id, dateKey)}>Delete</button>
                    </div>
                  ))}
                </div>
                {day && balance !== null && (
                  <div className={`balance ${balance >= 0 ? 'positive' : 'negative'}`}>
                    Balance: {balance >= 0 ? `₹${balance}` : `-₹${Math.abs(balance)}`}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Event</h2>
            <div className="modal-section">
              <label>Type:</label>
              <select name="type" value={form.type} onChange={handleFormChange}>
                <option value="">Select type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div className="modal-section">
              <label>Category:</label>
              <input name="category" value={form.category} onChange={handleFormChange} />
            </div>
            <div className="modal-section">
              <label>Amount:</label>
              <input name="amount" type="number" value={form.amount} onChange={handleFormChange} />
            </div>
            <button className="save-button" onClick={handleSave}>Save</button>
            <button className="close-button" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
