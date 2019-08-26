$('#name').focus();
$('#otherJobOption').hide();


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