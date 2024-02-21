import { useLinkStore } from "@/store";
import { close } from "expo-share-extension";
import { Button, Text, View } from "react-native";

// if ShareExtension is your root component, url is available as an initial prop
export default function ShareExtension({ url }: { url: string }) {
  const { addLinks, links } = useLinkStore();
  return (
    <View style={{ flex: 1 }}>
      <Text>{url}</Text>

      <Button
        title="Save"
        onPress={() => {
          addLinks(url);
          close();
        }}
      />
    </View>
  );
}
