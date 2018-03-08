<template>
    <div class="programa-cabecera">
         <ul>
            <li v-for='(item,i) of listItemsCabecera' v-bind:key="i">
                <a href="#" :class={active:item.active} @click=changeSectionHandler(i)>{{ item.name }}</a>
            </li>
        </ul>
    </div>
</template>

<script>

    export default {
        name: 'programaCabecera',

        data () {
            return {
                listItemsCabecera:[
                    {name:"menu", active:false},
                    {name:"contenidos", active:true},
                    {name:"slides", active:false},
                    {name:"desarrollos", active:false}
                ]
            }
        },

        methods: {
            changeSectionHandler(i){
                let listItemsCabeceraTemp = [...this.listItemsCabecera];

                for(let item of listItemsCabeceraTemp){
                    item.active = false;
                }

                let itemCabeceraTemp = {...listItemsCabeceraTemp[i]};
                itemCabeceraTemp.active = true;

                listItemsCabeceraTemp[i] = itemCabeceraTemp;

                this.listItemsCabecera = listItemsCabeceraTemp;
            }
        }
    }
</script>