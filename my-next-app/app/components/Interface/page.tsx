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


export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

