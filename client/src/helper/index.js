export const fetchData = (requestBody, dataName, token = "") => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.errors && data.errors.length > 0) {
          reject(data.errors);
        } else if (data.data[dataName]) {
          resolve(data.data[dataName]);
        }
      })
      .catch(err => reject(err));
  });
};

export const getTimeList = dates => {
  const timeList = [];
  const now = new Date().getTime();
  if (
    dates.findIndex(
      item => item < now - 1209600000 && item > now - 604800000
    ) >= 0
  )
    timeList.push({ value: "days14", text: "ostatnie 14 dni" });
  if (
    dates.findIndex(
      item => item <= now - 604800000 && item > now - 259200000
    ) >= 0
  )
    timeList.push({ value: "days7", text: "ostatnie 7 dni" });
  if (dates.findIndex(item => item >= now - 259200000) >= 0)
    timeList.push({ value: "days3", text: "ostatnie 3 dni" });

  return timeList;
};

export const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const getTimeString = (end, start) => {
  const diff = end - start;
  const hours = +Math.floor(diff / 3600000);
  const min = +Math.floor((diff % 3600000) / 60000);
  const sec = +Math.floor((diff % 60000) / 1000);
  return `${hours} godz. ${min} min. ${sec} sec.`;
};
