
import * as React from 'react'
import { Component } from 'react'
import { AppState } from '../state/AppState'
import { AppStore } from '../store/AppStore'
import { Service, Inject, Container } from 'typedi';
@Service()
export class AppDispatcher {

    private dispose
    private _onUpdate

    private cy: JQuery
    @Inject()
    private store: AppStore
    constructor() {

    }


}