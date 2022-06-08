<template>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-bottom="44"
      :nudge-left="400"
      :min-width="460"
    >
        <template v-slot:activator="{ on }">
            <div class="button-hard-size">
              <v-btn fab dark small class="mx-2 btn-filter" v-on="on">
                <img src="../../assets/icon-filter-24.png">
              </v-btn>
            </div>
        </template>

        <v-card class="panel">
            <v-list class="pa-0">
                <v-list-tile>
                    <v-list-tile-title class="title">Nhân viên</v-list-tile-title>
                    <v-list-tile-action>
                        <v-text-field
                            v-model="agentInput"
                            hint="Ví dụ: David"
                            class="agent"
                        >
                        </v-text-field>
                    </v-list-tile-action>
                </v-list-tile>
                <v-list-tile>
                    <v-list-tile-title class="title">Ngày</v-list-tile-title>
                    <v-list-tile-action>
                        <v-layout row class="custom-date-picker">
                            <date-picker sm1 v-model="openingDateInput"/>
                            <v-flex sm1 />
                            <date-picker sm1 v-model="endingDateInput"/>
                        </v-layout>
                    </v-list-tile-action>
                </v-list-tile>
                <v-list-tile>
                    <v-list-tile-title class="title">Tài sản</v-list-tile-title>
                    <v-list-tile-action>
                        <v-select
                            v-model="assetTypeInput"
                            :items="assetTypeItems"
                            class="select"
                        >
                        </v-select>
                    </v-list-tile-action>
                </v-list-tile>
                <v-list-tile>
                    <v-list-tile-title class="title">Kho</v-list-tile-title>
                    <v-list-tile-action>
                        <v-select
                            :items="branchItems"
                            v-model="branchInput"
                            class="select"
                        >
                        </v-select>
                    </v-list-tile-action>
                </v-list-tile>
                <v-list-tile class="padding-status">
                    <v-list-tile-title class="title">Tình trạng HĐ</v-list-tile-title>
                    <v-list-tile-action>
                        <v-layout align-center justify-center row fill-height>
                            <v-btn round color="#43425D4D" small class="ma-1 button">Mới</v-btn>
                            <v-btn round color="#43425D4D" small class="ma-1 button">Tất toán</v-btn>
                            <v-btn round color="#43425D4D" small class="ma-1 button">Gia hạn</v-btn>
                        </v-layout>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
            <v-card-actions class="filter-card">
                <v-spacer></v-spacer>
                <v-btn
                    class="filterBtn"
                    color="#dd1e26"
                    round
                    small
                >
                    Lọc
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import DatePicker from "@/components/commonComponent/DatePicker.vue"

export default {
    name: "accountant-filter",
    components: {
        DatePicker,
    },
    data() {
        return {
            menu: false,
            agentInput: '',
            openingDateInput: '',
            endingDateInput: '',
            assetTypeInput: '',
            assetTypeItems: [],
            branchInput: '',
        }
    },
    mounted() {
        this.getSAssetList()
    },
    computed: {
        ...mapGetters({
            SAssetListResult: 'asset/SAssetListResult',
            branchListResult: 'branch/branchListResult',
        }),
        branchItems() {
            let array = []
            for (let branch of this.branchListResult) {
                array.push(branch.name)
            }
            return array
        },
    },
    watch: {
        //When finish call API get SAsset, Update assetTypeItems
        SAssetListResult() {
            const asset = []
            for (let item of this.SAssetListResult) {
                asset.push(item.description)
            }
            this.assetTypeItems = asset
        },
    },
    methods: {
        ...mapActions({
            getSAssetList: 'asset/getSAssetList',
        }),
    }
}
</script>

<style scoped>
.panel {
    padding: 14px 32px;
}

.button-hard-size .btn-filter{
  margin-right: 5px;
  font-size: 0.9vw !important;
  color: #DD1E26 !important;
  background-color: #ffffff !important;
}

.title {
    max-width: 130px;
    font-size: 18px !important;
    font-weight: normal;
}

.agent >>> .v-text-field__slot {
    width: 266px;
}

.padding-status {
    padding-top: 13px;
}

.custom-date-picker >>> .v-input__slot{
    max-width: 150px !important;
}

.select >>> .v-select__slot {
    width: 266px !important;
}

.button {
    min-width: 69px;
    font-size: 9px;
    color: #43425D;
}

.filter-card {
    padding-top: 20px;
    padding-right: 0px;
}

.filterBtn {
  color: #fff !important;
}
</style>