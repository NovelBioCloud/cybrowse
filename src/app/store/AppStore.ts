import { AppState } from '../state/AppState'
import { Emitter, Disposable, } from 'event-kit';
import EventKit from 'event-kit'
import { Service, Inject } from 'typedi'
import { CyStore } from './CyStore';
import { EditorsStore } from './EditorsStore'
import { UnredoStore } from "./UnredoStore";
import { ToolbarStore } from './ToolbarStore'
import { CommandStore } from './CommandStore'
import { KeyboardStore } from './KeyboardStore';

import { EditorViewType } from './EditorsStore'

@Service()
export class AppStore extends Emitter {


    @Inject()
    private cyStore: CyStore
    @Inject()
    private unredoStore: UnredoStore
    @Inject()
    private editorStore: EditorsStore
    @Inject()
    private toolbarStore: ToolbarStore
    @Inject()
    private commandStore: CommandStore
    @Inject()
    private keyboardStore: KeyboardStore

    public async initEditersStore() {
        const cy = this.cyStore.getCy()
        this.editorStore.setCy(cy)
        cy.on('tap', (event) => {
            var target = event.target;
            if (target === cy) {
                this.editorStore.setViewType(EditorViewType.Default, null)
            } else {
                if (target.isEdge()) {
                    this.editorStore.setViewType(EditorViewType.Edge, event.target)
                } else {
                    this.editorStore.setViewType(EditorViewType.Node, event.target)
                }
            }
            this.update()
        })
    }
    getState(): AppState {
        return {
            editorsState: this.editorStore.getState()
        }
    }
    onUpdate(fn: (state: AppState) => void) {
        return this.on('did-update', fn)
    }

    update() {
        window.requestAnimationFrame(() => {
            this.emit('did-update', this.getState())
        })
    }
    updateNow() {
        this.emit('did-update', this.getState())
    }
    async init() {
        await this.initToolbarStore()
        this.cyStore.onCyInit().then(async () => {
            await this.initUnredoStore()
            await this.initCommand()
            await this.initEditersStore()
            await this.initKeyboardStore()
        })
        this.toolbarStore.on('change', () => {
            this.update()
        })
    }
    async initUnredoStore() {
        this.unredoStore.setUnredo(this.cyStore.getUnredo())
        function deleteEles(eles) {
            return eles.remove();
        }
        function restoreEles(eles) {
            return eles.restore();
        }
        this.unredoStore.registerAction("deleteElements", deleteEles, restoreEles);
    }
    async initKeyboardStore() {
        this.keyboardStore.keyboardJs.bind('ctrl+z', () => {
            this.commandStore.undoCommand()
        })
        this.keyboardStore.keyboardJs.bind('ctrl+y', () => {
            this.commandStore.redoCommand()
        })
    }
    async initCommand() {
        this.commandStore.registerCommand('deleteSelectedElements', {
            run: (...args) => {
                const elements = this.cyStore.getCy().$(':selected')
                this.unredoStore.do('deleteElements', elements)
            }
        })
        this.commandStore.registerCommand('deleteElements', {
            run: (elements) => {
                this.unredoStore.do('deleteElements', elements)
            }
        })
        this.commandStore.registerCommand('addNode', {
            run: (options: { x: number, y: number }) => {
                this.unredoStore.do('add', {
                    position: {
                        x: options.x,
                        y: options.y
                    },
                })
            }
        })
        this.commandStore.registerCommand('setSelectMode', {
            run: (...args) => {
                this.editorStore.setSelectMode(true)
            }
        })
    }
    async initToolbarStore(state: boolean = false) {
        this.toolbarStore.setState({
            menus: [{
                id: 'undo',
                label: 'undo',
                command: 'undo'
            }, {
                id: 'redo',
                label: 'redo',
                command: 'redo'
            }, {
                id: '3',
                label: 'delete',
                command: 'deleteElements'
            }, {
                id: '4',
                label: 'setSelectMode',
                command: 'setSelectMode'
            }]
        })
    }
}
