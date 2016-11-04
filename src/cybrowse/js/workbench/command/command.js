/**
 * 命令model类
 */
export default class Command {
  constructor(props) {
    this.args = props.args
    this.handle = props.handle
  }
}