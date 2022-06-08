<template>
  <notifications id="new-notification" group="new-notification" position="bottom right" animation-type="velocity" width="200px">
    <template slot="body" slot-scope="props">
      <div @click="NewNotificationHandle(props.item.title, props.item.text.type, props.item.text.message, props.item.text.id, props.close)">
        <div
          :class="['vue-notification-template', 'vue-notification', props.item.type]"
        >
          <div class="notification-title">
            <template v-if="props.item.title">Order #{{props.item.title}}</template>
            <p id="off" @click.stop="closeHandle(props.item.text.id, props.close)">
              x
            </p>
          </div>
          <div
            class="notification-content"
            v-html="props.item.text.message"
          >
          </div>
        </div>
      </div>
    </template>
  </notifications>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "new-notification",
  methods: {
  ...mapActions({
    getOrderDetailByIdAndOpenDialog: 'order/getOrderDetailByIdAndOpenDialog',
    readNotification: 'notification/readNotification',
    call: 'call/call',
  }),
  NewNotificationHandle(orderId, type, message, NotificationId, close) {
    if (type !== 'misscall') {
      this.getOrderDetailByIdAndOpenDialog({id: orderId})
    } else {
      const phone = message.match(/\d+/)[0]
      this.call({phone: phone, name: null, orderId: null})
    }
    this.readNotification({id: NotificationId})
    close()
  },
  closeHandle(NotificationId, close) {
    this.readNotification({id: NotificationId})
    close()
  },
}
}
</script>

<style scoped>
#off {
  float: right;
  cursor: pointer;
  font-size: 15px;
}
</style>
