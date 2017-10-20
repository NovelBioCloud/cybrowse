
import * as React from 'react'
import { Component } from 'react'
import { Container } from 'typedi';

import { Button, Radio, Icon } from 'antd'

import { ToolbarStore } from '../store/ToolbarStore'
interface ToolbarMenu {
    id: string,
    label: string,
    action: (e) => void
}

interface ToolbarProps {
    menus: ToolbarMenu[]
}

export class Toolbar extends Component<ToolbarProps, any> {
    private dispose: EventKit.Disposable

    render() {
        return <div>{
            this.renderMenu()
        }</div>
    }
    private renderMenu() {
        return this.props.menus.map(menu => {
            return <Button style={{ margin: '5px' }} key={menu.id} onClick={menu.action}>{menu.label}</Button>
        })
    }
}
