import { Appbar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks/BlogsHook";
import { Loader } from "../components/Loader";

export const Blogs = ()=>{

    const {loading, blogs} = useBlogs();

    if(loading || !blogs){
        return(
            <Loader/>
        )
    }
    
    return(
        <>
            <Appbar/>

            <div className="flex flex-col items-center p-8">
                {blogs.map((blog)=>{
                    return <BlogCard id={blog.id} title={blog.title} content={blog.content} publishedDate= {blog.published? new Date(blog.publishDate).toLocaleDateString("en-US",{
                        year: 'numeric', month: 'long', day: 'numeric'
                    }):"Not published"} authorName={blog.author.name}/>
                })}
            </div>
        </>
    )
}