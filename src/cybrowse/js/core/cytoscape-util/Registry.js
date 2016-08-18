import cytoscape from 'cytoscape';
import cxtmenu from 'cytoscape-cxtmenu';
import $ from 'jquery';
// import undoRedo from 'cytoscape.js-undo-redo';
import navigator from 'cytoscape-navigator';
import panzoom from 'cytoscape-panzoom'
// import viewUtilities from 'cytoscape-view-utilities';
// import contextMenus from 'cytoscape-context-menus';

class Registry {
	constructor() {
		panzoom(cytoscape, $);
		cxtmenu(cytoscape, $);
	}
	static register() {
		if (!Registry.instance) {
			Registry.instance = new Registry();
		}
	}
	static registerPlugin(cy) {
		const pluginMap = new Map();
		if (!Registry.instance) {
			pluginMap.set("panzoom", Registry.initPanzoom(cy));
			pluginMap.set("cxtmenu", Registry.initCxtmenu(cy));
		}
		return pluginMap;
	}

	static initCxtmenu(cy) {
		var defaults = {
			menuRadius: 50, // the radius of the circular menu in pixels
			selector: 'node', // elements matching this Cytoscape.js selector will trigger cxtmenus
			commands: [ // an array of commands to list in the menu or a function that returns the array

				{ // example command
					fillColor: 'rgba(200, 200, 200, 0.5)', // optional: custom background color for item
					content: 'a command name0', // html/text content to be displayed in the menu
					select: function (ele) { // a function to execute when the command is selected
						console.log(ele.id()) // `ele` holds the reference to the active element
					}
      },
				{ // example command
					fillColor: 'rgba(200, 200, 200, 0.7)', // optional: custom background color for item
					content: 'a command name1', // html/text content to be displayed in the menu
					select: function (ele) { // a function to execute when the command is selected
						console.log(ele.id()) // `ele` holds the reference to the active element
					}
  		},
				{ // example command
					fillColor: 'rgba(200, 200, 200, 0.2)', // optional: custom background color for item
					content: 'a command name2', // html/text content to be displayed in the menu
					select: function (ele) { // a function to execute when the command is selected
						console.log(ele.id()) // `ele` holds the reference to the active element
					}
  		},
				{ // example command
					fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
					content: 'a command name3', // html/text content to be displayed in the menu
					select: function (ele) { // a function to execute when the command is selected
						console.log(ele.id()) // `ele` holds the reference to the active element
					}
  		}
    ], // function( ele ){ return [ /*...*/ ] }, // example function for commands
			fillColor: 'rgba(0, 0, 0, 0.75)', // the background colour of the menu
			activeFillColor: 'rgba(92, 194, 237, 0.75)', // the colour used to indicate the selected command
			activePadding: 20, // additional size in pixels for the active command
			indicatorSize: 24, // the size in pixels of the pointer to the active command
			separatorWidth: 3, // the empty spacing in pixels between successive commands
			spotlightPadding: 4, // extra spacing in pixels between the element and the spotlight
			minSpotlightRadius: 24, // the minimum radius in pixels of the spotlight
			maxSpotlightRadius: 38, // the maximum radius in pixels of the spotlight
			openMenuEvents: 'cxttapstart taphold', // cytoscape events that will open the menu (space separated)
			itemColor: 'white', // the colour of text in the command's content
			itemTextShadowColor: 'black', // the text shadow colour of the command's content
			zIndex: 9999, // the z-index of the ui div
			atMouse: false // draw menu at mouse position
		};
		return cy.cxtmenu(defaults);
	}
	static initPanzoom(cy) {
		// the default values of each option are outlined below:
		var defaults = {
			zoomFactor: 0.05, // zoom factor per zoom tick
			zoomDelay: 45, // how many ms between zoom ticks
			minZoom: 0.1, // min zoom level
			maxZoom: 10, // max zoom level
			fitPadding: 50, // padding when fitting
			panSpeed: 10, // how many ms in between pan ticks
			panDistance: 10, // max pan distance per tick
			panDragAreaSize: 75, // the length of the pan drag box in which the vector for panning is calculated (bigger = finer control of pan speed and direction)
			panMinPercentSpeed: 0.25, // the slowest speed we can pan by (as a percent of panSpeed)
			panInactiveArea: 8, // radius of inactive area in pan drag box
			panIndicatorMinOpacity: 0.5, // min opacity of pan indicator (the draggable nib); scales from this to 1.0
			zoomOnly: false, // a minimal version of the ui only with zooming (useful on systems with bad mousewheel resolution)
			fitSelector: undefined, // selector of elements to fit
			animateOnFit: function () { // whether to animate on fit
				return false;
			},
			fitAnimationDuration: 1000, // duration of animation on fit

			// icon class names
			sliderHandleIcon: 'fa fa-minus',
			zoomInIcon: 'fa fa-plus',
			zoomOutIcon: 'fa fa-minus',
			resetIcon: 'fa fa-expand'
		};

		return cy.panzoom(defaults);
	}
}
Registry.register();
export default Registry;
