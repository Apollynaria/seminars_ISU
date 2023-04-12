<template>
<div v-if="currentUser" class="bg-white w-mine mx-auto rounded mt-3 p-3 ">
    <div class="align-self-center" style="font-size: 180%; text-align: center;">
        <p>Добавление докладчика</p>
    </div>
    
    <hr>
    <div class="align-self-center g-2" v-if="!submitted">
        <form class="justify-content-center mx-auto d-flex flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row" @submit="addSpeaker">
            <div class="d-flex flex-grow-1 p-2">
                <input type="text" name="name" class="form-control" style="font-size: 120%;" id="name" placeholder="ФИО докладчика" required v-model="speaker.name">
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
            <button v-on:click="newSpeaker" style="font-size: 120%;" class="btn btn-outline-success mb-2">Добавить нового докладчика</button>
        </div>
        <div>
            <router-link to="/listSpeakers" style="font-size: 120%;" class="btn btn-outline-primary mb-2">Вернуться к списку докладчиков</router-link>
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
        name: "addSpeaker",
        data() {
            return {
                speaker: {
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
            addSpeaker(e) {
                e.preventDefault(); 
                var data = {
                    name: this.speaker.name
                };
                http
                    .post("/addSpeaker", data)
                    .then(response => { 
                        this.speaker.id = response.data.id;
                    })
                    .catch(e => { 
                        console.log(e);
                    });

                this.submitted = true;
            },
            newSpeaker() {
                this.submitted = false;
                this.speaker = {
                    name: ""
                };
            }
        }
    }
</script>