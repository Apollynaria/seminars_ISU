<template>
<div v-if="currentUser" class="bg-white w-mine mx-auto rounded mt-3 p-3 ">

    <div class="align-self-center" style="font-size: 18 0%; text-align: center;">
        <p>Добавление пользователя</p>
     </div>

     <hr>
     <div class="align-self-center g-2" v-if="!submitted">
            <form class="justify-content-center mx-auto d-flex flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row" @submit="addUser">
                <div class="d-flex flex-grow-1 p-2">
                    <input type="text" name="login" class="form-control" style="font-size: 120%;" id="login" placeholder="Логин" required v-model="user.login">
                </div>
                <div class="d-flex m-2">
                    <input type="password" name="password" class="form-control" style="font-size: 120%;" id="password" placeholder="Пароль" required v-model="user.password">
                </div>
                <div class="d-flex align-self-center m-2">
                    <input type="submit" class="btn btn-outline-success" style="font-size: 120%; text-align: center;" value="Добавить">
                </div>
            </form>
        </div>
        <div v-else>
            <div v-if="message" class="row" role="alert">
                    <div class="alert alert-danger text-center">
                        {{message}}
                    </div>
                    <div class="text-center">
                        <button v-on:click="newUser" style="font-size: 120%;" class="btn btn-outline-success mb-2">Добавить нового пользователя</button>
                    </div>
            </div>
            <div v-else>
                <div class="row text-center">
                    <div class="" style="font-size: 140%; text-align: center;">
                        <p>Вы успешно добавили запись!</p>
                    </div>  
                    <div class="">
                        <button v-on:click="newUser" style="font-size: 120%;" class="btn btn-outline-success mb-2">Добавить нового пользователя</button>
                    </div>
                    <div class="">
                        <router-link to="/listUsers" style="font-size: 120%;" class="btn btn-outline-primary mb-2">Вернуться к списку пользователей</router-link>
                    </div>
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
        name: "addUser",
        data() {
            return {
                user: {
                    login: "",
                    password: "",
                },
                message: '',
                submitted: false
            };
        },
        computed: { // вычисляемые свойства
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        methods: {
            addUser(e) {
                e.preventDefault();
                this.message = '';
                var data = {
                    login: this.user.login,
                    password: this.user.password
                };
                http
                    .post("/addUser", data)
                    .then(response => {
                        this.user.id = response.data.id;
                    })
                    .catch(e => {
                        this.message = e.response.data.message;
                    });

                this.submitted = true;
            },
            newUser() {
                this.submitted = false;
                this.user = {
                    login: "",
                    password: ""
                };
            }
        }
    }
</script>

<style>
    html {
    font-size: 2.3vh;
}
</style>