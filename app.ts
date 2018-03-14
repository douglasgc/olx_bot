var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

import { Chat } from './services/Chat';
import { Queue } from './services/Queue';
import { Crawler } from './services/Crawler';
let Db = require('./utils/db.js');
let Clients = new Db('./storage/clients.json',[]);

io.on('connection', function(socket){
  console.log('a user connected');
});



export function AppStart () {
	
	let queue = new Queue();
	let crawler = new Crawler();

	let data = {total:0,enviados:0};

	let callbackChat = () => {

		data.enviados=data.enviados+1;
		data.total = (queue.queue.list.nElements) + data.enviados;

		console.log(data);

		io.emit('newValue', data);

	};

	crawler.doneItem = (data:any) => {
		// Verifica se existe alguém que já recebeu
		let c = Clients.read();
		if(c[data.user]) {
			return;
		}
		// Salva que este usuario recebeu
		c.push(data.user);
		Clients.write(c)
		// Cria o Chat
		let chat = new Chat('c5cf86b0aae757170144c8ae38962d986e3bc392',data.id);
		// Adiciona o  Callback
		chat.callback = callbackChat;
		// Adiciona na fila
		queue.add(chat);
	};

	crawler.start('http://pr.olx.com.br/veiculos-e-pecas/carros?pe=10000&ps=1000');

	http.listen(3000, function(){
	  console.log('listening on *:3000');
	});

}
AppStart();