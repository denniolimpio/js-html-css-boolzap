$(document).ready( function(){

  // cliccando "papler-plane "" genero un evento:
  // ---> invio  Messaggio
  //--- > simulo ricezione Messaggio dopo un certo lasso di tempo
  $(".btn-send").click( function () {
    inviaMessaggio();
    setTimeout(receivedMessage, 3000);
  });


  // premendo il tasto invio ( con form-message input attivo) invio il messaggio.

  $(".ms_form-message input").keypress( function() {

    if((event.which === 13) || (event.keyCode === 13)){
      inviaMessaggio();
      setTimeout(receivedMessage, 3000);
    }
  });


  // --- ricerca contatti
  // leggo il contenuto della input
  // recupero la lista di tutti i nomi presenti nel DOM
  // controllo la corrispondenza tra l'elenco dei contatti e il nome inserito dall'utente;
  // se questa è presente mostro il contatto e nacondo gli altri.

  $(".ms_form input").keyup( function() {

    var searchInput = $(this).val();

    var contactList = $(".ms_chat-item");

    contactList.each( function(){

      var contactName = $(this).find(".ms_name").text().toLowerCase();

      if( contactName.includes(searchInput) ) {
        $(this).show();
      } else {
        $(this).hide();

      }
    });
  });

  // --dropdown
  // ---> mostro menu a comparsa:
  // ---> elimina Messaggio
  // ---> info contatto

  // il menu a tendina una volta cliccato resta visibile.
  // si chiude quando :
  // --->  apro un altro menu a tendina;
  // ---> se clicco nuovamente sul icona "chevron"

  $(document).on( "click", ".ms_with-dropdown", function () {

    $(this).children(".ms_dropdown").toggleClass("active");
  });
});

// fine document.ready


// FUNZIONI

// ---- funzione invia messaggio:
// leggo il contenuto inserito nella input ms_message;
// eseguo la funzione SOLO se il campo di input non è vuoto;
// prendo il contenuto  della input text e lo inserisco all'interno del templates;
// --- > $(".templates .ms_messageText span");
// aggiungo la funzione new Date per generare l'ora di ricezione del messaggio;
// inserisco l'ora all'interno del template;
// ---> $(".templates .ms_messageTime span");
// rendo visibile il templates  all'interno della area di visualizzazione dei messaggi;
// ---> ms_message-view;
// ---> aggiungo a ms_message la classe send (con gli stili css);
// resetto il  contenuto della input;
// Con scrollTop vado automati. alla fine della pagina per mostare l'ultimo messaggio inviato;


function inviaMessaggio () {

  var testoMessaggio = $(".ms_form-message input").val();

  if (testoMessaggio != "" ) {

    $(".templates .ms_messageText span").text(testoMessaggio);

    var date = new Date ();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var timeMessage = addZero(hours) + " : " + addZero(minutes);

    $(".templates .ms_messageTime span").text(timeMessage);

    var cloneTemplate = $(".templates .ms_message").clone();

    $(".ms_message-view").append(cloneTemplate);

    $(cloneTemplate).addClass("send");
    testoMessaggio = $(".ms_form-message input").val("");

    $(".ms_message-view").scrollTop($(".ms_message-view").height());

  }

};

// -----funzione per simulare la ricezione di un messaggio
// scrivo il testo da stampare;
// genero l'ora di ricezione del messaggio:
// clono il template e lo inserisco all'interno -->
// ---> ms_message-view;
// ---> aggiungo a ms_message la classe received (con gli stili css);
// Con scrollTop vado automati. alla fine della pagina per mostare l'ultimo messaggio ricevuto;

function receivedMessage () {

  $(".templates .ms_messageText span").text(" Ciao");

  var date = new Date ();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var timeMessage = addZero(hours) + " : " + addZero(minutes);

  $(".templates .ms_messageTime span").text(timeMessage);

  var cloneTemplate = $(".templates .ms_message").clone();
  $(".ms_message-view").append(cloneTemplate);

  $(cloneTemplate).addClass("received");
  $(".ms_message-view").scrollTop($(".ms_message-view").height());
};


// ---funzione Add0
// Questa funzione consente di aggiungere uno zero "davanti" al numero quando il numero generato è < 10

function addZero (numero) {
  if(numero < 10) {
    return "0" +  numero
  }
  return numero;
}
