// SidebarOptions.tsx

import { RiDashboardLine, RiCustomerServiceLine, RiProductHuntLine, RiShoppingCartLine, RiContactsLine } from 'react-icons/ri';
import { SidebarItem } from '../Interface/page'; 


const sidebarOptions: SidebarItem[] = [
  {
    title: 'Dashboard',
    routing: '/dashboard',
    icon: <RiDashboardLine />,
  },
  {
    title: 'Customer',
    routing: '/customer',
    icon: <RiCustomerServiceLine />,
  },
  {
    title: 'Products',
    routing: '/products',
    icon: <RiProductHuntLine />,
  },
  {
    title: 'Cart',
    routing: '/cart',
    icon: <RiShoppingCartLine />,
  },
  {
    title: 'Contacts Us',
    routing: '/contacts',
    icon: <RiContactsLine />,
  },
];

export default sidebarOptions;
