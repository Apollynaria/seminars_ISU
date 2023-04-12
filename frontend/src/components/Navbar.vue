<template>
    <div id="app" class="mt-0">
        <!-- <nav class="navbar mx-auto w-mine p-3 rounded d-flex flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row justify-content-end" style="background-color:#0062af; color:azure;"> -->
        <nav class="navbar mx-auto w-mine p-3 rounded d-flex flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row justify-content-end" style="background-color:#001c46; color:azure;">
            <!-- <a class="navbar-brand justify-content-md-start flex-grow-1" style="color:azure; font-size: 110%;" href="https://isu.ru/ru/index.html"><img class="nav-item" height="63" width="63" src="../assets/isu_white.png">
                Семинары ИМИТ ИГУ
            </a> -->
            <a class="navbar-brand justify-content-md-start flex-grow-1" style="color:azure; font-size: 110%;" href="http://math.isu.ru/ru"><img class="nav-item" height="63" width="63" src="../assets/imit.png">
                Семинары ИМИТ ИГУ
            </a>

                <div class="d-flex float-right" style="font-size: 110%; text-align: center;">
                    <router-link class="button_nav nav-link mx-2 item rounded" to="/home">&nbsp;Главная&nbsp;</router-link>
                </div>
                <div class="d-flex float-right" style="font-size: 110%; text-align: center;">
                    <router-link v-if="currentUser" class="button_nav nav-link mx-2 item rounded" to="/listUsers">&nbsp;Пользователи&nbsp;</router-link>
                </div>
                <div class="d-flex float-right" style="font-size: 110%; text-align: center;">
                    <router-link class="button_nav nav-link mx-2 item rounded" to="/listThemes">&nbsp;Темы&nbsp;</router-link>
                </div>
                <div class="d-flex float-right" style="font-size: 110%; text-align: center;">
                    <router-link class="button_nav nav-link mx-2 item rounded" to="/listSpeakers">&nbsp;Докладчики&nbsp;</router-link>
                </div>
                <div class="d-flex float-right" style="font-size: 110%; text-align: center;">
                    <router-link class="button_nav nav-link mx-2 item rounded" to="/listPresentations">&nbsp;Доклады&nbsp;</router-link>
                </div>

                <div v-if="currentUser" class="d-flex float-right flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row" style="font-size: 110%; text-align: center;">
                        <a class="button_nav nav-link mx-2 item rounded button_nav" target="_blank" href="https://t.me/webimit_bot">&nbsp;Подписаться&nbsp;</a>
                        <a href @click.prevent="logOut" class=" button_nav nav-link mx-2 item rounded">&nbsp;Выйти
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-door-open" viewBox="0 0 16 16">
                                <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
                                <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z"/>
                            </svg>&nbsp;  
                        </a>
                    </div>
                    <div v-else class="d-flex float-right flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row" style="font-size: 110%; text-align: center;">
                        <a class="button_nav nav-link mx-2 item rounded" target="_blank" href="https://t.me/webimit_bot">&nbsp;Подписаться&nbsp;</a>
                        <router-link  class=" nav-link mx-2 item rounded" to="/login">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-door-closed" viewBox="0 0 16 16">
                                <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2zm1 13h8V2H4v13z"/>
                                <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0z"/>
                            </svg> 
                        </router-link>
                    </div>
        </nav>
    </div>
</template>

<script>
   export default {
    name: "NavBar",
    data() {
        return {};

    },
    computed: { // вычисляемые свойства
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    methods: {
        logOut() {
            this.$store.dispatch('auth/logout'); // обращаемся к методу logout, который определён в auth.service.js
            window.location.href = '/login'; // // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
        }
    }
};
</script>

<style>
.button_nav:hover {
    border: solid 1px;
    border-color: white;
    background-color: rgba(255, 255, 255, 0.192);
    /* color: #0062af; */
    color: white;
}
.button_nav{
    border: solid 1px;
    /* border-color: #0062af; */
    border-color: #001c46;
}
.navitem{
    font-size:1.2em;
}
html {
    font-size: 2.3vh;
}

</style>