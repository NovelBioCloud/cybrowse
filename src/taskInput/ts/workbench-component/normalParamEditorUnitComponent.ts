import * as _ from 'lodash'
import { $ } from '../common'

interface Options {
  container: JQuery,
  task: any,
  isActive?: boolean,
  onSelect: () => void,
  onSave: () => Promise<any>
}
export class NormalParamEditorUnitComponent {
  private container: JQuery
  private element: JQuery
  private task: any
  private isActive: boolean = false
  private onSave: () => Promise<any>
  private onSelect: () => void
  constructor() {
  }
  private displayTemplate = `
    <div class='fn-normalParamEditorUnitComponent class-normalParamEditorUnitComponent'>
      <div>
        <button class='btn btn-sm btn-default fn-edit-button'>
          <i class='fa fa-pencil fa-fw'></i>
          编辑
        </button>
      </div>
      <iframe class='normalParamEditorUnitComponent-content fn-content'>
      
      </iframe>
    </div>
  `
  private editTemplate = `
    <div class='fn-normalParamEditorUnitComponent class-normalParamEditorUnitComponent'>
      <div class='normalParamEditorUnitComponent-title'>
        <button class='btn btn-sm btn-default fn-save-button'>保存</button>
        <button class='btn btn-sm btn-default fn-cancel-button'>取消</button>
      </div>
      <iframe sandbox class='normalParamEditorUnitComponent-content fn-content'>
      
      </iframe>
    </div>
  `
  init(options: Options) {
    this.container = options.container
    this.task = options.task
    this.onSave = options.onSave
    this.onSelect = options.onSelect
    this.isActive = options.isActive || false
    this.initDisplayView()
  }
  save() {
    this.onSave().then(() => {
      this.initDisplayView()
    })
  }
  initDisplayView() {
    if (this.element) {
      this.element.remove()
    }
    this.element = $(this.displayTemplate).appendTo(this.container)
    this.element.find('.fn-edit-button').click(() => {
      this.initEditView()
    })
    this.active(this.isActive)
    this.registerListener()
  }
  initEditView() {
    if (this.element) {
      this.element.remove()
    }
    this.element = $(this.editTemplate).appendTo(this.container)
    this.element.find('.fn-edit-button').click(() => {


    })
    this.element.find('.fn-cancel-button').click(() => {
      this.initDisplayView()
    })
    this.active(this.isActive)
    this.registerListener()
  }
  active(isActive = false) {
    this.isActive = isActive
    if (this.isActive) {
      this.element.addClass('normalParamEditorUnitComponent-active')
    } else {
      this.element.removeClass('normalParamEditorUnitComponent-active')
    }
  }
  registerListener() {
    this.element.click(() => {
      this.onSelect()
    })
  }
  loadContent(content: string, readonly: boolean) {
    const iframe = <any>(this.element.find('.fn-content').get(0));
    iframe.srcdoc = content
  }

}