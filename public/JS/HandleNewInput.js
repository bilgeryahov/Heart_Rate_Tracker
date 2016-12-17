/**
 * @file HandleNewInput.js
 *
 * @author Bilger Yahov <bayahov1@gmail.com>
 * @version 1.0.0
 */

var HandleNewInput = {

	_distraction: '',
	_levelOfDistraction: 0,
	_update: {},

	// Templating stuff.
	_personTemplate: {},
	_personPlaceholder: {},

	init: function(){

		let $self = this;

		// Check for the templating stuff.
		$self._personPlaceholder = $('PersonPlaceholder');
		$self._personTemplate = $('PersonTemplate');

		if(!$self._personPlaceholder || !$self._personTemplate){

			console.error('HandleNewInput.init(): Something wrong with the templating stuff!. Abort!');
			return;
		}

		$self._update = $('Update');

		if(!$self._update){

			console.error('HandleNewInput.init(): Update button not found!');
			return;
		}

		$self._update.addEvent('click', function(){

			$self.loadFromLocalStorage();
		});
	},

	loadFromLocalStorage: function(){

		let $self = this;
		$self._distraction = localStorage.getItem('distraction');
		$self._levelOfDistraction = localStorage.getItem('levelOfDistraction');

		if(!$self._distraction || !$self._levelOfDistraction) {

			// There is nothing in the local storage yet. Bail out!
			alert('There is no new data.');
			return;
		}

		// Okay we have data. Show the new person.
		var $compiled = Handlebars.compile($self._personTemplate.get('html'));

		// Let's build the new object.
		let obj  = {
			levelOfDistraction: $self._levelOfDistraction
		};

		// Let's add the distraction.
		obj[$self._distraction] = true;

		// Try it!
		$self._personPlaceholder.set('html', $compiled(obj));
	}
};

document.addEvent('domready', function(){

	// Do stuff here.
	HandleNewInput.init();
});