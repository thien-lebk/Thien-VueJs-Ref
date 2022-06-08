<template>
    <v-toolbar color="#ffffff" app fixed>
       <div class="search-field-menu">
         <v-text-field
            v-model="txtFilter"
            placeholder="Họ tên, CMND/HC, số điện thoại,..."
            outline
            round
            single-line
            filled
            prepend-inner-icon="search"
            v-on:keyup.enter="onSearch"
          ></v-text-field>
       </div>
      <v-spacer/>

      <v-toolbar-items>
        <branch-menu/>
        <dial-pad-menu/>
        <v-btn flat icon color="#ffffff">
          <v-icon color="#000000">chat_bubble</v-icon>
        </v-btn>
        <notification-menu/>
        <call-notification-menu/>
        <v-menu offset-y >
          <template v-slot:activator="{ on }">
            <v-btn flat v-on="on" color="#ffffff">
              <v-icon v-if="enabled" color="green">check_circle_outline</v-icon>
              <v-icon v-else color="red">cancel</v-icon>
              <font color="black">{{name}}</font>
              <v-avatar :style="{'padding-left': '10px'}">
                <img src="../../assets/camdo.png" alt="avatar">
              </v-avatar>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile>
              <v-list-tile-title><center>Status: <font color="green">Online</font></center></v-list-tile-title>
            </v-list-tile>

            <v-divider/>

            <v-layout justify-start class="layout-slider" @click.stop>
              <v-icon v-if="slider !== 0">volume_up</v-icon>
              <v-icon v-else>volume_off</v-icon>
              
              <v-slider
                class="slider"
                max="10"
                min="0"
                v-model="slider"
                height="1"
              ></v-slider>
            </v-layout>

            <v-list-tile
              v-for="(item) in avatarItems"
              :key="item.key"
              @click="avatarItemHandle(item.key)"
            >
              <v-list-tile-title><center>{{ item.title }}</center></v-list-tile-title>
              <v-divider/>
            </v-list-tile>
          </v-list>
        </v-menu>
        
      </v-toolbar-items>

    </v-toolbar>

</template>

<script>
import DialPadMenu from '@/components/NavBarComponents/DialPadMenu.vue';
import BranchMenu from '@/components/NavBarComponents/BranchMenu.vue';
import NotificationMenu from '@/components/NavBarComponents/NotificationMenu.vue';
import CallNotificationMenu from '@/components/NavBarComponents/CallNotificationMenu.vue';
import {mapGetters,mapActions} from 'vuex'

export default {
  name: "navbar",
  components: {
    DialPadMenu,
    BranchMenu,
    NotificationMenu,
    CallNotificationMenu,
  },
  data() {
    return {
      avatarItems: [
        { 
          key: 'settings',
          title: 'Account settings' 
        },
        { 
          key: 'feedback',
          title: 'Feedback' 
        },
        { 
          key: 'logout',
          title: 'Logout' 
        }
      ],
      txtFilter: "",
      schedule: null,
    }
  },
  mounted(){
    this.schedule = setInterval(this.getNewNotification, 1000)
  },
  computed: {
    ...mapGetters({
      name: 'auth/name',
      enabled: 'call/enabled',
      volume: 'call/volume',
    }),
    slider: {
      get() {return this.volume * 10},
      set(value) {this.setVolume({volume: value / 10})}
    },
  },
  methods: {
    ...mapActions({
      getNewNotification: 'notification/getNewNotification',
      setVolume: 'call/setVolume',
      getCustomerList: 'customer/getCustomerList',
    }),
    avatarItemHandle: function(key) {
      switch(key) {
        case 'logout':
          this.logout()
          break
        default:
          break
      }
    },
    logout: function() {
      this.$store.dispatch('auth/logout')
    },
    onSearch(){
      if (this.$router.currentRoute.name === 'customers') {
        this.getCustomerList({page: null, condition: this.txtFilter})
      } else {
        this.$router.push({name: 'customers', params: { textSearch: this.txtFilter}});
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.schedule)
  },
}
</script>

<style scoped>
.search-field-menu {
  height: 100%;
  display: contents;
}

.search-field-menu >>> .v-text-field:hover,
.search-field-menu >>> .v-input__slot:hover {
  box-shadow: 0px 3px 3px 0px #898585;
}

.search-field-menu >>> .v-text-field,
.search-field-menu >>> .v-input__slot {
  padding: 0 !important;
  margin: 0 !important;
  border-radius: 50px !important;
  width: 100%!important;
  min-height: 40px!important;
  background-color: #ffffff!important;
}

.search-field-menu >>> .v-text-field--box .v-input__slot, 
.search-field-menu >>> .v-text-field--outline .v-input__slot {
  border-width: 1px!important;
  border-color: #D0D6DC!important;
}

.search-field-menu >>> .v-text-field--box .v-input__slot:hover, 
.search-field-menu >>> .v-text-field--outline .v-input__slot:hover{
  border-color: #1C78D3!important;
}

.search-field-menu >>> .v-text-field__slot {
  height: 30px!important;
}

.search-field-menu >>> .v-input__prepend-inner {
  margin: 8px 8px 0px 2px!important;
}

.search-field-menu >>> .v-input {
  font-size: 15px !important;
}

.search-field-menu >>> .v-text-field__details {
  display: none;
}

.layout-slider {
  margin: 1px 6px;
}

.slider {
  margin-left: 10px;
  margin-right: 2px;
}
</style>