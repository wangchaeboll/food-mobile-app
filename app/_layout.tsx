import {SplashScreen, Stack} from "expo-router";
import "./global.css";
import { useFonts } from "expo-font";
import { useEffect} from "react";
import useAuthStore from "@/store/auth.store";

export default function RootLayout() {
  const { isLoading, fetchAuthenticatedUser } = useAuthStore()
  const [fontsLoaded, error] = useFonts({
    "QuickSand-Bold": require('../assets/fonts/Quicksand-Bold.ttf'),
    "QuickSand-Medium": require('../assets/fonts/Quicksand-Medium.ttf'),
    "QuickSand-Regular": require('../assets/fonts/Quicksand-Regular.ttf'),
    "QuickSand-SemiBold": require('../assets/fonts/Quicksand-SemiBold.ttf'),
    "QuickSand-Light": require('../assets/fonts/Quicksand-Light.ttf'),
  })

  useEffect(() => {
    if (error) {
      console.error(error);
      // Or handle error some other way, like showing a message
      return;
    }

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  useEffect(()=> {
    fetchAuthenticatedUser()
  },[])

  if(!fontsLoaded || isLoading) return null

  return <Stack screenOptions={{headerShown: false}} />;
}
