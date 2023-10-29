export const sendUserData = async (user) => {
  const response = await fetch("http://localhost:9090/api/registration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => err);
  return response;
};
