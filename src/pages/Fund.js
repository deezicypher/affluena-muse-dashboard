import React, { useState } from "react";

import {useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import axios from "../config";
import { toast } from 'react-hot-toast';
import moment from "moment";
// reactstrap components
import { Redirect } from "react-router-dom";

	

import { Skeleton, Statistic, Card, Col, Row, Avatar,Button,InputNumber,Divider, Spin } from 'antd';
import { useStateContext } from "../context/stateContext";

const { Countdown } = Statistic;
const { Meta } = Card;

const deadline = moment().add(15, 'minutes');

// Moment is also OK

const Cart = () => {

  const {user} = useStateContext();
    const [samount, setSAmount] = useState();
    const [camount, setCAmount] = useState();
 
  const {userId , token} = user


  const handleS = e => {
    console.log(e.target.value)
    const val = e.target.value
    if (val < 200000){
      toast.error("Minimum amount of ₦200,000")
    }
    else{
      setSAmount(val)
    }
  }
     
  const handleC = e => {
    const val = e.target.value
    if (val < 400000){
      toast.error("Minimum amount of ₦400,000")
    }
    else{
      setCAmount(val)
    }
  }
  const config = {
    public_key: 'FLWPUBK_TEST-3a64c5ec380c5682e3877964a5af2972-X',
    tx_ref: Date.now(),
    amount: samount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
       phone_number: '070********',
      name: 'john doe',
    },
    customizations: {
      title: 'Simple Interest',
      description: 'Payment for Compound Interest',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };
  const configC = {
    public_key: 'FLWPUBK_TEST-3a64c5ec380c5682e3877964a5af2972-X',
    tx_ref: Date.now(),
    amount: camount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
       phone_number: '070********',
      name: 'john doe',
    },
    customizations: {
      title: 'Compound Interest',
      description: 'Payment for Compound Interest',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };
  const handleFlutterPayment =  useFlutterwave(config)


  const handleFlutterCPayment =  useFlutterwave(configC)

  const uid = function(){
    return Date.now().toString(12) + Math.random().toString(20).substr(12);
}
  const postpay = async (amount,product,duration, proof,ftxid) => {
 
    const txid = uid()
    let form_data = new FormData();
    form_data.append('customer',userId)
    form_data.append('product',product)
    form_data.append('amount', amount)
    form_data.append('duration', parseInt(duration))
    form_data.append('status', "Pending")
    form_data.append("txid", txid)
 


    

      
    
      /*const user = {
          customer: user_id,
          product: product,
          amount: dollar,
          duration: duration,
          txid: transaction_id,
          status: "Approved",
          tx_ref:tx_ref,
          flw_ref:flw_ref
      }
      const omo = {
          customer: 82,
          product: 'Compound Interest',
          duration: sduration,
          amount: simpleAmount,
          txid: "fjfjkjkjfj",
          status: "Approved",
          tx_ref:"i9ruiruiuiue9",
          flw_ref:"eieinejuiiuiu3u33"
      }*/
      try {
        
       axios.defaults.headers = {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
          
      }
   
      const detail = await axios.post('/api/post-order/', form_data,{ headers: {
        'content-type': 'multipart/form-data'
      }}).then(res => res.data)
              if(detail.status == 201){
                toast.success('Successfully submitted, pending approval ') 
                setTimeout(() => {
                  
                 <Redirect to="/user/tx" />;
                }, 2000);
                
              }

          }catch(err) {
            toast.error("Can't proceed further at the moment ")
           
          }

  }





        return (
            <>
                <div >
      
                    <Row>

                            <div >
                            <Row className="rowgap-vbox" gutter={[24, 0]}>
                        <Col    xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              className="mb-24">
                          <Card
                              
                              
                            >
                                
                                
                              <Skeleton  loading={false} avatar active>
                            
                                <Meta
                                  avatar={<Avatar src={require("../assets/images/logo.png").default} />}
                                  title="Simple Interest Investor"
                                  
                                       />
                                      
                                      
                                       <div align="middle">
                                    <h6></h6>
                                    </div>
                                       <div align="middle"className="ant-card-meta-description">
                                       <Divider>min - 200,000</Divider>
                                       
                                           
                                       </div>
                                
                              </Skeleton>
                      <br/>
                    
                    <div align="middle">
                       Amount:  <br/><InputNumber style={{ width: 120 }} align="middle"
                          min={1000} max={9999}
                          formatter={value => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/\₦\s?|(,*)/g, '')}
                          onChange={value => setSAmount(value)}
                          
                        /><br/><br/>
                    
                   
                    <button className="flutterwave-btn"
                    style={{backgroundColor:"#f5a623",borderRadius:'5px',padding:'5px 10px', color:"#ffffff", border:"none"}}
        onClick={samount? () => {
          handleFlutterPayment({
            callback: (response) => {
               console.log(response);
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }: handleS}
      >
        Pay with Flutterwave
      </button>   
                    </div>
                    
                            </Card>
                          </Col>
                          <Col  xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              className="mb-24">
                          <Card
                              
                              
                            >
                                
                                
                              <Skeleton  loading={false} avatar active>
                            
                                <Meta
                                  avatar={<Avatar src={require("../assets/images/logo.png").default} />}
                                  title="Compound Interest Investor"
                                  
                                       />
                                       <div align="middle">
                                    <h6></h6>
                                    </div>
                                    <div align="middle"className="ant-card-meta-description">
                                       <Divider>min - 400,000</Divider>
                                       
                                           
                                       </div>
                                
                              </Skeleton>
                      <br/>
                    
                    <div align="middle">
                      Amount:  <br/><InputNumber style={{ width: 120 }} align="middle"
                          min={10000} max={49999}
                          formatter={value => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/\₦\s?|(,*)/g, '')}
                          onChange={value => setCAmount(value)}
                          
                          /><br/><br/>
                      
                     
                      <button className="flutterwave-btn"
                    type="secondary"
                    style={{backgroundColor:"#f5a623",borderRadius:'5px',padding:'5px 10px', color:"#ffffff", border:"none"}}
        onClick={camount? () => {
          handleFlutterPayment({
            callback: (response) => {
               console.log(response);
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }: handleC}
      >
        Pay {camount} with Flutterwave
      </button> 
                    </div>
                    
                            </Card>
                          </Col>
                      
                           </Row>
                      
                      
            
                      </div>
           
                    </Row>

                </div>
            </>
        );
    }


export default Cart;