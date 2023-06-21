import 'websocket-polyfill'
import { SimplePool } from 'nostr-tools';
import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

export const Relays = [
  "wss://relay.damus.io",
  "wss://nostr.drss.io",
]

function App() {
  const [pool, setPool] = useState<SimplePool | null>(null);

  // setup a relay pool
  useEffect(() => {
    const _pool = new SimplePool();
    setPool(_pool);

    return () => {
      _pool.close(Relays);
    }
  }, []);

  // subscribe to some events
  useEffect(() => {
    if (!pool) return;

    const sub = pool.sub(Relays, [{
      kinds: [1],
      limit: 69,
    }])

    sub.on('event', (event) => {
      console.log(event);
    })
  }, [pool]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
