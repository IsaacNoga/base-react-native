import { Card, Col, Row } from "@/components";
import { useAuth } from "@/features/auth/context";
import { Text, View } from "react-native";

export default function Index() {
  const { user } = useAuth();
  return (
    <View className="flex-1 p-4 w-full h-full">
      <Row>
        <Col span={24}>
          <Card hoverable>
            <Text className="text-2xl font-semibold">
              Bienvenido {user?.nombre ?? ""} {user?.apellidos ?? ""}
            </Text>
          </Card>
        </Col>
      </Row>
    </View>
  );
}
