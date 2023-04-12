<template>

<div v-if="currentUser" class="bg-white w-mine mx-auto rounded mt-3 p-3 ">
    <div v-if="this.user">
        <div class="align-self-center" style="font-size: 180%; text-align: center;">
            <p>Пользователь: {{user.login}}</p>
        </div>

        <hr>
        
        <div class="align-self-center g-2" v-if="!submitted">
            <form class="justify-content-center mx-auto d-flex flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row" @submit="addUser">
                <div class="d-flex flex-grow-1 p-2">
                    <input type="text" name="password" class="form-control" style="font-size: 120%;" id="password" placeholder="Новый пароль" required>
                </div>
                <div class="d-flex p-2 align-self-center">
                    <input type="submit" class="btn btn-outline-success" style="font-size: 120%; text-align: center;" value="Обновить">
                </div>
                <div class="d-flex p-2 align-self-center">
                    <button class="col-auto btn btn-outline-danger" style="font-size: 120%;" v-on:click="deleteUser()">Удалить</button>
                </div>
            </form>
        </div>
        <div v-else>
            <div class="align-self-center" style="font-size: 140%; text-align: center;">
                <p>Вы успешно обновили запись!</p>
            </div>
            <div class="text-center">
                <router-link to="/listUsers" style="font-size: 120%;" class="btn btn-primary mb-2">Вернуться к списку пользователей</router-link>
            </div>
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
        name: "user-details",
        props: ['id'],
        data() {
            return {
                user: null,
                submitted: false
            };
        },
        computed: { // вычисляемые свойства
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        methods: {
            getUser() {
                http
                    .get("/user/" + this.id)
                    .then(response => {
                        this.user = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            updateUser(e) {
                e.preventDefault(); 
                var data = {
                    login: this.user.login,
                    password: this.user.password
                };

                http
                    .post("/updateUser/" + this.user.id, data)
                    .then(() => {
                        
                    })
                    .catch(e => {
                        console.log(e);
                    });
                this.submitted = true;
            },
            deleteUser() {
                http
                    .post("/deleteUser/" + this.user.id)
                    .then(() => {
                        this.$router.push('/listUsers');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() { 
            this.getUser();
        }
    }
</script>