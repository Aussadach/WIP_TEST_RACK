var form_data = new FormData();
form_data.append('file', $('#uploadfile').prop('files')[0]);

$(function() {
$.ajax({
    type: 'POST',
    url:  '/uploadLabel',
    data: form_data,
    contentType: false,
    cache: false,
    processData: false,
    success: function(data) {
        console.log('Success!');
    },
  })
});