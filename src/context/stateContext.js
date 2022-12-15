import React, {createContext, useContext, useState, useEffect} from "react";
import { toast } from "react-hot-toast";
import axios from  "../config"

const Context = createContext();

export const StateContextProvider = ({children}) => {
    const [user, setUser] = useState('');
    const [chart, setChart] = useState([]);
    const[orders, setOrders] = useState([]);
    const [stat, setStat] = useState([]);

   
    const logout = () => {
        localStorage.removeItem("user");
      };
      
    const checkAuthTimeout = expirationTime => {
          setTimeout(() => {
            logout()
          }, expirationTime * 1000);
      }


    const login = async data => {
        console.log(data)
        try{
            toast.loading('Loging you in...', {
                id: 'login'
            })
            const user = await axios.post('/rest-auth/login/', data).then(res => res.data)
            if(user.error){
                toast.error(`${user.error}`, {
                    id: 'login'
            })
        }else{
            const data = user.user_detail;
            const newuser = {token:user.key,...data}
            localStorage.setItem("user", JSON.stringify(newuser));
            setUser(newuser);
            }
            toast.dismiss()
        }catch(err){
            console.log(err);
            if(err.response.data.msg){
                toast.error(`${err.response.data.msg}`,{
                    id:'login'
                })
     
            }else if (err.response.data.non_field_errors){
               toast.error(`${err.response.data.non_field_errors[0]}`)
            }
            else{
                toast.error('Unable to log you in at the moment', {
                    id: 'login'
                })
            }
        }
    }

    const authCheckState = () => {
              const user = JSON.parse(localStorage.getItem("user"));
              if (user === undefined || user === null) {
               logout()
              } else {
                const expirationDate = new Date(user.expirationDate);
                if (expirationDate <= new Date()) {
                  logout()
                } else {
                    
                    checkAuthTimeout(
                      (expirationDate.getTime() - new Date().getTime()) / 1000
                    )
                }
              }
    
    };

    const getChart = async (username, token) => {
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        try{
        const chart = await axios.get(`/api/history?${username}`).then(res => res.data);
        setChart(chart)
        }catch(err){
            console.log(err);
        }
    }

    const getOrder = async (username, token) => {
     try{
         
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
            const orders = await axios.get(`/api/orders?username=${username}`).then(res => res.data.reverse());
            setOrders(orders);

        }catch(err){
            console.log(err);
        }
    }

    const getStat = async (username, token) => {
        
       try{
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            }
            const stats = await axios.get(`/api/status?username=${username}`).then(res => res.data[0])
            console.log(stats)
            setStat(stats);
            
        }catch(err){
            console.log(err);
        }
    }
   



    useEffect(()=> {
        setUser(localStorage.getItem('user')?JSON.parse(localStorage.getItem("user")):{})   
       
    },[])   
    
    

    return (
        <Context.Provider 
        value={{
            user,
            stat,
            chart,
            orders,
            setChart,
            getOrder,
            getStat,
            setStat,
            login,
            logout,
            authCheckState,
        }}>{children}</Context.Provider>
    )
    }
    
export const useStateContext = () => useContext(Context)