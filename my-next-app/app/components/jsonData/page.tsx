import {
  RiDashboardLine,
  RiCustomerServiceLine,
  RiProductHuntLine,
  RiShoppingCartLine,
  RiContactsLine,
} from "react-icons/ri";
import { SidebarItem } from "../Interface/page";
import { ImProfile } from "react-icons/im";

const sidebarOptions: SidebarItem[] = [
  {
    title: "Dashboard",
    routing: "/dashboard",
    icon: <RiDashboardLine />,
  },
  {
    title: "Profile",
    routing: "/profile",
    icon: <ImProfile />,
  },
  {
    title: "Customer",
    routing: "/customer",
    icon: <RiCustomerServiceLine />,
  },
  {
    title: "Products",
    routing: "/products",
    icon: <RiProductHuntLine />,
  },
  {
    title: "Cart",
    routing: "/cart",
    icon: <RiShoppingCartLine />,
  },
  {
    title: "Contacts Us",
    routing: "/contacts",
    icon: <RiContactsLine />,
  },
];

export default sidebarOptions;
