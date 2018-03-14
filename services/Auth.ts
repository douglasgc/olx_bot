declare var require;


var request = require("request");
const rp = require('request-promise');

export class Auth {

	constructor (public email:string, public password:string) {
	}
	async auth() {
	}

}