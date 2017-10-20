
import * as React from 'react'
import { Component } from 'react'
import { Container } from 'typedi';
import { AppState } from '../state/AppState'
import { AppStore } from '../store/AppStore'
import { AppDispatcher } from '../dispatcher/AppDispatcher'
import { CyDispatcher } from '../dispatcher/CyDispatcher';
import { EditorsDispatcher } from '../dispatcher/EditorsDispatcher'
import { Toolbar } from './Toolbar'
import { Cytoscape } from './Cytoscape'
import { Editors } from './Editors'
import { NodeEditor } from './NodeEditor';
import { EdgeEditor } from './EdgeEditor';
import { ToolbarStore } from '../store/ToolbarStore';
import { KeyboardStore } from '../store/KeyboardStore'
import { CyStore } from '../store/CyStore';
import { CommandDispatcher } from '../dispatcher/ComandDispatcher';
import * as keyboardJS from 'keyboardjs';
import { EditorsStore, EditorViewType } from '../store/EditorsStore';
import { Disposable } from 'event-kit';
import { Layout, LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US';
import { CommandStore } from '../store/CommandStore';
import { DefaultEditor } from './DefaultEditor'
const jsonFormat = require('json-format')

import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { Header, Content, Footer, Sider } = Layout;
const toolbarStore = Container.get(ToolbarStore)
const cyStore = Container.get(CyStore)
const appStore = Container.get(AppStore)
const keyboardStore = Container.get(KeyboardStore)
const commandDispatcher = Container.get(CommandDispatcher)
const appDispatcher = Container.get(AppDispatcher)
const cyDispatcher = Container.get(CyDispatcher)
const editorsDispatcher = Container.get(EditorsDispatcher)
const editorsStore = Container.get(EditorsStore)
const commandStore = Container.get(CommandStore)

interface IAppProps {
    readonly appStore: AppStore
    readonly appDispatcher: AppDispatcher
}
export class App extends Component<IAppProps, AppState> {
    private dispose: EventKit.Disposable
    constructor(props: any) {
        super(props)
        this.state = this.props.appStore.getState()
    }
    render() {
        return <div>
            <LocaleProvider locale={enUS}>
                <Layout style={{ height: '100vh' }}>
                    <Header style={{ background: '#fff' }} >
                        {this.createToolbar()}
                    </Header>
                    <Layout>
                        <Content style={{ position: 'relative' }}>
                            {this.createCytoscape()}
                        </Content>
                        <Sider style={{ backgroundColor: '#fff', overflow: 'auto', padding: '15px' }}
                            width={280}
                        >
                            {this.createEditors()}
                        </Sider>
                    </Layout>
                    <Footer>
                        status
                    </Footer>
                </Layout>
            </LocaleProvider>
        </div>
    }
    createToolbar(): any {
        return <Toolbar menus={this.getToolbarProps()} />
    }
    createCytoscape(): any {
        return <Cytoscape style={{ height: '100%', backgroundColor: '#eee' }}
            onRender={(element) => {
                cyStore.initCy(element)
            }} onRenderEyeView={(element) => {
                // cyStore.onCyInit(() => {
                //     cyStore.initNavigator(element)
                // })
            }} />
    }
    createEditors(): any {
        const { viewType, element } = this.state.editorsState
        return <Editors>
            {
                viewType === EditorViewType.Node && <NodeEditor element={element} />
            }
            {
                viewType === EditorViewType.Edge && <EdgeEditor element={element} />
            }
            {
                viewType === EditorViewType.Default && <DefaultEditor exportJson={
                    () => {
                        const json = cyStore.getCy().json()
                        console.log(json)
                        const { elements, style } = json
                        console.log(jsonFormat({ elements, style }))
                    }
                } />
            }

        </Editors>
    }
    getToolbarProps() {
        const toolBarState = toolbarStore.getState()
        return toolBarState.menus.map(menu => {
            return {
                id: menu.id,
                label: menu.label,
                action: (e) => {
                    if (menu.command === 'undo') {
                        commandStore.undoCommand()
                    } else if (menu.command === 'redo') {
                        commandStore.redoCommand()
                    } else {
                        commandStore.runCommand(menu.command)
                    }
                }
            }
        })
    }
    componentDidMount() {
        this.dispose = this.props.appStore.onUpdate((state) => {
            this.setState({ ...state })
        })
    }
    componentWillUnmount() {
        this.dispose.dispose()
    }
}
