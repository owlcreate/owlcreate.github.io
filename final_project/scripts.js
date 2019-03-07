"use strict"

//load json file into project files
//then you will have to make a function to go through each country name, so user can select a country
//upon country selection, load info stored in the json file
//display flag to users along with the name of country above it
//have options for sq. miles and sq. km 
//display sq mile and sq km for population density to users
//display percentage of world population for selected country
//launch wiki page so that it opens the countries info page
//show all data on country to user as the end result



var myObj;

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    myObj = JSON.parse(this.responseText);
    for(var i = 0; i <myObj.length; i++ ){
       // document.getElementById('country_select').innerHTML += `<option value=${i}>${myObj[i].Name}</option>`;
       document.getElementById('country_select').innerHTML += "<option>" + myObj[i].Name; + "</option>";
    }
  }
};
xmlhttp.open("GET", "countries.json", true);
xmlhttp.send();

//shows my country selection and all other info that is contained in the json and calculations
function show_country_info(in_myObj){
    //call elements in the html and get rid of spacing so the code works

    var selected_country = document.getElementById("country_select");
    var country_name = selected_country.options[selected_country.selectedIndex].innerText;
    var country_no_space = country_name.split(" ").join(`_`);

    //document.getElementById('country_name').innerText = country_name; 
    document.getElementById("country_name").innerText = country_name;

    for(var i = 0; i < in_myObj.length; i++){
        if(in_myObj[i].Name == country_name){
            document.getElementById("output").value = in_myObj[i].Area;
            document.getElementById("output_pop").value = in_myObj[i].Population;
            document.getElementById("density_output").value = in_myObj[i].Population / in_myObj[i].Area;
            document.getElementById("flag").innerHTML = "<img src='flags/" + country_no_space + ".png' />";

            var total_pop = 0; 
            for(var j = 0; j < in_myObj.length; j++){
                total_pop += in_myObj[j].Population;
            }
            document.getElementById("percentage_output").value = in_myObj[i].Population / total_pop * 100; 
        }
    }


}

//function should convert m to km
function area_kms_default(in_myObj){
    
    var selected_country = document.getElementById("country_select");
    var country_name = selected_country.options[selected_country.selectedIndex].innerText;

    for(var i = 0; i < in_myObj.length; i++){
        if(in_myObj[i].Name == country_name){

            var selected_type = document.getElementById("area_list");
            var type_value = selected_type.options[selected_type.selectedIndex].innerText;
        
            if(type_value == "Sq. KM"){
                document.getElementById('output').value = in_myObj[i].Area * 2.59;

            }
            else{
                document.getElementById('output').value = in_myObj[i].Area;
            }
            
        }
    }    

}
// function to find the country wiki page
function open_wiki(){
    var selected_country = document.getElementById("country_select");
    var country_name = selected_country.options[selected_country.selectedIndex].innerText;
    var country_no_space = country_name.split(" ").join(`_`);

    window.open("https://en.wikipedia.org/wiki/" + country_no_space);
}

//event listeners
document.getElementById('country_select').addEventListener('change', function(){show_country_info(myObj);});
//document.getElementById('s-miles').addEventListener('change', function(){area_miles_default(myObj);});
document.getElementById('area_list').addEventListener('change', function(){area_kms_default(myObj);});

document.getElementById('wiki_button').addEventListener('click', open_wiki);