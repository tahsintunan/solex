import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, ParsedTransactionWithMeta } from '@solana/web3.js';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { notify } from "../utils/notifications";
//Add import dependencies here

export const TransactionLog: FC = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    // const publicKey = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
    const [transactionHistory, setTransactionHistory] = useState<ParsedTransactionWithMeta[]>(null);
    const [transactionTable, setTransactionTable] = useState<JSX.Element>(null);


    useEffect(() => {
        if (publicKey && transactionHistory) {
            buildTransactionTable();
        }
    }, [publicKey, connection, transactionHistory])


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


    //Render transaction history in a table
    function buildTransactionTable() {
        if (transactionHistory && transactionHistory.length !== 0) {
            let header = (
                <thead className="text-xs text-gray-700 uppercase bg-zinc-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">Transaction Signature</th>
                        <th className="px-6 py-3">Slot</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Result</th>
                    </tr>
                </thead>
            )
            let rows = transactionHistory.map((transaction, i) => {
                if (!transaction || !transaction.blockTime) {
                    return null;
                }
                let date = new Date(transaction.blockTime * 1000).toLocaleDateString();
                return (
                    <tr key={i + 1} className="bg-white border-b bg-zinc-800 dark:border-zinc-700">
                        <td className="px-6 py-3">
                            <Link href={'../tx/' + transaction.transaction.signatures[0]}>
                                {transaction.transaction.signatures[0]}
                            </Link>
                        </td>
                        <td className="px-6 py-3">{transaction.slot.toLocaleString("en-US")}</td>
                        <td className="px-6 py-3">{date}</td>
                        <td className="px-6 py-3">{transaction.meta.err ? 'Failed' : 'Success'}</td>
                    </tr>)
            })
            setTransactionTable(
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    {header}
                    <tbody>{rows}</tbody>
                </table>)
        }
        else {
            setTransactionTable(null);
        }
    }


    const transactionListLength = 25;
    const onClick = async () => {
        if (!publicKey) {
            console.log('error', 'Wallet not connected!');
            notify({ type: 'error', message: 'error', description: 'Wallet not connected!' });
            return;
        }
        try {
            await getTransactions(publicKey.toString(), transactionListLength);
        } catch (error: any) {
            notify({ type: 'error', message: `Couldn't Find Transactions!`, description: error?.message });
            console.log('error', `Error finding Transactions! ${error?.message}`);
        }
    };

    return (
        <div>
            <div className="text-center">
                <button
                    className="px-8 m-2 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] center hover:from-pink-500 hover:to-yellow-500 ..."
                    onClick={onClick}
                >
                    <span>Get Transactions</span>
                </button>
            </div>
            <div>{transactionTable}</div>
        </div>
    );
}