<template>
    <v-btn flat icon color="#ffffff" @click="this.openDialPad">
        <v-icon color="#000000">dialpad</v-icon>
    </v-btn>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "dial-pad-menu",
    methods: {
        ...mapActions({
            openDialPad: 'call/openDialPad'
        })
    },
}
</script>

<style scoped>

</style>