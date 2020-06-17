$(document).ready( function(){


// quando clicco sull'icona dell'aereplano stampo il contenuto inserito all'interno della input in ms_message-view.
//-- per stampare quanto inserito nella input ho bisogno di "leggere" il suo contenuto con val().

$(".btn-send").click( function () {

inviaMessaggio()

});

});



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

      // testoMessaggio = $(".ms_form-message input").val("");

   }


};
