import { useEffect } from 'react';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export function useFrameworkReady() {
  useEffect(() => {
    // Activate keep awake safely with try/catch
    const activateKeepAwake = async () => {
      try {
        await activateKeepAwakeAsync();
      } catch (error) {
        console.warn('Failed to activate keep awake:', error);
      }
    };

    // Call frameworkReady if available
    window.frameworkReady?.();
    
    // Activate keep awake
    activateKeepAwake();
    
    // Cleanup function to deactivate keep awake when component unmounts
    return () => {
      try {
        deactivateKeepAwake();
      } catch (error) {
        console.warn('Failed to deactivate keep awake:', error);
      }
    };
  });
}
