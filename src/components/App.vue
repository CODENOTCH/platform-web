<template>
    <main id="app-container">
      <Login></Login>
    </main>
</template>

<script>
    import Login from './Login.vue';
    import Footer from './Footer.vue';

    export default {
        name:'app',

        components: {
            Login: Login,
            Footer: Footer
        },

        data () {
            return {

            }
        }
    }
</script>

<style lang="scss">
    @import "../scss/styles";
</style>

