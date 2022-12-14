import React,{useEffect, useState, useRef} from "react";

import axios from "../config";
import moment from 'moment';


import { Skeleton,   Row,
    Col,
    Card,
 
     Avatar,Button,InputNumber,Divider, Alert } from 'antd';

import { useStateContext } from "../context/stateContext";


const { Meta } = Card;
const Withdraw = () => {



    const[balance, setBalance] = useState(0)
    const [amount, setAmount] = useState(0)
    const [available, setAvailable] = useState(true)
    const [active, setActive] = useState(false)

    const {user, stat} = useStateContext();
    const {roic} = stat;
    const {email, userId,username, token} = user;

    

    const[log, setLog] = useState([])
    const [withdrawal, setWithdrawal] = useState("")

    const dr = useRef();





    const withdrawServer = () => {
       
            
        const user = {
            "user": userId,
            "amount": amount,
            "status": "Pending",
        }
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.post('/listApi/payout-now/', user)
            .then(res => {
                setActive(
                    true
                )
            })
    }

            useEffect(() => {

                axios.defaults.headers = {
                  "Content-Type": "application/json",
                  Authorization: `Token ${token}`
                }
                
              axios.get(`/listApi/withdraw-check?username=${username}`)
                .then(res => {
                  const {s_available,c_available,log} = res.data
                  
                  if (s_available == true || c_available == true){
                    setAvailable(true)
                    setLog(log)
                  }
                })
              axios.get(`/listApi/withdrawals/?username=${username}`)
              .then(res => {
                 
                  setWithdrawal(res.data.reverse())
              }).catch(err => {
                console.log(err.response)
            })
              
            }, [token, username])



    return (
        <>
           
           <Row gutter={[24, 0]}>
      
       <Col span={24} md={16} className="mb-24">
          <Card
            className="header-solid h-full"
            bordered={false}
            title={[<h6 className="font-semibold m-0"></h6>]}
            bodyStyle={{ paddingTop: "0" }}
          >
                  {active ?
                                        <Alert message="Withdrawal Requested" type="success" />
                                            
                                        :
                                        null
                                    }
                          
            <Row gutter={[24, 24]}>
              
                <Col span={24} >
            <Card  style={{backgroundColor: "#fafafa",
                        border: "1px solid #f5f5f5"}}
                      
                              >
                                  
                                  
                                <Skeleton  loading={false} avatar active>
                              
                                  <Meta
                                    avatar={<Avatar src={require("../assets/images/logo.png").default} />}
                                    title="Withdraw "
                                    
                                         />
                                         <div align="middle">
                                      <h6></h6>
                                      </div>
                                         <div align="middle"className="ant-card-meta-description">
                                         <Divider>Take Profit</Divider>
                                         <p>BTC will be be sent to your provided wallet address which is <span style={{color:"seagreen"}}> </span></p>
                                                
                                                <Divider><p>Current Profit:</p> <span style={{ color: "#22cccc" }}>${roic}</span></Divider>
                                         </div>
                                  
                                </Skeleton>
                        <br/>
                      
                      <div align="middle">
                         Amount : &nbsp; <InputNumber align="middle"
                            
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                          
                            
                            /><br/><br/>
{roic>100?
                        <Button type="primary" onClick={()=>withdrawServer()}>Withdraw</Button>
   :
   <>
   <small>You have not earned enough profit to request withdrawal</small><br/>
   <Button type="primary" disabled>Withdraw</Button>
   </>
   }                     
                      </div>
                      
                              </Card>
                              </Col>  </Row>
             </Card>
             </Col>

       </Row>
     
           
                  </>
    )
}


export default Withdraw;
