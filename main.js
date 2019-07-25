    /**
     * Author : Ahsan Zaid
     * Date : 25-07-2019
     * Type : Component
     * Name : Cash Flows 
     *
     * Purpose : handling Type of Cash Flows 
     */
$(document).ready(function(){

    //<start>Cashflows->type</start>//


    //dummy cashflows data later onn this data will fetch from server data base//
    var cashflows = [
        {
            "id":1,
            "activity":"Opening Balance",
            "type" : 1,
            "amount" : 10000,
            "date" : "25-07-2019"

        },
        {
            "id":2,
            "activity":"groceries",
            "type" : 3,
            "amount" : -1000,
            "date" : "25-07-2019"

        },
        {
            "id":3,
            "activity":"petrol",
            "type" : 4,
            "amount" : -500,
            "date" : "25-07-2019"

        }
    ];
    // type dictionary that use as data for key to value operation if new type insert than its job is to drop entry into data base and update current dictionary and also front end//
    var types = {
        "opening" : 1,
        "closing" : 2,
        "house expense" : 3,
        "car expense" : 4
    }
    viewCashflows(cashflows,types)



    // while  user key up this function will call//
    $( "#type" ).keyup(function() {
        var name = $("#type").val();
        // if user press greater than equall to 2 characters than this code start working
        var flag=0;
        if(name.length >= 2){
            for(var type in types) {
                //matching with existing holding data if found it will return otherwise it will send request to server and save to current dictionary than give response to the front end//
                if (type.indexOf(name) >= 0) {
                    // check if threre exists option <> html or not if not it will give the hint to the html option <> front end
                    if(!optionExists(types[type])){
                        $("#types").append('<option value="'+types[type]+'">'+ type +'</option>');
                        flag++;
                    }
                  }

              }
              // drop new entry to data base than fetch the id of that entry//
              if(flag ==0){
                    //drop the entery of type to the data base and fetch the dropped id from the data base than upadte that entry to the front end//
                    // here ajax data base get or post whatever request goes here
                     //save return data into products {} dictionary 
                      //append the option to the front end
                      //hint check for duplications
              }
        }
      });
      //<end>Cashflows->type</end>//

      
/**
 * Component : on Submit  Cashflow
 */
//<start>Cashflow->submit</start>
$( "#addCashflow" ).submit(function (event){
    var activity = $("#activity").val();
    var type = $("#type").val();
    var amount = $("input[name=amount]").val();
    $("input[name=amount]").val("");
    $("#activity").val("");
    $("#type").val("");
    $("input[name=amount]").val("");
    //
   var today = new Date();
   var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    //
    cashflow = {
        "id":12,
        "activity":activity,
        "type":parseInt(type),
        "amount":parseFloat(amount),
        "date":date
    }
    /**  
     * 2. update the front end table with the updated result
     * 3. update the cash flows json  
     **/
    cashflows.push(cashflow);
    viewCashflows(cashflows,types)
    //==================================================//

     /**
     * 1. Send Data to that data base server via ajax post
   
     * Security should be added
     * 1. CSRF
     * 2. SQl injections
     * 3. amount should be cross via some security meachasms.
     */

    event.preventDefault(); 
});
//<end>Cashflow->submit</end>
});

/**
 * Type : Generlize Functions 
 */
//check that if html document has option that has current option value//


function optionExists(option) {
    var options = $("#types option");
    var i = 0;
    var flag = false;
    for(i = 0 ; i < options.length ; i++){
        if(options[i].value == option){
            flag=true;
            break;
        }
    }
    return flag;
}
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  function viewCashflows(cashflows,types){
      var total = 0.0;
      $("#viewCashflows").html("<tr><th>No</th><th>Date</th><th>Activity</th><th>Type</th><th>Amount</th></tr>");

   for(var flow in cashflows){
    $("#viewCashflows").append('<tr><td>'+cashflows[flow]["id"]+'</td><td>'+cashflows[flow]["date"]+'</td><td>'+cashflows[flow]["activity"]+'</td><td>'+getKeyByValue(types,cashflows[flow]["type"])+'</td><td>'+cashflows[flow]["amount"]+'</td></tr>');
    total  = total + cashflows[flow]["amount"];
   }
   if(total < 0 ){
    $("#viewCashflows").append("<tr><td></td><td></td><td></td><td>Total :</td><td>("+total+")</td></tr>");
   }
   else{
    $("#viewCashflows").append("<tr><td></td><td></td><td></td><td>Total :</td><td>"+total+"</td></tr>");
   }
   
  }