import type { LucideIcon } from "lucide-react-native";
import { Home, ShoppingBag, User, Wallet } from "lucide-react-native";

export interface DrawerRoute {
  name: string;
  label: string;
  icon: LucideIcon;
}

export const DRAWER_ROUTES: DrawerRoute[] = [
  { name: "index", label: "Inicio", icon: Home },
  { name: "wallet", label: "Mi Wallet", icon: Wallet },
  { name: "pedidos", label: "Mis Pedidos", icon: ShoppingBag },
  { name: "perfil", label: "Mi Perfil", icon: User },
];