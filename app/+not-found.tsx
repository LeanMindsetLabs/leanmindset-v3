import { Text, View } from "react-native";
import { Link, Stack } from "expo-router";
import { colors } from "@/src/theme/colors";
import { typography } from "@/src/theme/typography";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Missing", headerShown: true }} />
      <View style={{ flex: 1, backgroundColor: colors.background, alignItems: "center", justifyContent: "center", padding: 24 }}>
        <Text style={typography.heading2}>Screen not found</Text>
        <Link href="/(tabs)" style={{ marginTop: 16 }}>
          <Text style={[typography.body, { color: colors.accentBlue }]}>Go to Today</Text>
        </Link>
      </View>
    </>
  );
}
