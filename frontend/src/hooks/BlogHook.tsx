import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { BlogContent } from "../pages/Blog";
import { useNavigate } from "react-router-dom";

export const useBlog = (id:string) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<BlogContent>();
    var userId:string = "";

    useEffect(()=>{
        const getBlog = async(id:string)=>{
            try {
                await axios.get(`${BACKEND_URL}blog/${id}`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }).then(response => {
                    userId = response.data.userId;
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
        getBlog(id);
        
    },[id])

    return {
        loading,
        blog,
        userId
    }
}