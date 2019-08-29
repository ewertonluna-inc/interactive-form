$('#name').focus();
$('#otherJobOption').hide();
$('#paypal').hide();
$('#bitcoin').hide();

$('#color').prepend('<option>Please, select a T-shit theme</option>');
$('#color').val($('#color option').eq(0).val());

$('fieldset.activities').append('<p id="totalCost">Total: $<span></span><p>');
$('#totalCost').hide();

let totalCost = 0;

showOnlyDefaultColorOption();

function showOnlyDefaultColorOption(){
    $('#color').children().each(function(index, element){
        if ($(element).val() !== 'Please, select a T-shit theme'){
            $(element).hide();
        }
    });
}

function calculateCost(element){
    let activityCost = parseInt($(element).attr('data-cost').replace(/^\$(\d+)$/, '$1'));
    
    if ($(element).prop('checked')){
        totalCost += activityCost;
    } else{
        totalCost -= activityCost;
    }
    return totalCost;
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
    // elementsToDisplay = []

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
                Two Refactors TBD down here:
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
