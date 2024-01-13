// reusable function for making API requests with authentication tokens
const fetchWithToken = async (url, options = {}) => {
  // retrieves our stored token from local storage
  const token = localStorage.getItem('token');

  // fetch header authorisation
  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    },
  });

  // removes token from local storage if expired
  if (response.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');
    const refreshResponse = await fetch(`${process.env.REACT_APP_API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (refreshResponse.ok) {
      const {newToken} = await refreshResponse.json();
      // stores new token in local storage
      localStorage.setItem('token', newToken);

      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${token}`,
        },
      });
    } else {
      // removes token from local storage if response not ok
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      // re opens the login modal
      window.dispatchEvent(new CustomEvent('openLoginModal'));
    }
  }

  return response;
};

// api function to add children to the calendar
export const addCalendarChild = async (date, childName) => {
  return await fetchWithToken(`${process.env.REACT_APP_API_URL}/calendar/manageChildNames`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, childName, action: 'add' }),
  });
};

// api function to remove child from calendar
export const removeCalendarChild = async (date, childName) => {
  return await fetchWithToken(`${process.env.REACT_APP_API_URL}/calendar/manageChildNames`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, childName, action: 'remove' }),
  });
};

export default fetchWithToken;