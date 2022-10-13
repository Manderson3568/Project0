function unhide(){
    $('.content').removeClass('hidden')
}

$(document).ready(function(){
    $('#destiny').on('click',starwarsScroller)
});

let $jedi
let $sith
function starwarsScroller(){
    console.log('click')
    $jedi = $('#JediInput').val();
    $sith = $('#SithInput').val();
    $('#jediName').html($jedi);
    $('#sithName').html($sith);
    $('#getNames').addClass('hidden');
    $('#scrollingText').removeClass('hidden');
    setTimeout(fromScroller,30000);
}

