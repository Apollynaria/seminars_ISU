<template>

<div class="bg-white w-mine mx-auto rounded mt-3 p-3 ">
    <div class="row g-custom">
        <div class="mx-auto d-flex flex-column flex-sm-column flex-md-column flex-lg-row flex-xl-row justify-content-md-end mb-2">
            <div class="align-self-center d-flex" style="font-size: 180%; text-align: center;">
                <p class="p-0 m-0">&nbsp;Список тем</p>
            </div>

            <div v-if="currentUser" class="align-self-center d-flex p-2 ">
                <router-link class="btn btn-outline-success" style="text-align: center; font-size: 110%;" to="/addTheme">Добавить тему</router-link>
            </div>

            <div class="d-flex flex-grow-1"></div>

            <form @submit="searchThemesByName" class="d-flex float-right align-self-center" >
                <div class="align-self-center">
                    <input style="font-size: 110%;" type="search" @input="debouncedSearch" aria-label="Search" class="form-control" name="name" id=""  placeholder="Поиск" v-model="name">
                </div>
                <div class="align-self-center rounded " id="btn_no_rounded">
                    &nbsp;<svg xmlns="http://www.w3.org/2000/svg" style="" class="" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    &nbsp;
                </div>          
            </form>
        </div>

        <div class="" style="font-size: 120%;">
            <ul class="list-group">
                <li class="list-group-item" v-for="(theme, index) in themes" :key="index">
                    <router-link class="link" :to="{
                            name: 'theme-details',
                            params: { id: theme.id }
                        }">
                        {{theme.name}}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</div>

    
</template>

<script>
    import http from "../../http-common";
    import debounce from 'lodash/debounce';  
    export default {
        name: "ListThemes", 
        data() { 
            return {
                name:"",
                themes: []
            };
        },
        computed: { // вычисляемые свойства
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        methods: {
            debouncedSearch: debounce(function (e) {
                this.searchThemesByName(e);
            }, 300),
            searchThemesByName(e){
                e.preventDefault();
                if (this.name){ 
                    http
                        .get("/theme/name/" + this.name)
                        .then(response => {
                            console.log(response.data);
                            this.themes = response.data;
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
                else{
                    this.getThemes();
                }
            }, 
            getThemes() {
                http
                    .get("/themes")
                    .then(response => {
                        this.themes = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() {
            this.getThemes();
        }
    }
</script>

<style>
    .item {
        margin-left: 5px;
    }
</style>