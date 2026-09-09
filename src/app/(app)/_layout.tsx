import Avatar from "@/components/Avatar";
import { DRAWER_ROUTES } from "@/constants/drawer";
import { useAuth } from "@/features/auth/context";
import type { DrawerContentComponentProps } from "expo-router/drawer";
import {
  Drawer,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "expo-router/drawer";
import { LogOut } from "lucide-react-native";
import { Text, View } from "react-native";

function DrawerHeader() {
  const { user } = useAuth();

  const name = user ? `${user.nombre} ${user.apellidos}` : "Usuario";
  const initials = user
    ? `${user.nombre.charAt(0) ?? ""}${user.apellidos.charAt(0) ?? ""}`
    : "?";

  return (
    <View className="px-4 py-6 border-b border-neutral-200 flex-row items-center gap-3">
      <Avatar src={user?.foto} size={48}>
        {initials.toUpperCase()}
      </Avatar>
      <View className="flex-1">
        <Text
          className="text-base font-bold text-neutral-900"
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text className="text-sm text-neutral-500" numberOfLines={1}>
          {user?.correo}
        </Text>
      </View>
    </View>
  );
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { logout } = useAuth();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
      <DrawerHeader />
      <DrawerItemList {...props} />
      <View className="flex-1 justify-end px-2 pb-4 mt-4 border-t border-neutral-200">
        <DrawerItem
          label="Cerrar sesión"
          icon={({ color, size }) => <LogOut color={color} size={size} />}
          onPress={() => logout()}
        />
      </View>
    </DrawerContentScrollView>
  );
}

export default function MainLayout() {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
      {DRAWER_ROUTES.map((route) => (
        <Drawer.Screen
          key={route.name}
          name={route.name}
          options={{
            drawerLabel: route.label,
            title: route.label,
            drawerIcon: ({ color, size }) => (
              <route.icon color={color} size={size} />
            ),
          }}
        />
      ))}
    </Drawer>
  );
}
