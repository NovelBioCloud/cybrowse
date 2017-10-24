
import * as React from 'react'
import { Component } from 'react'
import { Container } from 'typedi';
import { Input, Form, InputNumber, Radio, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import RadioGroup from 'antd/lib/radio/group';
import RadioButton from 'antd/lib/radio/radioButton';
import { NodeShapes } from '../../lib/nodeShapes';
import { EdgeShapes } from '../../lib/edgeShapes';
const FormItem = Form.Item
interface EdgeEditorProps extends FormComponentProps {
    exportJson: () => void
    importJson: () => void
}
export class DefaultEditorSupport extends Component<EdgeEditorProps, any> {
    render() {
        return <div>
            <Form layout='vertical'>
                <FormItem >
                    <Button onClick={(e) => {
                        this.props.exportJson()
                    }}>导出json</Button>
                </FormItem>
                <FormItem >
                    <Button onClick={(e) => {
                        this.props.importJson()
                    }}>导入json</Button>
                </FormItem>
                <FormItem >
                    <Button onClick={(e) => {

                    }}>导出图片</Button>
                </FormItem>
            </Form>
        </div>
    }
}

export const DefaultEditor = Form.create()(DefaultEditorSupport)


