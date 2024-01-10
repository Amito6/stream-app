"use client";

import Style from "../Login/Login.module.css"
import { Button,Card,FormDesign } from "../../Tailwind";
import {signIn, useSession} from "next-auth/react";
import Loader from "../Loader/Loader";
import { redirect } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
const Login = () =>{

    const [error,setError] = useState(false)
    const session = useSession();
    if(session.status === "loading")
    {
        return <Loader />
    }
    if(session.status === "authenticated")
    {
        return redirect("/");
    }

    const fields = [
        {
            component : "input",
            props :{
                name : "email",
                type :"email",
                placeholder : "Email",
                className : "bg-gray-100 rounded-sm border-0 p-3",
                label : "Email"
            }
        },
        {
            component : "input",
            props :{
                name : "password",
                type :"password",
                placeholder : "Password",
                className : "bg-gray-100 rounded-sm border-0 p-3",
                label : "Password"
            }
        }
    ]

    const onSubmit = async(values) =>{
         const {ok} = await signIn(
            "credentials",
            {...values,redirect : false}
            );
            if(ok)
            {
                redirect("/");
            }
            else{
                setError(true);
                setTimeout(()=>setError(false),3000)
            }
    }



    const design =(
        <>
        <div className={`min-h-screen ${Style.main}`}>
            <div className={`min-h-screen ${Style.opacity} flex  items-center justify-center`}>
                <div className="w-4/12">
                    <Card>
                    <div className="flex flex-col gap-4">
                       {
                        error ?
                        <Card className="bg-blue-200 text-black">
                        <h1>Sign in failed. Check the details you provided are correct.</h1>
                        </Card>
                        :
                        null 
                       }
                        <FormDesign 
                        onSubmit={onSubmit}
                        fields={fields} />
                        <hr />
                    <Button
                    onClick={()=>signIn("google")}
                    className="flex gap-3 items-center rounded-2xl " theme="warning">
                        <i className="fa fa-google"
                        style={{fontSize:"30px"}}
                        ></i>
                        SignIn with Google
                    </Button>
                    <Button 
                    onClick={()=>signIn("facebook")}
                    className="flex gap-3 items-center rounded-2xl" theme="secondary">
                        <i className="fa fa-facebook"
                        style={{fontSize:"30px"}}
                        ></i>
                        SignIn with Facebook
                    </Button>
                    <Button 
                    onClick={()=>signIn("github")}
                    className="flex gap-3 items-center rounded-2xl" theme="error">
                        <i className="fa fa-github"
                        style={{fontSize:"30px"}}
                        ></i>
                        SignIn with Github
                    </Button>
                    <Link
                        className="text-end text-blue-500"
                        href="/register">
                        Visit Singup page !</Link>
                </div>
                    </Card>
                </div>
            </div>
        </div>
        </>
    );
    return design;
}
export default Login;