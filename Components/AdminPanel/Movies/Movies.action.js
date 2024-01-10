import { MOVIES_REQUEST,MOVIES_FAILED,MOVIES_SUCCESS,JOB_FAILED,JOB_REQUEST,JOB_SUCCESS } from "./Movies.state";
import axios from "axios";

export const createJob = (data) =>{
    console.log(data);
    return async (dispatch)=>{
        try{
            dispatch ({
                type : JOB_REQUEST
            })
            const response = await axios({
                method : "post",
                url : "/api/media-convert",
                data : {
                    key : data.video
                }
            });
            data.job_id = response.data.data.Job.Id
            dispatch({
                type : JOB_SUCCESS,
                payload : {
                    data,
                    jobData : response.data.data
                }
            });
            //create movie
            dispatch(createMovie(data))
        }catch(error){
            dispatch({
                type : JOB_FAILED,
                payload : error.response
            });
        }
    }

}

const createMovie = (data) =>{
    return async (dispatch) =>{
        try {
            dispatch({
                type : MOVIES_REQUEST
            });
            const response = await axios({
                method : "post",
                url : "/api/movies",
                data : data
            });
            dispatch(
                {
                 type : MOVIES_SUCCESS,
                 payload : response.data.data
                }
             )
        } catch (error) {
            dispatch(
               {
                type : MOVIES_FAILED,
                payload : error.response
               }
            )
        }
    }
}