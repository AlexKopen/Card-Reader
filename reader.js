$(document).ready(function() {

	// Select the off-screen input field on page load
	$('#value').focus();

	// Predetermined winning values
	var winningValues = [';763952?'];

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
		$('#win, #loss').css('color', '#ffffff');

		var scannedValue = $(this).val();

		// Check for a valid scan using the regular expression: start of string, beginning capturing group, semi-colon, any number of digits, question mark, ending capturing group, end of string
		// Ex. ;763952?
		if (/^(;\d+\?)$/.test(scannedValue)){
			$('#status').text('Card Scanned!  Loading...');

			// Add suspense
			setTimeout(function(){
				$('#status').text('Waiting for Scan...');
				// Check to see if entered value is a winner
				if ($.inArray(scannedValue, winningValues) != -1){
					$('#win').css('color', 'red');
					console.log('winner: ' + scannedValue);
				} else {
					$('#loss').css('color', 'red');
					console.log('loser: ' + scannedValue);
				}
			},2000);

		} else {
			$('#status').text('Invalid Scan!  Please try again');
		}

	   // Empty the input field for the next scan
	   $(this).val('');
	});	

});
