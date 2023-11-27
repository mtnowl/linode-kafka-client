import Image from 'next/image';
import styles from './page.module.css';
import { consume, produce } from './actions';

export default async function Home() {
  const messages = await consume();
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <form action={produce}>
          <button type="submit">Produce</button>
        </form>
      </div>
      <div className={styles.center}>
        <ul>
          {messages.length === 0 ? (
            <li>No messages</li>
          ) : (
            messages.map((msg) => <li key={msg}>{msg}</li>)
          )}
        </ul>
      </div>
    </main>
  );
}
