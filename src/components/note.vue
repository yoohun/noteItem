<template>
  <div class="login">
    <div class="container">
      <div class="logo">
        <img src="../../static/logo.png" alt="">
        <p>记录一切重要事项。</p>
      </div>
      <Tabs>
        <TabPane label="登录" >
          <Form ref="loginForm" :model="loginForm" :rules="ruleLogin" >
            <FormItem prop="username">
                <i-input prefix="ios-person-outline" type="text" v-model.trim="loginForm.username" placeholder="Username" size='large'>
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </i-input>
            </FormItem>
            <FormItem prop="password">
                <i-input prefix="ios-lock-outline" type="password" v-model.trim="loginForm.password" placeholder="Password" size='large'>
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </i-input>
            </FormItem>
            <FormItem>
                <Button long type="primary" @click="onLogin('loginForm')">登 录</Button>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane label="注册" >
          <Form ref="registerForm" :model="registerForm" :rules="ruleRegister" >
            <FormItem prop="username">
                <i-input prefix="ios-person-outline" type="text" v-model.trim="registerForm.username" placeholder="Username" size='large'>
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </i-input>
            </FormItem>
            <FormItem prop="password">
                <i-input prefix="ios-lock-outline" type="password" v-model.trim="registerForm.password" placeholder="Password" size='large'>
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </i-input>
            </FormItem>
            <FormItem>
                <Button long type="primary" @click="onRegister('registerForm')">注 册</Button>
            </FormItem>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import Auth from '../api/auth'
export default {
  data () {
        return {
            loginForm: {
              username: '',
              password: ''
            },
            registerForm: {
              username: '',
              password: ''
            },
            ruleLogin: {
                username: [
                    { required: true , message: '用户名不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, max:10, message: '密码长度为6-10个字符', trigger: 'blur' }
                ]
            },
            ruleRegister: {
              username: [
                    { required: true , message: '用户名不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, max:10, message: '密码长度为6-10个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        onLogin(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                  Auth.login(this.loginForm).then(res=>{
                    //this.$Message.success('Success!');
                    this.$refs[name].resetFields()
                    this.$router.push('/notebooks')
                  }).catch(err=>{
                      console.log(err)
                  })
                } else {
                    this.$Message.error('Fail!');
                }
            })

        },
        onRegister(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                    this.$refs[name].resetFields()
                } else {
                    // this.$Message.error('Fail!');
                }
            })

        },

    }
}
</script>

<style lang="less" scoped>
.login {
  .container {
    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60vh;
    height: 85vh;
    border: 1px solid #eee;
    padding: 80px;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    .logo {
      margin-bottom: 18px
    }
    img {
      width: 60%;
    }
    p {
      font-size: 14px;
    }
  }
}
</style>


