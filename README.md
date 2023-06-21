# employee_smart_contract


This project is an example of how to use the Solana blockchain as a database. 
This project is written in two languages, Typescript and Rust. Rust for the smart contracts and Typescript for the client
side. There are particular steps for this project that need be followed in a particular order or it will not work as intended, or at all.

The steps are:

1. Creating an account with Solana in it. This is the account that pays for the transactions, sending data to and extracting data from the blockchain. You create accounts (key pair) on the client side with Solana-sdk.
2. Airdrop some Solana into them. You connect to the Solana devnet, it's free to give Sol there up to 2 into an account. This account will the basis for all smart contract transactions and will pay the fees for PDA's and such.
3. If you are dealing with practice stuff, like this project, you'll need to create other accounts for transfers of Sol. You will do this the same way as the first account.



# Advice

Smart contracts might seem daunting at first, but it is just a step by step process. Go step by step, follow the same pattern with each contract, intruction, etc and it will become easier.
