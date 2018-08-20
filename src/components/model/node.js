export default class Node {
  constructor(option){
    this.data = option.data
    this.store = this
    this.level = 0
    if (this.parent) {
      this.level = this.parent.level + 1;
    }

  }
}