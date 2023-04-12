<template>
<div v-if="currentUser" class="bg-white w-mine mx-auto rounded mt-3 p-3 ">
    <div class="align-self-center" style="font-size: 180%; text-align: center;">
        <p>Добавление темы</p>
    </div>
    
    <hr>
    <div class="align-self-center g-2" v-if="!submitted">
        <form class="justify-content-center mx-auto d-flex flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row" @submit="addTheme">
            <div class="d-flex flex-grow-1 p-2">
                <input type="text" name="name" class="form-control" style="font-size: 120%;" id="name" placeholder="Название темы" required v-model="theme.name">
            </div>
            <div class="d-flex p-2 align-self-center">
                <input type="submit" class="btn btn-outline-success" style="font-size: 120%; text-align: center;" value="Добавить">
            </div>
        </form>
    </div>
    <div class="row text-center" v-else>
        <div class="align-self-center" style="font-size: 140%; text-align: center;">
            <p>Вы успешно добавили запись!</p>
        </div>
        <div>
            <button v-on:click="newTheme" style="font-size: 120%;" class="btn btn-outline-success mb-2">Добавить новую тему</button>
        </div>
        <div>
            <router-link to="/listThemes" style="font-size: 120%;" class="btn btn-outline-primary mb-2">Вернуться к списку тем</router-link>
        </div>
    </div>   
</div>
<div v-else>
    {{$router.push('/home')}}
</div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "addTheme",
        data() {
            return {
                theme: {
                    name: ""
                },
                submitted: false
            };
        },
        computed: { // вычисляемые свойства
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        methods: {
            addTheme(e) {
                e.preventDefault(); 
                var data = {
                    name: this.theme.name
                };
                http
                    .post("/addTheme", data)
                    .then(response => { 
                        this.theme.id = response.data.id;
                    })
                    .catch(e => { 
                        console.log(e);
                    });

                this.submitted = true;
            },
            newTheme() {
                this.submitted = false;
                this.theme = {
                    name: ""
                };
            }
        }
    }
</script>