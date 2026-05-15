// Set API URL from environment or use production default
(function() {
  // Development: http://localhost:4000/api
  // Production: will be set via Netlify environment variables
  const apiUrl = process.env.REACT_APP_API_URL || window.__API_URL__ || 'http://localhost:4000/api';
  window.__API_URL__ = apiUrl;
  console.log('API Base URL:', apiUrl);
})();
