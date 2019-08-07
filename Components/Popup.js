var $wrapper;
var START = 'START';
var STOP = 'STOP';
var currentTime = 30;
var reqAnimRef;
var timeOut;
var i = 0
$(function () {
    init();
    if (typeof reqAnimRef !== 'undefined') {
        cancelAnimationFrame(reqAnimRef);
    }
    if (typeof timeOut !== 'undefined') {
        clearTimeout(timeOut);
    }
    $('#timer_button').click(function () {
        reqAnimRef = requestAnimationFrame(step);
        $('#timer_button').css('display', 'none')
    })
})


function init() {
    $wrapper = $('<div></div>')
        .attr('id', 'wrapper')
        .appendTo(document.body);

    var $button = $('<button></button>')
        .attr('id', 'timer_button')
        .text(START)

    $('<div></div>')
        .attr('id', 'timer_container')
        .appendTo(document.body)
        .append($button)

    update()
}


function update() {
    chrome.storage.sync.get('time_limit', function (data) {
        if (typeof data.time_limit !== 'undefined') {
            currentTime = data.time_limit;
        }
        $('#wrapper').text(currentTime);
    })
}

function step() {
    if (currentTime > 0) {
        currentTime -= 1;
        $wrapper.text(currentTime);
        if (currentTime === 0) {
            cancelAnimationFrame(reqAnimRef);
            clearTimeout(timeOut)
        } else {
            timeOut = setTimeout(function () {
                requestAnimationFrame(step);
            }, 1000)
        }
    }
}

