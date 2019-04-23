import axios from "axios";

const instance = axios.create({
    baseURL: "https://egghead-ffc87.firebaseio.com/"
});

export default instance;