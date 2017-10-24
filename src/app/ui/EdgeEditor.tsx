
import * as React from 'react'
import { Component } from 'react'
import { Container } from 'typedi';
import { Input, Form, InputNumber, Radio } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import RadioGroup from 'antd/lib/radio/group';
import RadioButton from 'antd/lib/radio/radioButton';
import { NodeShapes } from '../../lib/nodeShapes';
import { EdgeShapes } from '../../lib/edgeShapes';
const FormItem = Form.Item
interface EdgeEditorProps extends FormComponentProps {
    element: any
}
export class EdgeEditorSupport extends Component<EdgeEditorProps, any> {
    render() {
        const element = this.props.element
        const data = element.data()
        const {
            label = '',
            sourceLabel = '',
            targetLabel = '',
            curveStyle,
            width,
            color,
            lineColor,
        } = data
        const {
            getFieldDecorator
        } = this.props.form
        const setData = (key: string) => {
            return (value) => {
                element.data(key, value)
            }
        }
        return <div>
            <Form layout='vertical'>
                <FormItem label='label'>
                    {
                        getFieldDecorator('label', {
                            initialValue: label
                        })(<Input key={data.id || ''} onChange={(e) => {
                            e.stopPropagation()
                            const value = e.target.value
                            element.data('label', value)
                        }} placeholder='请输入label' />)
                    }
                </FormItem>
                <FormItem label='sourceLabel'>
                    {
                        getFieldDecorator('sourceLabel', {
                            initialValue: sourceLabel
                        })(<Input key={data.id || ''} onChange={(e) => {
                            e.stopPropagation()
                            const value = e.target.value
                            element.data('sourceLabel', value)
                        }} placeholder='请输入 sourceLabel' />)
                    }
                </FormItem>
                <FormItem label='targetLabel'>
                    {
                        getFieldDecorator('targetLabel', {
                            initialValue: targetLabel
                        })(<Input key={data.id || ''} onChange={(e) => {
                            e.stopPropagation()
                            const value = e.target.value
                            element.data('targetLabel', value)
                        }} placeholder='请输入 targetLabel' />)
                    }
                </FormItem>
                <FormItem label='color'>
                    <Input key={data.id || ''}  defaultValue={color} type='color' onChange={(e: any) => {
                        const value = e.target.value
                        element.data('color', value)
                    }} />
                </FormItem>
                <FormItem label='lineColor'>
                    <Input key={data.id || ''} defaultValue={lineColor} type='color' onChange={(e: any) => {
                        const value = e.target.value
                        element.data('lineColor', value)
                    }} />
                </FormItem>
                <FormItem label='width'>
                    {
                        getFieldDecorator('width', {
                            initialValue: width
                        })(
                            <InputNumber key={data.id || ''} onChange={(value) => {
                                element.data('width', value)
                            }} placeholder='请输入 width' />)
                    }
                </FormItem>
                <FormItem label='curveStyle'>
                    <Radio.Group key={data.id || ''} defaultValue={curveStyle} onChange={(e: any) => {
                        const value = e.target.value
                        element.data('curveStyle', value)
                    }}>
                        {
                            EdgeShapes.shapes.map(it => {
                                return <Radio.Button key={it} value={it}>{it}</Radio.Button>
                            })
                        }
                    </Radio.Group>
                </FormItem>
            </Form>
        </div>
    }
}

export const EdgeEditor = Form.create()(EdgeEditorSupport)