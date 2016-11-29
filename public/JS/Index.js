/**
 * @file Index.js
 *
 * @author Bilger Yahov <bayahov1@gmail.com>
 * @version 1.0.0
 */

var Index = {

	// Needed to get access to data.
	accessToken: '',

	// Needed to connect with the account.
	clientId: '227Y8S',

	// Well.. we need a token for now.
	responseType: 'token',

	// Redirect to the same page.
	// Change this when needed.
	redirectURI: 'http://localhost:63342/Heart_Rate_Tracker/public/index.html',

	// What information we need to be provided with.
	scope: 'activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight',

	/**
	 * Loads the Google Charts API,
	 * Makes a request to get the access token,
	 * Then there is a call stack (look below for more info).
	 *
	 * @return void
	 */

	init: function(){

		var $self = this;

		// Load the Visualization API and the corechart package.
		google.charts.load('current', {'packages':['line']});

		// Get the access token and start processing (callback function).
		$self.getAccessToken(

			function(){

				fetch(
					'https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json',
					{
						headers: new Headers({
							'Authorization': 'Bearer ' + $self.accessToken
						}),
						mode: 'cors',
						method: 'GET'
					}
				).then($self.processResponse)
					.then($self.processHeartRate)
					.then($self.graphHeartRate)
					.catch(function($error){

						console.error('Index.init(): ' + $error);
					});
			}
		);
	},

	/**
	 * Tries to get an access token.
	 *
	 * @param $callback - What do to after the access token is granted.
	 *
	 * @return void
	 */

	getAccessToken: function($callback){

		var $self = this;

		// Check if there is access token already granted.
		if(!window.location.hash){

			// If yes, authorize me.
			window.location.replace('https://www.fitbit.com/oauth2/authorize' +
				'?' +
				'response_type=' + $self.responseType +
				'&' +
				'client_id=' + $self.clientId +
				'&' +
				'redirect_uri=' + $self.redirectURI +
				'&' +
				'scope=' + $self.scope);

			// Call the callback function, when you think it's safe to do so (3sec delay).
			setTimeout($callback,3000);
		}
		else{

			// There is an access token granted already.
			var $fragmentQueryParameters = {};

			window.location.hash.slice(1).replace(
				new RegExp("([^?=&]+)(=([^&]*))?", "g"),
				function($0, $1, $2, $3){

					$fragmentQueryParameters[$1] = $3;
				}
			);

			// Set my access token.
			$self.accessToken = $fragmentQueryParameters.access_token;

			// Call the callback function, when you think it's safe to do so.
			setTimeout($callback,3000);
		}
	},

	/**
	 * Processes the response received.
	 *
	 * @param $res
	 *
	 * @returns {*}|null
	 */

	processResponse: function($res){

		// Check if everything went fine.
		if(!$res.ok){

			console.error('Index.processResponse(): Fitbit API request failed: ' + $res);
		}

		var $contentType = $res.headers.get('content-type');

		if($contentType && $contentType.indexOf('application/json') !== -1){

			// We are safe.
			return $res.json();
		}
		else{

			// Well.. shit happens.
			console.error('Index.processResponse(): JSON expected but received ' + $contentType);
		}

		return null;
	},

	/**
	 * Process the heart rate returned.
	 *
	 * @param $timeSeries
	 *
	 * @returns {*|Array}
	 */

	processHeartRate: function($timeSeries){

		return $timeSeries['activities-heart-intraday']
			.dataset
			.map(
				function($measurement){

					return [
							$measurement
								.time
								.split(':')
								.map(
									function($timeSegment){

										return Number.parseInt($timeSegment);
									}
								),
								$measurement.value
							];
				}
			);
	},

	/**
	 * Draw the chart.
	 *
	 * @param $timeSeries
	 *
	 * @return void
	 */

	graphHeartRate: function($timeSeries){

		// Log the data, so I can see it.
		console.log($timeSeries);

		var $data = new google.visualization.DataTable();

		$data.addColumn('timeofday', 'Time of Day');
		$data.addColumn('number', 'Heart Rate');

		$data.addRows($timeSeries);

		var $options = google.charts.Line.convertOptions(
			{
				height: 450
			}
		);

		var $chart = new google.charts.Line(document.getElementById('Chart'));

		$chart.draw($data, $options);
	}
};

document.addEvent('domready', function(){

	Index.init();
});
