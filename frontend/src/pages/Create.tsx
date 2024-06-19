import { useNavigate, useParams } from "react-router-dom";
import { useEdit } from "../hooks/EditHook"
import { Appbar } from "../components/AppBar";
import { Loader } from "../components/Loader";
import { BlogContent } from "./Blog";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { BlogInput } from "@pranav_agarwal/blogmedium-common";

export const Create = ()=>{
    const navigate = useNavigate();
    
    const {id} = useParams();

    const {loading, blog, setBlog} = useEdit(id);

    if(loading){
        return(
            <Loader/>
        )
    }

    const handleSubmitBlog = async()=>{
        try {
            if(blog.title.length==0){
                throw new Error('Title cannot be empty')
            }

            if(blog.content.length==0){
                throw new Error('Content cannot be empty')
            }

            const data : BlogInput = {
                title:blog.title,
                content: blog.content,
                published: blog.published
            }

            const headers = {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }

            // update
            if(id){
                await axios.put(`${BACKEND_URL}blog/${id}`,data,{
                    headers:headers
                });
                navigate(`/blog/${id}`);
            }

            // create
            else{
                const response = await axios.post(`${BACKEND_URL}blog`,data,{
                    headers:headers
                });
                navigate(`/blog/${response.data.postId}`);
            }

        } catch (error) {
            if(error instanceof Error){
                alert(error.message)
            }
        }
    }

    return <>
        <Appbar/>

        <div className="flex flex-col items-center justify-items-center h-screen">
            <div className="flex flex-col items-left w-2/3 mt-8">
                <div className="flex flex-row space-y-2 items-center h-22">
                    <div title="Save" className="px-2 border-grey border-r-2" onClick={handleSubmitBlog}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="size-10">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <div></div>
                    </div>
                    
                    <input type="text" defaultValue={blog.title} className="py-1 px-4 border-none text-3xl focus:outline-none" 
                    placeholder="Title" onChange={e=>{
                        setBlog((c:BlogContent)=>({
                            ...c,
                            title: e.target.value
                        }))
                    }}/>
                </div>

                <textarea defaultValue={blog.content} className="py-1 px-4 border-none focus:outline-none text-md h-96" 
                placeholder="Tell your story..." onChange={e=>{
                    setBlog((c:BlogContent)=>({
                        ...c,
                        content: e.target.value
                    }))
                }}/>

                
                <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={blog.published} className="sr-only peer" onChange={e=>{
                        setBlog((c:BlogContent)=>({
                            ...c,
                            published: e.target.checked
                        }))
                    }}/>
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Publish
                    </span>
                </label>

            </div>
            
        </div>

    </>
}