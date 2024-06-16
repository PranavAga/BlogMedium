import { Hono } from 'hono'
import apiV1 from './routes/index'
import { cors } from 'hono/cors'

const app = new Hono()

app.use(cors());

app.route('/api/v1',apiV1)

export default app