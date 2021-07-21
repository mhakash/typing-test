import Head from "next/head";
import Typing from "../components/Typing";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Typing test</title>
        <meta name="description" content="test you typing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Typing />
      </main>

      <footer className={styles.footer}>Typing test</footer>
    </div>
  );
}
