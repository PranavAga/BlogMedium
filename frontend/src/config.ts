// import 'dotenv/config'

const apiVersion = 'api/v1/'
export const BACKEND_URL :string = import.meta.env.VITE_BACKEND_URL?import.meta.env.VITE_BACKEND_URL + apiVersion:"";