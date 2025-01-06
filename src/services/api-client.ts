import axios , { CanceledError } from "axios";

export default axios.create({
    baseURL:'https://ibanspring.ahmed-ben-jaballah.de:8443',
})

export {CanceledError}