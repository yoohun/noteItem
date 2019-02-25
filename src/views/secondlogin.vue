<!--  -->
<template>
  <div>
    <div class='out'>
      <div class='logo'>
        <img src="../../static/logo.png" alt="">
      </div>
      <div class='tabContent'>
        <Tabs>
          <TabPane label='登录'>
            <i-form ref='loginInfor' :model='loginInfor' :rules='rulelogin'>
              <Form-item prop='username'>
                <i-input placeholder='username' type='text' prefix='ios-person-outline' large v-model.trim="loginInfor.username"></i-input>
              </Form-item>
              <Form-item prop='password'>
                <i-input placeholder='password' type='password' prefix='ios-person-outline' large v-model.trim="loginInfor.password"></i-input>
              </Form-item>
              <Form-item>
                <i-button type='success' long @click="loginIn('loginInfor')">登录</i-button>
              </Form-item>
            </i-form>
          </TabPane>
          <TabPane label='注册'>
            <i-form ref='registInfor' :model='registInfor' :rules='ruleregist'>
              <Form-item prop='username'>
                <i-input placeholder='username' type='text' prefix='ios-person-outline' large v-model.trim="registInfor.username"></i-input>
              </Form-item>
              <Form-item prop='password'>
                <i-input placeholder='password' type='password' prefix='ios-person-outline' large v-model.trim="registInfor.password"></i-input>
              </Form-item>
              <Form-item>
                <i-button type='success' long @click="registIn('registInfor')">登录</i-button>
              </Form-item>
            </i-form>
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '../api/auth'
export default {
  data () {
    return {
      loginInfor: {
        username: '',
        password: ''
      },
      registInfor: {
        username: '',
        password: ''
      },
      rulelogin:{
        username: [
          {required: true, message: '请输入用户名'},
          {type:'string',min:3,max:15,message:'请输入3-15个字符',trigger :'blur',pattern: /^[a-zA-Z0-9_]{3,15}$/},
        ],
        password: [
          {required: true, message: '请输入密码'},
          {type:'string',min:6,max:16,message:'请输入6-16个字符',trigger :'blur',pattern: /^[a-zA-Z0-9]{6,16}$/},
        ]
      },
      ruleregist:{
        username: [
          {required: true, message: '请输入用户名'},
          {type:'string',min:3,max:15,message:'请输入3-15个字符',trigger :'blur',pattern: /^[a-zA-Z0-9_]{3,15}$/},
        ],
        password: [
          {required: true, message: '请输入密码'},
          {type:'string',min:6,max:16,message:'请输入6-16个字符',trigger :'blur',pattern: /^[a-zA-Z0-9]{6,16}$/},
        ]
      }
    };
  },

  methods: {
    loginIn (name) {
      console.log(11)
      this.$refs[name].validate(valid=>{
        if(valid) {
          console.log(11)
          Auth.login(this.loginInfor).then(res=>{
            this.$Message.success('Success!');
            this.$refs[name].resetFields()
          }).catch(err=>{
            console.log(err);

          })
        } else {
          this.$Message.err('Fail!')
        }
      })
    },
    registIn (name) {
      this.$refs[name].validate(valid=>{
        if(valid){
          Auth.register(this.registInfor).then(res=>{
            this.$Message.success('注册成功')
            console.log(11111);
          }).catch(errs=>{
            this.$Message.err(errs)
          })
        } else {
          this.$Message.err('出错')
        }
      })
    }
  }
}

</script>
<style lang='less' scoped>
.out{
  position: absolute;
  left: 50%;
  top: 50%;
  height: 80vh;
  width: 65vh;
  transform: translate(-50%,-50%);
  background: #ffffff;
  box-shadow: 0 4px  24px rgba(0, 0, 0, 0.2);
  padding: 80px;
  .logo{
    text-align: center;
    img {
      width:60%;
    }
  }
}
</style>