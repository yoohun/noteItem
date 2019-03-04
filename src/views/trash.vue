<!--  -->
<template>
  <div>
    <div class='trashFlex'>
      <Card style="width:22%;height:220px;margin:0 1.5% 20px;margin-bottom:20px" v-for="item in delnotes" :key="item.id">
        <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            {{item.title}}
        </p>
        <a href="javascript:;" slot="extra" @click='recoveryNote(item.id)'>
            <Icon type="md-refresh" />
        </a>
        <a href="javascript:;" slot="extra">
            <Icon type="ios-trash-outline" @click='delNote(item.id)'/>
        </a>
        <div class='trashText'>{{item.content}}</div>
    </Card>
    </div>
  </div>
</template>

<script>
import Trash from '../api/Trash'
export default {
  data () {
    return {
      delnotes: []
    };
  },
  created() {
    Trash.getDelnotes().then(res=>{
      this.delnotes = res.data
    })
  },

  methods: {
    recoveryNote (id) {
      this.$Modal.confirm({
        title:'还原笔记',
        content: '确定要还原笔记吗？',
        closable: true,
        onOk: () =>{
          Trash.recoveryNote({noteId:id}).then(res=>{
            Trash.getDelnotes().then(res=>{
              this.delnotes = res.data
            })
          })
          this.$Message.success('笔记已恢复')
        }
      })
    },
    delNote (id) {
      this.$Modal.error({
        title:'删除笔记',
        content: '删除的笔记不能还原！',
        closable: true,
        onOk: () =>{
          Trash.deepDelNote({noteId:id}).then(res=>{
            Trash.getDelnotes().then(res=>{
              this.delnotes = res.data
            })
          })
          this.$Message.success('笔记已删除！')
        }
      })
    }
  }
}

</script>
<style lang='less' scoped>
.trashFlex{
  height: 100%;
  width: 100%;
  display: flex;
  padding: 20px 10px;
  box-sizing: border-box;
  flex-wrap: wrap;
  .trashText{
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>