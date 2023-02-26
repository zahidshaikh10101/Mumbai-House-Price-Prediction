(function () {
  'use strict'
  const forms = document.querySelectorAll('.requires-validation')
  Array.from(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()
  

  function getGymValue() {
    var uiGym = document.getElementsByName("uiGym");
    for(var i in uiGym) {
      if(uiGym[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getLiftValue() {
    var uiLift = document.getElementsByName("uiLift");
    for(var i in uiLift) {
      if(uiLift[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getCarValue() {
    var uiCar = document.getElementsByName("uiCar");
    for(var i in uiCar) {
      if(uiCar[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getGardenValue() {
    var uiGarden = document.getElementsByName("uiGarden");
    for(var i in uiGarden) {
      if(uiGarden[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getPoolValue() {
    var uiPool = document.getElementsByName("uiPool");
    for(var i in uiPool) {
      if(uiPool[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getSecurityValue() {
    var uiSecurity = document.getElementsByName("uiSecurity");
    for(var i in uiSecurity) {
      if(uiSecurity[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK) {
      if(uiBHK[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var gym = getGymValue();
    var lift = getLiftValue();
    var car = getCarValue()
    var security = getSecurityValue();
    var garden = getGardenValue()
    var pool = getPoolValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");
  
    var url = "http://127.0.0.1:5000/predict_home_price"; 
  
    $.post(url, {
        Location: location.value,
        Area: parseFloat(sqft.value),
        Bhk: bhk,
        Gym: gym,
        Lift: lift,
        Car: car,
        Security: security,
        Garden: garden,
        Pool: pool
    },function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
        console.log(status);
    });
}
  
function onPageLoad() {
    console.log( "document loaded" );
    var url = "http://127.0.0.1:5000/get_location_names";
    
    $.get(url,function(data, _status) {
        console.log("got response for get_location_names request");
        if(data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
}
  
window.onload = onPageLoad;