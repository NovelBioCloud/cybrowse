import React, {
	Component
} from 'react'
import ReactDom from 'react-dom'
import $ from 'jquery'
import _ from 'lodash'
import immutable from 'immutable'
import postal from 'postal'
import async from 'async'
import assert from 'assert'
import {
  eventDispatcher,
} from './service'
import {
  defaultConfigStore,
} from './store'
import Loading from './Loading'
import Main from './Main'
import toastr from 'toastr'
export default class App {
	constructor(element, callback) {
		assert(element, 'element can not be null!')
		assert(!callback || _.isFunction(callback), 'callback must be a function!')
		ReactDom.render( < AppView />, element, () => { callback && callback() } )
	}
}

class AppView extends Component {
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
