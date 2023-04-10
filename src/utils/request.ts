import axios from "axios";

const request = axios.create({
  baseURL: "/",
})

request.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    return err
  }
)

export default request