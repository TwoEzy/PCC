jQuery(function($) {
  var socket = io();

  $('#sub').click(function(){
    socket.on('risultato',function(data){
      alert(data.messaggio);
    });
    socket.emit('registrazione', {
        nome: $('#nome').val(),
        cognome: $('#cognome').val(),
        email: $('#email').val(),
        username: $('#nick').val(),
        password: $('#pw').val()
    });
  });
});