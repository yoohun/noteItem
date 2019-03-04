<!-- -->
<template>
  <div class='noteBooks'>
    <Card style='height:100%' dis-hover>
      <Button type="success" ghost @click="modal2=true">新建笔记本</Button>
      <Modal :visible.sync="modal2" width="360"  v-model="modal2">
        <p slot="header" style="color:green;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>新建笔记本</span>
        </p>
        <div style="text-align:center">
          <i-input type='text' placeholder='请输入笔记本标题' v-model='noteTitle'></i-input>
        </div>
        <div slot="footer">
            <i-button type="success" size="large" long :loading="modal_loading" @click="addNoteBook();modal2=false" >新建笔记本</i-button>
        </div>
      </Modal>
      <Button type="success"  ghost @click='DCmodal=true'>导出笔记本</Button>
      <Modal v-model="DCmodal" width="360">
        <p slot="header" style="color:green;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>导出笔记本</span>
        </p>
        <div style="text-align:center">
            <p>确定要导出笔记本吗？</p>
        </div>
        <div slot="footer">
            <Button type="success" size="large" long @click='DCnotebook();DCmodal=false'>导出笔记本</Button>
        </div>
      </Modal>
      <i-input type='text' icon="ios-search" style="width:200px;float:right" placeholder='请输入笔记本标题' class='search' v-model="searchkey"></i-input>
      <i-table :columns="columns1" :data="noteData.slice((this.currpage-1)*10,this.currpage*10)" style="margin-top:20px" @on-row-click='handleClick'></i-table>
      <br>
      <Row type=flex justify='end'>
        <Page :page-size='10' :current='currpage' :total="noteData.length" show-total @on-change="clickpage"></Page>
      </Row>
      <Modal v-model="editbtn" width="360">
          <p slot="header" style="color:green;text-align:center">
              <Icon type="ios-information-circle"></Icon>
              <span>编辑笔记本标题</span>
          </p>
          <div style="text-align:center">
              <i-input type='text' placeholder='编辑笔记本标题' v-model="noteNewtitle"></i-input>
          </div>
          <div slot="footer">
              <Button type="success" size="large" long :loading="modal_loading" @click='subminEdit'>编辑标题</Button>
          </div>
      </Modal>
    </Card>
  </div>
</template>

<script>
import Auth from '../api/auth'
import notebook from '../api/Notebooks'
export default {
  data () {
    return {
      choseid: null,
      noteNewtitle: '',
      modal2: false,
      DCmodal: false,
      currpage: 1,
      modal_loading: false,
      noteTitle: '',
      searchkey: '',
      editbtn: false,
      columns1: [
        {
          title: '笔记本名称',
          key: 'title',
          render: (h, params) => {
            return h('a', [
              h('Icon', {
                props: {
                  type: 'ios-book',
                  size: '18px'
                }
              }),`${params.row.title}`
            ])
          }
        },
        {
          title: '创建日期',
          key: 'createdAt',
          render: (h, params) => {
            return h('a',[
              h('Time', {
                props: {
                  time: params.row.createdAt,
                  type: 'datetime'
                }
              })
            ])
          }
        },
        {
          title: '笔记数量',
          key: 'noteCounts'
        },
        {
          title: '操作',
          key: 'action',
          width: '150',
          render: (h,params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    event.stopPropagation()
                    this.editbtn = true;
                    this.choseid = params.row.id
                  }
                }
              },'编辑'),


              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  margin: '0 10px'
                },
                on: {
                  'click': () => {
                    event.stopPropagation()
                    this.onDel(params.row.id)
                  }
                }
              },'删除')
            ])
          }
        }


      ],
      noteData: []
    };
  },
  created() {
    Auth.getInfo().then(res=>{
      Auth.note().then(res=>{
            this.noteData=res.data.reverse()
          }).catch(err=>{
            console.log(err);
          })
    })
  },

  methods: {
    handleClick (row){
      // if(row.noteCounts===0) {
      //   this.$Message.error('该笔记本内容为空！');
      // } else {
      //   this.$router.push('/note?id='+row.id)
      // }
      // console.log(row.id);
      if(row.noteCounts===0)
      return this.$Message.error('当前笔记本为空')
      else{
        this.$router.push('/notes?notebookId='+`${row.id}`)
      }
    },
    clickpage (currpage) {
      this.currpage=currpage
    },
    addNoteBook () {
      Auth.newnote({title:this.noteTitle}).then(res=>{
        Auth.note().then(res=>{
          this.noteData=res.data.reverse();
          this.noteTitle=''
        }).catch(err=>{
          console.log(err);
        })
      }).catch(err=>{
        console.log(err);
      })
    },
    DCnotebook () {
      console.log('导出笔记本');
    },
    onDel (id) {
      console.log(id);
      Auth.delnote({notebookId:id}).then(res=>{
        console.log(res);
        Auth.note().then(res=>{
          this.noteData=res.data.reverse();
        }).catch(err=>{
          console.log(err);
        })
      }).catch(err=>{
        console.log(err);
      })
    },
    subminEdit () {
      let newtitle=this.noteNewtitle
      let notebookid=this.choseid
      notebook.editNotebook({notebookId:notebookid,title:newtitle}).then(res=>{
        this.$Message.success('笔记修改成功')
        setTimeout(() => {
          Auth.note().then(res=>{
          this.noteData=res.data.reverse()
        })
        }, 200);
      }).catch(err=>{
        console.log(err);
      })
      this.choseid=null
      this.noteNewtitle = ''
      this.editbtn = false
    }
  }
}

</script>
<style lang='less' scoped>
.search{
  border-radius: 36px !important
}
</style>