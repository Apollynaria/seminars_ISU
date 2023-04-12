<template>

<div class="bg-white w-mine mx-auto rounded mt-3 p-3 d-flex justify-content-center">
    <div class="row g-custom w-50">
        <div class="align-self-center" style="font-size: 180%; text-align: center;">
            <p>Вход в систему</p>
        </div>
        <form name="form" class="row justify-content-center" @submit="handleLogin">
            <div class="row mb-2">
                <input type="text" class="form-control" style="font-size: 120%;" name="login" placeholder="Логин" v-model="user.login" required/>
            </div>
            <div class="row mb-2">
                <input type="password" class="form-control" style="font-size: 120%;" name="password" placeholder="Пароль" v-model="user.password" required/>
            </div>
            <div class="form-group text-center">
                <button class="btn btn-outline-primary w-100" style="font-size: 120%;" :disabled="loading">
                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                    <span>Войти</span>
                </button>
            </div>
            <div class="form-group mt-2 text-center">
                <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
            </div>
        </form>

    </div>
</div>
</template>
<script>
    export default {
        name: 'LoginUser',
        data() {
            return {
                user: {
                    login: "",
                    password: ""
                },
                loading: false,
                message: ''
            };
        },
        computed: { // вычисляемые свойства
            loggedIn() {
                return this.$store.state.auth.status.loggedIn; // $store - локальное хранилище
            }
        },
        created() {
            if (this.loggedIn) {
                // Авторизация прошла успешно, переходим к главной странице.
                window.location.href = '/';
            }
        },
        methods: {
            handleLogin(e) {
                e.preventDefault();
                this.loading = true;
                this.$store.dispatch("auth/login", this.user) // обращаемся к методу login, который определён в auth.service.js
                    .then(() => {
                        window.location.href = '/'; // авторизация прошла успешно, переходим к главной странице. 
                    })
                    .catch(e => {
                            this.loading = false;
                            this.message = e.response.data.message;
                        }
                    );
            }
        }
    };
</script>
