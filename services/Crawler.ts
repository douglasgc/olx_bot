import {Http} from './../utils/http';
var Crapy = require("crawler");
var i = 0;

export class Crawler {

	list_page:any;
	list_item:any;
	doneItem:Function;
	constructor () {
		this.list_page = new Crapy({
			maxConnections : 40,
			rateLimit: 40,
			preRequest (options,dn) {
				options.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36';
				dn();
			},	
			callback: (error, res, done) => this.callback(error, res, done)
		});
		this.list_item = new Crapy({
			maxConnections : 40,
			rateLimit: 40,
			preRequest (options,dn) {
				options.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36';
				dn();
			},	
			callback: (error, res, done) => this.callbackItem(error, res, done)
		});
	}
	start (url) {
		let totalPages = [];
		for (var i = 1; i < 10; ++i) {
			totalPages.push(url + '&o=' + i);
		}
		console.log(totalPages);
		this.list_page.queue(totalPages);
	}
	callback (error, res, done) {
		if (error) new Error(error); 
		// console.log('cbk');
		var $ = res.$;
		let links = $( ".OLXad-list-link" ).map(function() {return $(this).attr('href');}).get();
		console.log(res);
		this.list_item.queue(links);
		done();
	}
	callbackItem (error, res, done) {
		console.log('cbkit');
		var $ = res.$;
		try {
		this.doneItem({
			id:parseInt($('.OLXad-id .description').text()),
			user: ($('.item.owner.mb10px .text').text())

		});
		done();
		
		
		} catch {return;}
	}

}