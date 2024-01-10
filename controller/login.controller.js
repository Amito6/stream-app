import "../module/db.module";
import loginSchema from "../schema/login.schema";
import loginMiddleware from "../middleware/login.middleware"

export const fetch = async (request) =>{
  try{
    await loginMiddleware(request);
    return {
        data : "Login success",
        status : 200
    }
  }
  catch(error){
    return {
        data : error,
        status: 401
    }
  }
}
export const fetchByID = async (request,params) =>{
    return {
        data : params,
        status : 200
    }
}


export const create = async (request) =>{
   /*  const data = await request.json();
    return {
        data : data,
        status :200
    } */
    try{
        const data =  await request.json();
        console.log(data);
         const userRes = await new loginSchema(data).save();

       /* await loginMiddleware(request); */
        return {
            data : userRes,
            status : 200
        }
      }
      catch(error){
        return {
            data : error,
            status: 401
        }
      }
}

export const trash =(request,params) =>{
    return {
        data : params,
        status : 200
    }
}

export const update = async (request,params) =>{
    const data =  await request.json();
    return {
        data: {
            data,
            params
        },
        status : 200
    }
}