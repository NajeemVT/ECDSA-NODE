## ECDSA Node

This project implements a client and server to facilitate transfers between different addresses. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

    1. Incorporate Public Key Cryptography so transfers can only be completed with a valid signature
    2. The person sending the transaction should have to verify that they own the private key corresponding to the address that is sending funds

#### Local Environment Setup

### Client

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

1. Open a terminal within the `/server` folder
2. Run `npm install` to install all the depedencies
3. Run `node index` to start the server

The application should connect to the default server port (3042) automatically!

*** This project is completed as part of Ethereum Developer Bootcamp in Alchemy University ***
