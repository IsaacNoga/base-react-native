import type { LucideIcon } from "lucide-react-native";
import { Home, ShoppingBag, User } from "lucide-react-native";

export interface DrawerRoute {
  name: string;
  label: string;
  icon: LucideIcon;
}

export const DRAWER_ROUTES: DrawerRoute[] = [
  { name: "index", label: "Inicio", icon: Home },
  { name: "pedidos", label: "Mis Pedidos", icon: ShoppingBag },
  { name: "perfil", label: "Mi Perfil", icon: User },
];
