import { Hono } from 'hono'
import userRouter from './users'
import blogRouter from './blog'
const apiV1 = new Hono()

apiV1.route('/users',userRouter)
apiV1.route('/blog',blogRouter)

export default apiV1