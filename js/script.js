$('#name').focus();

$('#otherJobOption').hide();

/* 
Next 2 lines creates option to #color
and sets it as default. 
*/
$('#color').prepend('<option>Please, select a T-shit theme</option>');
$('#color').val($('#color option').eq(0).val());

/* 
Next 2 lines appends to the fieldset.activities 
paragragh to display the total cost to be displayed later.
The p span tag is added so it can be targeted 
to manipulate it's text content dinamically 
to display the cost number.
*/
$('fieldset.activities').append('<p id="totalCost">Total: $<span></span><p>');
$('#totalCost').hide();

$('#payment').val('Credit Card');
$('#payment option[value="select method"]').hide();
$('#paypal').hide();
$('#bitcoin').hide();

let totalCost = 0;

showOnlyDefaultColorOption();

function showOnlyDefaultColorOption(){
    $('#color').children().each(function(index, element){
        if ($(element).val() !== 'Please, select a T-shit theme'){
            $(element).hide();
        }
    });
}

/**
 * Calculates the total cost depending on if the element
 * is checked or not. It adds and subtracts from the global
 * total cost variable. 
 */
function calculateCost(element){
    // regex used to extract ONLY the number from the element[data-cost] string.
    let activityCost = parseInt($(element).attr('data-cost').replace(/^\$(\d+)$/, '$1'));
    
    if ($(element).prop('checked')){
        totalCost += activityCost;
    } else{
        totalCost -= activityCost;
    }
    return totalCost;
}


function isValidName(text){
    const isValid = /^.+$/.test(text);
    if (isValid) {
        $('#name').removeClass('invalidInput');
    } else {
        $('#name').addClass('invalidInput');
    }
    return isValid;
}

function isValidEmail(text){
    const isValid = /^[^@]+@[^@.]+\.[a-z]+$/.test(text);
    if (isValid) {
        $('#mail').removeClass('invalidInput');
    } else {
        $('#mail').addClass('invalidInput');
    }
    return isValid;
}

function isValidActivitiesRegistrationField($activitiesField){
    const isValid = Boolean($activitiesField.find(':checked').length);
    if (isValid) {
        $('fieldset.activities legend').removeClass('invalidInput');
    } else {
        $('fieldset.activities legend').addClass('invalidInput');
    }
    return isValid;
}

function isValidCardNumber(text){
    const isValid = /^\d{13,16}$/.test(text);
    if (isValid) {
        $('#cc-num').removeClass('invalidInput');
    } else {
        $('#cc-num').addClass('invalidInput');
    }
    return isValid;
}

function isValidZipCode(text){
    const isValid = /^\d{5}$/.test(text);
    if (isValid) {
        $('#zip').removeClass('invalidInput');
    } else {
        $('#zip').addClass('invalidInput');
    }
    return isValid;
}

function isValidCVV(text){
    const isValid = /^\d{3}$/.test(text);
    if (isValid) {
        $('#cvv').removeClass('invalidInput');
    } else {
        $('#cvv').addClass('invalidInput');
    }
    return isValid;
}

function isValidFormSubmission(){
    const nameTrueOrFalse = isValidName($('#name').val());
    const emailTrueOrFalse = isValidEmail($('#mail').val());
    const activityFieldTrueOrFalse = isValidActivitiesRegistrationField($('fieldset.activities'));
    
    if ($('#payment').val() === 'Credit Card'){
        const cardNumberTrueOrFalse = isValidCardNumber($('#cc-num').val());
        const zipCodeTrueOrFalse = isValidZipCode($('#zip').val());
        const cvvTrueOrFalse = isValidCVV($('#cvv').val());
        
        return nameTrueOrFalse && 
               emailTrueOrFalse && 
               cardNumberTrueOrFalse &&
               zipCodeTrueOrFalse && cvvTrueOrFalse && 
               activityFieldTrueOrFalse;
    }
    return nameTrueOrFalse && emailTrueOrFalse && activityFieldTrueOrFalse;
}

$('#title').on('input', function(){
    const $selectedElement = $(this).find(':selected');
    const $otherJobOptionInput = $('#otherJobOption');
  
    if ($selectedElement.val() === 'other'){
        $otherJobOptionInput.slideDown(100);
    }
    else{
        $otherJobOptionInput.slideUp(100);
    }
});


$('#design').on('input', () => {
    const $designValue = $('#design').val();
    const $colorOptions = $('#color option');
    $colorOptions.hide();

    if ($designValue === 'js puns'){
        $colorOptions.each(function(){
            if ($(this).text().includes('JS Puns')){
                $('#color').val('cornflowerblue');
                $(this).show();
            }
        });
    } else if ($designValue === 'heart js'){
        $colorOptions.each(function(){
            if ($(this).text().includes('JS shirt')){
                $('#color').val('tomato');
                $(this).show();
            }
        });
    } else{
        $('#color').val('Please, select a T-shit theme');
    }
});


$('fieldset.activities').on('change', (e) => {
    const $activity = $(e.target);
    const activityDateAndTime = $activity.attr('data-day-and-time');
    const $activities = $('fieldset.activities label input');

    calculateCost($activity);

    if (totalCost > 0){
        $('#totalCost span').text(totalCost);
        $('#totalCost').show();
    }
    else{
        $('#totalCost span').text('');
        $('#totalCost').hide();
    }
    
    $activities.each((index, element) => {
        
        if ($activity.prop('checked')){
            /* 
                Two refactors TBD down here:
                1 - Create function isSameDateAndTime(activity1, activity2)
                2 - Create function enableOrDisableActivity(enable(boolean), activity)
            */
            if (!($activity.is($(element))) &&
                activityDateAndTime === $(element).attr('data-day-and-time'))
            {
                $(element).parent().css({'opacity':'0.3'});
                $(element).attr('disabled', true);
            }

        } else {

            if (!($activity.is($(element))) &&
                activityDateAndTime === $(element).attr('data-day-and-time'))
            {
                $(element).parent().css({'opacity':''});
                $(element).attr('disabled', false);
            }

        }

    });

});


$('#payment').on('change', () => {
    $('#credit-card').hide();
    $('#paypal').hide();
    $('#bitcoin').hide();

    optionText = $('#payment').find(':selected').text();
    optionText = optionText.toLowerCase();

    optionText !== 'credit card' ? ($('#' + optionText).show()) : ($('#credit-card').show());
});


$('button[type="submit"]').on('click', (e) => {
    $('.invalidInput').css('border-color', '');
    const isValidSubmission = isValidFormSubmission();
    
    if (!isValidSubmission){
        e.preventDefault();

        $('.invalidInput').css('border-color', 'red');
    }
});

