const fs = require('fs');

class Ticket {
    constructor(_ticket, _escritorio) {
        this.ticket = _ticket;
        this.escritorio = _escritorio;
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimascuatro = [];

        //Leemos el archivo JSON. Si los días de hoy coinciden, lo carga en la clase.
        //Caso contrario, reinicia el conteo
        let data = require('../data/data.json');

        if (this.hoy === data.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
        } else {
            this.reiniciarConteo();
        }
    }

    reiniciarConteo() {
        //Inicializamos las variables, y grabamos los nuevos valores
        this.ultimo = 0;
        this.tickets = [];
        this.ultimascuatro = [];
        console.log('Este es un nuevo día. Se inicializó el conteo.');
        this.guardarData();
    }

    generarTicket() {
        //Incremente en 1 el número de ticket, lo guarda en el arreglo y al final lo guarda en la bd
        this.ultimo++;

        let oTicket = new Ticket(this.ultimo, null);
        this.tickets.push(oTicket);

        this.guardarData();

        return `Ticket N° ${ this.ultimo }`;
    }

    getUltimoTicket() {
        return this.ultimo;
    }

    getUltimos4Ticket() {
        return this.ultimascuatro;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay ticket';
        }

        let _numTicket = this.tickets[0].ticket;
        this.tickets.shift();

        let _ticketAtendido = new Ticket(_numTicket, escritorio);
        this.ultimascuatro.unshift(_ticketAtendido);

        if (this.ultimascuatro.length > 4) {
            this.ultimascuatro.splice(-1, 1);
        }

        this.guardarData();

        return _ticketAtendido;
    }

    guardarData() {
        //Creamos un nuevo objeto, lo convertimos en string y escribimos en el file
        let objGuardar = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimascuatro: this.ultimascuatro
        }

        let objGuardarString = JSON.stringify(objGuardar);

        fs.writeFileSync('./server/data/data.json', objGuardarString);
    }
}

module.exports = {
    TicketControl
}