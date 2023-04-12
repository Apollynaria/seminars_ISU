<template>

<div class="bg-white w-mine mx-auto rounded mt-3 p-3 ">
    <div v-if="this.presentation">
        
        <div class="mx-auto d-flex flex-column flex-sm-column flex-md-column flex-lg-row flex-xl-row" style="font-size: 93%;">
            
            <div v-if="link" class="flex-grow-1 mx-auto align-self-center">
                <a class="inline border border-2 rounded linkS" style="text-decoration: none;" download="" :href="this.globalVariables.serverUrl + link"  target="_blank">
                    &nbsp;Файл доклада&nbsp;
                </a>
            </div>
            <div v-else class="flex-grow-1 mx-auto align-self-center p-2">
                <p class="" style="text-decoration: none;">
                    
                </p>
            </div>

            <div class="d-flex float-right align-self-center justify-content-md-start p-2" style="text-align: center; font-size: 130%;">
                <p class="inline border border-2 rounded text-nowrap align-self-center  m-0 p-0" id="date">&nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-alarm" viewBox="0 0 16 16">
                        <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"/>
                        <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z"/>
                    </svg>
                    {{timePresentation}}
                    &nbsp;
                </p>
            </div>

            <div class="d-flex float-right mx-auto align-self-center p-2" style="text-align: center; font-size: 130%;">
                <p class="inline border border-2 rounded text-nowrap align-self-center  m-0 p-0" id="date">&nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar2-event" viewBox="0 0 16 16">
                        <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
                        <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z"/>
                    </svg>
                    {{datePresentation}}&nbsp;
                </p>
            </div>     
        </div>

        <div class="row g-custom">
            <div class="align-self-center" style="font-size: 130%;">
                <p>Название: <strong>{{presentation.name}}</strong></p>
            </div>
            <div class="align-self-center" style="font-size: 130%; ">
                <p>Тема(-ы): {{presentationThemes.join(", ")}}</p>
            </div>
            <div class="align-self-center" style="font-size: 130%; ">
                <p>Докладчик(-и): {{presentationSpeakers.join(", ")}}</p>
            </div>
            <div class="align-self-center" style="font-size: 130%;">
                <p>Описание: {{presentation.description}}</p>
            </div>
            <div class="align-self-center" style="font-size: 130%;">
                <p>Место проведения: {{presentation.place}}</p>
            </div>       
        </div>


    <hr>
            
        <div class="align-self-center g-2" v-if="!submitted">
            <form v-if="currentUser" class="justify-content-center" @submit="updatePresentation">
                <div class="align-self-center" style="font-size: 200%; text-align: center;">
                    <p>Редактирование доклада: {{presentation.name}}</p>
                </div>
                <div class="justify-content-center mx-auto d-flex flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row">
                    <div class="d-flex flex-grow-1 p-2">
                        <input class="form-control" style="font-size: 120%;" type="text" name="name" id="name" placeholder="Название доклада" required v-model="presentation.name">
                    </div>
                    <div class="d-flex p-2 align-self-center" style="font-size: 120%;">
                        <DatePicker  
                        locale="ru"
                        v-model="presentation.date" 
                        :is-24="true"/>
                    </div>
                </div>
                
                <div class="p-2">
                    <input type="file" id="file" name="file" ref="file" class="form-control" accept=".zip, .pdf, .jpg, .png" v-on:change="handleFileUpload()"/>
                </div>

                <div class="p-2">
                    <textarea class="form-control"  style="resize: none; font-size: 120%;" type="text" id="description" name="description" rows="3" placeholder="Описание доклада" v-model="presentation.description"></textarea>
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

                <div class="justify-content-center mx-auto d-flex flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row">
                    <div class="d-flex p-2 align-self-center">
                        <input type="submit" class="btn btn-outline-success" style="float: right; font-size: 120%; text-align: center;" value="Обновить">
                    </div>
                    <div class="d-flex p-2 align-self-center">
                        <button type="button" class="btn btn-outline-danger" style="float: left; font-size: 120%;" v-on:click="deletePresentation()">Удалить</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <div class="text-center">
        <router-link to="/listPresentations" style="font-size: 120%;" class="btn btn-outline-primary">Вернуться к списку докладов</router-link>
    </div>
   
</div>

    
</template>

