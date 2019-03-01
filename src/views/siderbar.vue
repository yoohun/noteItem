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
    ...mapActions(['getnotes','addNote','setnote']),
    changeNotebook (name) {
      this.getnotes({notebookId:name})
      this.$emit('chosenotename',this.notes[0])
      this.$router.replace({
          path:'/notes',
          query: {
            notebookId: name,
            noteId: this.curNote.id
          }
        })
    },
    choseNote (name) {
      Auth.notes({notebookId:this.$route.query.notebookId}).then(res=>{
        let note =res.data.find(item=>item.id==name)
        this.$emit('chosenotename',note)
        this.$router.replace({
            path:'/notes',
            query: {
              notebookId: this.$route.query.notebookId,
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