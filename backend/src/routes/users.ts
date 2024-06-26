import { Hono } from 'hono'
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { signinInput, signupInput } from '@pranav_agarwal/blogmedium-common'
import { zValidator } from '@hono/zod-validator'
import { sign } from 'hono/jwt'
import { authCheck } from '../middlewares/auth'

type Variables={
	userId: string
};

type Bindings = {
    DATABASE_URL:string,
    PRIVATE_KEY:string
}

const userRouter = new Hono<{Bindings:Bindings, Variables:Variables }>();

userRouter.post('/signup',zValidator('json',signupInput,(result, c) => {
        if (!result.success)
            return c.text('Invalid input format', 400)
    }), async(c) => {
        
    const body = c.req.valid("json");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const user = await prisma.user.create({
            data:body
        })

        const token = await sign({id:user.id, email:user.email},c.env.PRIVATE_KEY);

        return c.json({token});
    }

    catch (e:any) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002' && e.meta?.target){
                return c.text(e.meta.target+' already exisits',400)
            }
            return c.text('',400)
        }
        return c.text('Server Error',500)
    }

})

userRouter.post('/signin', zValidator('json',signinInput,(result, c) => {
    if (!result.success) {
        return c.text('Invalid input format', 400)
    }
}), async(c) => {
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = c.req.valid("json");

    try{
        const user = await prisma.user.findUnique({
            where:{
                email:body.email,
                password:body.password
            },
            select:{
                id:true,
                email:true,
            }
        })
    
        if(!user){
            return c.text('Invalid credentials',400);
        }
    
        const token = await sign({id:user.id, email:user.email},c.env.PRIVATE_KEY);
    
        return c.json({token});
    }
    catch (e:any) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return c.text('',400)
        }
        return c.text('Server Error',500)
    }

});

userRouter.get('/info',authCheck,async(c) => {
    const id = c.get('userId');

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    try{
        const user = await prisma.user.findUnique({
            where:{
                id:id
            },
            select:{
				id:true,
				email:true,
                name:true
			}
        });
    
        return c.json(user);
    }
    catch (e:any) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return c.text('DB Error',400)
        }
        return c.text('Server Error',500)
    }
})

export default userRouter