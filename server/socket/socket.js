const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

let ticketControl = new TicketControl();

io.on('connection', (client) => {
    //Emitimos el último ticket
    client.broadcast.emit('ultimoTicket', {
        ultimo: ticketControl.getUltimoTicket()
    });

    //Emitimos los 4 últimos tickets
    client.emit('cuatroultimos', {
        cuatroultimos: ticketControl.getUltimos4Ticket()
    });

    client.on('generarTicket', (data, callback) => {
        let rpta = ticketControl.generarTicket();
        callback(rpta);
    });

    client.on('atenderTicket', (_escritorio, callback) => {
        let rpta = ticketControl.atenderTicket(_escritorio);
        if (rpta === 'No hay ticket') {
            callback({
                ok: false,
                message: rpta
            });
        } else {
            callback({
                ok: true,
                atendiendoTicket: rpta
            });

            //Emitir la nueva lista de 4
            client.broadcast.emit('cuatroultimos', {
                cuatroultimos: ticketControl.getUltimos4Ticket()
            });
        }
    });
});