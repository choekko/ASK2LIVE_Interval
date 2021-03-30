import axios from "axios";

export const postSessionToReserve = async(session) => {
  console.log("-----postSessionToReserve start-----");
  console.log(session);

  const config = {
    headers: {'Authorization': 'Token ' + localStorage.token}
  }
  const data = {
    data: {}
  }
  console.log(localStorage.token);
  console.log(session.id)

  const res = await axios.patch(
    "https://143.248.226.51:8000/api/reservation/hole/" + session.id + "/hostconfirm",
    data,
    config,
  );
  console.log("hole reserved: ", res);
};