<script>
    import http from "../../http-common";
    //import { Buffer } from 'buffer';
    export default {
        name: "presentation-details",
        props: ['id'],
        data() {
            return {
                presentation: {
                    name: "",
                    file: "",
                    description: "",
                    date: null,
                    place: ""
                },
                speakers: [],
                themes: [],
                selectedThemes: [],
                selectedSpeakers: [],
                presentationSpeakers: [],
                presentationThemes: [],
                displayForm: false,
                displayForm2: false,
                selectAll: false,
                selectAll2: false,
                submitted: false,
                timePresentation: null,
                datePresentation: null,
                fileIsUpload: 0,
                link: "",
                tempFile: null
            };
        },
        computed: { // вычисляемые свойства
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        methods: {
            getLink(param){
                this.link = param.substring(8);
            },
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
            getThemesForPresentation() {
                http
                .get("/ThemesForPresentation/presentationId=" + this.id)
                .then(response => {
                        for (let i = 0; i < response.data.length; i++) {
                            var elem = response.data[i].theme.id;
                            var elem2 = response.data[i].theme.name;
                            this.selectedThemes.push(elem);
                            this.presentationThemes.push(elem2);
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getSpeakersForPresentation() {
                http
                .get("/SpeakersForPresentation/presentationId=" + this.id)
                .then(response => {
                        for (let i = 0; i < response.data.length; i++) {
                            var elem = response.data[i].speaker.id;
                            this.selectedSpeakers.push(elem);
                            var elem2 = response.data[i].speaker.name;
                            this.presentationSpeakers.push(elem2);
                        }
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
            getPresentation() {
                http
                    .get("/presentation/" + this.id)
                    .then(response => {
                        this.presentation = response.data;
                        if (this.presentation.file) {
                            this.getLink(this.presentation.file);
                        }
                        var options = {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        };
                        var optionsTime = {
                            hour: 'numeric',
                            minute: 'numeric'
                        };
                        this.datePresentation = new Date(this.presentation.date);
                        this.timePresentation = this.datePresentation.toLocaleString("ru", optionsTime);
                        this.datePresentation = this.datePresentation.toLocaleString("ru", options);
                    })
                    .catch(e => {
                        console.log(e);
                    });
                    this.fileIsUpload = 0;
            },
            updatePresentation(e) {
                e.preventDefault(); 
                let formData = new FormData();
                formData.append('id', this.id);
                formData.append('fileIsUpload', this.fileIsUpload);
                formData.append('name', this.presentation.name);
                formData.append('trueFile', this.presentation.file);
                formData.append('file', this.tempFile);
                formData.append('mime_type', this.presentation.mime_type);
                formData.append('description', this.presentation.description);
                formData.append('date', this.presentation.date);
                formData.append('place', this.presentation.place);

                http
                    .post("/updatePresentation/" + this.id, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(() => {
                        this.deleteThemeForPresentation();
                        this.deleteSpeakerForPresentation();
                        this.addSelectedThemes();
                        this.addSelectedSpeakers();
                        this.$router.go();
                    })
                    .catch(e => {
                        console.log(e);
                    });

                this.submitted = true;  
            },
            addSelectedThemes(){
                var data = {
                            themes: this.selectedThemes,
                            presentation_id: this.id
                        };
                http
                    .post("/addThemes", data)
                    .then(() => {
                        console.log(this.selectedThemes)
                    })
                    .catch(e => { 
                        console.log(e);
                    });
            },
            addSelectedSpeakers(){
                var data = {
                            speakers: this.selectedSpeakers,
                            presentation_id: this.id
                        };
                http
                    .post("/addSpeakers", data)
                    .then(() => {
                    })
                    .catch(e => { 
                        console.log(e);
                    });
            },
            deleteThemeForPresentation(){
                http
                    .post("/deleteThemeForPresentation/presentationId="+this.id)
                    .then(() => {
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            deleteSpeakerForPresentation(){
                http
                    .post("deleteSpeakerForPresentation/presentationId="+this.id)
                    .then(() => {
                    })
                    .catch(e => {
                        console.log(e);
                    });
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

            deletePresentation() {
                http
                    .post("/deletePresentation/" + this.presentation.id)
                    .then(() => {
                        this.$router.push('/listPresentations');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            handleFileUpload(){
                this.tempFile = this.$refs.file.files[0];
                this.fileIsUpload = 1;
            }
        },
        mounted() { 
            this.getPresentation();
            this.getThemes();
            this.getSpeakers();
            this.getThemesForPresentation();
            this.getSpeakersForPresentation();
            this.fileIsUpload = 0;
        }
    }
</script>

<style>
.datepicker,
.table-condensed {
    width: 220px;
    height: 220px;
    font-size: x-small; 
}
</style>