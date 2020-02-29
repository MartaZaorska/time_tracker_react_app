export const getTimeSelectList = dates => {
  const timeList = [];
  const now = new Date().getTime();
  const sevenDays = now - 604800000;
  const fourteenDays = now - 1209600000;
  const threeDays = now - 259200000;
  if (dates.findIndex(item => item > fourteenDays && item < sevenDays) >= 0)
    timeList.push({ value: "days14", text: "ostatnie 14 dni" });
  if (dates.findIndex(item => item >= sevenDays && item < threeDays) >= 0)
    timeList.push({ value: "days7", text: "ostatnie 7 dni" });
  if (dates.findIndex(item => item >= threeDays) >= 0)
    timeList.push({ value: "days3", text: "ostatnie 3 dni" });

  return timeList;
};

export const validateEmail = email => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

export const getTimeString = (end, start) => {
  const diff = end - start;
  return `${+Math.floor(diff / 3600000)} godz. ${+Math.floor(
    (diff % 3600000) / 60000
  )} min. ${+Math.floor((diff % 60000) / 1000)} sec.`;
};
