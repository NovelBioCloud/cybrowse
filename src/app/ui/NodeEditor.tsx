
import * as React from 'react'
import { Component } from 'react'
import { Container } from 'typedi';
import { Input, Form, InputNumber, Radio } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import RadioGroup from 'antd/lib/radio/group';
import RadioButton from 'antd/lib/radio/radioButton';
import { NodeShapes } from '../../lib/nodeShapes';
const FormItem = Form.Item
interface NodeEditorProps extends FormComponentProps {
    element: any
}
export class NodeEditorSupport extends Component<NodeEditorProps, any> {
    render() {
        const element = this.props.element
        const data = element.data()
        const {
            id,
            label = '',
            shape,
            width,
            backgroundColor,
            height
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
                        })(<Input key={id || ''} onChange={(e) => {
                            e.stopPropagation()
                            const value = e.target.value
                            element.data('label', value)
                        }} placeholder='请输入label' />)
                    }
                </FormItem>
                <FormItem label='backgroundColor'>
                    <Input key={id || ''} defaultValue={backgroundColor} type='color' onChange={(e: any) => {
                        const value = e.target.value
                        element.data('backgroundColor', value)
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
                <FormItem label='height'>
                    {
                        getFieldDecorator('height', {
                            initialValue: height
                        })(
                            <InputNumber key={data.id || ''} onChange={(value) => {
                                element.data('height', value)
                            }} placeholder='请输入 height' />)
                    }
                </FormItem>
                <FormItem label='shape'>
                    <Radio.Group key={id || ''}  defaultValue={shape} onChange={(e: any) => {
                        const value = e.target.value
                        element.data('shape', value)
                    }}>
                        {
                            NodeShapes.shapes.map(it => {
                                return <Radio.Button key={it} value={it}>{it}</Radio.Button>
                            })
                        }
                    </Radio.Group>
                </FormItem>
            </Form>
        </div>
    }
}

export const NodeEditor = Form.create()(NodeEditorSupport)