import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { lightTheme } from "../theme/theme";
import { useAuthStore } from "../../store/auth/useAuthStore";

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * AppProviders wraps the whole application with:
 *  – GestureHandlerRootView (required by react-native-gesture-handler)
 *  – SafeAreaProvider (insets for notch / status bar)
 *  – PaperProvider (MD3 theme + icon config)
 *
 * It also triggers session restoration once on mount.
 */
export default function AppProviders({ children }: AppProvidersProps) {
  const restoreSession = useAuthStore((s) => s.restoreSession);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider theme={lightTheme}>{children}</PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
