var id = 0
$(function() {
    setInterval(function() {
        ajax('get', '/getData', {}, function(res) {
            changeStatus(res)
        }, function() {})
    }, 1000)
})
function changeStatus(data) {
    if (id === data.id) return
    id = data.id
    $('#box' + data.id).addClass('current').siblings().removeClass('current')
    $('.js_name').text(data.name)
    $('.js_address').text(data.address)
}
function ajax(type = 'get', url = '', data = {}, cb, fcb) {
    $.ajax(url, {
        type,
        data,
        dataType: 'json',
        success: function(res) { cb(res) },
        error: function(err) { fcb(err) }
    })
}