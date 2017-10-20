import { Emitter } from 'event-kit';
import { Service, Inject } from 'typedi';
import { CyStore } from './CyStore';

@Service()
export class UnredoStore extends Emitter {

    private unredo: any

    setUnredo(unredo) {
        this.unredo = unredo
    }
    registerAction(action: string, doAction, undoAction) {
        this.unredo.action(action, doAction, undoAction)
    }
    do(action, ...args) {
        this.unredo.do(action, ...args)
    }
    undo() {
        this.unredo.undo()
    }
    redo() {
        this.unredo.redo()
    }

}
