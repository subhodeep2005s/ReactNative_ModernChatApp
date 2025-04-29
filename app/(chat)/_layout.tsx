import { IconSymbol } from "@/components/IconSymbol";
import { useUser } from "@clerk/clerk-expo";
import { Stack, Redirect } from "expo-router";
import { Image, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function RootLayout() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  if (!isSignedIn) {
    return <Redirect href="/(chat)" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerLargeTitle: true,
          title: "Chat Rooms",
          headerLeft: () => (
            <Pressable
              onPress={() => router.push("/profile")}
              style={{ marginLeft: 10 }}
            >
              <Image
                source={{ uri: user?.imageUrl }}
                style={{ width: 32, height: 32, borderRadius: 16 }}
              />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/new-room")}
              style={{ marginRight: 10 }}
            >
              <IconSymbol name="plus" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name="profile" options={{ presentation: "modal" }} />
      <Stack.Screen
        name="new-room"
        options={{
          presentation: "modal",
          headerTitle: "New Chat Room",
          headerLeft: () => (
            <Pressable
              onPress={() => router.push("/")}
              style={{ marginLeft: 10 }}
            >
              <IconSymbol name="chevron.left" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="[chat]"
        options={{
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="settings/[chat]"
        options={{
          presentation: "modal",
          headerTitle: "Room Settings",
        }}
      />
    </Stack>
  );
}
