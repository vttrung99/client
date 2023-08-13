import axios from "axios";

export default {
 
  upDateCart: async (id) => {
    return await axios.post(`${process.env.REACT_APP_SERVER_HOST_API}/purchase`,id);
  },
  
};
