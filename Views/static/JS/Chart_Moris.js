'use strict';
$(document).ready(function() {

    var data_poll ;
    var graph = Morris.Line({
        element: 'morris-line-smooth-chart',
        data: data_poll,
        xkey: 'date_',
        redraw: true,
        resize: true,
        ykeys: ['total_net_tonnes'],
        hideHover: 'auto',
        responsive:true,
        labels: ['total_net_tonnes'],
        lineColors: ['#1de9b6'],
        ymin : 1000,
        ymax :1125,
        pointSize : 0 
    });


    setInterval(function() {
    // [ bar-simple ] chart start
    $.getJSON('http://127.0.0.1:5000/Test_db',function(result){
        // [ line-angle-chart ] end
    // [ line-smooth-chart ] start
        console.log(result);
        data_poll = result;
        graph.setData(data_poll);
        graph.redraw()
    })
    
    // [ line-smooth-chart ] end

    // [ Donut-chart ] Start
    
    // [ Donut-chart ] end
        }, 4000);



});
