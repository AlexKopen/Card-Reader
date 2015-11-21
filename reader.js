$(document).ready(function() {

	// Winning values
	var winningValues = [';763952?'];

	// Select input field
	$('#value').focus();

	// Behave when enter key is pressed/card is swiped
	$('#value').bind("enterKey",function(){

		// Clear win/loss
		$('#win, #loss').css('color', '#ffffff');

		var scannedValue = $(this).val();

		// Check for a valid scan
		if (/^(;\d+\?$)/.test(scannedValue)){
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

	   // Empty the input field
	   $(this).val('')
	});

	// Enter key function
	$('#value').keyup(function(e){
	    if(e.keyCode == 13)
	    {
	        $(this).trigger("enterKey");
	    }
	});

	// Prevent the user from unfocusing the input field
	$('#value').focusout(function() {
		$('#value').focus();
	});

});
