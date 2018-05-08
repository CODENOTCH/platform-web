<template>
    <div class="programa-slides">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-sm-10 offset-sm-1">
                    <embed v-for='(item,i) of currentData' :key="i"
                            :src="item"
                            width="800" height="600" type="application/pdf">
                </div>
            </div>
        </div>
    </div>         
</template>

<script>
    export default {
        name:'programaSlides',

        props: ["currentData"],

        created(){
            window.scrollTo(0, 0);
        },

        beforeUpdate(){
            window.scrollTo(0, 0);
        }
    }
</script>


