import { DropItem } from "./Dropdown/DropItem";
export const navItems = [
  {
    id: 1,
    title: "News",
    path: "news",
    submenu: DropItem.news,
  },
  {
    id: 2,
    title: "Man",
    path: "man",
    submenu: DropItem.man,
  },

  {
    id: 3,
    title: "Woman",
    path: "woman",
    submenu: DropItem.women,
  },
  {
    id: 4,
    title: "Kids",
    path: "kids",
    submenu: DropItem.children,
  },
  {
    id: 5,
    title: "Collections",
    path: "collections",
    submenu: DropItem.collection,
  },
  {
    id: 6,
    title: "Sale",
    path: "sales",
    submenu: DropItem.sale,
  },
];
