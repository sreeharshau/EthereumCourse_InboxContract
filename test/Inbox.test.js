const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // Web 3 is upper case since Web3 is a constructor function, not a direct module import, this is used to create Web3 instances

const web3 = new Web3(ganache.provider());

const {interface, bytecode} = require('../compile');

const DEPLOY_MSG = 'blahInitialMessage';
const CHANGED_MSG = 'blahChangedMessage';

let fetchedAccounts;
let inbox;

beforeEach(async () => {
	// Get a list of existing accounts from ganache
	
	// One way to do this using .then() is commented below, usually we use cleaner coding with async and await like we have in the actual code
	// web3.eth.getAccounts().then(fetchedAccounts => {
	// 	console.log(fetchedAccounts);
	// })

	fetchedAccounts = await web3.eth.getAccounts();

	// Deploy contract using one of these accounts
	inbox = await new web3.eth.Contract(JSON.parse(interface))
	.deploy({ data: bytecode, arguments: [DEPLOY_MSG] })
	.send({ from: fetchedAccounts[0], gas: '1000000' });
});

describe('Inbox Tests', () => {
	it('Deployment', () => {
		assert.ok(inbox.options.address);
	});

	it('Default Message Check', async () =>{
		const currMessage = await inbox.methods.message().call();
		assert.equal(currMessage, DEPLOY_MSG);
	});
	it('Message Modification Check', async () => {
		await inbox.methods.setMessage(CHANGED_MSG).send({ from:fetchedAccounts[0] });
		const currMessage = await inbox.methods.message().call();
		assert.equal(currMessage, CHANGED_MSG);
	});
});

