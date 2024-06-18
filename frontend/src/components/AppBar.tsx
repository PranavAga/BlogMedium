import { useEffect, useState } from "react"
import { UserIcon } from "./UserIcon"
import { Link, useNavigate } from "react-router-dom"
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "../config";

export const Appbar = () => {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState<{
        id:string;
        email:string;
        name:string|undefined
    }>();

    useEffect(()=>{
        try {
            axios.get(`${BACKEND_URL}users/info`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response)=>{
                setUserInfo(response.data);
            })
        } catch (error) {
            if (error instanceof AxiosError){
                alert(error.response?.data);
            }

            navigate('/blogs');
        }
    },[]);

    return <div className="border-b flex justify-between px-10 py-2">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer font-semibold text-xl">
            Medium
        </Link>
        <div className="flex flex-row items-center justify-center space-x-2">
            <Link to={'/publish'}>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 rounded-full text-sm px-5 py-2.5 text-center">New</button>
            </Link>

            <UserIcon firstName={userInfo?userInfo.name?userInfo.name:userInfo.email:""} lastName={""} />
        </div>
    </div>
}