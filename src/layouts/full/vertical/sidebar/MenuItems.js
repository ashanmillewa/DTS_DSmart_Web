import {
  IconAperture,
  IconPoint
} from '@tabler/icons';

import { uniqueId } from 'lodash';

import { BiSolidReport } from 'react-icons/bi';
import { FaGalacticRepublic, FaSalesforce, FaUsers, FaUsersCog } from 'react-icons/fa';
import { FaBusinessTime, FaCartFlatbed, FaWarehouse } from 'react-icons/fa6';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconAperture,
    href: '/',
    // chip: 'New',
    chipColor: 'secondary',
  },

  // new update
  {
    navlabel: true,
    subheader: 'Systems',
  },

  {
    id: uniqueId(),
    title: 'Warehouse and Inventory Management System',
    icon: FaWarehouse,
    href: '/systems/',
    children: [
      {
        id: uniqueId(),
        title: 'Material Management',
        icon: IconPoint,
        href: '/l1.1',
        children: [
          {
            id: uniqueId(),
            title: 'Material Catalogue',
            icon: IconPoint,
            href: '/systems/material/MaterialCatalogue',
          },
          {
            id: uniqueId(),
            title: 'Bin Card Details',
            icon: IconPoint,
            href: '/systems/material/BinCard',
          },
          {
            id: uniqueId(),
            title: 'Stock Balance Details',
            icon: IconPoint,
            href: '/systems/material/StockBalance',
          },
          {
            id: uniqueId(),
            title: 'Project Material Cost',
            icon: IconPoint,
            href: '/systems/material/MatCost',
          }
        ],
      },
      {
        id: uniqueId(),
        title: 'Stores Transaction',
        icon: IconPoint,
        href: '/systems/stores/',
        children: [
          {
            id: uniqueId(),
            title: 'GRN Details',
            icon: IconPoint,
            href: '/systems/stores/GRNDetails',
          },
          {
            id: uniqueId(),
            title: 'MRQ Details',
            icon: IconPoint,
            href: '/systems/stores/MRQDetails',
          },
          {
            id: uniqueId(),
            title: 'MRN Details',
            icon: IconPoint,
            href: '/systems/stores/MRNDetails',
          },
          {
            id: uniqueId(),
            title: 'PRN Details',
            icon: IconPoint,
            href: '/systems/stores/PRNDetails',
          },
          {
            id: uniqueId(),
            title: 'MTN Details',
            icon: IconPoint,
            href: '/systems/stores/MTNDetails',
          },
          {
            id: uniqueId(),
            title: 'Stores Transaction',
            icon: IconPoint,
            href: '/systems/stores/StoresTransaction',
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Warehouse Management',
        icon: IconPoint,
        href: '/systems/wareHouse/',
        children: [
          {
            id: uniqueId(),
            title: 'Warehouse Details',
            icon: IconPoint,
            // href: '/systems/wareHouse/WareHouse',
            href: '/systems/wareHouse/EcomProductList',
          },
        ],
      },
    ],
  },

  {
    id: uniqueId(),
    title: 'Procurement Management System',
    icon: FaCartFlatbed,
    href: '/systems/',
    children: [
      {
        id: uniqueId(),
        title: 'Supplier Management',
        icon: IconPoint,
        href: '/systems/supplier/',
        children: [
          {
            id: uniqueId(),
            title: 'Supplier Details',
            icon: IconPoint,
            href: '/systems/supplier/Supplier',
          },
        ],
      },
    ],
  },

  {
    id: uniqueId(),
    title: 'Manufacturing and Projects Management System',
    icon: FaBusinessTime,
    href: '/systems/',
    children: [
      {
        id: uniqueId(),
        title: 'Project Management',
        icon: IconPoint,
        href: '/systems/projectManagement/',
        children: [
          {
            id: uniqueId(),
            title: 'Project Details',
            icon: IconPoint,
            href: '/systems/projectManagement/ProjectDetails',
          },
        ],
      },
    ],
  },

  {
    id: uniqueId(),
    title: 'Human Resource Management System',
    icon: FaUsersCog,
    href: '/systems/employee/',
    children: [
      {
        id: uniqueId(),
        title: 'Employee Management',
        icon: IconPoint,
        href: '/systems/employee/',
        children: [
          {
            id: uniqueId(),
            title: 'Employee Details',
            icon: IconPoint,
            href: '/systems/employee/Employee',
          },
        ],
      },
    ],
  },

  {
    id: uniqueId(),
    title: 'Accounting and Financial Management System',
    icon: FaGalacticRepublic,
    href: '/systems/',
    children: [
      {
        id: uniqueId(),
        title: 'test page',
        icon: IconPoint,
        href: '',
      },
    ],
  },

  {
    id: uniqueId(),
    title: 'CRM Sales and Marketing',
    icon: FaSalesforce,
    href: '/systems/',
    // children: [
    //   {
    //     id: uniqueId(),
    //     title: 'Employee Management',
    //     icon: IconPoint,
    //     href: '/systems/employee/',
    //     children: [
    //       {
    //         id: uniqueId(),
    //         title: 'Employee Details',
    //         icon: IconPoint,
    //         href: '/systems/employee/Employee',
    //       },
    //     ],
    //   },
    // ],
  },

  {
    id: uniqueId(),
    title: 'Reporting',
    icon: BiSolidReport,
    href: '/systems/report/',
    children: [
      {
        id: uniqueId(),
        title: 'Reorder Level Reached Details',
        icon: IconPoint,
        href: '/systems/report/Report',
      },
    ],
  },

  // ===========================================================

  {
    id: uniqueId(),
    title: 'User Access and Control',
    icon: FaUsers,
    href: '/systems/userAccess/',
    children: [
      {
        id: uniqueId(),
        title: 'System Access',
        icon: IconPoint,
        href: '/systems/userAccess/UserAccess',
      },
    ],
  },

  {
    id: uniqueId(),
    title: 'Warehouse Management',
    icon: FaWarehouse,
    href: '/systems/wareHouse/',
    children: [
      {
        id: uniqueId(),
        title: 'Warehouse Details',
        icon: IconPoint,
        // href: '/systems/wareHouse/WareHouse',
        href: '/systems/wareHouse/EcomProductList',
      },
    ],
  },

  // {
  //   id: uniqueId(),
  //   title: 'Employee Management',
  //   icon: FaUsersCog,
  //   href: '/systems/employee/',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'Employee Details',
  //       icon: IconPoint,
  //       href: '/systems/employee/Employee',
  //     },
  //   ],
  // },

  // {
  //   id: uniqueId(),
  //   title: 'Supplier Management',
  //   icon: FaCartFlatbed,
  //   href: '/systems/supplier/',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'Supplier Details',
  //       icon: IconPoint,
  //       href: '/systems/supplier/Supplier',
  //     },
  //   ],
  // },

  // {
  //   id: uniqueId(),
  //   title: 'Stores Transaction',
  //   icon: FaShoppingCart,
  //   href: '/systems/stores/',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'GRN Details',
  //       icon: IconPoint,
  //       href: '/systems/stores/GRNDetails',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'MRQ Details',
  //       icon: IconPoint,
  //       href: '/systems/stores/MRQDetails',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'MRN Details',
  //       icon: IconPoint,
  //       href: '/systems/stores/MRNDetails',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'PRN Details',
  //       icon: IconPoint,
  //       href: '/systems/stores/PRNDetails',
  //     },
  //   ],
  // },

  // {
  //   id: uniqueId(),
  //   title: 'Material Management',
  //   icon: MdWarehouse,
  //   href: '/systems/material/',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'Material Catalogue',
  //       icon: IconPoint,
  //       href: '/systems/material/MaterialCatalogue',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Stores Transactions',
  //       icon: IconPoint,
  //       href: '/systems/material/StoresTransaction',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Stock Balance',
  //       icon: IconPoint,
  //       href: '/systems/material/StockBalance',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Bin Card',
  //       icon: IconPoint,
  //       href: '/systems/material/BinCard',
  //     },
  //   ],
  // },

  // {
  //   id: uniqueId(),
  //   title: 'Report',
  //   icon: BiSolidReport,
  //   href: '/systems/report/',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'Report',
  //       icon: IconPoint,
  //       href: '/systems/report/Report',
  //     },
  //   ],
  // },

  // {
  //   id: uniqueId(),
  //   title: 'Project Management',
  //   icon: FaBusinessTime,
  //   href: '/systems/projectManagement/',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'Project Details',
  //       icon: IconPoint,
  //       href: '/systems/projectManagement/ProjectDetails',
  //     },
  //   ],
  // },
];

export default Menuitems;
