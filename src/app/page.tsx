import styles from './page.module.css';
import { produce } from './actions';
import { Consumer } from './consumer';
import Loading from './loading';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <form action={produce}>
          <button type="submit">Produce</button>
        </form>
      </div>
      <div className={styles.center}>
        <Suspense fallback={<Loading />}>
          <Consumer />
        </Suspense>
      </div>
    </main>
  );
}
