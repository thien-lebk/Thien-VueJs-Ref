export default [
  {
    name: 'DASHBOARD',
    icon: 'assessment',
    link: '',
    //link: '/dashboard',
    requires: ['user', 'staff'],
  },
  {
    name: 'ORDERS',
    icon: 'email',
    groups: [
      {
        name: 'ALL ORDERS',
        icon: 'drafts',
        link: '/orders',
        requires: ['user', 'staff'],
      },
      {
        name: 'MY INBOX',
        icon: 'assignment_ind',
        link: '/my-inbox',
        requires: ['user', 'staff'],
      },
    ],
    requires: ['user', 'staff'],
  },
  {
    name: 'HỢP ĐỒNG',
    icon: 'work',
    link: '/contracts',
    requires: ['user', 'staff'],
  },
  {
    name: 'RỚT GIÁ',
    icon: 'notifications',
    link: '/price-adjustment',
    requires: ['user', 'staff'],
  },
  {
    name: 'KHÁCH HÀNG',
    icon: 'person',
    link: '/customers',
    requires: ['user', 'staff'],
  },
  // {
  //   name: 'KẾ TOÁN & QUỸ',
  //   icon: 'account_balance',
  //   link: '/accountants',
  //   requires: ['user', 'staff'],
  // },
  // {
  //   name: 'CHAT ROOM',
  //   icon: 'forum',
  //   link: '/chat_room',
  // },
  {
    name: 'MARKETING',
    icon: 'phonelink',
    groups: [
      {
        name: 'CUSTOMER LIST',
        icon: '',
        link: '/marketing/customer-list',
        requires: ['staff'],
      },
      {
        name: 'CAMPAIGN',
        icon: '',
        link: '/marketing/campaign',
        requires: ['user', 'staff'],
      },
      {
        name: 'REPORTING',
        icon: '',
        link: '',
        requires: ['user', 'staff'],
      },
    ],
    requires: ['user', 'staff'],
  },
  // {
  //   name: 'DOCUMENTS',
  //   icon: 'description',
  //   link: '/documents',
  // },
  // {
  //   name: 'VALIDATOR',
  //   icon: 'image_search',
  //   link: '/validator',
  // },
  // {
  //   name: 'CALENDAR',
  //   icon: 'calendar_today',
  //   link: '/calendar',
  // },
  // {
  //   name: 'ADMIN',
  //   icon: 'settings',
  //   link: '/admin',
  // },
  
]
