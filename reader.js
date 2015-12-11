$(document).ready(function() {

	// Number of winners
	var firstPlaceWinnerCount = 0;
	var secondPlaceWinnerCount = 0;

	// Select the off-screen input field on page load
	$('#value').focus();

	// Prevent the user from defocussing the input field
	$('#value').focusout(function() {
		$('#value').focus();
	});	

	// Enter key press to be binded
	$('#value').keyup(function(e){
		if(e.keyCode == 13) {
			$(this).trigger("enterKey");
		}
	});

	// Enter key is pressed/card is swiped
	$('#value').bind("enterKey",function(){

		// Clear win and loss
		$('.category').css('color', '#ffffff');

		var scannedValue = $(this).val();

		// Check for a valid scan using the regular expression: start of string, beginning capturing group, semi-colon, any number of digits, question mark, ending capturing group, end of string
		// Ex. ;763952?
		if (/^(;\d+\?)$/.test(scannedValue)){
			$('#status').text('Card Scanned!  Loading...');
			$('#invalid').text('');

			// Add suspense
			setTimeout(function(){
				$('#status').text('Waiting for Scan...');
				switch (scannedValue){
					case ';888111888?':
						firstPlaceWinnerCount++;
						$('#first-place-count').text(firstPlaceWinnerCount);
						$('#first-place').css('color', 'red');
						break;
					case ';111333555?':
						secondPlaceWinnerCount++;
						$('#second-place-count').text(secondPlaceWinnerCount);
						$('#second-place').css('color', 'red');
						break;
					default:
						$('#loss').css('color', 'red');
						break;
				}
			},2000);

		} else {
			$('#invalid').text('Invalid Scan!  Please try again');
		}

		// Empty the input field for the next scan
		$(this).val('');
	});

});
