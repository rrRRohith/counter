import React, { useState, useEffect } from 'react';
import Settings from './Settings';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const IncrementTracker = () => {
  const [data, setData] = useState({});
  const [lastIncrementTime, setLastIncrementTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);

  const getTodayKey = () => {
    const today = new Date();
    return `${today.getDate().toString().padStart(2, '0')}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getFullYear()}`;
  };

  const formatDateKey = (key) => {
    const day = key.slice(0, 2);
    const month = key.slice(2, 4) - 1; // Month is 0-indexed
    const year = key.slice(4, 8);
    const date = new Date(year, month, day);
    return new Intl.DateTimeFormat('en-US', { weekday: 'short', day: 'numeric', month: 'long' }).format(date);
  };

  useEffect(() => {
    const storedData = localStorage.getItem('incrementData');
    if (storedData) {
      setData(JSON.parse(storedData));
    }

    const storedLastIncrementTime = localStorage.getItem('lastIncrementTime');
    if (storedLastIncrementTime) {
      setLastIncrementTime(new Date(storedLastIncrementTime));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      localStorage.setItem('incrementData', JSON.stringify(data));
    }
  }, [data]);

  useEffect(() => {
    if (lastIncrementTime) {
      localStorage.setItem('lastIncrementTime', lastIncrementTime.toISOString());
      const interval = setInterval(() => {
        const now = new Date();
        const diff = 15 * 60 * 1000 - (now - lastIncrementTime);
        if (diff > 0) {
          setTimeRemaining(diff);
        } else {
          setTimeRemaining(null);
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [lastIncrementTime]);

  const incrementToday = () => {
    const now = new Date();
    if (lastIncrementTime && now - lastIncrementTime < 15 * 60 * 1000) {
      return;
    }
    const todayKey = getTodayKey();
    const newValue = (data[todayKey] || 0) + 1;
    setData({ ...data, [todayKey]: newValue });
    setLastIncrementTime(now);
  };

  const renderDayIncrements = () => {
    const todayKey = getTodayKey();
    const keys = Object.keys(data).sort((a, b) => new Date(b.slice(4, 8), b.slice(2, 4) - 1, b.slice(0, 2)) - new Date(a.slice(4, 8), a.slice(2, 4) - 1, a.slice(0, 2)));

    return keys.length ? keys.map(key => (
      <div role='button' key={key} className='bg-dark p-3 hover-grow rounded-1 d-flex align-items-center mb-2'>
        <div className='me-auto'>
          {key === todayKey ? 'Today' : formatDateKey(key)}
        </div>
        <div className='fw-semibold'>
          {data[key]}
        </div>
      </div>
    )) : (
      <div className=''>
        Hello, start tracking your daily workout reps today.
      </div>
    );
  };

  const formatTimeRemaining = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const calculateTotalReps = () => {
    return Object.values(data).reduce((total, count) => total + count, 0);
  };

  return (
    <>
    <Settings></Settings>
    <div className='container py-5 min-height-100vh position-relative'>
      <div className='border-1 border border-start-0 border-top-0 border-end-0 border-dark fs-5 bg-black w-100 text-light start-0 py-3 position-fixed top-0'>
        <div className='container d-flex align-items-center'>
          <div>
            Track reps 💪
          </div>
          <div className='ms-auto btn btn-dark rounded-1 fw-semibold'>
            <span className='small fw-normal'>Total reps</span>. {calculateTotalReps()}
          </div>
          <div data-bs-toggle="modal" data-bs-target="#settingsModal" className='ms-2 btn btn-dark rounded-1 fw-semibold'>
            <i class="bi bi-gear"></i>
          </div>
        </div>
      </div>
      <div className='text-light my-5'>
        {renderDayIncrements()}
      </div>
      <div className='w-100 bg-black start-0 py-3 position-fixed bottom-0 shadow-sm border-1 border border-bottom-0 border-start-0 border-end-0 border-dark'>
        <div className='container'>
          <div className='d-flex w-100'>
            {timeRemaining !== null && (
              <div className='text-light mt-3 align-items-center'>
                Time remaining {formatTimeRemaining(timeRemaining)}
              </div>
            )}
            <button className='ms-auto btn btn-dark btn-lg border-0 rounded-1 shadow-none' onClick={incrementToday} disabled={timeRemaining !== null}>
              <i className="bi bi-plus-circle-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default IncrementTracker;
