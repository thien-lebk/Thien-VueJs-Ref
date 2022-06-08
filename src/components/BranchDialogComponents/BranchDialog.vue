<template>
    <v-dialog v-model="dialog" persistent max-width="290" transition="">
        <template v-slot:activator="{ on }">
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Chọn chi nhánh</span>
          </v-card-title>
          <v-card-text>
            <v-select
              :items="this.branchItems"
              v-model="name"
              label="Tên*"
              required
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" :disabled="disable" flat @click="changeBranchHandle()">Save</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "branch-dialog",
    data() {
        return {
            name: ''
        }
    },
    mounted() {
        this.getBranchList()
    },
    computed: {
        ...mapGetters({
            branchListResult: 'branch/branchListResult',
            currentBranch: 'branch/currentBranch'
        }),
        branchItems() {
            let array = []
            for (let branch of this.branchListResult) {
                array.push(branch.name)
            }
            return array
        },
        dialog() {
            if (this.currentBranch == null) {
                return true
            }
            return false
        },
        disable() {
            return this.name == '' ? true : false
        }
    },
    methods: {
        ...mapActions({
            changeBranch: 'branch/changeBranch',
            getBranchList: 'branch/getBranchList',
            removeBranch: 'branch/removeBranch'
        }),
        changeBranchHandle: function() {
        for (let branch of this.branchListResult) {
            if (branch.name == this.name) {
            this.changeBranch({name:branch.name, id:branch.id})
            }
        }
        }
    },
    beforeDestroy(){
        //Remove Current Branch in store (When User Logout)
        this.removeBranch()
    }
}
</script>