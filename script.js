function getRandom(array){
   return Math.round(Math.random() * array.length - 1);
};

window.addEventListener("load", function() {
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
         let planet = getRandom(json);
         document.getElementById("missionTarget").innerHTML =`
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[planet]. name}</li>
            <li>Diameter: ${json[planet].diameter}</li>
            <li>Star: ${json[planet].star}</li>
            <li>Distance from Earth: ${json[planet].distance}</li>
            <li>Number of Moons: ${json[planet].moons}</li>
         </ol>
         <img src="${json[planet].image}">
         `;
      });
   });

   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      event.preventDefault();
      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let copilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");
      let faulty = document.getElementById("faultyItems");

      if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === "") {
         alert("All fields are required!");
         event.preventDefault();
      } else if (isNaN(pilotNameInput.value) === false || isNaN(copilotNameInput.value) === false || isNaN(fuelLevelInput.value) || isNaN(cargoMassInput.value)) {
         alert("Invalid user entry.");
         event.preventDefault();
      } else {
         document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotNameInput.value} is ready for launch`;
         document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilotNameInput.value} is ready for launch`;

            if (fuelLevelInput.value < 10000) {
               faulty.style.visibility = "visible";
               document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
               let launchStatus = document.getElementById("launchStatus");
               launchStatus.innerHTML = "Shuttle Not Ready for Launch";
               launchStatus.style.color = "red";
            };

            if (cargoMassInput.value > 10000) {
               faulty.style.visibility = "visible";
               document.getElementById("cargoStatus").innerHTML = "Cargo mass too high for launch";
               launchStatus.innerHTML = "Shuttle Not Ready for Launch";
               launchStatus.style.color = "red";
            };

            if (fuelLevelInput.value > 10000 && cargoMassInput.value < 10000){
               launchStatus.innerHTML = "Shuttle is Ready for Launch";
               launchStatus.style.color = "green";
            };    
      };
   });
});
