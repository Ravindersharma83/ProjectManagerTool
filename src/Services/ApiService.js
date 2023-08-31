import axios from "axios";
import apiUrl from "../Constants/apiUrl";

export const axiosGetApi = async (route)=>{
    const res = await axios({
        method:'get',
        url:apiUrl.baseUrl+route,
    });

    return res;
}

export const axiosPostApi = async (route,data)=>{
    // console.log('api url--',apiUrl.baseUrl+route);
    const res = await axios({
        method:'post',
        url:apiUrl.baseUrl+route,
        data:data
    });

    return res;
}