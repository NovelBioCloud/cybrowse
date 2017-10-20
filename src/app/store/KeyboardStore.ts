import { wrappedCytoscape } from '../../lib/index';
import { Service, Inject } from 'typedi';
import { Subject } from 'rxjs'
import { Emitter } from 'event-kit';
import { CommandStore } from './CommandStore';
import * as KeyboardJS from 'keyboardjs'
@Service()
export class KeyboardStore extends Emitter {
    public readonly keyboardJs = KeyboardJS

}
