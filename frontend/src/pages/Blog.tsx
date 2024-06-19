import { useNavigate, useParams } from "react-router-dom";
import { BlogInput } from "@pranav_agarwal/blogmedium-common";
import { Appbar } from "../components/AppBar";
import { useBlog } from "../hooks/BlogHook";
import { Loader } from "../components/Loader";
import { EditButton } from "../components/EditButton";

export type BlogContent = BlogInput & {
    id:string,
    publishDate: Date,
    authorId: string,
    author:{
        name:string
    },
}

export const Blog = ()=>{
    const navigate = useNavigate();

    const { id } = useParams();

    const {loading, blog, userId} = useBlog(id?id:"");

    if(loading){
        return(
            <Loader/>
        )
    }
    else if(!blog){
        alert('Blog not found')
        navigate('/blogs')
        return
    }
    
    return(
        <>
            <Appbar/>
            <div className="flex flex-row space-x-4">
            
                <div className="w-2/3 ml-16 mt-16 space-y-2">
                    <div className="flex flex-row justify-between">
                        <div className="text-5xl font-bold">
                            {blog.title}
                        </div>
                        {userId==blog.authorId?
                        <EditButton id={blog.id}/>
                        :null
                        }
                    </div>
                    <div className="text-grey">
                        {blog.published? "Published on "+new Date(blog.publishDate).toLocaleDateString("en-US",{
                            year: 'numeric', month: 'long', day: 'numeric'
                        }):"Not published"}
                    </div>
                    <div className="">
                        {blog.content}                        
                    </div>
                </div>
                <div className="w-1/3 mr-16 mt-16">
                    <div>
                        Author
                    </div>
                    <div className="text-xl font-bold">
                        {blog.author.name}
                    </div>
                </div>
            </div>
        </>
        
    )
}