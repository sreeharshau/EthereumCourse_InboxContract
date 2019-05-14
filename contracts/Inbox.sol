// Uses a solidity version above the one specified i.e specifies bare minimum
pragma solidity ^0.4.17;

// Sample contract
contract Inbox{
	// Declaring the variable like this below also creates an automatic Getter/Setter combo which can be used to change its value
	// This is called using <var-name>() i.e. message().call() to read
	string public message;

	function Inbox(string InitialMessage) public{
		message = InitialMessage;
	}

	// All value modifications are transactions i.e setMessage(newMessage).send() should be how this is invoked
	function setMessage(string newMessage) public{
		message = newMessage;
	}
}

