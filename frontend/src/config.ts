const apiVersion = 'api/v1/'
const URL = import.meta.env.VITE_PROD_URL
export const BACKEND_URL :string = URL?URL + apiVersion:"";