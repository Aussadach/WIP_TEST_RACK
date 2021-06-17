// 1.Get value from sumbmit


// 2.Check Rack from value
function get_current_rack_data(Formsummit){
    var Rack = Formsummit['Rack_Id']
    const res = fetch(`/Check_Rack_Empty/${Rack}`,{method: "GET",
                        headers:{  
                                    "Content-Type": "text/plain;charset=UTF-8"
                                },
                        }).then(response => response.json());
    return res
}

// 3.if value.1 is 0 show modal 1





// 4.wait user answer modal popup 1
function modal_get_answer(){

    $('#confirmation .btn-ok').click(function(){
        return(true);
    });



    $('#confirmation .btn-danger').click(function(){
        return(false);
    });


}

// 5.if value.2 is 0 show modal 2



// 6.wait user answer modal popup 2


// 7.if modal1 is 1 and modal 1 is 1 -> sumbmit


//   esle if 1 0 -> submit 1



//   else if 0 1 -> submit 2





//   else if 0 0 -> cancel 

async function submit_Rack(formdata){
    var Rack = "";
    var Upper_Batch = "";
    var Lower_Batch = "";


    RacK_free = await get_current_rack_data(Rack);

    //if value.1 is 0 show modal 1
    if(!RacK_free.res.Lower_Post_Empty && (RacK_free.res.Lower_Batch != Lower_Batch)){
        // doconfirm
        // Modified modal
        //Modal 1 launch Chage id later
        $('#confirmation').modal('show');
        // await
        replace1 = await modal_get_answer();

        $('#confirmation').modal('hide');

    } 

    if(!RacK_free.res.Upper_Post_Empty && (RacK_free.res.Upper_Batch != Upper_Batch)){
        // doconfirm
        //Modal 2 launch
        $('#confirmation').modal('show');
        // await
        replace2 = await modal_get_answer();

        $('#confirmation').modal('hide');


    } 

    








}















let Popup_1_close = new Promise(function(Resolve, Reject) {
    // "Producing Code" (May take some time)

    const modal = new Promise(function(resolve, reject){
        $('#confirmation').modal('show');
        $('#confirmation .btn-ok').click(function(){
            resolve("user clicked");
        });
        $('#confirmation .btn-danger').click(function(){
            reject("user clicked cancel");
        });
        }).then(function(val){
            //val is your returned value. argument called with resolve.
            alert(val);
        }).catch(function(err){
            //user clicked cancel
            console.log("user clicked cancel", err)
        });

               
      
    });









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


$(document).ready(function()
    {
        $('#go').click(function()
        {   


            let modal = new Promise(function(resolve, reject){
            	 $('#confirmation').modal('show');
                 $('#confirmation .btn-ok').click(function(){
                 		resolve("user clicked");
                 });
                 $('#confirmation .btn-danger').click(function(){
                 		reject("user clicked cancel");
                 });
            }).then(function(val){
            		//val is your returned value. argument called with resolve.
                alert(val);
            }).catch(function(err){
            	//user clicked cancel
           		console.log("user clicked cancel", err)
            });
        })
    });

async function Check_click_upper_rack() {

    let promise = new Promise((function(resolve, reject){
        $('#confirmation').modal('show');
        $('#confirmation .btn-ok').click(function(){
                resolve("user clicked");
        });
        $('#confirmation .btn-danger').click(function(){
                reject("user clicked cancel");
        });
         }) );
    
    let result = await promise; // wait until the promise resolves (*)
    
    alert(result); // "done!"
    }
    

async function f() {

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 1000)
    });
    
    let result = await promise; // wait until the promise resolves (*)
    
    alert(result); // "done!"
    }
    
    f();