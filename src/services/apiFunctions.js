// reusable function for making API requests with authentication tokens
const fetchWithToken = async (url, options = {}) => {
  // retrieves our stored token from local storage
  let token = sessionStorage.getItem('token');

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
    const refreshToken = sessionStorage.getItem('refreshToken');
    const refreshResponse = await fetch(`${process.env.REACT_APP_API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (refreshResponse.ok) {
      let {newToken} = await refreshResponse.json();
      // stores new token in local storage
      sessionStorage.setItem('token', newToken);

      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${token}`,
        },
      });
    } else {
      // removes token from local storage if response not ok
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('refreshToken');
      // re opens the login modal
      window.dispatchEvent(new CustomEvent('openLoginModal'));
    }
  }

  return response;
};

// reusable function for making API requests without authentication tokens
export const fetchWithoutToken = async (url, options = {}) => {
  // fetch header authorisation
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
      },
    });
  
    return response;  
  } catch(error) {
    console.error(`Failed to fetch data: ${error}`)
  }
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