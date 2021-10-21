$(function() {
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: 5000,//可选选项，自动滑动
    })
    $('.js_chooseItem').click(function() {
        console.log()
        ajax('get', '/chooseItem', { id: $(this).attr('id').replace('item', ''), name: $(this).text() }, function() {}, function() {})
    })
})
function ajax(type = 'get', url = '', data = {}, cb, fcb) {
    $.ajax(url, {
        type,
        data,
        dataType: 'json',
        success: function(res) { cb(res) },
        error: function(err) { fcb(err) }
    })
}