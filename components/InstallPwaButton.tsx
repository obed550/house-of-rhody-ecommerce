"use client";

import { useEffect, useState } from 'react';

export default function InstallPwaButton() {
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler as EventListener);
    return () => window.removeEventListener('beforeinstallprompt', handler as EventListener);
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setShowInstallButton(false);
    setDeferredPrompt(null);
  };

  if (!showInstallButton) return null;

  return (
    <button
      type="button"
      onClick={installApp}
      className="rounded-full border border-rhody-gold bg-rhody-gold px-4 py-2 text-sm font-bold text-rhody-navy transition hover:opacity-90"
    >
      Install app
    </button>
  );
}
