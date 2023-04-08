const express = require("express");
const cors = require("cors");
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

const app = express();

const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0435897978cf590281d3d3aa4a86093eae6907c69cb8bde0e1b239ce12f265a1fd42ac2f405569eab823a7108db9fb084f04961b5e582cbc24fe317bcc09a62993": 100,
  "04a7049cc3e48d342e204ab4284974aa4f98d28fa21031ba24f08f3376317c0ba41b2f0755ed3c5aaa23e91c20edd8fc4fdb7d6a307848b212178cd48547071df6": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  const { transaction, sig, recovery } = req.body;
  const { recipient, amount } = transaction;
  try {
    // Hash the transaction
    const bytes = utf8ToBytes(JSON.stringify(transaction));
    const hash = keccak256(bytes);

    const signature = new Uint8Array(sig);

    // Recover sender private key
    const sender = toHex(
      await secp.recoverPublicKey(hash, signature, recovery)
    );

    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
