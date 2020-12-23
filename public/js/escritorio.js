var socket = io();
var small = $("small");
var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

var escritorio = searchParams.get('escritorio');

$("h1").text('Escritorio ' + escritorio);

$("button").click(function() {
    socket.emit('atenderTicket', escritorio, function(data) {
        if (data.ok) {
            small.text(JSON.stringify(data.atendiendoTicket.ticket));
        } else {
            alert(data.message);
        }
    });
});