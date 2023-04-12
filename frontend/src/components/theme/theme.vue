<template>

<div class="bg-white w-mine mx-auto rounded mt-3 p-3 ">
    <div v-if="this.theme">
        <div class="align-self-center" style="font-size: 180%; text-align: center;">
            <p>Тема: {{theme.name}}</p>
        </div>
        <div class="align-self-center row g-2" v-if="!submitted">
            <form v-if="currentUser" class="justify-content-center mx-auto d-flex flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row" @submit="updateTheme">
                <div class="d-flex flex-grow-1 p-2">
                    <input type="text" name="name" class="form-control" style="font-size: 120%;" id="name" placeholder="Название темы" required v-model="theme.name">
                </div>
                <div class="d-flex p-2 align-self-center">
                    <input type="submit" class="btn btn-outline-success" style="font-size: 120%; text-align: center;" value="Обновить">
                </div>
                <div class="d-flex p-2 align-self-center">
                    <button class="col-auto btn btn-outline-danger" style="font-size: 120%;" v-on:click="deleteTheme()">Удалить</button>
                </div>
            </form>
        </div>
        <div v-else>
            <div class="align-self-center" style="font-size: 140%; text-align: center;">
                <p>Вы успешно обновили запись!</p>
            </div>
        </div>

        <div class="" style="font-size: 120%;">
            <p>&nbsp;Cписок докладов по теме:</p>
            <ul class="list-group">
                <li class="list-group-item" v-for="(present,index) in presentationsForThemes" :key="index">
                    <router-link class="link" :to="{
                        name: 'presentation-details',
                        params: { id: present.presentation.id }
                    }">
                        {{present.presentation.name}}
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="text-center mt-3">
                <router-link to="/listThemes" style="font-size: 120%;" class="btn btn-outline-primary">Вернуться к списку тем</router-link>
        </div>
        

    </div>
</div>

</template>

<script>
    import http from "../../http-common";
    export default {
        name: "theme-details",
        props: ['id'],
        data() {
            return {
                theme: null,
                submitted: false,
                presentationsForThemes:[]
            };
        },
        computed: { // вычисляемые свойства
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        methods: {
            getTheme() {
                http
                    .get("/theme/" + this.id)
                    .then(response => {
                        this.theme = response.data;
                        console.log(this.theme);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getPresentationForTheme(){
                http
                .get("/PresentationsForTheme/themeId="+this.id)
                .then(response => {
                        this.presentationsForThemes = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            updateTheme(e) {
                e.preventDefault(); 
                var data = {
                    name: this.theme.name,
                };
                http
                    .post("/updateTheme/" + this.theme.id, data)
                    .then(() => {
                        this.$router.go();
                    })
                    .catch(e => {
                        console.log(e);
                    });
                this.submitted = true;
            },
            deleteTheme() {
                http
                    .post("/deleteTheme/" + this.theme.id)
                    .then(() => {
                        this.$router.push('/listThemes');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() { 
            this.getTheme();
            this.getPresentationForTheme();
        }
    }
</script>