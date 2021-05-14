<template>
    <v-app>
        <v-main>
            <transition name='fade'>
                <router-view/>
            </transition>
        </v-main>
    </v-app>
</template>

<script>

export default {
    name: 'App',

    components: {
        // 
    },

    data: () => ({
        //
    }),
};
</script>
