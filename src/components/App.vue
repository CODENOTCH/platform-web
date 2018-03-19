<template>
    <main id="app-container">
        <transition name="contentTransition" appear>
            <router-view></router-view>
        </transition>
    </main>
</template>

<script>
    export default {
        name:'app'
    }
</script>

