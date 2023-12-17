"use client"

import Logo from "../Logo/Logo";
import { IconButton } from "../../Tailwind";
import { useState,useEffect } from "react";

const AdminPanel = ({children}) =>{

    const [sidebar,setSidebar] = useState(null);
    const [section,setSection] = useState(null);
    const [open,setOpen] = useState(true);


    useEffect(()=>{
        if(open)
        {
            return(
                setSidebar("w-0 sm:w-2/12"),
                setSection("w-full sm:w-10/12")
            )
        }
        else{
            return (
                setSidebar("absolute sm:static top-0 left -0 w-6/12 min-h-screen sm:w-0"),
                setSection("w-full")
            )
        }
    },[open])

    const design = (
        <>
            <div className="min-h-screen flex">
                <div className={`bg-white shadow-lg overflow-x-hidden ${sidebar}`}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, explicabo!
                </div>
                <div className={`bg-slate-800 ${section}`}>
                    <nav className="px-5 py-3 bg-gray-300 
                    flex justify-between items-center">
                        <Logo />
                       <div className="flex gap-3 items-center">
                       <IconButton 
                        onClick = {()=>{setOpen(!open)}}
                        size="sm" 
                        theme="t-secondary"
                        >format_align_right</IconButton>
                        <IconButton 
                        size="sm" 
                        theme="secondary"
                        >add</IconButton>
                       </div>
                    </nav>
                    <div className="p-5 text-white">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
    return design;
}
export default AdminPanel