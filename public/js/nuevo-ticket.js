var socket = io();
var label = $("#lblNuevoTicket");

socket.on('ultimoTicket', function(data) {
    console.log('Empezando...');
    label.text('Ticket N° ' + data.ultimo);
});

$("button").click(function() {
    socket.emit('generarTicket', null, function(data) {
        label.text(data);
    });
});