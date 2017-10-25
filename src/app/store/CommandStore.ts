import { AppState } from "../state/AppState";
import { Emitter, Disposable, } from 'event-kit';
import EventKit from 'event-kit'
import { Service, Inject } from 'typedi'
import { CyStore } from './CyStore';
import { UnredoStore } from "./UnredoStore";
import { EditorsStore } from "./EditorsStore";

export interface ICommandContext {
    run(...args)
}

@Service()
export class CommandStore extends Emitter {
    private commandMap = new Map<string, any>()
    @Inject()
    private unredoStore: UnredoStore

    async init() {
    }

    getState() {
        return {
        }
    }
    registerCommand(action: string, runner: ICommandContext) {
        if (this.commandMap.has(action)) {
            throw new Error('has contains map')
        } else {
            this.commandMap.set(action, runner)
        }
    }
    run(callback) {
        callback()
    }
    runCommand(action: string, ...args) {
        const runner = this.commandMap.get(action)
        runner.run(...args)
    }
    undoCommand() {
        this.unredoStore.undo()
    }
    redoCommand() {
        this.unredoStore.redo()
    }
}
