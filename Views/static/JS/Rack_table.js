$(document).ready(function () {
    
    $.getJSON('http://127.0.0.1:5000/Test_db',function(result){
        // [ line-angle-chart ] end
    // [ line-smooth-chart ] start
        
        data = result;
        
    })


    var html = '<table class="table table-striped">';
    html += '<tr>';
    var flag = 0;
    $.each(data[0], function(index, value){
        html += '<th>'+index+'</th>';
    });
    html += '</tr>';
     $.each(data, function(index, value){
         html += '<tr>';
        $.each(value, function(index2, value2){
            html += '<td>'+value2+'</td>';
        });
        html += '<tr>';
     });
     html += '</table>';
     document.getElementById("Rack_table").appendChild("afterend",
                html);
});
