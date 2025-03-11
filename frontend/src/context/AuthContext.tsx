import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import { AxiosClient } from "../config/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { setUser, UserSlicePath } from "../store/slice/User.slice";
import LoaderComponent from "../components/LoaderComponent"

export const AuthContext = createContext({})
export const useAuth = ()=> useContext(AuthContext)


export const AuthProvider = ({ children }:{
    children:React.ReactNode
}) => {

    const location =useLocation()
    const dispatch = useDispatch()
    const {user} = useSelector(UserSlicePath)
    const [loading,setLoading] = useState(true)

    const fetchUserProfile=async(token:string)=>{
        try {
            const response = await AxiosClient.get("/auth/profile",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log(response.data)
            const data = await response.data
            dispatch(setUser(data))


        } catch (error:any) {
            toast.error(error.message)
        } finally {
           setLoading(false) 
        }
    }

    useEffect(()=>{
        const token = localStorage.getItem("token") || ""
        if(token){
            if(!user?.email){
                fetchUserProfile(token)
            }
            else {
               setLoading(false) 
            } 
        }
    },[location])


    if(loading){
        return <div className="min-h-screen w-full flex items-center justify-center">
            <LoaderComponent /> 
        </div>
    }
    return <AuthContext.Provider value={{}}>
        {children}
    </AuthContext.Provider>
}