$(document).ready(function() {

	// Play a specific scan animation
	function playScanAnimation(videoPath){
		$('#scan-animation').css('display', 'inline');
		$('#scan-animation > source').attr('src', videoPath);
		$('#scan-animation').get(0).load();
		$('#scan-animation').get(0).play();
	}

	// Restart the loop video
	function restartLoop(){
		$('#loop').get(0).play();
		$('#loop').css('display', '');
	}

	// Allow for the user to swipe a card after being prevented from doing so
	function removeDisabled(){
		$('#value').removeAttr('disabled');
		// Firefox hack for the focus function
		setTimeout(function(){
			$('#value').focus();
		}, 0); 		
	}

	// Number of winners
	var doorWinnerCount = 0;
	var grandWinnerCount = 0;

	// Timeout for invalid scans
	var invalidTimeout;

	// Select the off-screen input field on page load
	setTimeout(function(){
		$('#value').focus();
	}, 0); 

	// Prevent the user from defocussing the input field
	$('#value').focusout(function(){		
		setTimeout(function(){
			$('#value').focus();
		}, 0); 
	});	

	// Enter key press to be binded
	$('#value').keyup(function(e){
		if(e.keyCode == 13) {
			// TRIGGER WARNING
			$(this).trigger("enterKey");
		}
	});

	// Plays the loop video after a scan animation has ended
	$('#scan-animation').on('ended',function(){
		$(this).css('display', 'none');
		removeDisabled();
		restartLoop();
	});	

	// Enter key is pressed/card is swiped
	$('#value').bind("enterKey",function(){

		// Prevent any additional input until an animation has played
		$('#value').attr('disabled', 'true');

		// Clear any invalid timeouts set
		clearTimeout(invalidTimeout);

		// Hide the loop video
		$('#loop').get(0).pause();
		$('#loop').css('display', 'none');

		// Card value from the scanner
		var scannedValue = $(this).val();

		// Check for a valid scan using the regular expression: start of string, beginning capturing group, semi-colon, any number of digits, question mark, ending capturing group, end of string
		// Ex. ;763952?
		if (/^(;\d+\?)$/.test(scannedValue)){
			// Successful scan: Change the application status and clear any invalid status
			$('#status').text('Card Scanned!  Loading...');
			$('#invalid').text('');

			// Add suspense
			setTimeout(function(){
				switch (scannedValue){
					// Grand prize
					case ';888111888?':
						// Only allow 5 grand prize winners
						if (grandWinnerCount++ < 5){
							playScanAnimation('videos/grand_prize.mp4');
							// Prevents users from seeing background text change
							setTimeout(function(){
								$('#status').text('Waiting for Scan...');
								$('#grand-winner-count').text(grandWinnerCount);
							}, 5000);							

						} else{
							doorWinnerCount++;
							playScanAnimation('videos/door_prize.mp4');
							setTimeout(function(){								
								$('#status').text('Waiting for Scan...');
								$('#door-winner-count').text(doorWinnerCount);
							}, 5000);
						}						
						break;
					// Door prize
					default:
						doorWinnerCount++;
						playScanAnimation('videos/door_prize.mp4');
						setTimeout(function(){
							$('#status').text('Waiting for Scan...');
							$('#door-winner-count').text(doorWinnerCount);
						}, 5000);
						break;
				}
			}, 4000);

		} else {
			removeDisabled();
			// Invalid scan
			$('#invalid').text('Invalid Scan!  Please try again');
			// Flash
			$('#invalid').fadeOut('100').fadeIn('100');

			// Restart the loop video after the user has seen the scan wasn't valid
			invalidTimeout = setTimeout(function(){
				restartLoop();
			}, 10000);
		}

		// Empty the input field for the next scan
		$(this).val('');
	});
});
