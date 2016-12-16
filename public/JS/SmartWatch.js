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

	init: function(){

		let $self = this;

		// Get the thumb up and thumb down from the page.
		$self._thumbUp = $('ThumbUp');
		$self._thumbDown = $('ThumbDown');

		// Go through defensive checks.
		if(!$self._thumbDown || !$self._thumbUp){

			console.error('SmartWach.init(): One of the thumbs is not found. Abort.');
			return;
		}

		// Attach events.
		$self._thumbUp.addEvent('click', function(){

			// Do stuff.
		});

		$self._thumbDown.addEvent('click', function(){

			// Show message that everything is fine.
			$self.showMessageFine();
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
	}
};

document.addEvent('domready', function(){

	SmartWatch.init();
});