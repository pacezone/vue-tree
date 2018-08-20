<template>
  <div id="app">
    <Tree :data='dataList'/>
    <el-my-tree :data='dataList'></el-my-tree>
  </div>
</template>

<script>
import Tree from './components/tree'
import ElMyTree from './elementTree/elMyTree'
import api from './fetch/api'
export default {
  name: 'App',
  components: {
    Tree,
    ElMyTree
  },
  created(){
    
   this.dataList = this.getDate()
  },
  data(){
    return{
      dataList:null
    }
  },
  methods:{
    getDate(){
      return new Promise((reslove)=>{
        api.api('post',`${api.configUrl}/office/findOfficeTreeByType`).then(res=>{
        reslove(res)
      })
      })
       
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
