import { Function1, Function2 } from './interfaces';

export enum PromiseState {
    INIT, RUNNING, SUCCESS, ERROR
}
export interface PromiseStateApi {
    state: PromiseState
    isFinish: () => boolean
    isRunning: () => boolean
    isInit: () => boolean
}
export class StatePromise<T> extends Promise<T>{
    private _state: PromiseState = PromiseState.INIT
    private _resolve: Function1<T, void>
    private _reject: Function1<any, void>
    constructor() {
        super((resolve, reject) => {
            this._resolve = resolve
            this._reject = reject
        })
    }
    run(callback: Function1<StatePromise<T>, void>) {
        this._state = PromiseState.RUNNING
        callback(this)
    }
    resolve(data: T) {
        this._resolve(data)
        this._state = PromiseState.SUCCESS
    }
    reject(err: any) {
        this._reject(err)
        this._state = PromiseState.ERROR
    }
    getState(): PromiseStateApi {
        return {
            state: this._state,
            isFinish: () => this.isFinish(),
            isRunning: () => this.isRunning(),
            isInit: () => this.isInit()
        }
    }
    isFinish(): boolean {
        return [PromiseState.SUCCESS, PromiseState.ERROR].includes(this._state)
    }
    isRunning(): boolean {
        return PromiseState.RUNNING === this._state
    }
    isInit(): boolean {
        return PromiseState.INIT === this._state
    }
}