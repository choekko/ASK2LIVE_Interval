import axios from "axios";

export const postSessionDelete = async(session) => {
  console.log("-----postSessionDelete start-----");
  
  const config = {
      headers: {Authorization: "Token " + localStorage.token}
    };
    
  const res = await axios.delete(
    "https://143.248.226.51:8000/api/hole/delete/" + session.id,
    config,
  );
  setTimeout(100);
  console.log("hole deleted: ", res);

};