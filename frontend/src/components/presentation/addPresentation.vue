<template>
<div v-if="currentUser" class="bg-white w-mine mx-auto rounded mt-3 p-3 ">
    <div class="align-self-center" style="font-size: 180%; text-align: center;">
        <p>Добавление доклада</p>
    </div>
    
    <hr>
    <div class="align-self-center g-2" v-if="!submitted">
        <form class="justify-content-center" @submit="addPresentation">
            <div class="justify-content-center mx-auto d-flex flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row">
                <div class="d-flex flex-grow-1 p-2">
                    <input class="form-control" style="font-size: 120%;" type="text" name="name" id="name" placeholder="Название доклада" required v-model="presentation.name">
                </div>
                <div class="d-flex p-2 align-self-center" style="font-size: 120%;">
                    <DatePicker  
                    required
                    locale="ru"
                    v-model="presentation.date" 
                    :is-24="true"/>
                </div>
            </div>
            
            <div class="p-2">
                <input type="file" id="file" name="file" ref="file" class="form-control" accept=".zip, .pdf, .jpg, .png" v-on:change="handleFileUpload()"/>
            </div>

            <div class="p-2">
                <textarea class="form-control"  style="resize: none; font-size: 120%;" type="text" id="description" name="description" rows="3" placeholder="Описание доклада" required v-model="presentation.description"></textarea>
            </div>
            
            <div class="p-2">
                <input  class="form-control" style="font-size: 120%;" type="text" name="place" id="place" placeholder="Место проведения" required v-model="presentation.place">
            </div>
            
            <div class="p-2">
                <button v-show="!displayForm" type="button" @click="showConfigurationForm()" class="btn btn-outline-primary mt-2" style="font-size: 120%;">Выбрать темы</button>
                <div v-show="displayForm">
                    <ul class="list-group mt-2">
                        <label class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="selectAll" @click="selectAllThemes">
                            Выбрать все
                        </label>
                        <li v-for="(theme, index) in themes" v-bind:key="index" class="list-group-item list-group-item-info">
                            <div class="row">
                                <div class="col-xs">
                                    <input class="form-check-input" type="checkbox" v-model="selectedThemes" :value="theme.id">
                                    {{theme.name}}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="p-2">
                <button v-show="!displayForm2" type="button" @click="showConfigurationForm2()" style="font-size: 120%;" class="btn btn-outline-primary mt-2">Выбрать спикеров</button>
                <div v-show="displayForm2">
                    <ul class="list-group mt-2">
                        <label class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="selectAll2" @click="selectAllSpeakers">
                            Выбрать все
                        </label>
                        <li v-for="(speaker, index) in speakers" v-bind:key="index" class="list-group-item list-group-item-info">
                            <div class="row">
                                <div class="col-xs">
                                    <input class="form-check-input" type="checkbox" v-model="selectedSpeakers" :value="speaker.id">
                                        {{speaker.name}}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="row text-center">
                <div class="col">
                    <input type="submit" class="btn btn-outline-success mb-2" style="font-size: 120%; text-align: center;" value="Добавить">
                </div>
            </div>

        </form>
    </div>


    <div class="row text-center" v-else>
        <div class="align-self-center" style="font-size: 140%; text-align: center;">
            <p>Вы успешно добавили запись!</p>
        </div>
        <div>
            <button v-on:click="newPresentation" style="font-size: 120%;" class="btn btn-outline-success mb-2">Добавить новый доклад</button>
        </div>
        <div>
            <router-link to="/listPresentations" style="font-size: 120%;" class="btn btn-outline-primary mb-2">Вернуться к списку докладов</router-link>
        </div>
    </div>
</div>
<div v-else>
    {{$router.push('/home')}}
</div>
    
</template>

<script>
    import http from "../../http-common";
    // import moment from 'moment';
    export default {
        name: "addPresentation",
        data() {
            return {
                presentation: {
                    name: "",
                    file: "",
                    mime_type: "",
                    description: "",
                    date: null,
                    place: ""
                },
                themes: [],
                selectedThemes: [],
                speakers: [],
                selectedSpeakers: [],
                displayForm: false,
                displayForm2: false,
                selectAll: false,
                selectAll2: false,
                submitted: false,
                filiIsUpload: 0
            };
        },
        computed: { // вычисляемые свойства
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        methods: {
            getThemes() {
                http
                    .get("/themes")
                    .then(response => {
                        this.themes = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getSpeakers() {
                http
                    .get("/speakers")
                    .then(response => {
                        this.speakers = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            showConfigurationForm() {
                this.displayForm = true;
            },
            showConfigurationForm2() {
                this.displayForm2 = true;  
            },
            selectAllThemes(){
                this.selectedThemes = [];
                if (!this.selectAll) {
                    for (var i in this.themes) {
                        this.selectedThemes.push(this.themes[i].id);
                    }
                }
            },
            selectAllSpeakers() {
                this.selectedSpeakers = [];
                if (!this.selectAll2) {
                    for (var i in this.speakers) {
                        this.selectedSpeakers.push(this.speakers[i].id);
                    }
                }
            },
            addPresentation(e) {
                e.preventDefault(); 
                let formData = new FormData();
                formData.append('name', this.presentation.name);
                formData.append('file', this.presentation.file);
                formData.append('fileIsUpload', this.fileIsUpload);
                formData.append('mime_type', this.presentation.mime_type);
                formData.append('description', this.presentation.description);
                formData.append('date', this.presentation.date);
                formData.append('place', this.presentation.place);
                
                http
                    .post("/addPresentation", formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(response => { 
                        this.presentation.id = response.data.id;
                        var data2 = {
                            themes: this.selectedThemes,
                            presentation_id: this.presentation.id
                        };
                        http
                            .post("/addThemes", data2)
                            .then(() => {
                            })
                            .catch(e => { 
                                console.log(e);
                            });
                        var data3 = {
                            speakers: this.selectedSpeakers,
                            presentation_id: this.presentation.id
                        };
                        http
                            .post("/addSpeakers", data3)
                            .then(() => {
                            })
                            .catch(e => { 
                                console.log(e);
                            });
                    })
                    .catch(e => { 
                        console.log(e);
                    });
                this.fileIsUpload = 0;
                this.submitted = true;
            },
            newPresentation() {
                this.submitted = false;
                this.presentation = {
                    name: "",
                    file: "",
                    description: "",
                    date: "",
                    place: ""
                };
                this.speakers = [];
                this.selectedSpeakers = [];
                this.themes = [];
                this.selectedThemes = [];
                this.displayForm = false;
                this.displayForm2 = false;
                this.fileIsUpload = 0;
            },
            handleFileUpload(){
                this.fileIsUpload = 1;
                this.presentation.file = this.$refs.file.files[0];
            }
        },
        mounted() {
            this.getThemes();
            this.getSpeakers();
        }
    }
</script>