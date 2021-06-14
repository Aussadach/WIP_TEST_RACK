// $(document).ready(function () {
    
//     $.getJSON('http://127.0.0.1:5000/Test_db',function(result){
//         // [ line-angle-chart ] end
//     // [ line-smooth-chart ] start
        
//         data = result;

//         var html = '<table class="display table dt-responsive nowrap" id="WIP_table" style="width:100%">';
//         html += '<tr>';
//         var flag = 0;
//         $.each(data[0], function(index, value){
//             html += '<th>'+index+'</th>';
//         });
//         html += '</tr>';
//         $.each(data, function(index, value){
//             html += '<tr>';
//             $.each(value, function(index2, value2){
//                 html += '<td>'+value2+'</td>';
//             });
//             html += '<tr>';
//         });
//         html += '</table>';

//         $('#Rack_table').append(html);
//         // document.getElementById("Rack_table").appendChild(
//         //             html);

//         $('#WIP_table').DataTable({
            
//         });
    
//         });
            
            
    
    
    
    
    
    
//     })


    
// 'use strict';
// $(document).ready(function() {
//     // [ Zero-configuration ] start
//     $('#zero-configuration').DataTable();

//     // [ HTML5-Export ] start
//     $('#key-act-button').DataTable({
//         dom: 'Bfrtip',
//         buttons: [
//             'copyHtml5',
//             'excelHtml5',
//             'csvHtml5',
//             'pdfHtml5'
//         ]
//     });

//     // [ Columns-Reorder ] start
//     $('#col-reorder').DataTable({
//         colReorder: true
//     });

//     // [ Fixed-Columns ] start
//     $('#fixed-columns-left').DataTable({
//         scrollY: "300px",
//         scrollX: true,
//         scrollCollapse: true,
//         paging: false,
//         fixedColumns: true,
//     });
//     $('#fixed-columns-left-right').DataTable({
//         scrollY: "300px",
//         scrollX: true,
//         scrollCollapse: true,
//         paging: false,
//         fixedColumns: true,
//         fixedColumns: {
//             leftColumns: 1,
//             rightColumns: 1
//         }
//     });
//     $('#fixed-header').DataTable({
//         fixedHeader: true
//     });

//     // [ Scrolling-table ] start
//     $('#scrolling-table').DataTable({
//         scrollY: 300,
//         paging: false,
//         keys: true
//     });

//     // [ Responsive-table ] start
//     $('#responsive-table').DataTable({
//     });

//     $('#responsive-table-model').DataTable({
//         responsive: {
//             details: {
//                 display: $.fn.dataTable.Responsive.display.modal({
//                     header: function(row) {
//                         var data = row.data();
//                         return 'Details for ' + data[0] + ' ' + data[1];
//                     }
//                 }),
//                 renderer: $.fn.dataTable.Responsive.renderer.tableAll({
//                     tableClass: 'table'
//                 })
//             }
//         }
//     });
// });




$(document).ready(function () {
    
    $.getJSON('/Test_db',function(result){
        // [ line-angle-chart ] end
    // [ line-smooth-chart ] start
        
        data = result;
        
        $('#WIP_table').DataTable( {
            data: data,
            columns: [
                { data : 'id' , title:"id"},
                { data: 'RACK_ID',title:"RACK_ID" },
                { data: 'Batch',title:"Batch" },
                { data: 'GRTP',title:"GRTP" },
                { data: 'SLOC',title:"SLOC" },
                { data: 'Blocked',title:"Blocked" },
                { data: 'Weight' ,title:"Weight"},
                { data: 'Cline',title:"Cline" },
                { data: 'Cdate' ,title:"Cdate"},
                { data: 'Copyform' ,title:"Copyform"},
                { data: 'Date_QC',title:"Date_QC" },
                { data: 'BR_AQL',title:"BR_AQL" },
                { data: 'CR_AQL',title:"CR_AQL" },
                { data: 'MJ_AQL',title:"MJ_AQL" },
                { data: 'PT_AQL',title:"PT_AQL" },
                { data: 'QC_Total' ,title:"QC_Total"},
                { data: 'Ready_PCS_UR' ,title:"Ready_PCS_UR"},
                { data: 'Expired_6_Month' ,title:"Expired_6_Month"},
                { data: 'Wait_to_Check',title:"Wait_to_Check" },
                { data: 'Remark' ,title:"Remark"},
                { data: 'Remark2' ,title:"Remark2"},
                { data: 'Remark_production_',title:"Remark_production_" },
                { data: 'Status',title:"Status" },
                { data: 'Time',title:"Time" },
                { data: 'Updated_Time',title:"Updated_Time" },
                
            ],
            dom: 'Bfrtip',
            buttons: [
                             'copyHtml5',
                             'excelHtml5',
                             'csvHtml5',
                             'pdfHtml5'
                         ],
            //scrollX: false,
            keys: true,
            responsive: true
        } );   
            
    
    
    
    
    
    
    })

});
