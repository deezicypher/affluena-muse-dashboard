import React,{useEffect, useState} from "react";
import axios from "../config";
import moment from 'moment';


import { Row,
    Col,
    Card,
    List,
   } from 'antd';
import { authCheckState } from "../store/actions/auth";
import { useStateContext } from "../context/stateContext";



const { Meta } = Card;
const Referrals = () => {
    


 

  const {user} = useStateContext();
  const {token, username} = user;
 



const [ref, setRef] = useState([])


useEffect(()=>{
  axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`
}
if(token){
axios.get(`/api/refs?username=${username}`)
    .then(res => {
      
       setRef(res.data.refs.reverse())
       
    }).catch(err => {
        console.log(err.response)
    })}
}, [token, username])



    return (
        <>
              <Row gutter={[24, 0]}>
       <Col span={24} md={12} className="mb-24">
          <Card
            bordered={false}
            className="header-solid h-full ant-invoice-card"
            title={[<h6 className="font-semibold m-0">Referrals </h6>]}
            
          >
            <List
              itemLayout="horizontal"
              className="invoice-list"
              dataSource={ref}
              renderItem={(item) => (
                <List.Item
                  
                
                    >
                 
                  <List.Item.Meta
                    title={item.name}
                  
                   

                  />
                  <div className="amount"><span >{item.date_joined} </span></div>
        
                  </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
            </>
    )
}


export default Referrals;
