import { wrappedCytoscape } from '../../lib/index';
import { Service, Inject } from 'typedi';
import { Subject } from 'rxjs'
import { Emitter } from 'event-kit';
import { CyStore } from './CyStore';

export enum EditorViewType {
    Default, Edge, Node
}

@Service()
export class EditorsStore extends Emitter {
    private viewType: EditorViewType = EditorViewType.Default
    private tapElement: any = null

    private cy: any
    public setCy(cy) {
        this.cy = cy
    }
    setViewType(viewType: EditorViewType, tapElement: any = null): any {
        this.viewType = viewType
        this.tapElement = tapElement
    }
    getSelectedElements() {
        return this.cy.$(':selected');
    }
    setSelectMode(flag: boolean): any {
        this.cy.boxSelectionEnabled(!this.cy.boxSelectionEnabled())
    }
    getState() {
        return {
            viewType: this.viewType,
            element: this.tapElement,
        }
    }
}
