# Interaction with Smart Contract using Taquito

## Running

1. `npm install`
2. `npm start`
3. Go to [http://localhost:3000](http://localhost:3000)
4. View console to check status of the call to deployed contract (will be replaced by interactive UI soon).

## Updating Smart Contract

### Getting & Activating Faucet Account

1. Go to [https://faucet.tzalpha.net/](https://faucet.tzalpha.net/)
2. Click `Get Testnet` after proving you're not a robot ;)
3. Copy (or download) the JSON obtained.
4. Go to [https://smartpy.io/wallet.html](https://smartpy.io/wallet.html)
5. Under `Faucet Importer` point 2, paste the JSON obtained.
6. Click `Compute your private key`, and save the key somewhere.
7. Click `Activate account`

### Deploying Smart Contract

1. Go to [http://smartpy.io/ide](http://smartpy.io/ide)
2. Paste the contract in the editor.
3. Click on `RUN` button.
4. If all the tests pass, a tab named `Deploy Michelson Contract` will appear on the right, go to that.
5. Click `Deploy Michilson Contract` button.
6. Choose `Edonet` (of SmartPy.io Nodes) in Node and Network.
7. Choose `Wallet` > `SmartPy` > `Faucet`
8. Under `Copy & Paste`, paste the JSON of Faucet account.
9. Click `Deploy Contract` at the end.

### Changing the app code

1. Update `/src/contract.py` (for future reference)
2. Change variables `KEY` and `CONTRACT_ADDRESS` in `src/App.js` to the account's private key and the address of deployed contract respectively.
3. Change `proxy` in `package.json` to the address of RPC node used.
4. Restart the app
