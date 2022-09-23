# Solex

Solex allows users to look up transactions and accounts on the various Solana clusters. Solex takes inspiration from [Explorer | Solana](https://explorer.solana.com/). Solex lets you connect your wallet, check your balance, get your token accounts, and view your transaction history with great details.



## Features

Solex contains the following features:

```
- Wallet Integration with Auto Connect / Refresh

- State Management

- Components: One or more components demonstrating state management

- Web3 Js: Uses of web3 js including a transaction with a connection provider

- Sample navigation and page changing to demonstrate state

- Clean Simple Styling 

```



## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), built on top of [Solana dApp Scaffold](https://github.com/solana-labs/dapp-scaffold). The following technologies have been used:
```
- TypeScript
- Next.js
- @solana/web3.js
- @solana/wallet-adapter-wallets
```

The responsive version for wallets and the wallet adapter may not function or work as expected for mobile based on plugin and wallet compatibility.

## Installation

```bash
npm install
# or
yarn install
```

## Build and Run

Next, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



### Structure
 
```
├── public : publically hosted files
├── src : primary code folders and files 
│   ├── components : should house anything considered a resuable UI component
│   ├── contexts` : any context considered reusable and useuful to many compoennts that can be passed down through a component tree
│   ├── hooks` : any functions that let you 'hook' into react state or lifecycle features from function components
│   ├── models` : any data structure that may be reused throughout the project
│   ├── pages` : the pages that host meta data and the intended `View` for the page
│   ├── stores` : stores used in state management
│   ├── styles` : contain any global and reusable styles
│   ├── utils` : any other functionality considered reusable code that can be referenced
│   ├── views` : contains the actual views of the project that include the main content and components within
style, package, configuration, and other project files

```

