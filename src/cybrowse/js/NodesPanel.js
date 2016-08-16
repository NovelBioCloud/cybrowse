import React, {
	Component
} from 'react';
import ReactDom from 'react-dom';

export default class NodesPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 'nodes'
		}
	}

  render(){
    return <div>
      "nodes"
    </div>;
  }

}
