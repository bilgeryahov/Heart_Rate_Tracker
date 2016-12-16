/**
 * @file SmartWatch.js
 *
 * @author Bilger Yahov <bayahov1@gmail.com>
 * @version 1.0.0
 */

var SmartWatch = {

	_thumbUp: {},
	_everythingFine: {},

	init: function(){

		let $self = this;

		// Get the thumb down from the page.
		$self._thumbDown = $('ThumbDown');

		// Go through defensive check.
		if(!$self._thumbDown){

			console.error('SmartWach.init(): The thumb down is not found. Abort.');
			return;
		}

		// Attach event.
		$self._thumbDown.addEvent('click', function(){

			// Show message that everything is fine.
			$self.showMessageFine();
		});

		// Initialize the scrolling effect.
		new Fx.SmoothScroll({ duration:700 }, window);
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