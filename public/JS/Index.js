/**
 * @file Index.js
 *
 * @author Bilger Yahov <bayahov1@gmail.com>
 * @version 1.0.0
 */

var Index = {

	accessToken: '',
	clientId: '227Y8S',
	clientSecret: '05982600e19eccce5b3accdc2bb77143',
	responseType: 'token',
	redirectURI: 'http://athena.fhict.nl/users/i311336/allStuff/Minor/HeartRateTracker/',
	scope: 'activity',

	init: function(){

		var $self = this;

		// Load the Visualization API and the corechart package.
		google.charts.load('current', {'packages':['corechart']});

		// Get the access token and start processing (callback function).
		$self.getAccessToken($processingFunc);

		var $processingFunc = function(){

			fetch(
				'https://api.fitbit.com/1/user/-/activities/heart/date/2016-03-19/1d/1sec/time/21:00/23:00.json',
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

					console.error($error);
				});
		};
	},

	getAccessToken: function($callback){

		var $self = this;

		if(!window.location.hash){

			window.location.replace('https://www.fitbit.com/oauth2/authorize' +
				'?' +
				'response_type=' + $self.responseType +
				'&' +
				'client_id=' + $self.clientId +
				'&' +
				'redirect_uri=' + $self.redirectURI +
				'&' +
				'scope=' + $self.scope);

			alert('got the access token');

			$callback();
		}
		else{

			var $fragmentQueryParameters = {};

			window.location.hash.slice(1).replace(
				new RegExp("([^?=&]+)(=([^&]*))?", "g"),
				function($0, $1, $2, $3){

					$fragmentQueryParameters[$1] = $3;
				}
			);

			$self.accessToken = $fragmentQueryParameters.access_token;

			alert('got the access token');

			$callback();
		}
	},

	processResponse: function($res){

		if(!$res.ok){

			console.error('Fitbit API request failed: ' + $res);
		}

		var $contentType = $res.headers.get('content-type');

		if($contentType && $contentType.indexOf('application/json') !== -1){

			return $res.json();
		}
		else{

			console.error('JSON expected but received ' + $contentType);
		}
	},

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

	graphHeartRate: function($timeSeries){

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
