import axios from "axios";
import { getSessionInfo, getUserSessionInfo } from '../actions/SessionActions'

export const postSessionDelete = async(session) => {
  console.log("-----postSessionDelete start-----");
  
  const config = {
      headers: {Authorization: "Token " + localStorage.token}
    };
    
  const res = await axios.delete(
    "https://143.248.226.51:8000/api/hole/delete/" + session.id,
    config,
  );

  console.log("hole deleted: ", res);

};