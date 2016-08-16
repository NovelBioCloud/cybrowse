import React, {
	Component
} from 'react';
import ReactDom from 'react-dom';

export default class EdgesPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 'nodes'
		}
	}

  render(){
    return <div>
      "edges"
    </div>;
  }

}
