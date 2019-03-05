<template>
  <div>
    <div class='out'>
      <div class='logo'>
        <img src="../../static/logo.png" alt="">
        <p>记录一切重要事项。</p>
      </div>
      <Tabs>
          <TabPane name='login'  label="登录" >
            <i-form ref='loginUser' :model='loginUser' :rules="ruleLogin" >
              <Form-item prop="username">
                <i-input prefix="ios-person-outline"  size='large' type='text' v-model.trim='loginUser.username' placeholder="Username">
                </i-input>
              </Form-item>
              <Form-item prop="password">
                <i-input prefix="ios-person-outline"  size='large' type='password' v-model.trim='loginUser.password' placeholder="Password">
                </i-input>
              </Form-item>
              <Form-item>
                <i-button type="success" long @click="loginTest('loginUser')">登录</i-button>
              </Form-item>
            </i-form>
          </TabPane>
          <TabPane name='regist'  label="注册" >
            <i-form ref='registUser' :model='registUser' :rules="ruleRegister">
              <Form-item prop="username">
                <i-input prefix="ios-person-outline"  size='large' type='text' v-model.trim='registUser.username' placeholder="Username">
                </i-input>
              </Form-item>
              <Form-item prop="password">
                <i-input prefix="ios-person-outline"  size='large' type='password' v-model.trim='registUser.password' placeholder="Password">
                </i-input>
              </Form-item>
              <Form-item>
                <i-button type="success" long  @click="registTest('registUser')">注册</i-button>
              </Form-item>
            </i-form>
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
      loginUser: {
        username: '',
        password: ''
      },
      registUser: {
        username: '',
        password: ''
      },
      searchData: {

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
    };
  },
  methods: {
    loginTest (name) {
      this.$refs[name].validate((valid) => {
                if (valid) {
                  Auth.login(this.loginUser).then(res=>{
                    this.$store.dispatch('getUserInfo').then(response=>{
                    this.$refs[name].resetFields()
                    this.$router.push('/notebooks')
                    this.$Message.success({
                        content: `${res.data.username},欢迎您使用印象笔记`,
                        duration: 6
                  })
                })
                  }).catch(err=>{
                      console.log(err)
                  })
                } else {
                    this.$Message.error('Fail!');
                }
            })

    },
    onLogin(name) {
      this.$refs[name].validate((valid) => {
            if (valid) {
              Auth.login(this.loginForm).then(
                res=>{
                // 获取用户信息
                this.$store.dispatch('getUserInfo').then(response=>{
                  this.$refs[name].resetFields()
                   this.$router.push('/notebooks')
                   this.$Message.success({
                      content: `${res.data.username},欢迎您使用印象笔记`,
                      duration: 6
                  })
                })
                }
              ).catch(err=>{
                  this.$Message.error(err.msg)
              })
            } else {
                return
            }
          })
    },
    registTest (name) {
      this.$refs[name].validate((valid) => {
                if (valid) {
                  Auth.register(this.registUser).then(res=>{
                    //this.$Message.success('Success!');
                    this.$refs[name].resetFields()

                  }).catch(err=>{
                      console.log(err)
                  })
                } else {
                    this.$Message.error('Fail!');
                }
            })
    },
    search () {
      Auth.getInfo().then(res=>{
                    //this.$Message.success('Success!');
                    console.log(res);

        }).catch(err=>{
          console.log(err)
      })
    },
    getData () {
      Auth.note().then(res=>{
      }).catch(err=>{
        console.log(err);
      })
    }
  }
}

</script>
<style scoped>
.out{
  position: absolute;
  left: 50%;
  top: 50%;
  width: 60vh;
  height: 85vh;
  border: 1px solid #eee;
  transform: translate(-50%, -50%);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 80px;
}
.logo{
  text-align: center
}
.logo img{
  width: 60%;
}
.logo p{
  font-size: 14px;
  line-height: 20px;
}
.ivu-tabs{
  position: relative;
  top: 40px
}
</style>