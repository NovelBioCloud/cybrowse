
import * as React from 'react'
import { Component } from 'react'

export enum EditorView {
    Drag,
    Box,
    EdgeEditor,
    NodeEditor,
    NodeEdgeEditor
}

export class Editors extends Component<any, any> {
    render() {
        return <div>
            {
                this.props.children || null
            }
        </div>
    }
}
