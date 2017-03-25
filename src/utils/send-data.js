import fetch from "isomorphic-fetch";

const baseUrl = "http://localhost:3000";

function sendData(url, data){
  return fetch(`${baseUrl}/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: data
  }).then(res => res.json())
}

export function saveDayData(dId, data){
  data.tags = null;
  return sendData(`day-data/save/${dId}`, JSON.stringify(data))
                 .catch(e => null);
}
