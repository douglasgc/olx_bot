import {Http} from './../utils/http';
export class Chat {

	authHttp:any;
	callback:Function;

	constructor (public authKey:string,public linkAd:number) {
		this.authHttp = new Http(authKey).auth();
	}

	data() {
		try {
		return this.authHttp
		.post('https://chatapi.olx.com.br/chats')
		.json({"listId":this.linkAd});
		} catch(err) {console.log(err)};
	}

	async send () {
		try {

		let data = await this.data();
		console.log(data);
		let teste = await this.authHttp
			.post(`https://chatapi.olx.com.br/chats/${data.data.id}/messages`)
			.json({"type":"TEXT","text":"Olá, tudo bom? Você já vendeu? Aceita troca? Não sei se conhece, mas  deixa eu dar uma dica. Vendi o carro em 10 dias em um site legal e grátis. O Link Motors. http://bit.ly/2HMKKBE","id":data.data.id});
		this.callback(true);
		} catch(err) {console.log(err)};

	}

}