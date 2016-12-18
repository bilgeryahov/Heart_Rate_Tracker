/**
 * @file HandleNewInput.js
 *
 * Handles the new Person input to the page.
 * Communicates with Firebase Real Time Database.
 *
 * @author Bilger Yahov <bayahov1@gmail.com>
 * @version 1.0.0
 */

var HandleNewInput = {

	// Eventually are gotten from the Firebase Real Time Database
	_distraction: '',
	_levelOfDistraction: 0,

	// Update button on the page.
	_update: {},

	// Templating stuff.
	_personTemplate: {},
	_personPlaceholder: {},

	/**
	 * Initializes the main functionality.
	 * Gets elements from the page and makes sure that
	 * they are present.
	 *
	 * @return void
	 */

	init: function(){

		let $self = this;

		// Check for the templating stuff.
		$self._personPlaceholder = $('PersonPlaceholder');
		$self._personTemplate = $('PersonTemplate');

		if(!$self._personPlaceholder || !$self._personTemplate){

			console.error('HandleNewInput.init(): Something wrong with the templating stuff!. Abort!');
			return;
		}

		// Get the button.
		$self._update = $('Update');

		// Check that beauty.
		if(!$self._update){

			console.error('HandleNewInput.init(): Update button not found!');
			return;
		}

		$self._update.addEvent('click', function(){

			$self.loadData();
		});
	},

	/**
	 * @ATTENTION: Dangerous
	 *
	 * Well.. just read it.
	 *
	 * @return void
	 */

	loadData: function(){

		let $self = this;

		// Verify that FirebaseEngine is present object.
		if(!FirebaseEngine){

			console.error('SmartWatch.sendDetails(): FirebaseEngine is not present! Aborting!');
			return;
		}

		// This will be a callback when the second call to the DB is made.
		let $completeEnd = function(){

			// Check if the default values are overriden.
			if($self._distraction === '' || !$self._levelOfDistraction === 0){

				// Nothing new! Bail out!
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
		};

		// After the first fetch is completed.
		let $secondFetch = function () {

			// Get the level of distraction.
			FirebaseEngine.fetchData('levelOfDistraction', function($data){

				if($data.hasOwnProperty('levelOfDistraction')){

					// Good to go!
					$self._levelOfDistraction = $data['levelOfDistraction'];

					// Finish it!
					$completeEnd();
				}
			});
		};

		// Actually it all starts here...
		FirebaseEngine.fetchData('distraction', function($data){

			if($data.hasOwnProperty('distraction')){

				// Good to go!
				$self._distraction = $data['distraction'];

				// Continues here...
				$secondFetch();
			}
		});
	}
};

document.addEvent('domready', function(){

	// Do stuff here.
	HandleNewInput.init();
});