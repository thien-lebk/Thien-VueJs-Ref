<template>
    <v-layout align-center row>
        <v-btn
            fab dark small icon class="ma-0" 
            color="rgba(255, 147, 79, 0.17)"
        >
            <v-icon color="rgba(255, 147, 79, 1)">edit</v-icon>
        </v-btn>
        <v-btn
            fab dark small icon class="ma-0" 
            color="rgba(234, 82, 111, 0.17)"
        >
            <v-icon color="rgba(234, 82, 111, 1)">clear</v-icon>
        </v-btn>
    </v-layout>
</template>

<script>
export default {
    name: 'call-action-button'
}
</script>

<style scoped>

</style>