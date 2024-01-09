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

export default fetchWithToken;