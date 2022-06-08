import Vue from "vue"
import Router from "vue-router"
import store from "./store/store"

import HomePage from "./views/HomePage.vue"
import Login from "./views/Login.vue"
// import Dashboard from "./views/Dashboard.vue"
// import CallCampaignReportComponent from "./components/DashboardComponents/CallCampaignReportComponents/CallCampaignReportComponent.vue"
import Order from './components/OrderComponents/Order.vue'
import MyInbox from './components/OrderComponents/MyInboxComponents/MyInbox.vue'
import ContractComponent from './components/ContractComponents/ContractComponent.vue'
import Contract from './components/ContractComponents/Contract.vue'
import NewContract from './components/ContractComponents/NewContractComponent.vue'
import ContractDetail from './components/ContractComponents/ContractDetail.vue'
import ContractReprint from './components/ContractComponents/Reprint.vue'
import ContractExtension from './components/ContractComponents/ContractExtension.vue'
import ContractRepayment from './components/ContractComponents/ContractRepayment.vue'
import InterestPriceAdjustmentComponent from './components/PriceAdjustmentComponent/PriceAdjustmentManagement.vue'
import CustomerComponent from './components/CustomerComponent/customerComponent.vue'
import CustomerMangement from './components/CustomerComponent/CustomerMangement.vue'
import CustomerDetail from './components/CustomerComponent/CustomerDetail.vue'
import Marketing from './views/Marketing.vue'
import Campaign from './components/MarketingComponents/CampaignComponents/Campaign.vue'
import CallManagements from './components/MarketingComponents/CallManagementComponents/CallManagements.vue'
import CustomerList from './components/MarketingComponents/CustomerListComponents/CustomerList.vue'
import CustomerListDetail from './components/MarketingComponents/CustomerListComponents/CustomerListDetail.vue'
import Accountant from './components/AccountantComponents/Accountant.vue'

import { TokenService, ProfileService } from './services/storage.service'

import { isNullOrUndefined } from 'util'

Vue.use(Router);

const loginPage = {
  path: "/login",
  name: "login",
  component: Login,
  meta: {
    guest: true
  }
}

const orderPage = {
  path: "orders",
  name: "orders",
  component: Order,
  meta: {
    requiresAuth: true
  }
}

const myInboxPage = {
  path: "my-inbox",
  name: "my-inbox",
  component: MyInbox,
  meta: {
    requiresAuth: true
  }
}

const defaultContractPage = {
  path: "",
  name: "contract",
  component: Contract,
  meta: {
    requiresAuth: true
  }
}

const newContractPage = {
  path: "new-contract",
  name: "new-contract",
  component: NewContract,
  meta: {
    requiresAuth: true
  }
}

const defaultContractDetailPage = {
  path: ":id/contract-detail",
  name: "contract-detail",
  component: ContractDetail,
  meta: {
    requiresAuth: true
  }
}

const extensionContractPage = {
  path: ":id/extension-contract",
  name: "extension-contract",
  component: ContractExtension,
  meta: {
    requiresAuth: true
  }
}

const contractRepaymentPage = {
  path: ":id/contract-repayment",
  name: "contract-repayment",
  component: ContractRepayment,
  meta: {
    requiresAuth: true
  }
}

const contractReprintPage = {
  path: ":id/contract-reprint",
  name: "contract-reprint",
  component: ContractReprint,
  meta: {
    requiresAuth: true
  }
}

const contractPage = {
  path: "/contracts",
  component: ContractComponent,
  meta: {
    requiresAuth: true
  },
  children: [
    defaultContractPage,
    newContractPage,
    defaultContractDetailPage,
    extensionContractPage,
    contractRepaymentPage,
    contractReprintPage,
  ],
}

const interestPriceAdjustmentPage = {
  path: "/price-adjustment",
  name: "price-adjustment",
  component: InterestPriceAdjustmentComponent,
  meta: {
    requiresAuth: true
  },
  children: [
  ],
}

const campaignPage = {
  path: "campaign",
  name: "campaign",
  component: Campaign,
  meta: {
    requiresAuth: true
  },
}

const callManagementPage = {
  path: ":id/call-management",
  name: "call-management",
  component: CallManagements,
  meta: {
    requiresAuth: true
  }
}

const customerListPage = {
  path: "customer-list",
  name: "customer-list",
  component: CustomerList,
  meta: {
    requiresAuth: true,
    requiresStaff: true,
  }
}

const customerListDetailPage = {
  path: "customer-list/:id",
  name: "customer-list-detail",
  component: CustomerListDetail,
  meta: {
    requiresAuth: true,
    requiresStaff: true,
  }
}

const marketingPage = {
  path: "/marketing",
  component: Marketing,
  meta: {
    requiresAuth: true
  },
  children: [
    campaignPage,
    callManagementPage,
    customerListPage,
    customerListDetailPage,
  ],
}

// const CallCampaignReportPage = {
//   path: "call-campaign",
//   name: "call-campaign-report",
//   component: CallCampaignReportComponent,
//   meta: {
//     requiresAuth: true,
//   }
// }

// const dashboardPage = {
//   path: "/dashboard",
//   component: Dashboard,
//   meta: {
//     requiresAuth: true
//   },
//   children: [
//     CallCampaignReportPage,
//   ],
// }

const accountantPage = {
  path: "/accountants",
  name: "accountants",
  component: Accountant,
  meta: {
    requiresAuth: true
  },
  children: [
  ],
}

const defaultCusomterPage = {
  path: "",
  name: "customers",
  component: CustomerMangement,
  meta: {
    requiresAuth: true
  }
}

const customerDetailPage = {
  path: ":id/customer-detail",
  name: "customer-detail",
  component: CustomerDetail,
  meta: {
    requiresAuth: true
  }
}

const customerPage = {
  path: "customers",
  component: CustomerComponent,
  meta: {
    requiresAuth: true
  },
  children: [
    defaultCusomterPage,
    customerDetailPage
  ],
}

const homePage = {
  path: "/",
  name: "homepage",
  component: HomePage,
  meta: {
    requiresAuth: true
  },
  children: [
    // dashboardPage,
    orderPage,
    myInboxPage,
    contractPage,
    interestPriceAdjustmentPage,
    customerPage,
    marketingPage,
    accountantPage,
  ],
}

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    homePage,
    loginPage,
  ]
});

router.beforeEach((to, from, next) => {
  //Components require auth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    
    // Should get profile in this time, because after login profile updated
    const profile = ProfileService.getProfile()
    const token = TokenService.getToken()

    if (isNullOrUndefined(token) | isNullOrUndefined(profile)) {
      //Token expired, remove all value

      store.dispatch('auth/logout')
      //Come back Login Component 
      next({
        name: 'login',
        params: { nextUrl: '/orders' }
      })
    } else if (to.name == 'homepage') {
      //From HomePage to Order
      next({name: 'orders'})
    } else if (to.meta.requiresStaff) {
      //Staff is true then continue
      if (ProfileService.getIsStaff()) {
        next()
      } else {
        //Back homepage
        next({name: 'homepage'})
      }
    } else {
      //Continue
      next()
    }
  //Component for Guest, Example Login Component
  } else if (to.matched.some(record => record.meta.guest)) {
    //Nothing Token, Continue
    if (TokenService.getToken() == null) {
      next()
    }
    //Having Token, Don't come back Login Component
    next()
  //Anything else
  } else {
    next()
  }

});

export default router;