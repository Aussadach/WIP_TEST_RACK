// 1.Get value from sumbmit


// 2.Check Rack from value
function get_current_rack_data(Formsummit){
    
    const res = fetch(`/Check_Rack_Empty/${Formsummit}`,{method: "GET",
                        headers:{  
                                    "Content-Type": "text/plain;charset=UTF-8"
                                },
                        }).then(response => response.json());
    return res
}

// 3.if value.1 is 0 show modal 1





// 4.wait user answer modal popup 1
function modal_get_answer1(){
    return new Promise(function(resolve, reject){
        
        $('#ConfirmModal1 .btn-ok').click(function(){
            resolve(true);
        });
        $('#ConfirmModal1 .btn-danger').click(function(){
            resolve(false);
        });
        });



}

function modal_get_answer2(){
    return new Promise(function(resolve, reject){
        
        $('#ConfirmModal2 .btn-ok').click(function(){
            resolve(true);
        });
        $('#ConfirmModal2 .btn-danger').click(function(){
            resolve(false);
        });
        });



}

// 5.if value.2 is 0 show modal 2



// 6.wait user answer modal popup 2


// 7.if modal1 is 1 and modal 1 is 1 -> sumbmit


//   esle if 1 0 -> submit 1
function put_rack(object){
    console.log(object)
    const res = fetch('/Rack',{method: "PUT",
                        headers:{  
                                    'Content-Type': 'application/json'
                                },
                        body: JSON.stringify(object)


                        
                        }).then(response => response.json())
                        .then(data => console.log(data))
                        .catch(err => console.log(err));
    return res
}



//   else if 0 1 -> submit 2





//   else if 0 0 -> cancel 

async function submit_Rack(){
    var Rack = $('#Rack-Barcode').val();
    var Upper_Batch = $('#Lot-Barcode1').val();
    var Lower_Batch = $('#Lot-Barcode2').val();
    var place1 =true;
    var place2 =true;
    $('#exampleModalCenter').modal('show');
    var Rack_free = await get_current_rack_data(Rack);
    console.log(Rack_free)
    $('#exampleModalCenter').modal('hide');
    if(!Rack_free.res.Upper_Post_Empty && (Rack_free.res.Upper_Batch != Upper_Batch)){
        // doconfirm
        $('#RackID1').html(Rack+"T")
        $('#CurrentBatch1').html(Rack_free.res.Upper_Batch)
        $('#NewBatch1').html(Upper_Batch)
        //Modal 2 launch
        $('#ConfirmModal1').modal('show');
        // await
        place1 = await modal_get_answer1();

        console.log(place1)
        $('#ConfirmModal1').modal('hide');


    } 


    //if value.1 is 0 show modal 1
    if(!Rack_free.res.Lower_Post_Empty && (Rack_free.res.Lower_Batch != Lower_Batch)){
        // doconfirm
        console.log("2nd task")
        $('#RackID2').html(Rack+"B")
        $('#CurrentBatch2').html(Rack_free.res.Lower_Batch)
        $('#NewBatch2').html(Lower_Batch)

        
        //Modal 1 launch Chage id later
        $('#ConfirmModal2').modal('show');
        // await
        place2 = await modal_get_answer2();

        $('#ConfirmModal2').modal('hide');

    } 


    $('#exampleModalCenter').modal('show');
    if(place1 && place2){
        
        await put_rack({
            "Rack_Id" : Rack,
            "Up_Barcode" : Upper_Batch,
            "Down_Barcode": Lower_Batch
        })

    }
    else if(place1 && !place2){

        await put_rack({
            "Rack_Id" : Rack,
            "Up_Barcode" : Upper_Batch,
            "Down_Barcode": ""
        })


    }
    else if(!place1 && place2){

        await put_rack({
            "Rack_Id" : Rack,
            "Up_Barcode" : "",
            "Down_Barcode": Lower_Batch
        })


    }
    $('#exampleModalCenter').modal('hide');
    $('#Success_Modal').modal('show')
    $("#SubmitBatch")[0].reset();

}

$(document).ready(function(){


    $("#Submit_scan_in").on('click',submit_Rack);

}

)







// let Popup_1_close = new Promise(function(Resolve, Reject) {
//     // "Producing Code" (May take some time)

//     const modal = new Promise(function(resolve, reject){
//         $('#confirmation').modal('show');
//         $('#confirmation .btn-ok').click(function(){
//             resolve("user clicked");
//         });
//         $('#confirmation .btn-danger').click(function(){
//             reject("user clicked cancel");
//         });
//         }).then(function(val){
//             //val is your returned value. argument called with resolve.
//             alert(val);
//         }).catch(function(err){
//             //user clicked cancel
//             console.log("user clicked cancel", err)
//         });

               
      
//     });









// document.getElementById("Submit_scan_in").onclick = function()
// {
//     var Rack = document.getElementById("Rack-Barcode").value;
//     var Barcode1 = document.getElementById("Lot-Barcode1").value;
//     var Barcode2 = document.getElementById("Lot-Barcode2").value;
//     var data = {
//         "Rack_Id": Rack,
//         "Up_Barcode": Barcode1,
//         "Down_Barcode": Barcode2,
        
//         };

    
//     console.log(JSON.stringify(data))
//     document.getElementById("exampleModalCenter").modal('show');
    
//     Check_Rack(Rack).then(empty =>{
//         if(!empty['Upper_Post_Empty']){
//             //Show Yes no dialog
            

//         }
//         if(!empty['Lower_Post_Empty']){
//             //Show Yes no dialog


//         }

//     })


// }


// $(document).ready(function()
//     {
//         $('#go').click(function()
//         {   


//             let modal = new Promise(function(resolve, reject){
//             	 $('#confirmation').modal('show');
//                  $('#confirmation .btn-ok').click(function(){
//                  		resolve("user clicked");
//                  });
//                  $('#confirmation .btn-danger').click(function(){
//                  		reject("user clicked cancel");
//                  });
//             }).then(function(val){
//             		//val is your returned value. argument called with resolve.
//                 alert(val);
//             }).catch(function(err){
//             	//user clicked cancel
//            		console.log("user clicked cancel", err)
//             });
//         })
//     });

// async function Check_click_upper_rack() {

//     let promise = new Promise((function(resolve, reject){
//         $('#confirmation').modal('show');
//         $('#confirmation .btn-ok').click(function(){
//                 resolve("user clicked");
//         });
//         $('#confirmation .btn-danger').click(function(){
//                 reject("user clicked cancel");
//         });
//          }) );
    
//     let result = await promise; // wait until the promise resolves (*)
    
//     alert(result); // "done!"
//     }
    

// async function f() {

//     let promise = new Promise((resolve, reject) => {
//         setTimeout(() => resolve("done!"), 1000)
//     });
    
//     let result = await promise; // wait until the promise resolves (*)
    
//     alert(result); // "done!"
//     }
    
//     f();

