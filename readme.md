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

### Test Users

# User 1

private key: 4f30997073f5aea3a97490d38905eac8b021a31fdd2b68d7abf4f78462183b11
public key: 0435897978cf590281d3d3aa4a86093eae6907c69cb8bde0e1b239ce12f265a1fd42ac2f405569eab823a7108db9fb084f04961b5e582cbc24fe317bcc09a62993

# User 2

private key: 5346cff0b05b4de4cb03255ad5248bda87d95e4b19416acea7ce25c19c077e47
public key: 04a7049cc3e48d342e204ab4284974aa4f98d28fa21031ba24f08f3376317c0ba41b2f0755ed3c5aaa23e91c20edd8fc4fdb7d6a307848b212178cd48547071df6
