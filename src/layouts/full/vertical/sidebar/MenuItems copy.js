import {
  //IconAward,
  IconBoxMultiple,
  IconPoint
} from '@tabler/icons';

import { BiSolidReport } from "react-icons/bi";
import { FaShoppingCart, FaUsers, FaUsersCog, } from "react-icons/fa";
import { FaBusinessTime, FaCartFlatbed, FaWarehouse } from "react-icons/fa6";
import { MdWarehouse } from "react-icons/md";

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconBoxMultiple,
    href: '/sample-page',

    chipColor: 'secondary',
  },
  {
    navlabel: true,
    subheader: 'Other',
  },


  {
    id: uniqueId(),
    title: 'User Access and Control',
    icon: FaUsers,
    href: '/menulevel/',
    children: [
      {
        id: uniqueId(),
        title: 'System Access',
        icon: IconPoint,
        href: '/sample-page',
      },
    ],
  },

  {
    id:uniqueId(),
    title:'Warehouse Management',
    icon:FaWarehouse,
    href:'/',
    children:[
      {
        id:uniqueId(),
        title:'Warehouse Details',
        icon:IconPoint,
        href:'/',
      },
    ],
  },

  {
    id:uniqueId(),
    title:'Employee Management',
    icon:FaUsersCog,
    href:'/',
    children:[
      {
        id:uniqueId(),
        title:'Employee Details',
        icon:IconPoint,
        href:'/',
      },
    ],
  },

  {
    id:uniqueId(),
    title:'Supplier Management',
    icon:FaCartFlatbed,
    href:'/',
    children:[
      {
        id:uniqueId(),
        title:'Supplier Details',
        icon:IconPoint,
        href:'/',
      },
    ],
  },

  {
    id:uniqueId(),
    title:'Stores Transaction',
    icon:FaShoppingCart,
    href:'/',
    children:[
      {
        id:uniqueId(),
        title:'GRN Details',
        icon:IconPoint,
        href:'/',
      },
      {
        id:uniqueId(),
        title:'MRQ Details',
        icon:IconPoint,
        href:'/',
      },
      {
        id:uniqueId(),
        title:'MRN Details',
        icon:IconPoint,
        href:'/',
      },
      {
        id:uniqueId(),
        title:'PRN Details',
        icon:IconPoint,
        href:'/',
      },
    ],
  },

  {
    id:uniqueId(),
    title:'Material Management',
    icon:MdWarehouse,
    href:'/',
    children:[
      {
        id:uniqueId(),
        title:'Material Catalogue',
        icon:IconPoint,
        href:'/',
      },
      {
        id:uniqueId(),
        title:'Stores Transactions',
        icon:IconPoint,
        href:'/',
      },
      {
        id:uniqueId(),
        title:'Stock Balance',
        icon:IconPoint,
        href:'/',
      },
      {
        id:uniqueId(),
        title:'Bin Card',
        icon:IconPoint,
        href:'/',
      },
    ],
  },

  {
    id:uniqueId(),
    title:'Report',
    icon:BiSolidReport,
    href:'/',
    children:[
      {
        id:uniqueId(),
        title:'Report level 1',
        icon:IconPoint,
        href:'/',
      },
    ],
  },

  {
    id:uniqueId(),
    title:'Period and Processing',
    icon:FaBusinessTime,
    href:'/',
    children:[
      {
        id:uniqueId(),
        title:'Level 1',
        icon:IconPoint,
        href:'/',
      },
    ],
  },
];

export default Menuitems;