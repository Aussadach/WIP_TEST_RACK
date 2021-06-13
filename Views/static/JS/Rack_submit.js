
$(document).ready(function(){
    // click on button submit
    $("#Submit_scan_in").on('click', function(){
        var Rack = document.getElementById("Rack-Barcode").value;
        var Barcode1 = document.getElementById("Lot-Barcode1").value;
        var Barcode2 = document.getElementById("Lot-Barcode2").value;
        var data = {
            "Rack_Id": Rack,
            "Up_Barcode": Barcode1,
            "Down_Barcode": Barcode2,
            
          };
        console.log(JSON.stringify(data))

        $.ajax({
            type: 'PUT',
            url: '/Rack',
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json',
            success: function(result) {
        
                console.log(result)
               // result from server
            }
        });


    });
});




