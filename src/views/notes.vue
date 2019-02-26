<!--  -->
<template>
  <div class='notes'>
    <div class='siderbar'>
      <siderbar @chosenotename='noteContent'></siderbar>
    </div>
    <div class='noteContent'>
      <div class="topbar">
        <span>创建时间: </span><Time :time="curNote.createdAt||new Date()" :interval="1" />
        <span>修改时间: </span><Time :time="curNote.updatedAt||new Date()" :interval="1" />
        <Button class='delete' type="error" size="small" @click="onDelete">删除</Button>
        <span class='belong'>{{statusText}}</span>
      </div>
      <div class="title">
        <input type="text" v-model="curNote.title" @input="saveNote(),statusText='正在修改...'">
      </div>
      <mavon-editor v-model="curNote.content" :toolbarsFlag = 'false'  @input="saveNote(),statusText='正在修改...'" />
    </div>
  </div>
</template>

<script>
import siderbar from './siderbar'
import Auth from '../api/auth'
import Note from '../api/note'
import debounce from 'debounce'
export default {
  data () {
    return {
      curNotebookId: null,
      curNoteId: null,
      notelist:[],
      notebooklist: [],
      curNote: {},
      statusText: "已保存",
    };
  },

  components: {
    siderbar
  },

  created () {
    Auth.note().then(res=>{
      this.notebooklist = res.data
      this.curNotebookId = this.$route.query.notebookId || res.data[0].id
      Auth.notes({notebookId: this.curNotebookId}).then(res=>{
        this.notelist=res.data
        this.curNoteId = res.data[0]?res.data[0].id:"null"
        this.$router.replace({
          path: '/notes',
          query: {
            notebookId: this.curNotebookId,
            noteId: this.curNoteId
          }
        })

      }).catch(err=>{
        console.log(err);
      })
    }).catch(err=>{
      console.log(err);
    })
  },

  methods: {
    noteContent () {
      this.curNote = arguments[0],
      this.notelist = arguments[1]
        console.log(this.curNote);
        console.log(this.notelist);
    },
    onDelete () {
      Note.delnote({noteId:this.$route.query.noteId}).then(res=>{
        this.$Message.success(res.msg)
        this.notelist.splice(this.notelist.indexOf(this.curNote),1)
        this.curNote = {}
        this.$router.replace({
          path: '/notes',
          query: {
            notebookId: this.$route.query.noteId,
            noteId: this.notelist[0].id
          }
        })
      }).catch(err=>{
        console.log(err);
      })
    },
    saveNote: debounce(function(value){
      Note.updatenote({noteId:this.$route.query.noteId,title:this.curNote.title,content:this.curNote.content}).then(res=>{
        let noteCon = this.notelist.find(item=>item.id===this.$route.query.noteId)
        // console.log(this.notebooklist.find(item=>item.id===this.$route.query.noteId));
        this.statusText = '已保存'
      }).catch(err=>{
        console.log(err);
        this.statusText = '保存失败'
        this.$Message.error('网络失败')
      })
    },1500),
  },
  beforeRouteUpdate(to, from,next) {
   if(!to.query.notebookId) {
     Auth.note().then(res=>{
       let curNotebookId = res.data[0].id
      //  this.notebooklist= res.data
       Auth.notes({notebookId: curNotebookId}).then(res=>{
        this.notelist=this.notelist.length=='0' ? [] :res.data
        let curNoteId = res.data[0]?res.data[0].id:"null";
        this.curNote = res.data[0];
        this.$router.replace({
          path: '/notes',
          query: {
            notebookId: curNotebookId,
            noteId: curNoteId
          }
        })
       })
     })
   }
   this.curNote = {}
    next()
  }
}

</script>
<style lang='less' scoped>
.notes{
  height: calc(~ '100vh - 60px');
  width: 100%;
  position: relative
}
.siderbar{
  width: 220px;
  height: 100%;
  border-right: 2px solid #e8eaec;
}
.noteContent{
  position: absolute;
      margin-left: 221px;
      top: 0;
      right: 0;
      left: 0;
      height: 100%;
      padding: 0;
}
.topbar {
        height: 50px;
        width: 100%;
        padding: 18px 30px;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
        background: #fff;
        .belong ,.delete{
          float: right
        }
        .delete {
          margin-top: -3px;
          margin-left: 16px;
        }
      }
      .title {
        input {
          width: 100%;
          border: none;
          outline: none;
          font-size: 26px;
          padding-left: 15px;
          background: #f8f8f9
        }
      }
</style>