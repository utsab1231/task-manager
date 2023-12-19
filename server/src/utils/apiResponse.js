// function for returning an response message ,data and status code .
// this function helps in returning consistent response messages,data and status codes from the API.

function apiResponse(stausCode, message, data) {
  return {
    stausCode,
    message,
    data,
  };
}

export default apiResponse;
