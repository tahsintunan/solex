import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { FC, useState } from "react";
import { notify } from "../utils/notifications";
import { GetProgramAccountsFilter } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

export const GetTokens: FC = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    const [tokenTable, setTokenTable] = useState(null);

    // get all token accounts held by a wallet and display them in a table
    async function getTokenAccounts(wallet: string) {
        const filters: GetProgramAccountsFilter[] = [
            {
                dataSize: 165, // number of bytes
            },
            {
                memcmp: {
                    offset: 32, // number of bytes
                    bytes: wallet, // base58 encoded string
                },
            },
        ];
        const accounts = await connection.getParsedProgramAccounts(
            TOKEN_PROGRAM_ID, // new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
            {
                filters: filters,
            }
        );
        console.log(
            `Found ${accounts.length} token account(s) for wallet ${wallet}: `
        );
        if (accounts.length === 0) {
            return <div>No Token Accounts Found</div>;
        } else {
            const rows = accounts.map((account, i) => {
                //Parse the account data
                const parsedAccountInfo: any = account.account.data;
                const mintAddress: string = parsedAccountInfo["parsed"]["info"]["mint"];
                const tokenBalance: number =
                    parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"];
                return (
                    <tr key={i + 1}>
                        <td key={"index"}>{i + 1}</td>
                        <td key={"mint address"}>{mintAddress}</td>
                        <td key={"balance"}>{tokenBalance}</td>
                    </tr>
                );
            });
            const header = (
                <tr>
                    <th>Token No.</th>
                    <th>Mint Address</th>
                    <th>Qty</th>
                </tr>
            );
            setTokenTable(
                <table>
                    {header}
                    {rows}
                </table>
            );
        }
    }

    return <div>{/* Render Results Here */}</div>;
};
