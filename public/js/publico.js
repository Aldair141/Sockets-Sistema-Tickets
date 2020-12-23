var socket = io();

var lblTicket1 = $("#lblTicket1");
var lblTicket2 = $("#lblTicket2");
var lblTicket3 = $("#lblTicket3");
var lblTicket4 = $("#lblTicket4");

var lblEscritorio1 = $("#lblEscritorio1");
var lblEscritorio2 = $("#lblEscritorio2");
var lblEscritorio3 = $("#lblEscritorio3");
var lblEscritorio4 = $("#lblEscritorio4");

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

var audio = document.getElementById("audio");

socket.on('cuatroultimos', function(data) {
    audio.play();
    imprimirTickets(data.cuatroultimos);
});

function imprimirTickets(tickets) {
    for (var i = 0; i < tickets.length; i -= -1) {
        lblTickets[i].text('Ticket ' + tickets[i].ticket);
        lblEscritorios[i].text('Escritorio ' + tickets[i].escritorio);
    }
}