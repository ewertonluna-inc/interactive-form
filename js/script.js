$('#name').focus();
$('#otherJobOption').hide();

$('#color').prepend('<option>Please, select a T-shit theme</option>');
$('#color option').eq(0).attr('selected', '');


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

$('#design').on('input', function(){
    const $defaultColorOption = $('#color option').eq(0);
    
    if ($('#design')
        .find(':selected')
        .text() === 'Select Theme'){
            $defaultColorOption.attr('selected', 'selected');
        }
});