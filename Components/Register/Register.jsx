
"use client";

import Style from "../Login/Login.module.css"
import { Button,Card,FormDesign } from "../../Tailwind";
import Loader from "../Loader/Loader";
import { redirect } from "next/navigation";
import { useState,useEffect } from "react";
import Link from "next/link";
import { 
    useDispatch,
    useSelector
 } from "react-redux";
import signup from "../Register/Register.action"


const Register = () =>{

    const [error,setError] = useState(false);

    const dispatch = useDispatch();
    const RegisterReducer = useSelector(response=>response.RegisterReducer); 
  

    const fields = [
        {
            component : "input",
            props :{
                name : "name",
                type :"text",
                placeholder : "Fullname",
                className : "bg-gray-100 rounded-sm border-0 p-3",
                label : "Fullname"
            }
        },
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

    useEffect(()=>{
        if(RegisterReducer.success){
            return redirect("/plans");
        }
        if(RegisterReducer.error){
            setError(true);
            setTimeout(()=>setError(false),5000);
        }

    },[RegisterReducer])

    const onSubmit = async(values) =>{
        dispatch(signup(values));
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
                        <Card 
                        className="bg-blue-200 text-black">
                        <h1>Sign up failed. Please try again later.</h1>
                        </Card>
                        :
                        null 
                       }
                       <h1 className="text-2xl font-bold">Register</h1>
                        <FormDesign 
                        disabled ={RegisterReducer.loading}
                        onSubmit={onSubmit}
                        fields={fields} />
                        <Link
                        className="text-end text-blue-500"
                        href="/login">
                        Visit Login page !</Link>
                </div>
                    </Card>
                </div>
            </div>
        </div>
        </>
    );
    return design;
}
export default Register;