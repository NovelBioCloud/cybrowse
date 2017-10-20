
import * as React from 'react'
import { Component } from 'react'
import { Container } from 'typedi';

interface CytoscapeProps {
    style: any
    onRenderEyeView: (HTMLDivElement) => void
    onRender: (HTMLDivElement) => void
}

export class Cytoscape extends Component<CytoscapeProps, any> {
    private cytoscapeElement
    private cytoscapeEyeViewElement
    render() {
        return <div style={{
            position: 'relative',
            ...this.props.style
        }} ref={(ref) => this.cytoscapeElement = ref}>
            <div ref={(ref) => this.cytoscapeEyeViewElement = ref} style={{
                width: '200px',
                height: '120px',
                position: 'fixed',
                left: '0',
                right: '0'
            }}>

            </div>
        </div >
    }
    componentDidMount() {
        this.props.onRender && this.props.onRender(this.cytoscapeElement)
        this.props.onRenderEyeView && this.props.onRenderEyeView(this.cytoscapeEyeViewElement)
    }
}
