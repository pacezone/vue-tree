<template>
  <div class="el-tree" role='tree'>
    
  </div>
</template>

<script>
import TreeStore from './model/tree-strore'
export default {
  name: "tree",
  props: {
    data: {
      type: Promise
    }
  },
  created(){
    this.data.then(res=>{
      
       this.store = new TreeStore({

        // key: this.nodeKey,
        data: res,
        // lazy: this.lazy,
        // props: this.props,
        // load: this.load,
        // currentNodeKey: this.currentNodeKey,
        // checkStrictly: this.checkStrictly,
        // checkDescendants: this.checkDescendants,
        // defaultCheckedKeys: this.defaultCheckedKeys,
        // defaultExpandedKeys: this.defaultExpandedKeys,
        // autoExpandParent: this.autoExpandParent,
        // defaultExpandAll: this.defaultExpandAll,
        // filterNodeMethod: this.filterNodeMethod
      });
      console.log(this.store);
      
      
    })
      
  },
  data() {
    return {
      store: null,
      root: null
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
