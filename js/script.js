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
      setTimeout(receivedMessage, 1000);
    }
  });


  // --- ricerca contatti
  // leggo il contenuto della input
  // recupero la lista di tutti i nomi presenti nel DOM
  // controllo la corrispondenza tra l'elenco dei contatti e il nome inserito dall'utente;
  // se questa è presente mostro il contatto e nacondo gli altri.

  $(".ms_form input").keyup( function() {

    var searchInput = $(this).val();

    var contactList = $(".ms_contact-item");

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
  // --->  a) apro un altro menu a tendina;
  // ---> b) se clicco nuovamente sul icona "chevron"

  $(document).on( "click", ".ms_arrow", function () {

//  a)
    $(this).parents().siblings().find(".ms_option").removeClass("active");
    // è possibile farlo anche not().

//  b)
    $(this).children(".ms_option").toggleClass("active");
  });
});


// Aperto il menu a tendina, se clicco su "elimina messaggio" questo viene cancellato.

$(document).on( "click", ".ms_delete", function () {

  $(this).parents(".ms_message").remove();

})


// ---- lista Chat
//  clicco sul contatto e genero un evento:
$(document).on( "click", ".ms_contact-item", function () {

  // ---> rimuovo la classe selected a tutti gli elementi (di default mostro Michele)
$(".ms_contact-item").removeClass("selected");

//---> aggiungo la classe selected all'elemento cliccato
$(this).addClass("selected");

//  mostro solo la chat del contatto con classe selected
// Quindi
// --> rimuovo a tutte le chat la classe "show-chat"
$(".chat").removeClass("active");
// ---> leggo il valore di data-contact
var contactData = $(this).attr("data-contact");

// ---> cerco l'elemento chat che ha l'attributo data-chat === data-contact
// -->  aggingo la classe "show-chat"
$('.chat[data-chat="' +  contactData +'"]').addClass("active");

// devo modificare l'immagine e il testo dell'elemen nella top-bar right

// ---> prendo il nome e l'immagine del contatto selezionato
//
var contactName = $(this).find(".ms_name").text();
var contactAvatar = $(this).find("img").attr("src");

$(".current-chat").find("h3").text(contactName);
$(".current-chat").find("img").attr("src", contactAvatar);
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
// ---> ms_messageContainer;
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

    $(".ms_messageContainer").append(cloneTemplate);

    $(cloneTemplate).addClass("send");
    testoMessaggio = $(".ms_form-message input").val("");

    $(".ms_messageContainer").scrollTop($(".ms_messageContainer").height());

  }

};

// -----funzione per simulare la ricezione di un messaggio
// scrivo il testo da stampare;
// genero l'ora di ricezione del messaggio:
// clono il template e lo inserisco all'interno -->
// ---> ms_messageContainer;
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
  $(".ms_messageContainer").append(cloneTemplate);

  $(cloneTemplate).addClass("received");
  $(".ms_messageContainer").scrollTop($(".ms_messageContainer").height());
};


// ---funzione Add0
// Questa funzione consente di aggiungere uno zero "davanti" al numero quando il numero generato è < 10

function addZero (numero) {
  if(numero < 10) {
    return "0" +  numero
  }
  return numero;
}
