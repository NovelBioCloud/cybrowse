import React, {
	Component
} from 'react'
import ReactDom from 'react-dom'
import $ from 'jquery'
import _ from 'lodash'
import immutable from 'immutable'
import postal from 'postal'
import toastr from 'toastr'
import async from 'async'
import assert from 'assert'
import {
  eventDispatcher,
} from '../service'
import {
  defaultConfigStore,
} from '../store'

export default class Main extends Component {
	constructor(props, context) {
		super(props, context)
		this.initState()
	}
	initState() {
		this.state = {
			view: 'loading'
		}
	}
	render() {
    switch (this.state.view) {
      case 'loading':
        return this.renderLoading()
      default:
        return this.renderInitial()
    }
	}
	renderLoading() {
		return <div>正在加载数据。。。</div>
	}
	renderInitial() {
		return <div>
      <div>toolbar</div>
      <div>aside</div>
      <div>article</div>
    </div>
	}
	componentDidMount() {
    let data;
    async.waterfall([(callback) => {
      defaultConfigStore.loadConfig().then((_data)=>{
        data = _data
  			callback()
  		})
    }, (callback) => {
      this.setState({
        view: 'initial'
      }, this.bindEvent())
      callback()
    }], (err, results) => {
      if (err) {
        console.error(err)
      } else {
        toastr.success('加载成功')
      }
    })
	}
  componentWillUnmount() {
    this.unbindEvent()
  }

  bindEvent() {
    this.subscription = eventDispatcher.channel().subscribe('appview.finish', () => {
    })
  }
  unbindEvent() {
    this.subscription.unsubcribe()
  }
}
