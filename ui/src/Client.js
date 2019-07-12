/* eslint-disable no-undef */
function getSummary(cb) {
  return fetch('/gaas-isc/api/summary', {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getDate(cb) {
  return fetch('/gaas-isc/api/date', {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getDesserts(cb) {
    return fetch('/gaas-isc/api/desserts', {
        accept: "application/json"
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

function getFlowStatuses(cb) {
    return fetch('/gaas-isc/api/getRecentExecutions', {
        accept: "application/json"
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

function getSpecificFlowStatuses(cb, flowGroup, flowName) {
    const url = `/gaas-isc/api/getFlowRecentExecutions/${flowGroup}/${flowName}`;
    console.log(url);
    return fetch(url, {
        accept: "application/json"
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

function getJobStatuses(cb, flowGroup, flowName, flowExecId) {
    const url = `/gaas-isc/api/getFlowJobDetails/${flowGroup}/${flowName}/${flowExecId}`;
    return fetch(url, {
        accept: "application/json"
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Client = { getSummary, getDate, getDesserts, getFlowStatuses, getSpecificFlowStatuses, getJobStatuses};
export default Client;
