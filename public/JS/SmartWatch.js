/**
 * @file SmartWatch.js
 *
 * @author Bilger Yahov <bayahov1@gmail.com>
 * @version 1.0.0
 */

var SmartWatch = {

	_thumbUp: {},
	_thumbDown: {},
	_everythingFine: {},
	_scrollTo: {},
	_fillIn: {},
	_sendButton: {},
	_textInput: {},

	// Distractions
	_phone: {},
	_people: {},
	_sound: {},
	_light: {},

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

			// Scroll to the needed Div.
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

	showMessageFine: function(){

		let $self = this;

		$self._everythingFine = $('EverythingFine');
		if(!$self._everythingFine){

			console.error('SmartWatch.showMessageFine(): everything is fine message is not ' +
				'present at the page');
			return;
		}

		// Show the message.
		$self._everythingFine.className = $self._everythingFine.className.replace(' w3-hide', '');
	},

	scrollToDiv: function(){

		let $self = this;

		$self._scrollTo = $('ScrollTo');
		if(!$self._scrollTo){

			console.error('SmartWatch.scrollToDiv(): The div to scroll is not found!');
			return;
		}

		// Scroll, maaan!
		new Fx.Scroll(window).toElement($self._scrollTo);
	},

	scrollToSending: function($id){

		let $self = this;

		$self._fillIn = $('FillIn');
		if(!$self._fillIn){

			console.error('SmartWatch.scrollToSending(): The div to send is not found!');
			return;
		}

		// Scroll, maaan!
		new Fx.Scroll(window).toElement($self._fillIn);

		// Set this in the local store, so you can retrieve it later.
		localStorage.setItem('distraction', $id.toString());
	},

	sendDetails: function(){

		let $self = this;

		// Verify that there are only digits.
		if(isNaN(($self._textInput.value).toInt())){

			alert('Enter a two-digit number!');
			console.error('SmartWatch.sendDetails(): The user entered not a number!');
			return;
		}

		// Get the text input.
		localStorage.setItem('levelOfDistraction', $self._textInput.value.toString());

		alert('Your details are sent!');
		$self._textInput.value = '';
	}
};

document.addEvent('domready', function(){

	SmartWatch.init();
});