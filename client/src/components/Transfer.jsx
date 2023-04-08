import { useState } from "react";
import * as secp from "ethereum-cryptography/secp256k1";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";
import server from "../server";

function Transfer({ address, setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    // Hashing transaction
    const transaction = { recipient, amount: parseInt(sendAmount) };
    const bytes = utf8ToBytes(JSON.stringify(transaction));
    const hash = keccak256(bytes);

    // Creating a digital signature
    const signature = await secp.sign(hash, privateKey, { recovered: true });

    var sig = Array.from(signature[0]);
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        transaction,
        sig,
        recovery: signature[1],
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type a public key"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
