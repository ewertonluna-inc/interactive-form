$('#name').focus();
$('#otherJobOption').hide();
$('#paypal').hide();
$('#bitcoin').hide();

$('#color').prepend('<option>Please, select a T-shit theme</option>');
$('#color').val($('#color option').eq(0).val());

function showOnlyDefaultColorOption(){
    $('#color').children().each(function(index, element){
        if ($(element).val() !== 'Please, select a T-shit theme'){
            $(element).hide();
        }
    });
}

showOnlyDefaultColorOption();


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
    const $activityDateAndTime = $activity.attr('data-day-and-time');
    const $activities = $('fieldset.activities label input');
    
    $activities.each((index, element) => {
        
        if ($activity.prop('checked')){
            // Maybe I can refactor these next two if blocks replacing them with a function
            // that receives two jQuery objects and compares their data-day-and-time properties

            if (!($activity.is($(element))) &&
                $activity.attr('data-day-and-time') === $(element).attr('data-day-and-time'))
            {
                $(element).attr('disabled', true);
            }

        } else {

            if (!($activity.is($(element))) &&
                $activity.attr('data-day-and-time') === $(element).attr('data-day-and-time'))
            {
                $(element).attr('disabled', false);
            }

        }

    });

});
