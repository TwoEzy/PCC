jQuery(function($) {
  var socket = io();

  $('#sub').click(function(){
    $('#nickdiv').removeClass('has-error has-feedback');
    $('#emaildiv').removeClass('has-error has-feedback');
    socket.on('risultato',function(data){
      switch(data.cod){
        case 0: $('#nickdiv').addClass('has-error has-feedback'); break;
        case 1: $('#emaildiv').addClass('has-error has-feedback'); console.log(data.cod); break;
      }
    });
    socket.emit('registrazione', {
        nome: $('#nome').val(),
        cognome: $('#cognome').val(),
        email: $('#email').val(),
        username: $('#nick').val(),
        password: $('#pw').val()
    });
  });

  $('#navlog').click(()=>{
    socket.emit('login',{
      usr: $('#navusr').val(),
      pw: $('#navpw').val()
    });
    socket.on('loginerror', (data)=>{
      switch(data.cod){
        case 0: $('#log').addClass('has-error has-feedback'); break;
        case 1: $('#log1').addClass('has-error has-feedback'); console.log(data.cod); break;
      }
    });
  });
});