
import { Context } from '../base'
import { TaskAction, UserAction } from '../platform-action'
import { UserService, CytoService, ShellService, TaskService, AppEntityService } from '../platform-service'
const baseContext: Context = new Context()
baseContext.initialBeans([TaskAction, UserAction])
const shellContext: Context = baseContext.createChildContext()
shellContext.initialBeans([UserService, CytoService, ShellService, TaskService, AppEntityService])
export {
  shellContext
}