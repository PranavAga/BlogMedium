import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { BlogContent } from "../pages/Blog";

export const useBlogs = () => {

    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<BlogContent[]>([]);

    useEffect(() => {
        const getBlogs = async()=>{
            try {
                axios.get(`${BACKEND_URL}blog`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(response => {
                    setBlogs(response.data);
                    setLoading(false);
                })
            } catch (error) {
                if (error instanceof AxiosError){
                    alert(error.response?.data);
                }
            }
        }
        
        getBlogs();
        
    }, [])

    return {
        loading,
        blogs
    }
}