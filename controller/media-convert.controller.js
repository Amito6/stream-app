import AWS from "aws-sdk";
import videoProcessing from "../module/video-proc.module";
const media = new AWS.MediaConvert({
    region : "us-east-2",
    endpoint : "https://wa11sy9gb.mediaconvert.us-east-2.amazonaws.com",
    accessKeyId : "AKIA3L6WDYPAIJDOLMOK",
    secretAccessKey : "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"
})
 
export const fetch = async (request) =>{
    const url = new URL(request.url);
    const token = url.searchParams.get("token")
    const params = {
        //MaxResults : 1
        NextToken : token
    }
   try {
     const jobs = await media.listJobs(params).promise();
    return {
        data : jobs,
        status : 200
    }
   } catch (error) {
    return {
        data : error,
        status : 424
    } 
   }
 /*  return {
        data : {
            message : "Media Get Requested"
        },
        status : 200
    }  */
}

export const create = async (request) =>{
     try {
        const data = await request.json();
        const params = videoProcessing(data.key);
        params.Role = "arn:aws:iam::781596214208:role/service-role/stream-app-9616"
        const job = await media.createJob(params).promise();
        return {
            data : job,
            status : 200
        }
    } catch (error) {
        return {
            data : error,
            status : 424
        }
    } 
    console.log(params);
  /*   return {
        data : {
            message : "Media POST Requested"
        },
        status : 200
    } */
}

export const fetchById = async (request,param) =>{
    try {
        const {id} = param;
        const params = {
            Id : id
        }
        const job = await media.getJob(params).promise();
        return {
            data : job,
            status : 200
        }
    } catch (error) {
        return {
            data : error,
            status : 424
        }
    }
}
export const cancel = async (request,param) =>{
    try {
        const {id} = param;
        const params = {
            Id : id
        }
        const job = await media.cancelJob(params).promise();
        return {
            data : job,
            status : 200
        }
    } catch (error) {
        return {
            data : error,
            status : 424
        }
    }
}