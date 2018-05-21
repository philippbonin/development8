$( document ).ready(function() {
 

  $('#dev8Description').removeClass('default beta decission dev').addClass('default').load('description/default.html')
  
  $('.day-group,.day').click(function() { 
    if ($(this).find('.on').length > 0){
      resetDev8();
      setNav($('#nav .nav-goal'));
      $('#dev8Description').removeClass('default beta decission dev').addClass('default').load('description/default.html');
    }else{
      setNav($('.nav-question'));
      $('svg .day, svg .day-group').children().addClass('off');
      $(this).children().removeClass('off').addClass('on');
      var id = $(this).attr('id');
      var file = 'description/' + id + '.html';
      $('#dev8Description').removeClass('default beta decission dev').addClass($(this).data("type")).load(file);
    }
    return false; 
  });

  function setNav(item){
    item.siblings().removeClass('selected');
    item.addClass('selected');
  }

  function resetDev8(){
    $('svg .day, svg .day-group').children().removeClass('off on');
  }

  $('.nav').click(function() {
    var section = $(this).data('nav');
    var FirstSectionSelector = "day-01-07";
    var FirstSection = $('#'+FirstSectionSelector);
    var FirstSectionFile = 'description/' + FirstSectionSelector + '.html';
    
    setNav($(this));
    resetDev8()
    switch(section) {
        case 'question':
            $('svg .day, svg .day-group').children().addClass('off');
            FirstSection.children().removeClass('off').addClass('on');
            $('#dev8Description').removeClass('default beta decission dev').addClass('dev').load(FirstSectionFile);
            break;
        case 'goal':
            $('#dev8Description').removeClass('default beta decission dev').addClass('default').load('description/default.html');
            $('#dev8Description').siblings().addClass('hidden');
            $('#dev8Description .goal').removeClass('hidden');
            break;
         case 'key':
            $('#dev8Description').removeClass('default beta decission dev').addClass('default').load('description/key.html');
            break;
        case 'rules':
          $('#dev8Description').removeClass('default beta decission dev').addClass('default').load('description/rules.html');
          break;
        default:
            
    }
    return false; 
  });
  
});
