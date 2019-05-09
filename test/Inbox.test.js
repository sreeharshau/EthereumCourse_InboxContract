const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // Web 3 is upper case since Web3 is a constructor function, not a direct module import, this is used to create Web3 instances

const web3 = new Web3(ganache.provider());

class Car{
	constructor(newStatus){
		this.status = newStatus;
	}
	park(){
		this.status = 'Stopped';
		return this.status;
	}

	drive(){
		this.status = 'Vroom Vroom';
		return this.status;
	}
}

describe('Car Basic Tests', () => {
	it('checkPark', () => {
		const carVar = new Car('InitStatus');
		assert.equal(carVar.park(), 'Stopped');
	});

	it('checkVroom', () => {
		const carVar = new Car('InitStatus');
		assert.equal(carVar.drive(), 'Vroom Vroom');
	});

});