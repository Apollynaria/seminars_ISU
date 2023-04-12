<template>

<div v-if="currentUser" class="bg-white w-mine mx-auto rounded mt-3 p-3 ">
    <div class="row g-custom">

        <div class="mx-auto d-flex flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row justify-content-md-end mb-2">
            <div class="align-self-center d-flex" style="font-size: 180%; text-align: center;">
                <p class="p-0 m-0">Список пользователей</p>
            </div>

            <div v-if="currentUser" class="align-self-center d-flex p-2 ">
                <router-link class="btn btn-outline-success" style="text-align: center; font-size: 110%;" to="/addUser">Добавить пользователя</router-link>
            </div>

            <div class="d-flex flex-grow-1"></div>

        </div>

        <div class="" style="font-size: 120%;">
            <ul class="list-group">
                <li class="list-group-item" v-for="(user, index) in users" :key="index">
                    <router-link class="link"  :to="{
                            name: 'user-details',
                            params: { id: user.id }
                        }">
                        {{user.login}}
                    </router-link>
                </li>
            </ul>
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
        name: "ListUsers", 
        data() { 
            return {
                users: []
            };
        },
            computed: { // вычисляемые свойства
                currentUser() {
                    return this.$store.state.auth.user;
                }
            },
        methods: { 
            getUsers() {
                http
                    .get("/users")
                    .then(response => {
                        this.users = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() {
            this.getUsers();
        }
    }
</script>

<style>
    .item {
        margin-left: 5px;
    }
</style>