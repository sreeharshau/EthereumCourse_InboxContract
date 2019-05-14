// Require relevant modules
// Note: This module is automatically run along with other test modules containing 'it' tests when "npm run test" is called on cmd
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // Web 3 is upper case since Web3 is a constructor function, not a direct module import, this is used to create Web3 instances

// Here we pass the local Ganache provider to Web3 since we want to test the contract on a local network
const web3 = new Web3(ganache.provider());

// Interface and bytecode are the names from the JSON object exported by compile.js, can't be changed
const {interface, bytecode} = require('../compile');

// Done for easy future changes
const DEPLOY_MSG = 'blahInitialMessage';
const CHANGED_MSG = 'blahChangedMessage';

// Variable declaration outside using let enables shared access to these between beforeEach and the its in describe
let fetchedAccounts;
let inbox;

// beforeEach is always executed once before every "it" test
beforeEach(async () => {
	// Get a list of existing accounts from ganache
	
	// One way to do this using .then() is commented below, usually we use cleaner coding with async and await like we have in the actual code
	// web3.eth.getAccounts().then(fetchedAccounts => {
	// 	console.log(fetchedAccounts);
	// })

	fetchedAccounts = await web3.eth.getAccounts();

	// Deploy contract using one of these accounts
	// Use JSON.parse to get the JS object back from the JSON dump of interface
	inbox = await new web3.eth.Contract(JSON.parse(interface))
	.deploy({ data: bytecode, arguments: [DEPLOY_MSG] })
	.send({ from: fetchedAccounts[0], gas: '1000000' });
});

// Test block
describe('Inbox Tests', () => {
	it('Deployment', () => {
		// Assert.ok checks if the argument passed to it is valid i.e. not Undefined or NULL
		assert.ok(inbox.options.address);
	});

	it('Default Message Check', async () =>{
		const currMessage = await inbox.methods.message().call();
		// assert.equal checks that both parameters passed to it are equal
		assert.equal(currMessage, DEPLOY_MSG);
	});
	it('Message Modification Check', async () => {
		await inbox.methods.setMessage(CHANGED_MSG).send({ from:fetchedAccounts[0] });
		const currMessage = await inbox.methods.message().call();
		assert.equal(currMessage, CHANGED_MSG);
	});
});

