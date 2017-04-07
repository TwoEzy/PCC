jQuery(function($) {
  var socket = io();

  $('#sub').click(function(){

    socket.emit('registrazione', {
        nome: $('#nome').val(),
        cognome: $('#cognome').val(),
        email: $('#email').val(),
        username: $('#nick').val(),
        password: $('#pw').val()
    });
  });
  socket.on('risultati',function(data){
    alert(data.results);
  });
});