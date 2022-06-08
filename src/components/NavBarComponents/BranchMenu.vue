<template>
    <v-menu
        :nudge-width="200"
        nudge-left="200"
        offset-y
    >
        <template v-slot:activator="{ on }">
            <v-btn flat v-on="on" color="#ffffff"><font color="black">{{currentBranch}}</font>
                <v-icon color="#000000">arrow_drop_down</v-icon>
            </v-btn>
        </template>

        <v-card>
            <v-list>
                <v-list-tile-title><center style="font-size: 20px;">Choose branch</center></v-list-tile-title>
                <v-divider></v-divider>
                <v-list two-line class="branchList">
                    <template v-for="(branch, index) in branches"
                    >
                        <v-list-tile
                            :key="index"
                            @click="changeBranchHandle(index)"
                            class="content"
                        >
                        <v-list-tile-content :style="{'padding-left': '10px'}">
                            <v-list-tile-title>{{branch.name}}</v-list-tile-title>
                            <v-list-tile-sub-title>{{branch.address}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        </v-list-tile>
                        <v-divider :key="`divider-${index}`"/>
                    </template>
                </v-list>
                <v-divider></v-divider>
                <v-list-tile-title><center><font color="red">See all</font></center></v-list-tile-title>
            </v-list>
        </v-card>
    </v-menu>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "branch-menu",
    mounted() {
        this.getBranchList()
    },
    computed: {
        ...mapGetters({
            currentBranch: 'branch/currentBranch',
            branches: 'branch/branchListResult'
        }),
    },
    methods: {
        ...mapActions({
            changeBranch: 'branch/changeBranch',
            getBranchList: 'branch/getBranchList'
        }),
        changeBranchHandle: function(index) {
            let branch = this.branches[index]
            this.changeBranch({name:branch.name, id:branch.id})
        }
    }
}
</script>

<style scoped>
.branchList{
    background-color: #e5e5e5; 
    padding-top: 0px;
    padding-bottom: 0px;
    height: 250px;
    overflow-y: auto;
}
</style>
<style>
/* Bugs from libs */
.content .v-list__tile {
    padding: 0px 10px;
}
</style>
