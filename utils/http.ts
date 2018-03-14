var rp = require('request-promise');

export class Http {
	rp:any;
	constructor(public key:string) {
		this.rp = rp.defaults({
			transform:(body,response) => {
				if (response.headers['content-type'] === 'application/json') {
					return JSON.parse(body);
				}
				return body;
			},
			headers: {
				'Authorization': key,
				'Content-Type':'application/json'
			}
		})
	}
	auth() {
		return this.rp;
	}
}