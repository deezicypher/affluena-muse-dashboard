import React,{useEffect, useState} from "react";
import axios from "../config";
import moment from 'moment';


import { Skeleton,   Row,
    Col,
    Card,
   Select,
    Descriptions,
     Avatar,Button,Divider, Alert, Spin,Popconfirm, message } from 'antd';

import { Redirect } from "react-router-dom";
import { useStateContext } from "../context/stateContext";

const { Option } = Select;

const { Meta } = Card;
const Compound = () => {
    const {user} = useStateContext();
    const [amount, setAmount] = useState("")
    const [duration, setDuration] = useState(6)
    const {userId, token , username} = user
    const [focused, setFocused] = useState("")
    const [active, setActive] = useState(false)
    const [balance, setBalance] = useState("")
    const [status, setStatus] = useState("")
    const [period, setPeriod] = useState("")
    const [durationEnd, setDura] = useState("")
    const [start, setStart] = useState("")
    const [load, setLoad] = useState(false)


    function confirm(e) {
      
      message.success('Compounding');
    }
    
    function cancel(e) {
      
      message.error('Not Compounding');
    }
   
    function onChange(value) {
      setDuration(value)
     }

    const compound = () => {
        setLoad(true)
        const user = {
            "active": true,
            "duration": duration,
            "amount": balance,
            "user": userId,
            "status": "Pending",
        }
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.post('/api/compound-id/', user)
            .then(res => {
            
                setActive(true)
                
                setTimeout(()=>{
                  getStat()
                  setLoad(false)
                },2000)
              
               
            }).catch(err => {
              console.log(err.response)
                setLoad(false)
            })
    }

    const getStat = () => {
      if (token) {
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(`/api/compounds?username=${username}`)
            .then(res => {
                const dEnd = moment(res.data[res.data.length - 1].date_request).add(res.data[res.data.length - 1].duration, 'months').calendar()

                setStatus(res.data[res.data.length - 1].active)
                setDura(dEnd)
                setPeriod(res.data[res.data.length - 1].duration)
                setStart(res.data[res.data.length - 1].date_request)
            }).catch(err=>console.log(err))
    
        axios.get('/rest-auth/user/')
            .then(res => {
                setBalance(res.data.account_balance)
            }).catch(err => console.log(err))

    }
    }
    useEffect(() => {
        getStat()
    }, [])



    return (
        <>
            <div className="content">
            <div className="layout-content">
            {status === true ?
            <Col span={24} md={15} className="mb-24">
          <Card
            className="header-solid h-full"
            bordered={false}
            title={[<h6 className="font-semibold m-0">Compounding</h6>]}
            bodyStyle={{ paddingTop: "0" }}
          >
            <Row gutter={[24, 24]}>
              
                <Col span={24} >
                  <Card className="card-billing-info" bordered="false">
                    <div className="col-info">
                      <Descriptions title="Status">
                        <Descriptions.Item label="Status" span={3}>
                        <span style={{ color: "#22cccc" }}>{" "}{status === true ? "Active" : "Pending"}</span>
                                    
                        </Descriptions.Item>

                        <Descriptions.Item label="Compounding Period" span={3}>
                         <span style={{ color: "#22cccc" }}>{" "}{period} Months</span>
                        </Descriptions.Item>
                        <Descriptions.Item label="Duration" span={3}>
                        <span style={{ color: "#22cccc" }}>{" "} {moment(start).format('MMMM Do YYYY')}{" "} - {" "}{moment(durationEnd).format('MMMM Do YYYY')}</span>
                        </Descriptions.Item>
                      </Descriptions>
                    </div>
                    
                  </Card>
                </Col>
         
            </Row>
          </Card>
        </Col>
            :   
            <Row>             
        <Col span={24} md={15} className="mb-24">
          <Card
            className="header-solid h-full"
            bordered={false}
            title={[<h6 className="font-semibold m-0"></h6>]}
            bodyStyle={{ paddingTop: "0" }}
          >
                  {active ?
                                        <Alert message="Compounding Activated" type="success" />
                                            
                                        :
                                        null
                                    }
                          
            <Row gutter={[24, 24]}>
              
                <Col span={24} >
            <Card
                      style={{backgroundColor: "#fafafa",
                        border: "1px solid #f5f5f5"}}
                              >
                                  
                                  
                                <Skeleton  loading={false} avatar active>
                              
                                  <Meta
                                    avatar={<Avatar src={require("../assets/images/logo.png").default} />}
                                    title="Compound your Profits"
                                    
                                         />
                                         <div align="middle">
                                      <h6></h6>
                                      </div>
                                         <div align="middle"className="ant-card-meta-description">
                                         <Divider><p>Chose your compounding period</p></Divider>
                                                <p>your interests will be rolled over and added to your Capital, to increase ROI(Return On Investment)</p>

                                                <Divider><p>Current Capital:</p> <span style={{ color: "#22cccc" }}>${balance}</span></Divider>
                                         </div>
                                  
                                </Skeleton>
                        <br/>
                      
                      <div align="middle">
         
                      
                            <Select
defaultValue={6}
    onChange={onChange}
    style={{ width: 120 }}

    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    <Option value={6}>6 months</Option>
    <Option value={8}>8 months</Option>
    <Option value={10}>10 months</Option>
    <Option value={12}>12 months</Option>
  </Select><br/><br/>

                        <small>Note: You can't withdraw during compounding period</small><br />
                      {balance > 999?
                      <>
                      {!load?
                      <Popconfirm
                      title="Are you sure you want to Compound?"
                      onConfirm={confirm}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                       <Button type="primary" onClick={()=>compound()}>Compound</Button>

</Popconfirm>
: 
<Spin size="large"/>
}</>:

<Button type="primary" disabled>Compound</Button>

}
                      </div>
                      
                              </Card>
                              </Col>  </Row>
             </Card>
             </Col>
             
  </Row>}  </div>         
         
            </div>
        </>
    )
}


export default Compound;
