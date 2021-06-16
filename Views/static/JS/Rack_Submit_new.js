async function Check_Rack(Formsubmit_Json){
    const response = await fetch('/Check_Rack_Empty',{method: "GET",
    headers:{   // the content type header value is usually auto-set
                // depending on the request body
        "Content-Type": "text/plain;charset=UTF-8"

    },
    body :Formsubmit_Json,


    });

    const Is_empty = await response.json();
    console.log(Is_empty);
    return Is_empty;
}


document.getElementById("Submit_scan_in").onclick = function()
{
    var Rack = document.getElementById("Rack-Barcode").value;
    var Barcode1 = document.getElementById("Lot-Barcode1").value;
    var Barcode2 = document.getElementById("Lot-Barcode2").value;
    var data = {
        "Rack_Id": Rack,
        "Up_Barcode": Barcode1,
        "Down_Barcode": Barcode2,
        
        };

    
    console.log(JSON.stringify(data))
    document.getElementById("exampleModalCenter").modal('show');
    
    Check_Rack(Rack).then(empty =>{
        if(!empty['Upper_Post_Empty']){
            //Show Yes no dialog


        }
        if(!empty['Lower_Post_Empty']){
            //Show Yes no dialog


        }

    })


}