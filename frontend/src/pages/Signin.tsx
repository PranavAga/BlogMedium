import { Quote } from "../components/Quote";
import { CenterHeading, CenterSubHeading } from "../components/CenterHeading"
import { InputBox } from "../components/InputBox";
import { SubmitBox } from "../components/SubmitButton";
import { SigninInput } from "@pranav_agarwal/blogmedium-common";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Signin = ()=>{
    const navigate = useNavigate();

    const content = "\"The customer service I received was exceptional. The support team went above and beyond to address my concerns.\""
    const author = "Jules Winnfield"
    const designation = "CEO, Acme Inc"

    const title = "Login";
    const subHeadingContent = "Don't have an account?";
    const gotoContent = 'Signup';
    const gotoLink = '/signup';

    const [signinContent, setSigninContent] = useState<SigninInput>({
        email:"",
        password:""
    });

    const handleSignin = async()=>{
        try{
            console.log(signinContent)
            const response = await axios.post(`${BACKEND_URL}users/signin`,signinContent);

            localStorage.setItem("token",response.data.token);
            navigate('/blogs');
        }
        catch(e){
            if (e instanceof AxiosError){
                if(e.response?.status==400){
                    alert(e.response.data)
                }
            }
        }           
    }


    return(
        <>
            <div className="bg-grey-light grid grid-cols-1 lg:grid-cols-2 h-screen">
                <div className="bg-white rounded-sm shadow-sm m-1 flex flex-col justify-center items-center">
                    <div className="space-y-4">
                        <CenterHeading title={title} sub={null}/>
                        <CenterSubHeading content={subHeadingContent} gotoContent={gotoContent} gotoLink={gotoLink}/>
                        <InputBox onChange = {e=>{
                            setSigninContent((c:SigninInput) => ({
                                ...c,
                                email:e.target.value
                            }))
                        }} label={'Email'} placeholder = {'john.doe@example.com'} type={'text'} />
                        <InputBox onChange = {e=>{
                            setSigninContent((c:SigninInput) => ({
                                ...c,
                                password:e.target.value
                            }))
                        }} label={'Password'} placeholder={''} type = {'password'}/>

                        <SubmitBox onClick={handleSignin} title={title}/>
                    </div>
                </div>

                <div className="hidden lg:block">
                    <div className="pt-72 px-20 flex flex-col">
                        <Quote content={content} author={author} designation={designation}/>
                    </div>
                </div>
            </div>
        </>
    )
}