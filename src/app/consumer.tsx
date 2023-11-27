import { consume } from './actions';

export async function Consumer() {
  const messages = await consume();
  return (
    <ul>
      {messages.length === 0 ? (
        <li>No messages</li>
      ) : (
        messages.map((msg) => <li key={msg}>{msg}</li>)
      )}
    </ul>
  );
}
