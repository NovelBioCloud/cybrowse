import { CytoData } from './cytoData'
export class AppEntity {
  stageId: string
  tasks: any[] = []
  cytoData: CytoData
  constructor(stageId: string, tasks: any[] = []) {
    this.stageId = stageId
    this.tasks = tasks
    this.cytoData = new CytoData(tasks)
  }
}