import fetch from 'isomorphic-fetch';

const baseUrl = "http://localhost:3000";

function fetchData(url){
  return fetch(url, {
    //credentials: "same-origin"
  }).then(response => response.json())
}

export function fetchMonthData(year, month){
  return fetchData(`${baseUrl}/month-data/${year}/${month}`)
                  .then(res => res.data)
                  .catch(e => null);
}

export function fetchDayData(year, month, day){
  return fetchData(`${baseUrl}/day-data/${year}/${month}/${day}`)
                  .then(res => res.data)
                  .catch(e => null);
}
