import React, { useEffect, useState } from 'react';
import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import WebApp from '@twa-dev/sdk';
import confetti from 'canvas-confetti';

function AppContent() {
  const wallet = useTonWallet();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    WebApp.setHeaderColor('#1d93ab');
    WebApp.setBackgroundColor('#ffffff');
    WebApp.MainButton.setText('Запустить конфетти!');
    WebApp.MainButton.onClick(launchConfetti);
  }, []);

  useEffect(() => {
    if (wallet && !isConnected) {
      setIsConnected(true);
      launchConfetti();
    } else if (!wallet && isConnected) {
      setIsConnected(false);
    }
  }, [wallet, isConnected]);

  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Telegram Mini App с TON Connect</h1>
        <TonConnectButton />
        {isConnected && <p>Кошелек подключен!</p>}
      </header>
    </div>
  );
}

function App() {
  return (
    <TonConnectUIProvider manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json">
      <AppContent />
    </TonConnectUIProvider>
  );
}

export default App;