<!--  -->
<template>
  <div>
    <Card :padding="0" shadow style="width: 220px;height: 100%">
      <p slot="title" style='cursor:pointer'>
        <Icon type="md-add-circle" size='20' style='float:right;cursor:pointer' @click.native='addNewNote'/>
        <Dropdown @on-click='changeNotebook'>
          选择笔记本
          <DropdownMenu slot="list">
              <DropdownItem v-for="item in notebooks" :key="item.id" :name='item.id'>{{item.title}}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </p>
      <Card :padding='0' shadow style="height:100%" @on-click='choseNote'>
        <CellGroup @on-click='choseNote'>
          <Cell
            v-for="item in notelist"
            :title="item.title || '标题为空'"
            :key="item.id"
            :name="item.id"
            style="border-bottom:1px solid #eee"
          />
        </CellGroup>
      </Card>
    </Card>
  </div>
</template>

<script>
import Auth from '../api/auth'
import Note from '../api/note'
export default {
  data () {
    return {
      notebooks: [],
      notelist: [],
      curNotebookId: null,
      curNoteId: null
    };
  },
  created() {
    // Auth.note().then(res=>{
    //   console.log(res.data);
    //   this.notebooks=res.data
    //   this.curNotebookId=this.$route.query.notebookId || res.data[0].id
    //   Auth.notes({notebookId:this.curNotebookId}).then(res=>{
    //     this.notelist = res.data
    //   console.log(res.data);
    //   }).catch(err=>{
    //     console.log(err);
    //   })
    // }).catch(err=>{
    //   console.log(err);
    // })
     Auth.note().then(res=>{
      this.notebooks = res.data
      this.curNotebookId = this.$route.query.notebookId || res.data[0].id
      Auth.notes({notebookId: this.curNotebookId}).then(res=>{
        this.notelist=res.data
        this.curNoteId = res.data[0].id
        this.$emit('chosenotename',res.data[0],this.notelist)
        // this.text=res.data
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
    changeNotebook (name) {
      // console.log(1111);
      this.curNotebookId = name
      Auth.notes({notebookId: name}).then(res=>{
        this.notelist = res.data || []
        this.curNoteId = res.data[0]?res.data[0].id:'null'
        this.$emit('chosenotename',res.data[0],res.data)
      })
      this.$router.replace({
          path:'/notes',
          query: {
            notebookId: this.curNotebookId,
            noteId: this.curNoteId
          }
        })
    },
    choseNote (name) {
      // console.log(name);
      this.curNoteId = name
      this.curNotebookId = this.$route.query.notebookId
      // console.log(this.curNotebookId);
      Auth.notes({notebookId:this.$route.query.notebookId}).then(res=>{
        let note = res.data.find(item=>item.id===name)
        console.log(note);
        console.log(this.notelist);
        this.$emit('chosenotename',note,this.notelist)
        this.$router.replace({
          path:'/notes',
          query: {
            notebookId: this.curNotebookId,
            noteId: name
          }
        })
      }).catch(err=>{
        console.log(err);
      })
    },
    addNewNote () {
      let notebookId=this.$route.query.notebookId
      Note.addnote({notebookId}).then(res=>{
        console.log(res);
        Auth.notes({notebookId:this.$route.query.notebookId}).then(res=>{
          this.notelist = res.data
          setTimeout(() => {
            this.$Message.success('笔记创建成功')
          }, 300);
        })
      }).catch(err=>{
        console.log(err);
      })
    }
  }
}

</script>
<style lang='less' scoped>
.ivu-card-body{
  height: 100% !important;
}
</style>


<!--  -->
<template>
  <div>
    <Card :padding="0" shadow style="width: 220px;height: 100%">
      <p slot="title" style='cursor:pointer'>
        <Icon type="md-add-circle" size='20' style='float:right;cursor:pointer' @click.native='addNewNote'/>
        <Dropdown @on-click='changeNotebook'>
          选择笔记本
          <DropdownMenu slot="list">
              <DropdownItem v-for="item in notebooks" :key="item.id" :name='item.id'>{{item.title}}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </p>
      <Card :padding='0' shadow style="height:100%" @on-click='choseNote'>
        <CellGroup @on-click='choseNote'>
          <Cell
            v-for="item in notes"
            :title="item.title || '标题为空'"
            :key="item.id"
            :name="item.id"
            style="border-bottom:1px solid #eee"
          />
        </CellGroup>
      </Card>
    </Card>
  </div>
</template>

<script>
import Auth from '../api/auth'
// import Notes from '..//store/index'
import Note from '../api/note'
import { mapGetters, mapState, mapActions } from 'vuex';
export default {
  data () {
    return {
      notebooks: [],
      curNotebookId: null,
      curNoteId: null
    };
  },computed: {
    ...mapGetters(['notes','curNote'])
  },
  created() {
     Auth.note().then(res=>{
       this.notes=[]
       this.curNote={}
      this.notebooks = res.data
      this.curNotebookId= this.$route.query.notebookId || res.data[0].id
      this.getnotes({notebookId:this.curNotebookId})
        this.$router.replace({
          path: '/notes',
          query: {
            notebookId: this.curNotebookId,
            noteId: this.curNote.id
          }
        })
    }).catch(err=>{
      console.log(err);
    })
  },

  methods: {
    ...mapActions(['getnotes','addNote']),
    changeNotebook (name) {
      this.curNotebookId = name
      this.getnotes({notebookId:name})
      this.$router.replace({
          path:'/notes',
          query: {
            notebookId: this.curNotebookId,
            noteId: this.curNote.id
          }
        })
    },
    choseNote (name) {
      // console.log(name);
      this.curNoteId = name
      this.curNotebookId = this.$route.query.notebookId
      Auth.notes({notebookId:this.$route.query.notebookId}).then(res=>{
        let note =res.data.find(item=>item.id==name)
        this.$emit('chosenotename',note,this.notes)
        console.log(note);
        console.log(123123123);


        this.$router.replace({
            path:'/notes',
            query: {
              notebookId: this.curNotebookId,
              noteId: name
            }
          })
      }).catch(err=>{
        console.log(err);

      })

    },
    addNewNote () {
      let notebookId=this.$route.query.notebookId
      this.addNote({notebookId})
    }
  }
}

</script>
<style lang='less' scoped>
.ivu-card-body{
  height: 100% !important;
}
</style>