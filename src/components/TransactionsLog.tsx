import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, ParsedTransactionWithMeta } from '@solana/web3.js';
import { FC, useEffect, useState } from 'react';
import { notify } from "../utils/notifications";
//Add import dependencies here

export const TransactionLog: FC = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [transactionHistory, setTransactionHistory] = useState<ParsedTransactionWithMeta[]>(null);
    const [transactionTable, setTransactionTable] = useState<JSX.Element>(null);


    //fetch parsed transactions for a given wallet
    async function getTransactions(address, numTx) {
        const pubKey = new PublicKey(address);
        //Find recent transactions
        let transactionList = await connection.getSignaturesForAddress(pubKey, { limit: numTx });
        //Parse transactions to get signature for recent transactions 
        let signatureList = transactionList.map(transaction => transaction.signature);
        //Get parsed details of each transaction 
        let transactionDetails = await connection.getParsedTransactions(signatureList);
        //Update State
        setTransactionHistory(transactionDetails);
    }

    return (<div>

        {/* Render Results Here */}

    </div>)
}