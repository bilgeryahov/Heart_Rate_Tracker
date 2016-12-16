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
	}
};

document.addEvent('domready', function(){

	SmartWatch.init();
});