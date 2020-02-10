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
