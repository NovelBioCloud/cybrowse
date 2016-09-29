export default function SpecificEditorManager() {
	let specificEditorMap = new Map()
	this.init = init
	this.addNodeSpecificEditor = addNodeSpecificEditor
	this.addEdgeSpecificEditor = addEdgeSpecificEditor
	this.dispatchEvent = dispatchEvent

	function init() {}

	function addNodeSpecificEditor(editorKey, editor) {
		specificEditorMap.set(editorKey, editor)
	}

	function addEdgeSpecificEditor(editorKey, editor) {
		specificEditorMap.set(editorKey, editor)
	}

	function dispatchEvent(event, data) {
		switch (event) {
		case 'node.update':
			updateSpecificEditors(data)
			break
		}
	}

	function updateSpecificEditors(data) {
		for (let specific of specificEditorMap.values()) {
			specific.updateData(data)
		}
	}
}
