/**
 * @file Firebase.js
 *
 * Own implementation of a Firebase engine, with
 * fetch data and save data functions.
 *
 * @author Bilger Yahov <bayahov1@gmail.com>
 * @version 1.0.0
 */

var FirebaseEngine = {

	// Reference to the core engine.
	_databaseEngine: {},

	/**
	 * Initializes the current application and the firebase engine.
	 *
	 * E man, ya cant du anythin with ma apiKey ;)
	 *
	 * @return void
	 */

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

	/**
	 * Fetches data from the Firebase Real Time Database.
	 * When data arrives calls back the function provided with the
	 * data attached.
	 *
	 * If something goes wrong, the error message is shown.
	 *
	 * @param $path
	 * @param $onArrived
	 *
	 * @return void
	 */

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

	/**
	 * Well, you provide the path and the data, it makes sure
	 * that your data ends up at the correct place.
	 *
	 * @param $path
	 * @param $data
	 *
	 * @return void
	 */

	saveData: function($path, $data){

		let $self = this;

		$self._databaseEngine.child($path).set($data);
	}
};

document.addEvent('domready', function(){

	// Initialize the Firebase enigne.
	FirebaseEngine.init();
});