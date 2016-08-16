import cytoscape from 'cytoscape';
import cxtmenu from 'cytoscape-cxtmenu';
import jquery from 'jquery';
// import undoRedo from 'cytoscape.js-undo-redo';
import navigator from 'cytoscape-navigator';

// import viewUtilities from 'cytoscape-view-utilities';
// import contextMenus from 'cytoscape-context-menus';
export default function createCytoscape(container) {
	navigator(cytoscape, jquery);
	cxtmenu(cytoscape, jquery);
	// undoRedo(cytoscape);
	// viewUtilities( cytoscape );
	// contextMenus(cytoscape, jquery);
	let cy = cytoscape({
		container: container, // container to render in
		elements: [],
		style: [
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
			}],
	});
	initTest(cy);
	// initContextMenus(cy);
	initCxtmenu(cy);
	// initViewUtil(cy);
	cy.on('tap', function (event) {
		// cyTarget holds a reference to the originator
		// of the event (core or element)
		var evtTarget = event.cyTarget;

		if (evtTarget === cy) {
			console.log('tap on background');
		} else {
			console.log('tap on some element');
		}
	});
	cy.on('tap', 'node', {
		foo: 'bar'
	}, function (evt) {
		console.log(evt.data.foo); // 'bar'
		var node = evt.cyTarget;
		console.log('tapped ' + node.id());
	});
	cy.on('tap', 'node', {}, function (evt) {
		console.log(123); // 'bar'
		var node = evt.cyTarget;
		console.log('tapped ' + node.id());
	});
	cy.on('tap', 'node', function (evt) {
		console.log(456); // 'bar'
		var node = evt.cyTarget;
		console.log('tapped ', node);
	});
	return cy;
}
function initTest(cy) {

	var defaults = {
	    container: false // can be a HTML or jQuery element or jQuery selector
	  , viewLiveFramerate: 0 // set false to update graph pan only on drag end; set 0 to do it instantly; set a number (frames per second) to update not more than N times per second
	  , thumbnailEventFramerate: 30 // max thumbnail's updates per second triggered by graph updates
	  , thumbnailLiveFramerate: false // max thumbnail's updates per second. Set false to disable
	  , dblClickDelay: 200 // milliseconds
	  , removeCustomContainer: true // destroy the container specified by user on plugin destroy
	  , rerenderDelay: 100 // ms to throttle rerender updates to the panzoom for performance
	};

	var nav = cy.navigator( defaults ); // get navigator instance, nav
}
function initViewUtil(cy) {
	let options = {
		node: {
				highlighted: {}, // styles for when nodes are highlighted.
				unhighlighted: { // styles for when nodes are unhighlighted.
						'opacity': 0.3,
						'text-opacity': 0.3,
						'background-opacity': 0.3
				}
		},
		edge: {
				highlighted: {}, // styles for when edges are highlighted.
				unhighlighted: { // styles for when edges are unhighlighted.
						'border-opacity': 0.3,
						'text-opacity': 0.3,
						'background-opacity': 0.3
				}
		},
		searchBy: ["id"]
	};
	cy.viewUtilities(options);
}
function initContextMenus(cy) {
	let options = {
		// List of initial menu items
		menuItems: [{
			id: 'remove', // ID of menu item
			title: 'remove', // Title of menu item
			// Filters the elements to have this menu item on cxttap
			// If the selector is not truthy no elements will have this menu item on cxttap
			selector: 'node, edge',
			onClickFunction: function () { // The function to be executed on click
				console.log('remove element');
			},
			disabled: false, // Whether the item will be created as disabled
			hasTrailingDivider: true, // Whether the item will have a trailing divider
			coreAsWell: false // Whether core instance have this item on cxttap
			}, {
			id: 'hide',
			title: 'hide',
			selector: 'node, edge',
			onClickFunction: function () {
				console.log('hide element');
			},
			disabled: true
			}, {
			id: 'add-node',
			title: 'add node',
			selector: 'node',
			coreAsWell: true,
			onClickFunction: function () {
				console.log('add node');
			}
			}],
		// css classes that menu items will have
		menuItemClasses: [
	      // add class names to this list
	    ],
		// css classes that context menu will have
		contextMenuClasses: [
	      // add class names to this list
	    ]
	};
	cy.contextMenus(options);
}
function initUndoRedo() {

}
function initCxtmenu(cy) {
	var defaults1 = {
		menuRadius: 50, // the radius of the circular menu in pixels
		selector: 'node', // elements matching this Cytoscape.js selector will trigger cxtmenus
		commands: [ // an array of commands to list in the menu or a function that returns the array

    { // example command
      fillColor: 'rgba(200, 200, 200, 0.5)', // optional: custom background color for item
      content: 'a command name0', // html/text content to be displayed in the menu
      select: function(ele){ // a function to execute when the command is selected
        console.log( ele.id() ) // `ele` holds the reference to the active element
      }
    },
		{ // example command
			fillColor: 'rgba(200, 200, 200, 0.7)', // optional: custom background color for item
			content: 'a command name1', // html/text content to be displayed in the menu
			select: function(ele){ // a function to execute when the command is selected
				console.log( ele.id() ) // `ele` holds the reference to the active element
			}
		},
		{ // example command
			fillColor: 'rgba(200, 200, 200, 0.2)', // optional: custom background color for item
			content: 'a command name2', // html/text content to be displayed in the menu
			select: function(ele){ // a function to execute when the command is selected
				console.log( ele.id() ) // `ele` holds the reference to the active element
			}
		},
		{ // example command
			fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
			content: 'a command name3', // html/text content to be displayed in the menu
			select: function(ele){ // a function to execute when the command is selected
				console.log( ele.id() ) // `ele` holds the reference to the active element
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
	var cxtmenuApi1 = cy.cxtmenu(defaults1);
}
