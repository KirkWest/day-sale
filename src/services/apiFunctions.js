// reusable function for making API requests with authentication tokens
const fetchWithToken = async (url, options = {}) => {
  // retrieves our stored token from local storage
  const token = localStorage.getItem('token');

  // fetch request
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    },
  });

  // removes token from local storage if expired
  if (response.status === 401) {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('authenticationRequired'));
  }

  return response;
};

// api function to add children to the calendar
export const addCalendarChild = async (date, childName) => {
  return await fetchWithToken('http://localhost:3000/calendar/manageChildNames', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, childName, action: 'add' }),
  });
};

// api function to remove child from calendar
export const removeCalendarChild = async (date, childName) => {
  return await fetchWithToken('http://localhost:3000/calendar/manageChildNames', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, childName, action: 'remove' }),
  });
};

export default fetchWithToken;