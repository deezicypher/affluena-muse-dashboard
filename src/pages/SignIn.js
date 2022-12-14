import React,{useEffect,useState} from 'react';


import { Form, Input,Button } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';

import { useStateContext } from '../context/stateContext';


const Option = ({
  ...props
}) => {

  

  const {user,login} = useStateContext()
    

  const [formData, setFormData] = useState({
    email: "",
    password: ""
})
const {email, password} = formData 
  const handleChange = key => e => {
          
    setFormData({ ...formData, [key]: e.target.value })
  
}
  const onFinish = values => {
   login({email, password});
  };


 



useEffect(() => {
window.scrollTo(0, 0)
},[])


  return (
    <section
      {...props}
      
    >
      <div className="container">
        <div >

          <div >

       
            <div className="tiles-item reveal-from-bottom">
         
            <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
    <Form.Item
        name="email"
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
        <Input onChange={handleChange("email")} prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
        onChange={handleChange("password")}
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        

        <Link className="login-form-forgot" to="/ForgotPassword">
          Forgot password?
        </Link>
      </Form.Item>
<div className="center-content">
      <Form.Item>
        <Button type="primary" htmlType="submit" >
          Log in
        </Button>
       
      </Form.Item>
      </div>
    </Form>
              
                </div>

       
  </div>         
           
           
            </div>
</div>
        
    </section>
  );
}



export default Option;