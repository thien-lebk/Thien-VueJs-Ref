<template>
  <v-menu offset-y :nudge-left="120" :nudge-bottom="14" :min-width="253">
    <template v-slot:activator="{ on }">
      <v-btn flat icon v-on="on" color="#ffffff" @click="getNotification">
        <v-icon color="#000000">notifications</v-icon>
      </v-btn>
      <v-badge v-show="count != null && count > 0" overlap color="#FFA500" :style="{'margin-top':'20px', 'margin-right':'10px'}">
        <template v-slot:badge>
          {{count}}
        </template>
      </v-badge>
    </template>
    
    <v-card>
      <v-list>
        <v-list-tile-title><center style="font-size: 20px;">Notifications</center></v-list-tile-title>
        <v-divider></v-divider>
        <v-card class="elevation-0" max-height="250px" style="overflow: auto">
          <v-list two-line class="notificationList">
            <template v-for="(notification, index) in normalNotificationResult">
              <v-list-tile
                class="notification"
                :key="index"
                @click="click(index)"
              >
                <v-list-tile-content :class="{active : notification.readable == false}" class="content">
                  <v-list-tile-title>Order #{{notification.orderId}}</v-list-tile-title>
                  <v-list-tile-sub-title>{{notification.message}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider class="no-margin" :key="`divider-${index}`"/>
            </template>
          </v-list>
        </v-card>
        <v-list-tile-title><center><font color="red">See all</font></center></v-list-tile-title>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "notification-menu",
  computed: {
    ...mapGetters({
      newNormalNotificationResult: 'notification/newNormalNotificationResult',
      normalNotificationResult: 'notification/normalNotificationResult',
    }),
    count() {
      return this.newNormalNotificationResult.length
    },
  },
  methods: {
    ...mapActions({
      getNotification: 'notification/getNotification',
      readNotification: 'notification/readNotification',
      getOrderDetailByIdAndOpenDialog: 'order/getOrderDetailByIdAndOpenDialog'
    }),
    click(index) {
      const orderId = this.normalNotificationResult[index].orderId
      this.getOrderDetailByIdAndOpenDialog({id: orderId})
      const NotificationID = this.normalNotificationResult[index].id
      this.readNotification({id: NotificationID})
    },
  },
}
</script>

<style scoped>
.notificationList {
    padding-top: 0px;
    padding-bottom: 0px;
}
.no-margin {
    margin-top: 0px;
    margin-bottom: 0px
}
.active {
    background-color: #e5e5e5; 
}
.content {
    padding: 0px 10px;
}
.notification >>> a {
  padding: 0px 0px;
  height: 100%;
}
</style>