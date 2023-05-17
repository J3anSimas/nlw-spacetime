import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App(): JSX.Element {
    return (
        <View className="h-full w-full bg-red-100">
            <View className="h-24 w-full items-center justify-center bg-red-700 p-4">
                <Text>Header</Text>
            </View>
            <View className="h-full w-full items-center justify-center bg-blue-700 p-4">
                <Text>Main</Text>
            </View>
            <StatusBar style="dark" />
        </View>
    );
}
