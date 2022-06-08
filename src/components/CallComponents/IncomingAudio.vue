<template>
    <audio ref="player" muted="muted">
        <source src="../../assets/audio/iphone.mp3" type="audio/mpeg">
    </audio>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import moment from 'moment'

export default {
    name: "incoming-box",
    computed: {
        ...mapGetters({
            ring: 'call/ring',
            requestType: 'call/requestType',
            volume: 'call/volume',
        }),
    },
    watch: {
        ring() {
            if (this.ring === true && this.requestType === "incoming") {

                //Play music
                const playPromise = this.$refs.player.play()
                if (playPromise !== undefined) {
                    playPromise.then(function() {
                        // Automatic playback started!
                    }).catch(function(error) {
                        // Automatic playback failed.
                        // Show a UI element to let the user manually start playback.
                    })
                }
            
            //Case client terminated
            } else {
                this.$refs.player.load()
            }
        },
        volume() {
            this.$refs.player.volume = this.volume
        },
    }
}
</script>

<style>
/* Css only VueSnotify */
.acceptButton {
    background-color: green !important
}
.denyButton {
    background-color: #dd1e26 !important
}
</style>
