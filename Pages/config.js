// Set API URL from environment or use production default
(function() {
  // Development: http://localhost:4000/api
  // Production: will be set via Netlify environment variables
  // Use global window variable or default to localhost for development
  const apiUrl = window.__API_URL__ || 'http://localhost:4000/api';
  window.__API_URL__ = apiUrl;
  console.log('API Base URL:', apiUrl);
})();
