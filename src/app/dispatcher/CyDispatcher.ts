import { AppStore } from '../store/AppStore';
import { wrappedCytoscape } from '../../lib/index';
import { Container, Inject, Service } from 'typedi';
import { CyStore } from '../store/CyStore';


declare global {
    interface JQuery {
        destroy: () => void
    }
}
@Service()
export class CyDispatcher {

    @Inject()
    private appStore: AppStore

    @Inject()
    private cyStore: CyStore

    async initCy(cyElement: HTMLDivElement) {
        this.cyStore.initCy(cyElement)
    }

    destroyCy() {
    }

}