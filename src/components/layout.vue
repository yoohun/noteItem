<template>
    <Layout class='layout'>
        <Header class='header'>
            <Row>
                <i-col span='3' offset='1'>
                    <img src="../../static/logo1.png" alt="logo" class="logo">
                </i-col>
                <i-col span='14'>
                    <h2 class='headerTitle'>保持进步,随时印象笔记</h2>
                </i-col>
                <i-col span='4'>
                    <Row>
                        <i-col span='8'>
                            <Dropdown>
                                <Avatar src='https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar'></Avatar>
                                <DropdownMenu slot="list">
                                    <DropdownItem>我的主页</DropdownItem>
                                    <DropdownItem>收藏</DropdownItem>
                                    <DropdownItem>
                                        设置
                                        <Badge status="error" />
                                    </DropdownItem>
                                    <DropdownItem divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </i-col>
                        <i-col span='8'>
                            <Dropdown>
                                <Badge :count="count" :offset="[20,4]">
                                    <Icon type="md-notifications-outline" size="24" />
                                </Badge>
                                <DropdownMenu slot="list">
                                    <Tabs value='notice'>
                                        <Tab-pane label="通知内容" name='notice'>
                                            <div class='notice'>通知内容</div>
                                        </Tab-pane>
                                        <Tab-pane label="关注内容" name='follow'>
                                            <div class='notice'>关注内容</div>
                                        </Tab-pane>
                                        <Tab-pane label="系统内容" name='system'>
                                            <div class='notice'>系统内容</div>
                                        </Tab-pane>
                                    </Tabs>
                                </DropdownMenu>
                            </Dropdown>
                        </i-col>
                        <i-col span='8'>
                            <Icon type="md-color-palette" size='24' @click="openColor=true"></Icon>
                        </i-col>
                    </Row>
                </i-col>
            </Row>
        </Header>
        <Layout>
            <Sider class="sider" width="240" collapsible v-model="isCollapsed" :class="{ 'siderHide': isCollapsed }">
                <Menu class="siderMenu" theme="dark" active-name="option2">
                    <MenuItem name="option1">
                        <Icon type="ios-search"></Icon>
                        <span>笔记本列表</span>
                    </MenuItem>
                    <MenuItem name="option2">
                        <Icon type="ios-apps"></Icon>
                        <span>笔记列表</span>
                    </MenuItem>
                    <MenuItem name="option3">
                        <Icon type="ios-bookmark"></Icon>
                        <span>回收站</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Content class="content" :class="{ 'contentExpand': isCollapsed }">
                <button @click='clickData'>afssfef</button>

            </Content>
        </Layout>
            <Drawer title="选择配色" v-model="openColor" :closable="false">
            </Drawer>
    </Layout>
</template>

<script>
import Auth from '../api/auth'
    export default {
        data () {
            return {
                activeName: this.$route.path,
                count:2,
                isCollapsed: false,
                openColor: false,
                loginForm: {
                    'asdasd': 'asdasdas'
                }
            }
        },
        created () {
            this.activeName = this.$route.path
        },
        methods: {
            clickData() {
                console.log(1111)
                Auth.login(this.loginForm).then(res=>{
                    //this.$Message.success('Success!');
                    this.$router.push('/notebooks')
                  }).catch(err=>{
                      console.log(err)
                  })
            },
            // handleSubmit(name) {
            //     this.$refs[name].validate((valid) => {
            //         if (valid) {
            //             this.$Message.success('提交成功!');
            //         } else {
            //             this.$Message.error('表单验证失败!');
            //         }
            //     })
            // }
        }
    };
</script>

<style>
.layout {
    min-height: 100vh
}
.header{
    height: 60px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background: #ffffff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.logo{
    height: 50px;
    margin-top: 5px;
}
.headerTitle{
    font-size: 20px;
}
.sider{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
}
.siderMenu{
    margin-top: 60px
}
.siderHide .ivu-menu-item span{
    display: none;
}
.notice{
    text-align: center;
    line-height: 200px;
}
.ivu-menu {
    text-align: left
}
.ivu-menu-horizontal.ivu-menu-light:after{
     display: none;
}
.sider{
    position: fixed;
    height: 100%;
    left: 0;
    overflow: auto;
    z-index: 1;
}
.content{
    margin-left: 260px;
    margin-top: 60px;
    padding: 16px;
    transition: all .2s ease-in-out;
    overflow: auto
}
.contentExpand{
    margin-left: 84px;
}

</style>