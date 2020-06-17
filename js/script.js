$(document).ready( function(){
// quando clicco sull'icona dell'aereplano stampo il contenuto inserito all'interno della input in ms_message-view.
//-- per stampare quanto inserito nella input ho bisogno di "leggere" il suo contenuto con val().


$(".ms_form i").click( function() {


  searchName();
})

$(".btn-send").click( function () {


inviaMessaggio();

setTimeout(receivedMessage, 3000);

});





});




// FUNZIONI

 function inviaMessaggio () {

// leggo il contenuto inserito nella input
   var testoMessaggio = $(".ms_form-message input").val();
   console.log(testoMessaggio);

   if (testoMessaggio != "" ) {

    // prendo il contenuto  della input e lo inserisco nel templates

     $(".templates .ms_messageText span").text(testoMessaggio);


     // inserisco l'orario di invio del messaggio

     var date = new Date ();
     var hours = date.getHours();
     var minutes = date.getMinutes();
     var timeMessage = hours + " : " + minutes;

   //stampo l'orario

   $(".templates .ms_messageTime span").text(timeMessage);


     // clono il template in cui inserire il contenuto della input
       var cloneTemplate = $(".templates .ms_message").clone();

      // aggiungo in templates in ms_message-view
       $(".ms_message-view").append(cloneTemplate);

       // aggiungo la classe send

       $(cloneTemplate).addClass("send");

       // resetto il  contenuto della input

      testoMessaggio = $(".ms_form-message input").val("");

   }

};

function receivedMessage () {

  // leggo il contenuto inserito nella input
       $(".templates .ms_messageText span").text(" Ciao");


       // inserisco l'orario di invio del messaggio

       var date = new Date ();
       var hours = date.getHours();
       var minutes = date.getMinutes();
       var timeMessage = addZero(hours) + " : " + addZero(minutes);

     //stampo l'orario

     $(".templates .ms_messageTime span").text(timeMessage);


       // clono il template in cui inserire il contenuto della input
         var cloneTemplate = $(".templates .ms_message").clone();

        // aggiungo in templates in ms_message-view
         $(".ms_message-view").append(cloneTemplate);

         // aggiungo la classe send

         $(cloneTemplate).addClass("received");


     };

     function addZero (numero) {
       if(numero < 10) {
         return "0" +  numero
       }
       return numero;
     }


     function searchName () {
       var nameTyped = $(".ms_form input").val();
       console.log(nameTyped);

     }
