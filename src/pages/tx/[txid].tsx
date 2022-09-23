import Head from "next/head";
import { TransactionView } from 'views/explorer/tx';

const Tx = () => {

    return (
        <div>
            <Head>
                <title>Solex</title>
                <meta
                    name="description"
                    content="Basic Functionality"
                />
            </Head>
            <TransactionView />
        </div>
    )
}

export default Tx
