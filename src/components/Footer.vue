<template>
    <v-app light>
        <v-footer id="footer">
            <template>
                <v-breadcrumbs divider="/">
                <v-breadcrumbs-item
                    v-for="item in breadcrumbs"
                    :key="item.text"
                    :disabled="item.disabled">
                    {{ item.text }}
                </v-breadcrumbs-item>
                </v-breadcrumbs>
            </template>
        </v-footer>
    </v-app>   
</template>

<script>

    export default {
        name:'footer',
        data () {
            return {
                breadcrumbs: [
                    {text:'Prehome',disabled: false},
                    {text:'Home',disabled: false},
                    {text:'Temario',disabled: true}
                ]
            }
        }
    }
</script>

<style lang="stylus">
  @import '../stylus/main'
</style>

