import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context, Next } from "hono"
import { verify } from "hono/jwt";

const AUTH_KEY = 'Authorization'
const PREFIX = 'Bearer '

export const authCheck = async (c:Context, next:Next) => {	
    const authValue = c.req.header(AUTH_KEY)

    if (!(authValue && authValue.startsWith(PREFIX))) {
        return c.json({
            message: 'Invalid headers'
        },400);
    }

    const token = authValue.split(' ')[1];
    if(!token){
        return c.json({
            message: 'Invalid token'
        },400);
    }
    
	const payload = await verify(token, c.env.PRIVATE_KEY);
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}

    if(!('id' in payload && typeof payload.id === 'string')){
        return c.json({
            message: 'Invalid token'
        },400);
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const user = await prisma.user.findUnique({
        where:{
            id:payload.id
        },
        select:{
            id:true
        }
    });

    if(!user){
        return c.json({
            message: 'User not found'
        },400);
    }

	c.set('userId', payload.id);
    
    await next();
}