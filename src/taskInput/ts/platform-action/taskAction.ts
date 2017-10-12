import { $, config } from '../common'
export class TaskAction {
  getTasksByStageId(stageId: string) {

    return new Promise<any>((resolve, reject) => {
      const formData = new FormData();
      formData.append('stageId', stageId);
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'json'
      xhr.open("POST", `${config.path}/taskOperation_getTaskByStageId`, true);
      xhr.withCredentials = true; //支持跨域发送cookies
      xhr.onload = (data) => {
        if (xhr.status === 200) {
          resolve(xhr.response)
        } else {
          reject()
        }
      }
      xhr.send(formData);
    })
  }

  queryParamEditPage(taskId: string, readonly: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('taskId', taskId);
      formData.append('isReadOnly', readonly);
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${config.path}/task_editInputParam`, true);
      xhr.withCredentials = true; //支持跨域发送cookies
      xhr.onload = (data) => {
        if (xhr.status === 200) {
          resolve(xhr.responseText)
        } else {
          reject()
        }
      }
      xhr.send(formData);
    })
  }
}