import axios from "axios";
export default{
    addToCart: async (newUser) => {
        return await axios.post(
          `${process.env.REACT_APP_SERVER_HOST_API}/purchase`,
          newUser,
        )
        .then(res => res)
        .catch(err => err)
      }
}
