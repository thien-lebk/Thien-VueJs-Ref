<template>
  <div class="contract-collateralInfo">
    <v-data-table
      :headers="headers"
      :items="collateralInfoListResult"
      :loading="collateralInfoListRequest"
      item-key="original"
      hide-actions
      class="elevation-1"
    >

      <template v-slot:items="props">
        <tr>
          <td class="text-xs-left content"><div id="box-description">{{ props.item.description }}</div></td>
          <td class="text-xs-center content ">{{ props.item.property_type }}</td>
          <td class="text-xs-center content">{{ props.item.storage_id }}</td>
          <td class="text-xs-center content">{{ props.item.storage_location }}</td>
          <td class="text-xs-center content">{{ props.item.liquidation_amount }}</td>
          <td class="text-xs-center content">{{ props.item.liquidation_status }}</td>
        </tr>
      </template>

      <template v-slot:no-data>
        <!-- Nothing -->
      </template>

     <!-- <template v-slot:expand="props">
          <call-table :expand="props.expanded" :orderID="props.item.orderID" />
      </template> -->

    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { isNullOrUndefined } from 'util';
export default {
  name: "contract-collatea-info-tab",
  components: {
  },
  props: {
    contractId: String,
  },
  data() {
    return {
      headers: [
        {
          text: "Mô tả", value: "description", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Loại tài sản", value: "property_type", align: 'center', sortable: false, class: "header wrap-text"
        },
        {
          text: "Mã lưu kho", value: "storage_id", align: 'center', sortable: false, class: "header wrap-text"
        },
        {
          text: "Kho", value: "storage_location", align: 'center', sortable: false, class: "header wrap-text"
        },
        {
          text: "Giá thanh lý", value: "liquidation_amount", align: 'center', sortable: false, class: "header  wrap-text"
        },
        {
          text: "Tình trạng thanh lý", value: "liquidation_status", align: 'center', sortable: false, class: "header  wrap-text"
        }
      ],
      collateralInfoListRequest: false,
    }
  },
  computed: {
    ...mapGetters({
      contractDetail: 'contract/contractDetail',
    }),
    collateralInfoListResult() {
      if (!isNullOrUndefined(this.contractDetail)) {
        return [
          {
            description: this.contractDetail.assetDescription,
            property_type: this.contractDetail.assetType,
            storage_id: this.contractDetail.storageId,
            storage_location: this.contractDetail.storageLocation,
            liquidation_amount: '',
            liquidation_status: ''
          }
        ]
      }
      return []
    }
  },
}
</script>

<style scoped>
.contract-collateralInfo {
  margin-top: 15px;
}

.header {
  text-transform: uppercase;
  font-weight: bold !important;
  font-size: 1vw !important;
  background-color: #ebecec;
}

#box-description{
  padding-left: 1vw !important;
}

.wrap-text {
  word-wrap: break-word;
  white-space: pre-line !important;
}
</style>
