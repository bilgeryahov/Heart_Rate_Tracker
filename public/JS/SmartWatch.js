/**
 * @file SmartWatch.js
 *
 * Handles the actions going on the smart watch interface.
 *
 *
 * @author Bilger Yahov <bayahov1@gmail.com>
 * @version 1.0.0
 */

var SmartWatch = {

	// The thumbs that you see on the page.
	_thumbUp: {},
	_thumbDown: {},

	// Everything is fine text.
	_everythingFine: {},

	// Second div, where you see the options (distractions).
	_scrollTo: {},

	// Distractions
	_phone: {},
	_people: {},
	_sound: {},
	_light: {},

	// Fill in percentages div for the level of distraction
	_fillIn: {},

	// Controls for the bottom div (sending info Div).
	_sendButton: {},
	_textInput: {},

	/**
	 * Initializes the main functionality. Mainly gets elements from the page,
	 * goes through defensive checks to make sure that nothing breaks and attaches
	 * the needed events for each control.
	 *
	 * @return void
	 */

	init: function(){

		let $self = this;

		// Get the thumbs from the page.
		$self._thumbDown = $('ThumbDown');
		$self._thumbUp = $('ThumbUp');

		// Go through defensive checks.
		if(!$self._thumbDown || !$self._thumbUp){

			console.error('SmartWach.init(): One of the thumbs is not found. Abort.');
			return;
		}

		// Attach events.
		$self._thumbDown.addEvent('click', function(){

			// Show message that everything is fine.
			$self.showMessageFine();
		});

		$self._thumbUp.addEvent('click', function(){

			// Scroll distractions choice Div.
			$self.scrollToDiv();
		});

		// Then get the distractions.
		$self._light = $('Light');
		$self._phone = $('Phone');
		$self._people = $('People');
		$self._sound = $('Sound');

		// Defensively check for them.
		if(!$self._light || !$self._sound || !$self._people || !$self._phone){

			console.error('SmartWatch.init(): One of the distraction elements is not found.' +
				' Abort!');
			return;
		}

		// Attach them events.
		$$([$self._light, $self._people, $self._phone, $self._sound]).addEvent('click', function(){

			// Pass the id, since it's the actual distarction.
			$self.scrollToSending(this.id);
		});

		// Get the text input element.
		$self._textInput = $('TextInput');
		if(!$self._textInput){

			console.error('SmartWatch.init(): The text input is not found!');
			return;
		}

		// Deal with the Send button.
		$self._sendButton = $('Send');
		if(!$self._sendButton){

			console.error('SmartWatch.init(): The button to send is not found!');
			return;
		}

		$self._sendButton.addEvent('click', function(){

			$self.sendDetails();
		});
	},

	/**
	 * Gets the 'everything is fine' message from the page, makes sure that it's there.
	 * Displays it when the function is called.
	 *
	 * @return void
	 */

	showMessageFine: function(){

		let $self = this;

		// Get me.
		$self._everythingFine = $('EverythingFine');
		if(!$self._everythingFine){

			// Check me. (Sounds sexy ?)
			console.error('SmartWatch.showMessageFine(): everything is fine message is not ' +
				'present at the page');
			return;
		}

		// Show the message.
		$self._everythingFine.className = $self._everythingFine.className.replace(' w3-hide', '');
	},

	/**
	 * Well, pretty explanatory name, isn't it?
	 *
	 * Gets the choice Div from the page, goes through a defensive check and
	 * makes sure whenever this function is called, the page automatically
	 * scrolls to this particular div.
	 *
	 * @return void
	 */

	scrollToDiv: function(){

		let $self = this;

		// Get me.
		$self._scrollTo = $('ScrollTo');
		if(!$self._scrollTo){

			// Check me. Oh yes.
			console.error('SmartWatch.scrollToDiv(): The div to scroll is not found!');
			return;
		}

		// Scroll, maaan!
		new Fx.Scroll(window).toElement($self._scrollTo);
	},

	/**
	 * Gets the last div of the page. The one where percentages are filled in.
	 * Goes through a defensive check and makes sure that it's on place.
	 *
	 * Scrolls to this particular div.
	 *
	 * Makes sure that FirebaseEngine is a present object, so we don't break anything
	 * while we think that we are smart.
	 *
	 * Then constructs the object to be sent to the real time database,
	 * prepares the path and fires the sun. (What?)
	 *
	 * @param $id
	 *
	 * @return void
	 */

	scrollToSending: function($id){

		let $self = this;

		// Get me.
		$self._fillIn = $('FillIn');
		if(!$self._fillIn){

			// Check me. Oh no.
			console.error('SmartWatch.scrollToSending(): The div to send is not found!');
			return;
		}

		// Scroll, maaan!
		new Fx.Scroll(window).toElement($self._fillIn);

		// Verify that FirebaseEngine is present object.
		if(!FirebaseEngine){

			console.error('SmartWatch.sendDetails(): FirebaseEngine is not present! Aborting!');
			return;
		}

		/*
		 * First construct the object to be sent.
		 * Then prepare the path.
		 * Then try to send to the Firebase Real Time Database.
		 */

		let $obj = {
			'distraction': $id.toString()
		};

		let $path = 'distraction';

		// Brrrmmm brrrrrrrmmm....
		FirebaseEngine.saveData($path, $obj);
	},

	/**
	 * Checks again if the FirebaseEngine is present, not to break anything.
	 * Verifies that the input value is a number.
	 *
	 * Then constructs the object to be sent to the real time database,
	 * prepares the path and fires the sun. (What?)
	 *
	 * @return void
	 */

	sendDetails: function(){

		let $self = this;

		// Verify that FirebaseEngine is present object.
		if(!FirebaseEngine){

			console.error('SmartWatch.sendDetails(): FirebaseEngine is not present! Aborting!');
			return;
		}

		// Verify that there are only digits.
		if(isNaN(($self._textInput.value).toInt())){

			alert('Enter a two-digit number.');
			console.error('SmartWatch.sendDetails(): The user entered not a number!');
			return;
		}

		/*
		 * First construct the object to be sent.
		 * Then construct the path.
		 * Then try to send to the Firebase Real Time Database.
		 */

		let $obj = {
			'levelOfDistraction': ($self._textInput.value).toInt()
		};

		let $path = 'levelOfDistraction';

		FirebaseEngine.saveData($path, $obj);

		// Done!
		alert('Your details are sent.');

		// Clear after yourself baby.
		$self._textInput.value = '';
	}
};

// Beauty.
document.addEvent('domready', function(){

	SmartWatch.init();
});