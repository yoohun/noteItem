<!--  -->
<template>
  <Layout class='layout'>
    <Header class='header'>
      <Row>
        <i-col span='3' offset='1'>
          <img src="../../static/logo1.png" alt="logo" class='logo'>
        </i-col>
        <i-col span='14'>
          <h2 class='headerTitle'>保持进步，随时印象笔记!</h2>
        </i-col>
        <i-col span='4'>
          <Row>
            <i-col span='8'>
              <Dropdown>
                <Avatar src='https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar'></Avatar>
                <DropdownMenu slot="list">
                  <DropdownItem >我的主页</DropdownItem>
                  <DropdownItem >收藏</DropdownItem>
                  <DropdownItem>设置
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
                  <Tabs active-key="关注内容">
                    <Tab-pane label="关注内容" key="关注内容" >
                      <div class='tabClass'>关注内容</div>
                      </Tab-pane>
                    <Tab-pane label="通知内容" key="通知内容"  ><div class='tabClass'>通知内容</div></Tab-pane>
                    <Tab-pane label="系统内容" key="系统内容" ><div class='tabClass'>系统内容</div></Tab-pane>
                  </Tabs>
                </DropdownMenu>
              </Dropdown>
            </i-col>
            <i-col span='8'>
              <Icon type="md-color-palette" size=24 @click='openColor=true'></Icon>
            </i-col>
          </Row>
        </i-col>
      </Row>
    </Header>
    <Layout>
      <Sider class="sider" width="240" collapsible v-model="isCollapsed" :class="{siderHide : isCollapsed}">
        <Menu class='siderMenu' theme='dark' active-name='笔记列表'>
          <MenuItem name='笔记本列表'>
            <Icon type="ios-search" size='20'></Icon>
            <span>笔记本列表</span>
          </MenuItem>
          <MenuItem name='笔记列表'>
            <Icon type="ios-bookmark" size='20'></Icon>
            <span>笔记列表</span>
          </MenuItem>
          <MenuItem name='回收站'>
            <Icon type="ios-trash" size='20'></Icon>
            <span>回收站</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Content class="content" :class="{ 'contentExpand': isCollapsed }">
        <button @click='clickData'></button>
      </Content>
    </Layout>
    <Drawer title="选择配色" v-model="openColor" :closable="false"></Drawer>
  </Layout>
</template>

<script>
export default {
  data () {
    return {
      activeName: this.$route.path,
      count: 2,
      openColor: false,
      isCollapsed: false
    }
  },
  methods: {
    clickData() {
      console.log(111)
    }
  }
}

</script>
<style scoped>
.header{
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: #ffffff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .2)
}
.logo{
  height: 50px;
  margin-top: 5px;
}
.headerTitle{
  font-size: 20px;
}
.tabClass{
  line-height: 150px;
  text-align: center;
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
.ivu-menu {
    text-align: left
}
.ivu-menu-horizontal.ivu-menu-light:after{
     display: none;
}
.siderHide .ivu-menu-item span{
    display: none;
}
.content{
    margin-left: 260px;
    margin-top: 60px;
    padding: 16px;
    transition: all .2s ease-in-out;
    overflow: auto;
    z-index: 11
}
.contentExpand{
    margin-left: 84px;
}
</style>