
window.addEventListener("load", function () {

    var form = document.getElementById("user");

    function getRadioValue(tag) { 
        var radios = document.getElementsByName(tag);

        for (var i = 0, length = radios.length; i < length; i++) {
          if (radios[i].checked) {
            return(radios[i].value);
          }
        }
        alert("la valeur envoyer as getRadioValue est sans doute fausse");
    } 

    function sendData() {
        var XHR = new XMLHttpRequest();
        
        // Liez l'objet FormData et l'élément form
        let data =  "email=" + form.elements.email.value +
                    "&name=" + form.elements.name.value +
                    "&goal=" + form.elements.goal.value +
                    "&age=" + form.elements.age.value +
                    "&type=" + getRadioValue("type") +
                    "&calo=" + form.elements.calo.value

        console.log(data)        
        XHR.addEventListener("load", function(event) {
          console.log(event.target.responseText);
        });
    
        // Definissez ce qui se passe en cas d'erreur
        XHR.addEventListener("error", function(event) {
          alert('Oups! Quelque chose s\'est mal passé.');
        });
    
        // Configurez la requête
        XHR.open("POST", "/api/user", true);
        XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
        // Les données envoyées sont ce que l'utilisateur a mis dans le formulaire
        XHR.send(data);
      }
    

  // … et prenez en charge l'événement submit.
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        sendData();
        alert("The form was submitted");
    });
})

function test(){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", '/api/user', true);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() { //Appelle une fonction au changement d'état.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
// Requête finie, traitement ici.
    }
}
xhr.send("firstname=amelie&lastname=vincent");
    console.log("j ai envoyer un truc");}