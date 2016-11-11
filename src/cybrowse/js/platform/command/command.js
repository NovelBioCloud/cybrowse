/**
 * 命令model类,
 * @see commandControl.js
 */
export default class Command {

  constructor(props) {
    //回调函数的参数
    this.args = props.args
    //回调函数
    this.handle = props.handle
  }
}