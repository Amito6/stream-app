"use client";

import { resolve } from "styled-jsx/css";
import { Dialog,FormDesign,Card, IconButton } from "../../../Tailwind";
import useS3 from "../../../hooks/use.s3";
import {createJob} from "../Movies/Movies.action.js";
import { useDispatch,useSelector } from "react-redux";
import { useEffect,useState } from "react";
import useSWR from "swr";
import axios from "axios";

const Movies = () =>{

    const [submit,setSubmit] = useState(false);
    const [filename,setFilename] = useState(null);
    const [progress,setProgress] = useState({
        thumbnail : 0,
        video : 0
    })

    const dispatch = useDispatch();
    const MoviesReducer = useSelector(response=>response.MoviesReducer);

    useEffect(()=>{
            if(MoviesReducer.movie_success){
            setSubmit(false);
            }
        },[MoviesReducer])

    const options = [
        {
            label : "Drama",
            value : "drama"
        },
        {
            label : "Action",
            value : "action"
        },
        {
            label : "Comedy",
            value: "comedy"
        }

    ]

    const fields = [
        {
            component : "upload",
            props : {
             name : "thumbnail",
             className : "bg-gray-300 rounded-sm p-3 border-0" ,
             label : "Thumbnail",
             accept : "image/*"
            } 
        },
        {
            component : "upload",
            props : {
             name : "video",
             className : "bg-gray-300 rounded-sm p-3 border-0" ,
             label : "Video files",
             accept : ".mp4"
            } 
        },
        {
            component : "input",
            props : {
              name : "desc",
              placeholder : "Video description",
              textarea : true,
              className : "bg-gray-300 rounded-sm p-3 border-0",
              width : "full"
            } 
        },
        {
            component : "input",
            props : {
             name : "actorsName",
             placeholder : "Actors Name",
             className : "bg-gray-300 rounded-sm p-3 border-0"
            } 
        },
        {
            component : "select",
            props : {
             name : "category",
             className : "bg-gray-300 rounded-sm p-3 border-0",
             data : options,
             width : "full"
            } 
        },
        {
            component : "input",
            props : {
            name : "tags",
            placeholder : "Keywords",
            textarea : true,
            className : "bg-gray-300 rounded-sm p-3 border-0",
            width : "full"
            } 
        }
    ]
 
    const upload = async (fileProps,values) =>{
        const log = [];
        for(let data of fileProps){
            const upload = useS3(values[data.name],data.key);
            const uploading = await upload();
            uploading.on("httpUploadProgress",(e)=>{
                let loaded = e.loaded;
                let total = e.total;
                let perc = Math.floor((loaded*100)/total);
               setProgress((oldData)=>{
                return {
                    ...oldData,
                    [data.name] : perc
                }
               });
    
            });
            try {
              const file = await uploading.promise(); 
              data.success = true,
              data.s3 = file,
              log.push(data);
            } catch (error) {
                data.success = false,
                data.error = error,
                log.push(data);
            }
        }
        return log;
    }

    const getVideoDuration = async (file) =>{
    return new Promise((resolve,reject)=>{
        const url = URL.createObjectURL(file);
        const video = document.createElement("video");
        video.src = url;
        video.preload = "metadata";
        video.onloadedmetadata = () =>resolve(video.duration);
    });
    }

    const onSubmit = async (values) =>{
        dispatch({
            type : "CLOSE_DIALOG"
        })
        setSubmit(true);
        values.title = values.video.name.toLowerCase().split(".")[0]
        setFilename(values.title);
        values.duration = await getVideoDuration(values.video);
        const videoName = values.video.name;
        let folder = videoName.split(".")[0];
        const fileProps = [
           {
            name : "thumbnail",
            key : "original/"+folder+"/"+folder+".png"
           },
           {
            name : "video",
            key : "original/"+folder+"/"+videoName
           }
        ];
        const log = await upload(fileProps,values);
        for (let data of fileProps){
            values[data.name] = data.key
        }
        dispatch(createJob(values));
    }


    const getData = async (url) =>{
        try {
            const response = await axios({
                method : "get",
                url:url
            });
            return response.data.data;
        } catch (error) {
            return error.response.data
        }
    }

    const {data,error} = useSWR(
        "/api/movies",
        getData,
        {refreshInterval : 5000}
        )

    useEffect(()=>{
        console.log(data,error)
    },[data,error]);


    const MovieForm = () =>{
        const form =(
            <>
            <h1 className="text-2xl font-bold text-left mb-3">New Video</h1>
            <FormDesign 
            onSubmit={onSubmit}
            fields={fields}
            grid={2}
            disabled={submit}
            />
            </>
        );
        return form;
    }

    const Steps = () =>{
        const step = (
            <>
            <Card title={filename}>
                <div className="grid grid-cols-4 gap-4 text-black font-bold">
                    <div>
                        <label className="font-bold mb-1 text-sm">Thumbnail-{progress.thumbnail+"%"}</label>
                        <div className="bg-gray-200 h-1.5">
                            <div className="bg-red-500 h-full" 
                            style={{width:progress.thumbnail+"%"}}></div>
                        </div>
                    </div>
                    <div>
                        <label className="font-bold mb-1 text-sm">Video-{progress.video+"%"}</label>
                        <div className="bg-gray-200 h-1.5">
                            <div className="bg-red-500 h-full" style={{width:progress.video+"%"}}>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="font-bold mb-1 text-sm">
                            Job
                        </label>
                        <div className="bg-gray-200 h-1.5 overflow-hidden">
                            <div className={`bg-red-500 h-full w-0  ${MoviesReducer.job_loading ? "infinite" : null}
                            ${MoviesReducer.job_success ? "w-full" : null}
                            `}></div>
                        </div>
                    </div>
                    <div>
                        <label className="font-bold mb-1 text-sm">Finalizing</label>
                        <div className="bg-gray-200 h-1.5 overflow-hidden">
                            <div className={`bg-red-500 h-full w-0  ${MoviesReducer.movie_loading ? "infinite" : null}
                                ${MoviesReducer.movie_success ? "w-full" : null}
                            `}></div>
                        </div>
                    </div>
                </div>
            </Card>
            </>
        );
        return step;
    }

    const deleteMe = async (id) =>{
        setIsLoader(true);
        await axios({
            method : "delete",
            url : "/api/movies/"+id
        });
        setIsLoader(false);
    }

    const openDialog = () =>{
        dispatch({
            type : "OPEN_DIALOG"
        })
    }

    const MovieList = ({item}) =>{
        const list =(
            <>
                <Card>
                    <img src="/a.jpg" width="100%" alt="" />
                    <h1 className="font-bold capitalize">
                        {item.title}
                    </h1>
                    <p>{item.desc}</p>
                    <p>{item.category}</p>
                    <p>{item.keywords}</p>
                    <div className="flex gap-3 mt-3">
                        <IconButton 
                        onClick={openDialog}
                        size="sm" 
                        theme="secondary">
                            edit
                        </IconButton>
                        <IconButton 
                        onClick={()=>deleteMe(item._id)}
                        size="sm" theme="error">
                            delete
                        </IconButton>

                    </div>
                </Card>
            </>
        );
        return list;
    }

    

    const design = (
        <>
        {
            submit ? <Steps /> : null
        }
        <div className="grid sm:grid-cols-4 gap-4 text-black">
        {
            data && data.map((item,index)=>{
                return <MovieList key={index} item={item} />
            })
        }
        </div>
         <Dialog 
         title="Add a Movie"
         > 
         <hr />
            <MovieForm />
         </Dialog>
        </>
    );
    return design;
}
export default Movies;