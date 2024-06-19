import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { BlogContent } from "../pages/Blog";
import { useNavigate } from "react-router-dom";

export const useEdit = (id:string|undefined) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<BlogContent>({
        title:"",
        content:"",
        published:false,
        id:id?id:"",
        publishDate: new Date(),
        author:{
            name:""
        },
        authorId:""
    });

    useEffect(()=>{
        const getBlog = async(id:string)=>{
            try {
                await axios.get(`${BACKEND_URL}blog/${id}`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }).then(response => {
                    setBlog(response.data.post);
                    setLoading(false);
                })
            } catch (error) {
                if (error instanceof AxiosError){
                    alert(error.response?.data);
                    navigate('/blogs')
                }
    
                navigate('/blogs');
            }
        }
        if(id){
            getBlog(id);
        }
        else{
            setLoading(false);
        }
        
    },[id])

    return {
        loading,
        blog,
        setBlog
    }
}