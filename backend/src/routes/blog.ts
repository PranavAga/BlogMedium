import { Hono } from 'hono';
import { authCheck } from '../middlewares/auth';

type Variables={
	userId: string
}

const blogRouter = new Hono<{
	Variables:Variables
}>();

blogRouter.use('*',authCheck);

blogRouter.get('/:id', (c) => {
	const id = c.req.param('id')
	console.log(id);
	return c.text('get blog route')
})

blogRouter.post('', (c) => {
	console.log(c.get('userId'));
	return c.text('signin route')
})

blogRouter.put('', (c) => {
	return c.text('signin route')
})

export default blogRouter;