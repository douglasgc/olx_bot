import * as Collections from 'typescript-collections';

export class Queue {
	queue:any;
	constructor() {
		this.queue = new Collections.Queue();
		this.loopController();
	}
	async loop() {
		let result = this.queue.dequeue();
		if (typeof result==='object') {
			// console.log('Running');
			(await result.send());
		}
	}
	async loopController(){
		// console.log("In queue:", this.queue.list.nElements);
		if(this.queue.list.nElements>0) {
			await this.loop();
			this.loopController();
			return;
		}
		setTimeout(() => this.loopController(),1000)
	}
	add (object:any) {
		this.queue.enqueue(object);
	}
}