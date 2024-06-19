import { Hono } from 'hono';
import { authCheck } from '../middlewares/auth';
import { blogInput } from '@pranav_agarwal/blogmedium-common';
import { zValidator } from '@hono/zod-validator';
import { Prisma, PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

type Variables={
	userId: string
};

type Bindings = {
    DATABASE_URL:string,
    PRIVATE_KEY:string
}

const blogRouter = new Hono<{
	Variables:Variables,
	Bindings:Bindings
}>();

blogRouter.use('*',authCheck);

// create a blog
blogRouter.post('', zValidator('json',blogInput,(result, c) => {
	if (!result.success)
		return c.text('Invalid input format', 400)
}), async(c) => {

	const userId = c.get('userId');

	const body = c.req.valid("json");

	const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

	try {
        const post = await prisma.post.create({
            data:{
				title:body.title,
				content: body.content,
				authorId: userId,
                published: body.published,
                publishDate: body.published? Date(): null
			},
			select:{
				id:true
			}
        });
		
        return c.json({"postId":post.id});
    }

    catch (e:any) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return c.text('DB Error',400)
        }
        return c.text('Server Error',500);
    }
})

// get a blog
blogRouter.get('/:id', async(c) => {
	const id = c.req.param('id');

	const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

	try{
        const post = await prisma.post.findMany({
            where:{
                OR:[
                    {
                        authorId: c.get("userId"),
                        id:id
                    },
                    {
                        published: true,
                        id:id
                    }
                ]
            },
			select:{
				id:true,
				title:true,
				content:true,
				published:true,
                publishDate:true,
                authorId:true,
                author:{
                    select:{
                        name:true
                    }
                }
			}
        })
    
        if(post.length==0){
            return c.text("Blog not found, not published, or you don't have access",404);
        }
    
        return c.json({
            "post":post[0],
            "userId":c.get("userId")
        });
    }
    catch (e:any) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return c.text('DB Error',400)
        }
        return c.text('Server Error',500)
    }
})

// update a post
blogRouter.put('/:id',zValidator('json',blogInput,(result, c) => {
	if (!result.success)
		return c.text('Invalid input format', 400)
}),	async (c) => {
	const id = c.req.param('id');

	const body = c.req.valid("json");

	const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

	try{
        const post = await prisma.post.update({
            where:{
                authorId: c.get("userId"),
                id:id
            },
            data:{
				title:body.title,
				content: body.content,
                published: body.published,
                publishDate: body.published? new Date(): null
			},
			select:{
				id:true
			}
        })
    
        if(!post){
            return c.text("Blog not found/ don't have access",404);
        }
    
		return c.json({"postId":post.id});
    }
    catch (e:any) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return c.text('DB Error',400)
        }
        console.log(e);
        return c.text('Server Error',500)
    }
})

// get all the blogs
blogRouter.get('', async(c) => {

	const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

	try{
        const posts = await prisma.post.findMany({
            where:{
                OR:[
                    {
                        authorId: c.get("userId"),
                    },
                    {
                        published: true,
                    }
                ]
            },
            select:{
				id:true,
				title:true,
				content:true,
				published:true,
                publishDate:true,
                authorId:true,
                author:{
                    select:{
                        name:true
                    }
                }
			}
        });
    
        return c.json({
            'posts':posts,
            'userId':c.get("userId")
        });
    }
    catch (e:any) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return c.text('DB Error',400)
        }
        return c.text('Server Error',500)
    }
})

export default blogRouter;