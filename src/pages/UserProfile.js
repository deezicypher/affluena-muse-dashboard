import React,{useState, useEffect} from "react";
import axios from "../config";
import moment from 'moment';


import {  Row,
    Col,
    Card,Button,Divider, Alert,Spin, Form, Space,Input } from 'antd';

    import PhoneInput from 'react-phone-number-input'
import { useStateContext } from "../context/stateContext";


const { Meta } = Card;
const UserProfile = () => {


    const [detail, setDetail] = useState("")
    const [error, setError] = useState("")
    const [passdetail, setPDetail] = useState("")
    const [passerror, setPerror] = useState("")
    const [pass2error, setP2error] = useState("")
    const [oldpasserror, setOPerror] = useState("")
   const {user} = useStateContext();
   const {token,  userId } = user;
    
 
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        name: "",
        country:"",
        city: "",
        address: "",
        bank_name: "",
        account_name:"",
        account_no: "",
        state: "",
        old_password:"",
        new_password1: "",
        new_password2: "",
     
    })
    
    const {username,email,phone,name,country,city, new_password1,new_password2,old_password} = formData
    

      const [form] = Form.useForm();
      const [form2] = Form.useForm();
      const handleChange = key => e => {
        setFormData({ ...formData, [key]: e.target.value })
    
    }
    const [loading, setLoad] = useState(false)
    const [passload, setPLoad] = useState(false)
    
    const [phoneErr, setPhoneErr] = useState("")
    

    const onFinish = () => {
        setLoad(true)
        axios.default.headers = {
            "Content-Type": 'multipart/form-data',
            Authorization: `Token ${token}`
          }
          const user = {
              "full_name":name,
              "email":email,
              "phone":phone,
              "country":country,
             
          }
          
          axios.put(`/rest-auth/update-profile/${userId}/`, user)
            .then(res => {
              window.scrollTo(0, 0)
              setDetail('Updated')
              const userE = JSON.parse(localStorage.getItem("detail"));
              if (userE) {
    
                {
                  email === userE.email ?
                    setDetail('Updated')
                    :
                    setDetail("Updated. Confirm New Email.. check your mail")
                }
                setLoad(false)
              }
              setLoad(false)
            
            }
    
            ).catch(err => {
             setError("Sorry you can't proceed further at the moment")
              setLoad(false)
            })
      };

    
    const handleWallet = (btc_wallet) => {
        
        let WAValidator = require('wallet-address-validator');
    
        let formIsValid = true;
        if (btc_wallet) {
          btc_wallet.split(' ').join('');
    
          let valid = WAValidator.validate(btc_wallet, 'BTC');
          if (!valid) {
            formIsValid = false
               }
    
  
          return formIsValid;
        }
        // This will log 'This is a valid address' to the console.
      }
    
    
      const handlePassChange = ()  => {
       
    
        const pass = {
          new_password1: new_password1,
          new_password2: new_password2,
          old_password: old_password
        }
        console.log(pass)
          setPLoad(true)
          axios.default.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          }
          axios.post('/rest-auth/password/change/', pass)
            .then(res => {
              setPDetail(res.data.detail)
              setPLoad(false)
            }).catch(err => {
                console.log(err.response)
              if (err.response.data.new_password2){
                    
                setP2error(err.response.data.new_password2[0])  
                setPLoad(false)
        }else if(err.response.data.new_password1){
            
                setPerror(err.response.data.new_password1[0])  
                setPLoad(false)
            }
            else if(err.response.data.old_password[0]){
            
              setOPerror(err.response.data.old_password[0])  
              setPLoad(false)
          }
            }) 
          setPLoad(false)
       
      }
      
    const formItemLayout = {
        labelCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 24,
          },
        },
        wrapperCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 24,
          },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 24, 
            offset: 0,
          },
        },
      };

  useEffect(() => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    }
  
    axios.get('/rest-auth/user/')
      .then(res => {
        form.setFieldsValue({
            username: res.data.username,
            email:res.data.email,
            name:res.data.full_name,
            country:res.data.country,
            phone:res.data.phone

          });
          setFormData({...formData, 
            email:res.data.email,
           
            name:res.data.full_name,
            country:res.data.country,
            phone:res.data.phone



         })
        
       
        const oldemail = {
          email: res.data.email
        }
        localStorage.setItem("detail", JSON.stringify(oldemail));


      }


      )
  }, [])


    return (
        <>
            
           
            <Col span={24} md={16} className="mb-24">
          <Card
            className="header-solid h-full"
            bordered={false}
            title={[<h6 className="font-semibold m-0"> Account</h6>]}
            bodyStyle={{ paddingTop: "0" }}
          >
            <Form
                {...formItemLayout} layout={'vertical'}
                form={form} 
                name="register"
                onFinish={onFinish}
                scrollToFirstError={true}
               
              >
      

                <Row>
                
                <Col xs={24} xl={12} style={{ padding: "10px" }}>
                    <Form.Item
                      onChange={handleChange('username')}
                      name="username"
                      label="Username"
                    
                      
                    >
                      <Input  value="jhshshj" disabled={true}  />
                    </Form.Item>
                  </Col>
                  <Col xs={24} xl={12} style={{ padding: "10px" }}>
                    <Form.Item
                      onChange={handleChange('name')}
                      name="name"
                      label="Name"
                      value={name}
                      rules={[
                        {
                          required: true,
                          message: 'Please input your Full Name',
                        },
                      ]}
                    >
                      <Input   />
                    </Form.Item>
                  </Col>
                  

                
                  <Col xs={24} xl={12} style={{ padding: "10px" }}>
                    <Form.Item
                      name="email"
                      label="E-mail"
                      value={email}
                      
                      onChange={handleChange('email')}
                      rules={[
                        {
                          type: 'email',
                          message: 'The input is not valid E-mail!',
                        },
                        {
                          required: true,
                          message: 'Please input your E-mail!',
                        },
                      ]}
                    >
                      <Input  value={email}/>
                    </Form.Item>
                  </Col>
               
                
                  <Col xs={24} xl={12} style={{ padding: "10px" }}>
                    
                    <Form.Item
                    
                      name="number"
                      label="Phone number"
                     
                      rules={[
                       
                        {
                          validator: async (rule, x=phone) => {
                            
                            if(!x){
                              throw new Error('Please input your Phone Number');
                            } 
                          }
                          
                        },
                      ]}>

<PhoneInput
defaultCountry="US"
      placeholder="Enter phone number"
      value={phone}
      onChange={value => setFormData({...formData, phone:value}) }
      onBlur={() => {
        if(!phone){
        setPhoneErr(true)
        }else{
          setPhoneErr(false)
        }
      }}
      />
  {phoneErr === true?
  <small style={{color: "#ff4d4f",fontSize:"14px"}}>Input your phone number</small>
  : null}
                    </Form.Item>
                  </Col>

                  <Col xs={24} xl={12} style={{ padding: "10px" }}>
                  <Form.Item
                      name="country"
                      label="Country"
                      onChange={handleChange('country')}
                      rules={[
                        {
                          required: true,
                          message: 'Please input your Country'
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} xl={12} style={{ padding: "10px" }}>
                  <Form.Item
                      name="state"
                      label="state"
                      onChange={handleChange('state')}
                      rules={[
                        {
                          required: true,
                          message: 'Please input your State'
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} xl={12} style={{ padding: "10px" }}>
                  <Form.Item
                      name="address"
                      label="Address"
                      onChange={handleChange('address')}
                      rules={[
                        {
                          required: true,
                          message: 'Please input your Address'
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} xl={12} style={{ padding: "10px" }}>
                  <Form.Item
                      name="bank"
                      label="Bank"
                      onChange={handleChange('bank')}
                      rules={[
                        {
                          required: true,
                          message: 'Please input your Bank Name'
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} xl={12} style={{ padding: "10px" }}>
                  <Form.Item
                      name="accountname"
                      label="Account Name"
                      onChange={handleChange('bank')}
                      rules={[
                        {
                          required: true,
                          message: 'Please input your Account Name'
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} xl={12} style={{ padding: "10px" }}>
                  <Form.Item
                      name="accountno"
                      label="Account No"
                      onChange={handleChange('accountno')}
                      rules={[
                        {
                          required: true,
                          message: 'Please input your Account No'
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                   </Row>
          
              <br/>
                {loading?
              <Space size="middle">
              <Spin size="large" />
            </Space> 
              :
              <div align="middle">
                <Form.Item {...tailFormItemLayout}>
                 
                  <Button type="primary" size="large" htmlType="submit">
        Save
           </Button> 
                </Form.Item>
                </div>
}
              </Form>
              <Divider orientation="left">Change Password</Divider>
              {passdetail ?
         
         <Alert message={passdetail} type="success" />
         :
         null
       }
              <Form
                {...formItemLayout} layout={'vertical'}
                form={form2} 
                name="pass"
                onFinish={handlePassChange}
                scrollToFirstError={true}
              >
              <Row>
              <Col xs={24} xl={12} style={{ padding: "10px" }}>
                    <Form.Item
                      name="old_password"
                      label="Old Password"
                      onChange={handleChange('old_password')}
                      rules={[
                        {
                          required: true,
                          message: 'Please input your old password!',
                        },
                        { min: 8, message: 'password must be minimum 8 characters.' },
                        () => ({
                          validator(_, value) {
                            if (value.match('(?=.*?[0-9])')) {
                              return Promise.resolve();
                            }

                            return Promise.reject(new Error('password must contain at least one digit'));
                          },
                        }),
                        
                      ]}
                      hasFeedback
                    >
                      <Input.Password />
                      </Form.Item>
                      {oldpasserror?
                    <Alert message={oldpasserror} type="error" />:null
                    }
                  
                  </Col>
                  <Col xs={24} xl={12} style={{ padding: "10px" }}>
                    <Form.Item
                      name="new_password1"
                      label="Password"
                      onChange={handleChange('new_password1')}
                      rules={[
                        {
                          required: true,
                          message: 'Please input your password!',
                        },
                        { min: 8, message: 'password must be minimum 8 characters.' },
                        () => ({
                          validator(_, value) {
                            if (value.match('(?=.*?[0-9])')) {
                              return Promise.resolve();
                            }

                            return Promise.reject(new Error('password must contain at least one digit'));
                          },
                        }),
                        
                      ]}
                      hasFeedback
                    >
                      <Input.Password />
                      </Form.Item>
                      {passerror?
                    <Alert message={passerror} type="error" />:null
                    }
                 
                  </Col>
                  <Col xs={24} xl={12} style={{ padding: "10px" }}>
                    <Form.Item
                      name="new_password2"
                      label="Confirm Password"
                      onChange={handleChange('new_password2')}
                      dependencies={['new_password1']} 
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('new_password1') === value) {
                              return Promise.resolve();
                            }

                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                          },
                        }),
                      ]}
                    >
                      <Input.Password />
                  
                   
                    </Form.Item>
                    {pass2error?
                    <Alert message={pass2error} type="error" />:null
                    }
                  </Col>
                  <Col xs={24} xl={12} style={{ padding: "10px" }}>
                  {loading?
              <Space size="middle">
              <Spin size="large" />
            </Space> 
              :
              <div align="middle">
                  <Form.Item {...tailFormItemLayout}>
                 
                 <Button type="primary" size="large"  htmlType="submit" >
       Change
          </Button> 
               </Form.Item>
               </div>
}
                      </Col>
         </Row>       
         </Form> </Card>
        </Col>
             
        </>
    )
}


export default UserProfile;
