

function get_current_rack_data(Formsummit){
    var Rack = Formsummit['Rack_Id']
    const res = fetch(`/Check_Rack_Empty/${Rack}`,{method: "GET",
                        headers:{  
                                    "Content-Type": "text/plain;charset=UTF-8"
                                },
                        }).then(response => response.json());
    return res
}



async function doSMTH(){
    var data = {
        "Rack_Id": "A1_1_L"
        
      }
    
    var a = await get_current_rack_data(data)
    
    console.log(a.res.Lower_Post_Empty)


};
doSMTH();

