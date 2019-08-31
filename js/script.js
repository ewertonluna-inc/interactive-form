$('#name').focus();

$('#otherJobOption').hide();

/* 
Next 3 lines set up the initial state
of the color section and then hides it.
*/
$('#color').prepend('<option>Please, select a T-shit theme</option>');
$('#color').val($('#color option').eq(0).val());
$("#colors-js-puns").hide();

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

/*
addOrRemoveInvalidInputClass removes .invalidInput
to the target if the boolean argument is true. Otherwise,
it adds the class.
*/
function addOrRemoveInvalidInputClass(targetedElement, validOrNot){
    if (validOrNot) {
        $(targetedElement).removeClass('invalidInput');
    } else {
        $(targetedElement).addClass('invalidInput');
    }
}

/*
These next 6 functions are used to validate each
field, returning true if it's valid and false otherwise.
It also adds or removes 'invalidInput' class to the
element depending on its validation.
*/
function isValidName(text){
    const isValid = /^.+$/.test(text);
    const target = $('#name');
    addOrRemoveInvalidInputClass(target, isValid);
    return isValid;
}

function isValidEmail(text){
    const isValid = /^[^@]+@[^@.]+\.[a-z]+$/.test(text);
    const target = $('#mail');
    addOrRemoveInvalidInputClass(target, isValid);
    return isValid;
}

function isValidActivitiesRegistrationField($activitiesField){
    const isValid = Boolean($activitiesField.find(':checked').length);
    const target = $('fieldset.activities legend');
    addOrRemoveInvalidInputClass(target, isValid);
    return isValid;
}

function isValidCardNumber(text){
    const isValid = /^\d{13,16}$/.test(text);
    const target =  $('#cc-num');
    addOrRemoveInvalidInputClass(target, isValid);
    return isValid;
}

function isValidZipCode(text){
    const isValid = /^\d{5}$/.test(text);
    const target = $('#zip');
    addOrRemoveInvalidInputClass(target, isValid);
    return isValid;
}

function isValidCVV(text){
    const isValid = /^\d{3}$/.test(text);
    const target = $('#cvv');
    addOrRemoveInvalidInputClass(target, isValid);
    return isValid;
}

/*
isValidForm returns true if ALL the form is filled
correctly and false othewise.
It will only analyse the credit card section if the
credit card option is selected.
*/
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

/*
Job section input handler that slides down
the other job field so it can be filled by 
the user.
*/
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

/*
Design input handler that display T-shirt
color accordingly to which design was selected.
If no design is selected, color option will 
display $('#color').val('Please, select a T-shit theme';
*/
$('#design').on('input', () => {
    const $designValue = $('#design').val();
    const $colorOptions = $('#color option');
    // hides all color options so it can be updated correctly each time
    // the event is fired.
    $colorOptions.hide();

    if ($designValue === 'js puns'){
        $("#colors-js-puns").show();
        $colorOptions.each(function(){
            if ($(this).text().includes('JS Puns')){
                $('#color').val('cornflowerblue');
                $(this).show();
            }
        });
    } else if ($designValue === 'heart js'){
        $("#colors-js-puns").show();
        $colorOptions.each(function(){
            if ($(this).text().includes('JS shirt')){
                $('#color').val('tomato');
                $(this).show();
            }
        });
    } else{
        $("#colors-js-puns").hide();
        $('#color').val('Please, select a T-shit theme');
    }
});

/*
Activities Fieldset Event handler 
- displays the total cost of the activities,
- if the an activity is checked, it disables other activities
that occur at the same moment. If unchecked, enables back these 
activities
*/
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

/* 
Payment section Event handler  
- first: hides all payment options so they can be updated 
correctly later in the handler.
- second: if the option selected is credit card, it will show the 
credit fields to be filled. Otherwise, it will show the paypal field
or the bitcoin field.
*/
$('#payment').on('change', () => {
    $('#credit-card').hide();
    $('#paypal').hide();
    $('#bitcoin').hide();

    optionText = $('#payment').find(':selected').text();
    optionText = optionText.toLowerCase();

    optionText === 'credit card' ? ($('#credit-card').show()) : ($('#' + optionText).show());
});

/*
Submit button event handler
- if the form isn't filled correctly, it won't be
submitted and the borders of the invalid fields will
become red.
- else, the form is submitted
*/
$('button[type="submit"]').on('click', (e) => {
    $('.invalidInput').css('border-color', '');
    const isValidSubmission = isValidFormSubmission();
    
    if (!isValidSubmission){
        e.preventDefault();
        $('.invalidInput').css('border-color', 'red');
        
        // if nameAlert span exists, delete it
        if ($('#nameAlert').length > 0){
            $('#nameAlert').remove();
        }

        // if name is not valid
            // create and display alert to the user 
        if (!isValidName($('#name').val())){
            let $nameLabel = $('#name').prev();
            $nameLabel.append('<span> Please, enter at least one character</span>');
            $nameLabel.children().attr('id', 'nameAlert');
            $nameLabel.children().css('color', 'red');
        }
    }
});


$('#cc-num').on('input click', (e) => {
    console.log('event is fired');
    // this if-block checks if the div.col-6 label span element
    // exists, and if it does, removes it so it won't result
    // in duplicates.
    if ($('div.col-6 label span').length){
        $('div.col-6 label span').remove();
    }

    // Creation and set up of the initial span tag
    let text = ' Please, enter a credit card number';
    $('div.col-6 label').append('<span><span>');
    $('div.col-6 label span').text(text);
    $('div.col-6 label span').css('color', 'red');
    
    // if there's a value inside the input
        // set its text to an empty string
        // if card number is not valid
            // set the span text to warn the user
    if ($(e.target).val()){
        $('div.col-6 label span').text('');

        if (!isValidCardNumber($(e.target).val())) {
            text = 'Please, enter a number between 13 and 16 digits long'
            $('div.col-6 label span').text(text);

        }
    }

});

$('#cc-num').on('blur', (e) => {
    $('div.col-6 label span').remove();
});