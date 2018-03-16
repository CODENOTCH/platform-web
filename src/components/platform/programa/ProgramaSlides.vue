<template>
    <div class="programa-slides">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-sm-10 offset-sm-1">
                    <embed :src="setPathPdf" width="800" height="600" type="application/pdf">
                    <!--object :data="setPathPdf"></object-->
                </div>
            </div>
        </div>
    </div>         
</template>

<script>
    import Axios from 'axios';
    import { mapGetters } from 'vuex';

    export default {
        name:'programaSlides',
        
        data () {
            return {
            }
        },

        computed: {
            ...mapGetters({
                config: 'getConfigData'
            }),

            setPathPdf() {
                return process.env.NODE_ENV === 'production'
                    ? this.config.imgPathProduction.pdfPrueba
                    : this.config.imgPathDevelopment.pdfPrueba;
            },
        },

        /*beforeCreate() {
            const dataPath = 'https://raw.githubusercontent.com/CODENOTCH/bbdd_fake/master/contenidos_1.0.0.json';

            Axios.get(dataPath)
            .then(response => {
                this.dataContent = response.data.data;
                let tempArray = [];
                tempArray.push(this.dataContent);
                this.dataParsed = tempArray[0];
                //this.setDataParsed();
                console.log(this.dataParsed[0]);
            })
            .catch(error => {
                console.log(error);
            });
        },*/

        created(){
            window.scrollTo(0, 0);
        }
    }
</script>


