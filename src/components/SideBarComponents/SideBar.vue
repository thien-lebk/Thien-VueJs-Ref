<template>
    <v-navigation-drawer 
      class="side-bar"
      hide-overlay
      :width="190"
      stateless
      app
      permanent
    >
      <v-layout justify-space-between column fill-height>
        <v-list class="pt-0">
          <v-list-tile class="item">
            <img src="../../assets/camdo.png">

            <span class="font-white">camdo<strong>nhanh</strong></span>

          </v-list-tile>
          <template v-for="sidebarLink in sidebarLinks">
            <!-- Group with subitems -->
            <v-list-group 
              v-if="sidebarLink.groups && sidebarLink.requires.includes(user)"
              :key="sidebarLink.name"  
              no-action="no-action"
              class="group item"
            >
              <v-list-tile slot="activator" ripple="ripple">
                <v-list-tile-action>
                  <v-icon dark class="icon">{{sidebarLink.icon}}</v-icon>
                </v-list-tile-action>

                <v-list-tile-title class="content">{{ sidebarLink.name }}</v-list-tile-title>
                
              </v-list-tile>

              <!-- link sub Group -->
              <template
                v-for="subItem in sidebarLink.groups"
              >
                <v-list-tile 
                  :key="subItem.name"
                  :to="subItem.link"
                  class="listitem"
                  active-class="highlight"
                  v-if="subItem.requires.includes(user)"
                >
                  <v-icon dark class="icon">{{subItem.icon}}</v-icon>    
                  <v-list-tile-title class="content-sub">{{ subItem.name }}</v-list-tile-title>
                </v-list-tile>
              </template>
            </v-list-group>

            <v-list-tile
              v-else-if="sidebarLink.requires.includes(user)"
              :key="sidebarLink.name"
              :to="sidebarLink.link"
              active-class="highlight"
              class="item"
            >
              <v-list-tile-action>
                <v-icon dark class="icon">{{sidebarLink.icon}}</v-icon>
              </v-list-tile-action>

              <v-list-tile-title class="content">{{ sidebarLink.name }}</v-list-tile-title>
            </v-list-tile>
          </template>
        </v-list>
         
        <v-footer class="pa-3" color="#dd1e26" height="auto">
          <v-flex
            text-xs-center
            white--text
            xs12
          >
            Copyright by <br>Icado Co.,Ltd
          </v-flex>
        </v-footer>
    </v-layout>
    </v-navigation-drawer>
</template>

<script>
import sidebarLinks from '@/config/sidebarLinks'
import { ProfileService } from '../../services/storage.service'

export default {
  name: "SideBar",
  data() {
    return {
      drawer: true,
      sidebarLinks: sidebarLinks,
      user: ProfileService.getIsStaff() ? 'staff' : 'user',
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  padding-bottom: 15px;
}

.font-white {
  color: #fff;
  font-size: 20px;
  padding-left: 5px;
}

.chevron-left {
  margin-left: 1px;
}

.side-bar {
  background-color: #dd1e26 !important;
}

.content {
  font-size: 13px;
  color: #fff;
}
.content-sub {
  font-size: 12px;
  padding-left: 20px;
  color: #fff;
}
#footer {
  font-size: 13px;
  color: #fff;
  text-align: center;
}
.icon {
  padding-left: 4px
}
.item {
  margin-bottom: 20px;
}

/* Set white color for expand icon*/
.group >>> .theme--light.v-icon {
  color: white !important;
}

/* Custom expend icon css */
>>>.v-list__group__header__append-icon {
  padding: 0 7px !important;
}

.listitem >>> .v-list__tile {
  padding-left: 20px
}

>>>.highlight {
  background-color: #c11313 !important;
  color: white;
}

>>>.v-list__tile {
  padding: 25px 0px 25px;
}
</style>