import $ from 'jquery'

$(document).ready(function() {
    $('.layer button ').on('click', function() {
        const $layer = $('nav div .layer');
        const $navButton = $('nav button');

        // Toggle the display of the layer and nav button
        if ($layer.css('display') === 'none') {
            $layer.show(); // Show the layer
            $navButton.hide(); // Hide the button
        } else {
            $layer.hide(); // Hide the layer
            $navButton.show(); // Show the button
        }
    });
    const button = $('.layer button ')
    console.log( button);
    
});