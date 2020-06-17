$(document).ready( function(){

  // quando seleziono l'input search avvio la ricerca tra i contatti

  //inizio evento click search input

$(".ms_form input").click( function() {

  searchName();

});
//fine evento click search input

$(".ms_with-dropdown").click( function () {

  $(this).children(".ms_dropdown").addClass("active");
});

// quando clicco sull'icona dell'aereplano stampo il contenuto inserito all'interno della input in ms_message-view.
// alcuni secondi dopo aver stampato l'input compare un messaggio di risposta

//inizio evento click aereplano
$(".btn-send").click( function () {


inviaMessaggio();

setTimeout(receivedMessage, 3000);

});

//fine  evento click aereplano

// se clicco il tasto invio genero un evento

$(".ms_form-message input").keypress( function() {

if((event.which === 13) || (event.keyCode === 13)){
  inviaMessaggio();

  setTimeout(receivedMessage, 3000);

}

});


});

// fine document.ready




// FUNZIONI


// ------ funzione per stampare contenuto input

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

      //scrollo alla fine della pagina
      $(".ms_message-view").scrollTop($(".ms_message-view").height());

   }

};


// ------ funzione per simulare la ricezione di un messaggio

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

         // aggiungo la classe received

         $(cloneTemplate).addClass("received");

         //scrollo alla fine della pagina
         $(".ms_message-view").scrollTop($(".ms_message-view").height());


     };


     // ---funzione che  consente di aggiungere uno zero "avanti" quando il numero è inferiore a 10

     function addZero (numero) {
       if(numero < 10) {
         return "0" +  numero
       }
       return numero;
     }


// ----- funzione ricerca tra i contatti

     function searchName () {

       var nameTyped = $(".ms_form input").val();
       console.log(nameTyped);



     }
