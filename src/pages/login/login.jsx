import React, {Component} from 'react'
import './login.less'
import logo from './images/logo.png'
import {reqLogin} from '../../api'
import { 
   Form, 
   Input, 
   Button, 
   Checkbox,
   message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
/*login Component*/
class login extends Component {
      validatePwd = (rule, value, callback) => {
         console.log('validatePwd()', rule, value)
         if(!value) {
         callback('密码必须输入')
         } else if (value.length<4) {
         callback('密码长度不能小于4位')
         } else if (value.length>12) {
         callback('密码长度不能大于12位')
         } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
         callback('密码必须是英文、数字或下划线组成')
         } else {
         callback() // 验证通过
         }
         // callback('xxxx') // 验证失败, 并指定提示的文本
      }
      render () {
      
         const onFinish = async (values) => {
               console.log('Received values of form: ', values);
                      // 请求登陆
               const {username, password} = values
               const result = await reqLogin(username, password); // {status: 0, data: user}  {status: 1, msg: 'xxx'}
               // console.log('请求成功', result)
               if (result.status===0) { // 登陆成功
                  // 提示登陆成功
                  message.success('登陆成功')

                  // 保存user
                  //const user = result.data
                  //memoryUtils.user = user // 保存在内存中
                  //storageUtils.saveUser(user) // 保存到local中

                  // 跳转到管理界面 (不需要再回退回到登陆)
                  this.props.history.replace('/')

               } else { // 登陆失败
                  // 提示错误信息
                  message.error(result.msg)
               }
         };
         const onFinishFailed = errorInfo => {//错误的提示
               console.log('Failed:', errorInfo);
           };
         return <div className="login">
                  <header className="login-header">
                     <img src={logo} alt="logo"/>
                     <h1>React项目: 后台管理系统</h1>
                  </header>
                  <section className="login-content">
                     <h2>用户登陆</h2>
                     <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                        remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="on"
                     >
                        <Form.Item
                        name="username"
                        initialValue='admin'
                        rules={[
                           {
                              required: true,
                              message: 'Please input your Username!',
                           },
                           {
                              min: 4,
                              message: '用户名至少4位',
                           },
                           {
                              max: 12,
                              message: '用户名最多12位',
                           },
                           {
                              pattern: /^[a-zA-Z0-9_]+$/,
                              message: '用户名必须是英文、数字或下划线组成',
                           },
                        ]}
                        >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                        name="password"
                        rules={[
                           {
                              validator: this.validatePwd
                           },
                        ]}
                        >
                        <Input
                           prefix={<LockOutlined className="site-form-item-icon" />}
                           type="password"
                           placeholder="密码"
                           
                        />
                        </Form.Item>
                        <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                           登录
                        </Button>
                        </Form.Item>
                     </Form>
                  </section>
               </div>
     }
   };
   export default login