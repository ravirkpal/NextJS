export interface User {
  id: number;
  name: {
    firstname: string;
    lastname: string;
  };
  email: string;
  username: string;
  address: {
    city: string;
  };
  phone: string;
}


export interface SidebarItem {
  title: string;
  routing: string;
  icon: JSX.Element; 
}