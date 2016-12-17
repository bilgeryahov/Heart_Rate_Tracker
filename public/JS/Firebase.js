/**
 * @file Firebase.js
 *
 * @author Bilger Yahov <bayahov1@gmail.com>
 * @version 1.0.0
 */

var FirebaseEngine = {

	_databaseEngine: {},

	init: function(){

		let $self = this;

		let config = {
			apiKey: "AIzaSyBTdolTLO0gval9itakimtvNudbj5OSFfo",
			authDomain: "heartratetracker-36be1.firebaseapp.com",
			databaseURL: "https://heartratetracker-36be1.firebaseio.com",
			storageBucket: "heartratetracker-36be1.appspot.com",
			messagingSenderId: "199057567049"
		};

		// Initialize the current app.
		firebase.initializeApp(config);

		// Initialize the databse enigne.
		$self._databaseEngine = firebase.database().ref();
	},

	fetchData: function($path, $onArrived){

		let $self = this;

		$self._databaseEngine.child($path)
			.once('value')
			.then(function($data){

				// Call me back with the data.
				$onArrived($data.val());
			}, function($error){

				// Oh bad..
				console.log('FirebaseEngine.fetchData(): says this-> ' + $error);
			});
	},

	saveData: function($path, $data){

		let $self = this;

		$self._databaseEngine.child($path).set($data);
	}
};

document.addEvent('domready', function(){

	// Initialize the Firebase enigne.
	FirebaseEngine.init();
});