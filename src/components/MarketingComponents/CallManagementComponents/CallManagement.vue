<template>
  <v-layout row>
    <v-flex md8 xs12>
      <h2>Call Management</h2>
      <v-layout justify-start>
        <p class="list-inline-item">Tổng sách: <font color="red">{{total}}</font></p>
        <p class="list-inline-item">Thành công: <font color="red">{{success}}</font></p>
      </v-layout>
    </v-flex>
    <v-flex md5 xs12>
      <v-layout align-center justify-end row>
        <call-filter/>
        <div class="has-search">
          <span class="fa fa-search form-control-feedback"></span>
          <input
            style="width: 200px" 
            type="text" 
            class="form-control"
            placeholder="Tên, SĐT"
            v-model="searchInput"
            @keyup.enter="submit"
          />
        </div>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import CallFilter from  "@/components/MarketingComponents/CallManagementComponents/CallFilter.vue"
import { EventBus } from '../utils/event-bus'

export default {
  name: 'call-management',
  components: {
    CallFilter,
  },
  data() {
    return {
      searchInput: '',
    }
  },
  mounted() {
    EventBus.$on('reset-search-call', () => {
      this.searchInput = ''
    })
  },
  computed: {
    ...mapGetters({
      campaignOrderListResult: 'order/campaignOrderListResult',
      campaignOrderCampaignCountResult: 'order/campaignOrderCampaignCountResult',
    }),
    total() {
      try {
        return this.campaignOrderCampaignCountResult.total
      } catch (error) {
        return 0
      }
    },
    success() {
      try {
        return this.campaignOrderCampaignCountResult.contact
      } catch (error) {
        return 0
      }
    },
  },
  methods: {
    submit() {
      if (this.searchInput.trim() !== '') {
        if (/^\d+$/.test(this.searchInput)) {
          EventBus.$emit('search-call', {orderStaff:this.searchInput})
        } else {
          EventBus.$emit('search-call', {clientName:this.searchInput})
        }
      } else {
        EventBus.$emit('search-call', {})
      }
    }
  },
}
</script>

<style scoped>
.list-inline-item {
  font-size: 16px;
  padding-right: 10px;
}

.has-search .form-control {
  padding-left: 2.375rem;
  padding-right: 0px;
  width: 300px;
}

.has-search .form-control-feedback {
  position: absolute ;
  z-index: 1;
  display: block;
  width: 2.375rem;
  height: 2.375rem;
  line-height: 2.8rem;
  text-align: center;
  pointer-events: none;
  color: #aaa;
  padding: 1px;
}

.form-control:hover {
  box-shadow: 0px 4px 5px 0px #898585;
}

.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + .75rem + 2px);
  padding: 1.375rem 1.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 2.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 2em;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12);
}
</style>