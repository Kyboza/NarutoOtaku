"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { revalidate } from "../actions/userActions";

const TopRevalidation = () => {
  const toggleStatus = useSelector((state: RootState) => state.likes.toggleStatus);
  const path = '/';

  const [activeTabs, setActiveTabs] = useState<number>(0);
  const MAX_TABS = 3;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const tabId = Math.random().toString(36).substring(2, 9);
    const channel = new BroadcastChannel('revalidation_channel');

    // Skicka "register" när fliken öppnas
    channel.postMessage({ type: 'register', tabId });

    // Funktion för att uppdatera antalet aktiva flikar
    const updateTabCount = () => {
      channel.postMessage({ type: 'requestCount' });
    };

    // Hantera inkommande meddelanden från andra flikar
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'updateActiveTabs') {
        // Uppdatera antalet aktiva flikar och kolla om vi kan köra revalidate
        const newActiveTabs = event.data.count;
        setActiveTabs(newActiveTabs);

        // Kontrollera om vi ska köra revalidation direkt
        if (newActiveTabs <= MAX_TABS) {
          console.log('Running revalidate from tab:', tabId);
          revalidate(path);
        } else {
          console.log('Max tab limit reached');
        }
      }
    };

    channel.addEventListener('message', handleMessage);

    // Begär aktiva flikar vid första render
    updateTabCount();

    // Starta intervallet för att köra revalidation om villkoren är uppfyllda
    const startInterval = () => {
      clearInterval(interval);
      interval = setInterval(async () => {
        if (activeTabs <= MAX_TABS) {
          console.log('Running revalidate on Topchar from tab:', tabId);
          await revalidate(path);
        } else {
          console.log('Max tab limit reached');
        }
      }, 120000); // 120000 ms = 2 minuter
    };

    startInterval();

    // Rensa upp när komponenten unmountas
    return () => {
      clearInterval(interval);
      channel.postMessage({ type: 'unregister', tabId });
      channel.removeEventListener('message', handleMessage);
      channel.close();
    };
  }, [toggleStatus, activeTabs]); // Uppdatera när toggleStatus eller activeTabs förändras

  return null;
};

export default TopRevalidation;
