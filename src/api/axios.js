import axios from "axios";

export default axios.create({
    baseURL: "https://laravelreactapi-new.000webhostapp.com",
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
})