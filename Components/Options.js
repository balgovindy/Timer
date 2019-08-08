$(function () {
    chrome.storage.sync.get(['time_limit'], function (data) {
        $('#wrapper').text(data.time_limit);
    });

    $('#ready').click(function () {
        if ($('#limit').val()) {
            chrome.storage.sync.set(
                {
                    'time_limit': $('#limit').val()
                },
                function () {
                    close();
                });
        }
    });
})