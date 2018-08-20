import Node from './node'
export default class TreeStore {
  constructor(options){
    this.data = options.data
    this.root = new Node({
      data: this.data,
      store: this
    });
  }
}