import type { NextPage } from "next";
import Head from "next/head";

import { ExplorerView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solex</title>
        <meta name="description" content="Solex" />
      </Head>
      <ExplorerView />
    </div>
  );
};

export default Home;
