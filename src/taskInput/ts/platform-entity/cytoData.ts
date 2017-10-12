export class CytoData {
  private nodes: any[] = []
  private edges: any[] = []
  constructor(tasks: any[] = []) {
    this.nodes = CytoData.resolveNodes(tasks)
    this.edges = CytoData.resolveEdges(tasks)
  }
  getData(): any[] {
    return [...this.nodes, ...this.edges]
  }
  getNodes(): any[] {
    return this.nodes
  }
  getEdges(): any[] {
    return this.edges
  }
  private static resolveNodes(tasks: any[] = []) {
    const nodes: any[] = []
    tasks.forEach((task) => {
      const node = CytoData.resolveNode(task)
      nodes.push(node)
    })
    return nodes
  }
  private static resolveNode(task: any) {
    const name = CytoData.getTaskName(task)
    const faveColor = CytoData.getTaskColor(task.taskState);
    const node = {
      data: {
        id: task.taskId,
        name: name,
        faveColor: faveColor,
        faveShape: 'roundrectangle'
      },
      position: {
        "x": task.pageLeft,
        "y": task.pageTop
      }
    };
    return node
  }
  private static resolveEdges(tasks: any[] = []) {
    const edges: any[] = []
    tasks.forEach((task) => {
      if (task.sourceTaskDBIds) {
        task.sourceTaskDBIds.forEach((sourceTaskId) => {
          const edge = {
            data: {
              source: sourceTaskId,
              target: task.taskId,
              strength: 90
            }
          }
          edges.push(edge)
        })
      }
    })
    return edges
  }

  private static getTaskName(task) {
    var name = task.taskName;
    if ((task.taskType == "Other" || task.taskType == "RawDataTask") && task.otherTaskType) {
      name = task.otherTaskType;
    }
    return name
  }
  private static getTaskColor(taskState: string) {
    if (taskState === 'EMPTY') {
      return '#CCCCCC';
    } else if (taskState === 'WAITING') {
      return '#CCCCCC';
    } else if (taskState === 'RUNNING') {
      return '#F5AC30';
    } else if (taskState === 'SUCCESSED') {
      return '#6FD288';
    } else if (taskState === 'FAILED') {
      return '#D9534F';
    }
  }
}