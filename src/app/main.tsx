import * as _ from 'lodash'
import * as $ from 'jquery'
import * as React from 'react'
import "reflect-metadata"
import { Component } from 'react'
import { render } from 'react-dom'
import { App } from './ui/App'
import { Container } from 'typedi';
import { CommandDispatcher } from './dispatcher/ComandDispatcher'
import { AppStore } from './store/AppStore'
import { AppDispatcher } from './dispatcher/AppDispatcher'

export async function main() {

    const appStore: AppStore = Container.get(AppStore)
    const dispatcher: AppDispatcher = Container.get(AppDispatcher)
    await appStore.init()
    $(() => {
        const container = function () {
            const container = document.createElement('div')
            document.body.appendChild(container)
            return container
        }()
        const app = function () {
            return <App appDispatcher={dispatcher} appStore={appStore} />
        }()
        render(app, container)
    })
}