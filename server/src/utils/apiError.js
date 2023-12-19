// function for returning an error message and status code .
// this function helps in returning consistent error messages and status codes from the API.

function apiError(statusCode, message) {
  return { statusCode, message };
}

export default apiError;
