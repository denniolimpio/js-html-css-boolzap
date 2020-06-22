$(document).ready( function(){

  // cliccando "papler-plane "" genero un evento:
  // ---> invio  Messaggio
  //--- > simulo ricezione Messaggio dopo un certo lasso di tempo
  $(".btn-send").click( function () {
    inviaMessaggio();
    setTimeout(receivedMessage, 3000);
  });


  // premendo il tasto invio ( con form-message input attivo) invio il messaggio.

  $(".form-message input").keypress( function() {

    if((event.which === 13) || (event.keyCode === 13)){
      inviaMessaggio();
      setTimeout(receivedMessage, 1000);
    }

  });


  //Cambio icona

  // $(document).on( "focus", '.form-message input',
  //    function() {
  //
  //      $('.microphone').removeClass('active');
  //
  //      $('.plane').removeClass('hide');
  //    }

  // --- Ricerca Contatti ---

  // leggo il contenuto della input
  // recupero la lista di tutti i nomi presenti nel DOM
  // controllo la corrispondenza tra l'elenco dei contatti e il nome inserito dall'utente;
  // se questa è presente mostro il contatto e nacondo gli altri.

  $(".form input").keyup( function() {

    var searchInput = $(this).val();

    var contactList = $(".contact-item");

    contactList.each( function(){

      var contactName = $(this).find(".name").text().toLowerCase();

      if( contactName.includes(searchInput) ) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });


  // --- Dropdown

  // ---> mostro menu a comparsa:
  // ---> elimina Messaggio
  // ---> info contatto

  // il menu a tendina una volta cliccato resta visibile.
  // si chiude quando:
  // --->  a) apro un altro menu a tendina;
  // ---> b) se clicco nuovamente sull icona "chevron/freccia"

  $(document).on( "click", ".arrow", function () {

    //  a)


    // $(this).parents().siblings().find(".option").removeClass("active");     // è possibile farlo anche not().

    // dopo la correzione
    $(".option").removeClass("active");     // è possibile farlo anche not().

    //  b)
    $(this).children(".option").toggleClass("active");
  });
});


// Aperto il menu a tendina, se clicco su "elimina messaggio" questo viene cancellato.

$(document).on( "click", ".delete", function () {

  $(this).parents(".message").remove();

})


// ---- lista Chat

// ---> Clicco sul contatto e genero un evento:
// ---> Rimuovo la classe selected a tutti i contatti (di default mostro Michele)
// ---> Aggiungo la classe selected all'elemento selezionato
// ---> Mostro solo la chat del contatto con classe selected
// --->  Quindi rimuovo a tutte le chat la classe "active"


$(document).on( "click", ".contact-item", function () {

  $(".contact-item").removeClass("selected");

  $(this).addClass("selected");

  $(".chat").removeClass("active");

  // ---> leggo il valore di data-contact
  // ---> cerco l'elemento chat che ha l'attributo data-chat === data-contact
  // --->  Quando ho la corrispondenza aggiungo la classe "active"


  var contactData = $(this).attr("data-contact");

  $('.chat[data-chat="' +  contactData +'"]').addClass("active");

  // ---> Modifico l'immagine e il testo dell'elemenento "active" nella top-bar right

  var contactName = $(this).find(".name").text();
  var contactAvatar = $(this).find("img").attr("src");


  $(".current-chat").find("h3").text(contactName);
  $(".current-chat").find("img").attr("src", contactAvatar);

});

// fine document.ready


// FUNZIONI

// ---- funzione invia messaggio:

function inviaMessaggio () {

  // leggo il contenuto inserito nella input message;
  var testoMessaggio = $(".form-message input").val();;
  //console.log(testoMessaggio)

  // VALIDAZIONE eseguo la funzione SOLO se il campo di input non è vuoto;
  if (testoMessaggio != "" ) {

    // clono il template message
    var message = $(".templates .message").clone();

    // --> stampo il contenuto della input in messageText
    message.children(".messageText").text(testoMessaggio);
    // --> invoco la funzione oraCorrente e la stampo in messageTime per mostare l'orario
    message.children(".messageTime").append(oraCorrente());

    // --> aggiungo il messaggio generato al contenitore delle Chat e lo rendo visibile (add class)
    $(message).addClass("send");
    $(".messageContainer .chat.active").append(message);


    //azzero contenuto input
    testoMessaggio = $(".form-message input").val("");

    $(".messageContainer").scrollTop($(".messageContainer").height());

  }

};

// ----- Messaggio ricevuto

function receivedMessage () {

  // clono il template message

  var message = $(".templates .message").clone();

  // --> stampo il testo del messaggio in messageText

  message.children(".messageText").text("Ciao");

  // --> invoco la funzione oraCorrente e la stampo in messageTime per mostare l'orario

  message.children(".messageTime").append(oraCorrente());

  // --> aggiungo il messaggio generato al contenitore delle Chat attivo e lo rendo visibile (add class)

  $(".messageContainer .chat.active").append(message);
  $(message).addClass("received");

  // --> aggiungo lo scroll automatico della pagina
  $(".messageContainer").scrollTop(".messageContainer").prop();
};


//--- funzione OraCorrente
// genero ora e minuto corrente

function oraCorrente () {

  var date = new Date ();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var timeMessage = addZero(hours) + " : " + addZero(minutes);


  return timeMessage;
}


// ---funzione Add0
// Questa funzione consente di aggiungere uno zero "davanti" al numero quando il numero generato è < 10

function addZero (numero) {

  if(numero < 10) {

    return "0" +  numero
  }

  return numero;

}
