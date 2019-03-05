<template>
    <Layout class='layout'>
        <Header class="header">
            <Row>
                <i-col span="3" offset="1">
                    <img src="../../static/logo1.png" alt="logo" class="logo">
                </i-col>
                <i-col span="14">
                    <h1 style='font-weight: 400;font-size: 20px;margin-left:0'>保持进步,随时印象笔记</h1>
                </i-col>
                <i-col span="4" style='float: right'>
                    <Row>
                        <i-col span="8">
                            <Dropdown>
                                <Avatar src="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"></Avatar>
                                <DropdownMenu slot="list">
                                    <DropdownItem key='myIndex'>我的主页</DropdownItem>
                                    <DropdownItem key='mySC'>我的收藏</DropdownItem>
                                    <DropdownItem key='setting'>
                                        设置
                                        <Badge status="error" />
                                    </DropdownItem>
                                    <DropdownItem divided @click.native='logOut'>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </i-col>
                        <i-col span="8">
                            <Dropdown>
                                <Badge :count="count" :offset="[20,4]">
                                    <Icon type="md-notifications-outline" size="24" />
                                </Badge>
                                <DropdownMenu slot="list">
                                    <Tabs value="notice">
                                        <TabPane label="通知" name="notice">
                                            <div class="notification">通知内容</div>
                                        </TabPane>
                                        <TabPane label="关注" name="follow">
                                            <div class="notification">关注内容</div>
                                        </TabPane>
                                        <TabPane label="系统" name="system">
                                            <div class="notification">系统内容</div>
                                        </TabPane>
                                    </Tabs>
                                </DropdownMenu>
                            </Dropdown>
                        </i-col>
                        <i-col span="8">
                            <Icon type="md-color-palette" size="24" @click="openTheme = true" />
                        </i-col>
                    </Row>
                </i-col>
            </Row>
        </Header>
        <Layout>
            <Sider class="sider" width="240" collapsible v-model="isCollapsed" :class="{ 'siderHide': isCollapsed }">
                <Menu class="siderMenu" theme="dark" active-name='/notebooks'>
                    <MenuItem name="/notebooks" to='/notebooks'>
                        <Icon type="ios-search"></Icon>
                        <span>笔记本列表</span>
                    </MenuItem>
                    <MenuItem name="/notes"  to='/notes'>
                        <Icon type="ios-apps"></Icon>
                        <span>笔记列表</span>
                    </MenuItem>
                    <MenuItem name="/trash"  to='/trash'>
                        <Icon type="ios-bookmark"></Icon>
                        <span>回收站</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Content class="content" :class="{ 'contentExpand': isCollapsed }">
               <router-view></router-view>
            </Content>
        </Layout>
        <Drawer title="选择配色" v-model="openTheme" :closable="false">
        </Drawer>
    </Layout>
</template>
<script>
import Auth from '../api/auth'
    export default {
        props: {},
        data () {
            return {
                count: 2,
                openTheme: false,
                isCollapsed: false,
                notebookid: 0
            };
        },
        methods: {
            logOut () {
                Auth.logout().then(res=>{
                    this.$Message.success('注销成功');
                    this.$router.push('/login')
                }).catch(err=>{
                    console.log(err);
                })
            }
        }
    };
</script>

<style scoped>
    .layout {
      min-height: 100vh
    }
    .header{
        width: 100%;
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.05);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 5;
    }
    .logo{
        height: 50px;
    }
    .notification{
        text-align: center;
        height: 200px;
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
    .siderMenu{
        margin-top: 60px;
    }
    .siderHide .ivu-menu-item span{
        display: none;
    }
    .content{
        margin-left: 240px;
        margin-top: 60px;
        transition: all .2s ease-in-out;
        overflow: auto
    }
    .contentExpand{
        margin-left: 64px;
    }
</style>