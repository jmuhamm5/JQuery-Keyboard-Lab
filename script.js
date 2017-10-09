var sentences = [
    'this is my first sentence',
    'Too ato too nOt enot one totA not anot tOO aNot',
    'oat itain oat tainnate eate tea anne inant nean',
    'itant eate anot eat nato inate eatanot tain eat',
    'nee ene ate ite tent tiet ent ine ene ete ene ate'
];

var $upper = $('#keyboard-upper-container');
var $lower = $('#keyboard-lower-container');
var $wrong = 0;
var $ascNum = 0;
var $index = 0;
var $words = 0;
var $startTypeSession;
var $endTypeSession;
var $typeSessionOver = false;
var start;
var end;
var timestamp = null;
var numberOfMistakes = 0;




function keyValidator(){
    var $keys = sentences[$words].charCodeAt($index);
    if($keys === $ascNum && $index < sentences[$words].length){
        $('#feedback').append('<i class="glyphicon glyphicon-ok"></i>');
    } else {
        $('#feedback').append('<i class="glyphicon glyphicon-remove"></i>');
        wrong++;
    }
    $('#typing-block').animate({'left': '+=17.4px'},100);
    $('#target-letter').text(sentences[$words][$index + 1]);
}

function getWPM(){

    var endTimestamp = new Date().getTime();
    var elapsedTime = (endTimestamp - timestamp) / 1000;
    var wordsArra = [];
    sentences.forEach(function(s) {
      wordsArray.push(s.split(' '));
    });

    var flattened = [].concat.apply([], wordsArray);
    var numberOfWords = flattened.length;
    return Math.round(numberOfWords / (elapsedTime / 60) - (2 * numberOfMistakes));

    // var time = end - start;
    // var min = Math.floor(time/60000);
    // var sec = Math.floor((timer%60000)/1000);
    // var time = min + sec/60;
    // return Math.floor((48 - error)/time);
}

$(document).keypress(function(e) {
  $ascNum = e.which;
  $('#'+ $ascNum).addClass('highlighted');


  if(!$typeSessionOver){
    if ($index === 0 && $words === 0) {
      $startTypeSession = e.timeStamp;
    } else if($words === 4 && $index === sentences[$words].length - 1){
      $endTypeSession = e.timeStamp;
    }

    keyValidator();

    if($index + 1 < sentences[$words].length) {
      $index++;
    } else if($index + 1 >= sentences[$words].length && $words < 4){
      $words++;
      newSession(false);
    } else {
      $('.key').removeClass('highlighted');
      $('#feedback').text('Type Stats: ' + getWPM() + ' wpm.  Great Job!');
      $tryAnotherTypeSession(function() {
        var wpm = calculateWpm();
        var message = wpm < 0 ? 'You Suck' : wpm;
        var $retry = confirm('Do you want to play again? Your wpm score is: ' + message);
        if($retry) {
          newSession(true);
        } else {
          $typeSessionOver = true;
        }
      }, 2000);
    }

  }

})

$(document).keydown(function(e) {
  if(e.which === 16){
    $upper.toggle();
    $lower.toggle();
  }
}).keyup(function(e) {
    if(e.which === 16){
      $upper.toggle();
      $lower.toggle();
    }
    $('.key').removeClass('highlighted');
})

function newSession(startOver){
  $upper.hide();
  $lower.show();
  if(startOver){
    $words = 0;
    $wrong = 0;
    end = 0;
    start = 0;
    $typeSessionOver = false;
  }
  $index = 0;
  $("#sentence").text(sentences[$words]);
  $("#target-letter").text(sentences[$words][0]);
  $("#feedback").empty();
  $("#typing-block").animate({'left': '12px'});
}

$(document).ready(function() {
  newSession();
})
