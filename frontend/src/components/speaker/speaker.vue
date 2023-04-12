<template>

<div class="bg-white w-mine mx-auto rounded mt-3 p-3">
    <div v-if="this.speaker">
        <div class="align-self-center" style="font-size: 180%; text-align: center;">
            <p>Докладчик: {{speaker.name}}</p>
        </div>
        <div class="align-self-center row g-2" v-if="!submitted">
            <form v-if="currentUser" class="justify-content-center mx-auto d-flex flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row" @submit="updateSpeaker">
                <div class="d-flex flex-grow-1 p-2">
                    <input type="text" name="name" class="form-control" style="font-size: 120%;" id="name" placeholder="ФИО" required v-model="speaker.name">
                </div>
                <div class="d-flex align-self-center p-2">
                    <input type="submit" class="btn btn-outline-success" style="font-size: 120%; text-align: center;" value="Обновить">
                </div>
                <div class="d-flex align-self-center p-2">
                    <button class="col-auto btn btn-outline-danger" style="font-size: 120%;" v-on:click="deleteSpeaker()">Удалить</button>
                </div>
            </form>
        </div>
        <div v-else>
            <div class="align-self-center" style="font-size: 140%; text-align: center;">
                <p>Вы успешно обновили запись!</p>
            </div>
        </div>
    </div>

    <div class="" style="font-size: 120%;">
        <p>&nbsp;Cписок докладов у докладчика:</p>
        <ul class="list-group">
            <li class="list-group-item" v-for="(present,index) in presentationsForSpeakers" :key="index">
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
        <router-link to="/listSpeakers" style="font-size: 120%;" class="btn btn-outline-primary">Вернуться к списку докладчиков</router-link>
    </div>
</div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "speaker-details",
        props: ['id'],
        data() {
            return {
                speaker: null,
                submitted: false,
                presentationsForSpeakers: []
            };
        },
        computed: { // вычисляемые свойства
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        methods: {
            getSpeaker() {
                http
                    .get("/speaker/" + this.id)
                    .then(response => {
                        this.speaker = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getPresentationsForSpeakers(){
                http
                .get("/PresentationsForSpeaker/speakerId=" + this.id)
                .then(response => {
                        this.presentationsForSpeakers = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            updateSpeaker(e) {
                e.preventDefault(); 
                var data = {
                    name: this.speaker.name
                };
                http
                    .post("/updateSpeaker/" + this.speaker.id, data)
                    .then(() => {
                        this.$router.go();
                    })
                    .catch(e => {
                        console.log(e);
                    });
                this.submitted = true;
            },
            deleteSpeaker() {
                http
                    .post("/deleteSpeaker/" + this.speaker.id)
                    .then(() => {

                        this.$router.push('/listSpeakers');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() { 
            this.getSpeaker();
            this.getPresentationsForSpeakers();
        }
    }
</script>