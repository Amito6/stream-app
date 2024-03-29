import "../module/db.module";
import userSchema from "../schema/user.schema";
import {decrypt} from "../module/bcrypt.module";
import { Condiment } from "next/font/google";

export const login = async (request) =>{
    const {searchParams} = new URL(request.url); 
    const query = {};
    for(const [key,value] of searchParams)
    {
        query[key] =value 
    }
    const userData = await userSchema.findOne({email:query.email});
    if(userData)
    {
       const loginData = userData.toObject();
       delete loginData.password;
       const login = await decrypt(query.password,userData.password);
       if(login)
       {
        return {
            data : {
                user : loginData
            },
            status : 200
        }
       }
       else{
        return {
            data : "Login Failed",
            status : 401
        }
       } 
       
    }
    else{
        return {
            data : {
                message : "Login failed"
            },
            status : 401
        }
    }
    
}

export const signup = async (request) =>{
    try{
        const data = await request.json();
        const newUser = await new userSchema(data).save();
        const newData = newUser.toObject();
        delete newData.password;
        return {
            data : newData,
            status : 200
        }
    }
    catch(error)
    {
        return {
            data : error,
            status : 424
        }
    }
    
}