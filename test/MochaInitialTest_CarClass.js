// Require relevant modules
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // Web 3 is upper case since Web3 is a constructor function, not a direct module import, this is used to create Web3 instances

// This is an instance of the Web3 module imported above. Needs to be initialized with a provider.
const web3 = new Web3(ganache.provider());

// Sample class to see how Mocha testing works
class Car{
	// Used to be defined as Car(newStatus){} earlier but newer versions use the keyword constructor instead
	constructor(newStatus){
		// Create a local var named status
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

// Declared outside using var or let to enable shared access between beforeEach and 'it' tests
var carVar;

// This is how you declare a nameless function
beforeEach(() => {
	carVar = new Car('InitStatus');
});

// describe is a block of individual tests with a description
describe('Car Basic Tests', () => {
	// It is used to define individual unit tests
	it('checkPark', () => {
		// First we declared a new instance of Car in each "it" test but its more efficient to use beforeEach to do this
		// const carVar = new Car('InitStatus');
		assert.equal(carVar.park(), 'Stopped');
	});

	it('checkVroom', () => {
		// const carVar = new Car('InitStatus');
		assert.equal(carVar.drive(), 'Vroom Vroom');
	});

});