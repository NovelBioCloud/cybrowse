import { wrappedCytoscape } from '../../lib/index';
import { Service, Inject } from 'typedi';
import { Subject } from 'rxjs'
import { Emitter } from 'event-kit';
import { UnredoStore } from './UnredoStore';
import { EditorsStore } from './EditorsStore';
import { CommandStore } from './CommandStore';

@Service()

export class ToolbarStore extends Emitter {

    private menus = []

    async init() {
    }
    async setState(state: { menus: any[] }) {
        this.menus = state.menus
        this.emit('change')
    }

    getState() {
        return {
            menus: this.menus
        }
    }
}
