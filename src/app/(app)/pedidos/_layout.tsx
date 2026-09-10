import { DrawerToggleButton } from "expo-router/drawer";
import { Stack } from "expo-router";

export default function PedidosLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Mis Pedidos", headerLeft: () => <DrawerToggleButton /> }}
      />
      <Stack.Screen
        name="detalle"
        options={{ title: "Detalle del Pedido" }}
      />
    </Stack>
  );
}