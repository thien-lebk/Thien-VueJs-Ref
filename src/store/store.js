import Vue from "vue";
import Vuex from "vuex";

import { moduleBranch } from '../components/NavBarComponents/store/branch/index';
import { moduleNotification} from '../components/NavBarComponents/store/notification/index'
import { moduleOrder } from '../components/OrderComponents/store/order/index';
import { moduleAuth } from '../components/LoginComponents/store/auth/index';
import { moduleAsset } from '../components/OrderComponents/store/asset/index'
import { moduleCall } from '../components/CallComponents/store/call/index'
import { moduleContract } from '../components/ContractComponents/store/contract/index'
import { moduleProduct } from '../components/ContractComponents/store/product/index'
import { moduleCustomer } from '../components/CustomerComponent/store/customer/index'
import { moduleClient } from '../components/ClientComponents/store/client/index'
import { modulePriceAdjustment } from '../components/PriceAdjustmentComponent/store/priceAdjustment'
import { modulePromotion } from '../components/MarketingComponents/CampaignComponents/Promotion/store/promotion'
import { moduleCustomerList } from '../components/MarketingComponents/CustomerListComponents/store/customer-list'
import { moduleCampaign } from '../components/MarketingComponents/CampaignComponents/store/campaign'

Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    branch: moduleBranch,
    auth: moduleAuth,
    order: moduleOrder,
    contract: moduleContract,
    asset: moduleAsset,
    customer: moduleCustomer,
    notification: moduleNotification,
    call: moduleCall,
    product: moduleProduct,
    client: moduleClient,
    priceAdjustment: modulePriceAdjustment,
    promotion: modulePromotion,
    customerList: moduleCustomerList,
    campaign: moduleCampaign,
  },
  actions: {
    reset({commit}) {
      commit('branch/reset')
      commit('auth/reset')
      commit('order/reset')
      commit('contract/reset')
      commit('asset/reset')
      commit('customer/reset')
      commit('notification/reset')
      commit('call/reset')
      commit('product/reset')
      commit('client/reset')
      commit('priceAdjustment/reset')
      commit('promotion/reset')
      commit('customerList/reset'),
      commit('campaign/reset')
    }
  }
});