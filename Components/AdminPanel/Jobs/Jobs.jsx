"use client";

import useSWR from "swr";
import axios, { AxiosHeaders } from "axios";
import { useState } from "react";
import { Button } from "../../../Tailwind";
import Loader from "../../Loader/Loader";
import moment from "moment";

const Jobs = () =>{
    
    const columns = [
            "JobId",
            "Input",
            "CreatedAt",
            "Status",
            "Percentage",
            "Actions"
    ]

    const [token,setToken] = useState("");
    const [deleting,setDeleting] = useState(false);

    const getData = async (url) =>{
        try {
            const response = await axios({
                method : "get",
                url : url
            });
            return response.data.data;
        }catch (error) {
            return error.response.data;
        }

    }

    const {data,error} = useSWR("/api/media-convert?token="+token,getData,
    {refreshInterval : 5000}
    );

 

    const cancel = async (Id) =>{
        setDeleting(true)
        await axios({
            method : "delete",
            url : "/api/media-convert"+Id
        });

    }

    const Tr = ({item,index}) =>{
        const input = item.Settings.Inputs[0].FileInput.split("/")
        const tr = (
            <>
                <tr className={`bg-gray-200
                ${index % 2 === 0 ? "text-black" : "text-white"}`}>
                    <td style={{verticalAlign:"middle"}}>{item.Id}</td>
                    <td style={{verticalAlign:"middle"}}>{input[input.length-1]}</td>
                    <td style={{verticalAlign:"middle"}}>{
                        moment(item.CreatedAt).format('MMMM Do YYYY, h:mm:ss a')
                    }</td>
                    <td style={{verticalAlign:"middle"}}>{item.Status}</td>
                    <td style={{verticalAlign:"middle"}}>
                        {
                            item.Status === "PROGRESSING" 
                            ? (item.JobPercentComplete ? item.JobPercentComplete + "%" : "0%")
                            : item.Status
                        }
                    </td>
                    <td>
                        {
                            item.Status === "PROGRESSING" 
                            ? <div className="flex">
                                {
                                    deleting ? <i className="fa fa-spinner fa-spin" style={{fontSize:"30px"}}></i> : 
                                    <Button theme="error" 
                                    onClick={()=>cancel(item.Id)}
                                    >Cancel</Button>
                                }
                                
                            </div>
                            : null
                        }
                    </td>
                </tr>
            </>
        );
        return tr;

    }

    const design =(
        <>
            <div className=" mb-4 flex items-center justify-between">
            <h1 className="font-bold mb-4">All Jobs </h1>
            <Button theme={data && data.NextToken ? "error" : "disabled"}
            onClick={()=>setToken(data.NextToken)}
            disabled={data && data.NextToken ? false : true}
            >Next</Button>
            </div>
            <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        {
                            columns.map((key,index)=>{
                                return <th className="text-left" key={index}>{key}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                      data && data.Jobs && data.Jobs.map((item,index)=>{
                            return <Tr key={index} item={item} index={index+1} />
                        })
                    } 
                </tbody>
            </table>
            </div>
            {
                data || error ? null : <Loader />
            }
        </>
    );
    return design;
}
export default Jobs;