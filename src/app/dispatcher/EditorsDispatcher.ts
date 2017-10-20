
import * as React from 'react'
import { Component } from 'react'
import { AppState } from '../state/AppState'
import { AppStore } from '../store/AppStore'
import { Service, Inject, Container } from 'typedi';

@Service()
export class EditorsDispatcher {

    private dispose
    private _onUpdate
    @Inject()
    private store: AppStore
    private cy: JQuery

    constructor() {
    }
    listenStore() {
    }
    unlistenStore(): void {
    }
}