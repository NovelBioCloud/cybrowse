const styleOptions = [
	{
		selector: 'node',
		style: {
			'content': 'data(name)',
			'text-valign': 'center',
			'text-halign': 'right',
			'background-color': '#11479e'
		}
  }, {
		selector: 'edge',
		style: {
			'width': 4,
			'content': 'data(id)',
			'target-arrow-shape': 'triangle',
			'line-color': '#9dbaea',
			'target-arrow-color': '#9dbaea',
			'curve-style': 'bezier'
		}
  }];
export default styleOptions;
