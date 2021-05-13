import { TezosToolkit } from "@taquito/taquito";
import { importKey, InMemorySigner } from "@taquito/signer";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

const load = async () => {
  const Tezos = new TezosToolkit("/");
  Tezos.setProvider({
    signer: new InMemorySigner(
      "edskRro6fiBcG5zaiFisaP3ASVsZLscAA3WDEu16R4JowVmzKfMqwQ8hw6PsS38ax5aeXvKjcXt5uMkkrVbJe7U5niGtZAjpXt"
    ),
  });

  try {
    console.log("start");
    const contract = await Tezos.contract.at(
      "KT1Gva3vCub36nJhhvPvuUt8J6xo8SY2dStD"
    );
    const storage = await contract.storage();
    console.log(storage);
    console.log("adding");
    const operation = await contract.methods.add(5, 10).send();
    console.log("confirming");
    await operation.confirmation(1);
    console.log(operation.hash);
    const newStorage = await contract.storage();
    console.log(newStorage);
    console.log("end");
  } catch (err) {
    console.log(err);
  }
};

function App() {
  useEffect(load);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
