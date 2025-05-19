// automate-actions.user.js

(function() {
    'use strict';

    // Function to perform actions
    function performActions() {
        // Simulate clicking on the first email after a brief delay
        var firstEmail = document.querySelector('div.xT>div.y6>span.bog');
        if (firstEmail) {
            firstEmail.click();
            console.log('Clicked on the first email.');

            // Wait for 5 seconds (5000 milliseconds)
            setTimeout(function() {
                // Click on 'Not Spam' button
                var notSpamButton = document.querySelector('div.ar9.T-I-J3.J-J5-Ji');
                if (notSpamButton) {
                    notSpamButton.click();
                    console.log('Clicked on "Not Spam".');
                } else {
                    console.error('Button "Not Spam" not found.');
                }

                // Optionally, you can navigate back to the previous page after a delay
                setTimeout(function() {
                    window.history.back(); // Navigate back to previous page
                }, 2000); // Adjust the delay as needed
            }, 5000); // Wait for 5 seconds before clicking "Not Spam"
        } else {
            console.error('First email not found.');
        }
    }

    // Start performing actions immediately
    performActions();

})();
