<template>

<div v-if="presentIsReadySteadyGo" class="bg-white w-mine mx-auto rounded mt-3 p-3" style="font-size: 130%;">
    <div class="mx-auto d-flex flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row" style="font-size: 93%;">
        <div class="justify-content-md-start flex-grow-1 mx-auto">
            <p class="inline border border-2 rounded text-nowrap">
                &nbsp;
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                </svg>
                Анонс семинара&nbsp;
            </p>
        </div>

        <div class="d-flex float-right text-center mx-auto" style="text-align: center;">
            <p class="inline border border-2 rounded text-nowrap" id="date">&nbsp;
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-alarm" viewBox="0 0 16 16">
                    <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"/>
                    <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z"/>
                </svg>
                {{timePresentation}}
                &nbsp;
            </p>
        </div>

        <div class="d-flex float-right mx-auto" style="text-align: center;">
            <p class="inline border border-2 rounded text-nowrap" id="date">&nbsp;
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar2-event" viewBox="0 0 16 16">
                    <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
                    <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z"/>
                </svg>
                {{datePresentation}}&nbsp;
            </p>
        </div>     
    </div>
    
    <hr>
    <div class="d-flex justify-content-center mx-auto" style="text-align: center; font-size: 140%;">
        <strong>
            <router-link v-if="presentation.id"  style="font-size: 100%; text-decoration: none;" class="linkS" v-bind:to="{
                    name: 'presentation-details',
                    params: { id: presentation.id }
                }">
                {{presentation.name}}
            </router-link>
        </strong>
    </div>

    <div class="d-flex justify-content-center mx-auto" style="text-align: center; font-size: 120%;">
        <ul style="display: inline" class="list-group">
            <li style="display: inline; border: none" class="list-group-item" v-for="(theme, index) in presentationThemes" :key="index">
                <router-link style="font-size: 100%; text-decoration: none;" class="linkS" :to="{
                        name: 'theme-details',
                        params: { id: theme.id }
                    }">
                    {{theme.name}}
                </router-link>
            </li>
        </ul>
    </div>

    <div class="d-flex justify-content-center mx-auto" style="text-align: center; font-size: 120%;">
        <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-megaphone" viewBox="0 0 16 16">
                <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-.214c-2.162-1.241-4.49-1.843-6.912-2.083l.405 2.712A1 1 0 0 1 5.51 15.1h-.548a1 1 0 0 1-.916-.599l-1.85-3.49a68.14 68.14 0 0 0-.202-.003A2.014 2.014 0 0 1 0 9V7a2.02 2.02 0 0 1 1.992-2.013 74.663 74.663 0 0 0 2.483-.075c3.043-.154 6.148-.849 8.525-2.199V2.5zm1 0v11a.5.5 0 0 0 1 0v-11a.5.5 0 0 0-1 0zm-1 1.35c-2.344 1.205-5.209 1.842-8 2.033v4.233c.18.01.359.022.537.036 2.568.189 5.093.744 7.463 1.993V3.85zm-9 6.215v-4.13a95.09 95.09 0 0 1-1.992.052A1.02 1.02 0 0 0 1 7v2c0 .55.448 1.002 1.006 1.009A60.49 60.49 0 0 1 4 10.065zm-.657.975 1.609 3.037.01.024h.548l-.002-.014-.443-2.966a68.019 68.019 0 0 0-1.722-.082z"/>
            </svg>
            <ul style="display: inline" class="list-group">
                <li style="display: inline; border: none" class="list-group-item" v-for="(speaker, index) in presentationSpeakers" :key="index">
                    <router-link style="font-size: 80%; text-decoration: none;" class="linkS" :to="{
                            name: 'speaker-details',
                            params: { id: speaker.id }
                        }">
                        {{speaker.name}}
                    </router-link>
                </li>
            </ul>
        </p>
    </div>
    
    <hr>

    <div class="mx-auto d-flex flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row" style="font-size: 90%;">

        <div class="flex-grow-1 mx-auto" >
            <p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>
                {{presentation.description}}
            </p>
        </div>

        <div class="d-flex float-right mx-auto" style="text-align: center;">
            <p class=" d-inline-block h-50 rounded border-2 text-nowrap" style="text-align: center;" id="date">&nbsp;
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16">
                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
                </svg>
                Место проведения:&nbsp;<br>{{presentation.place}}&nbsp;
            </p>
        </div>    
    </div>

</div>

<div v-else class="bg-white w-mine mx-auto rounded mt-4 p-3" style="font-size: 110%;">
    На ближайшее время семинаров не ожидается.
</div>

</template>

<script>

    import http from "../http-common";
    export default {
        name: "NavBar",
        data() {
            return {
                presentation: {
                    id: "",
                    name: "",
                    file: "",
                    description: "",
                    date: null,
                    place: ""
                },
                presentationSpeakers: [],
                presentationThemes: [],
                timePresentation: null,
                datePresentation: null,
                presentIsReadySteadyGo: true
            };
        },
        methods: {
            getPresentationAndInfo() {
                http
                    .get("/presentationsSortByData")
                    .then(response => {
                        this.presentation = response.data[0];
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
                        http
                            .get("/ThemesForPresentation/presentationId=" + this.presentation.id)
                            .then(response => {
                                for (let i = 0; i < response.data.length; i++) {
                                    var elem = response.data[i].theme;
                                    this.presentationThemes.push(elem);
                                }
                            })
                            .catch(e => {
                                console.log(e);
                            });
                        http
                            .get("/SpeakersForPresentation/presentationId=" + this.presentation.id)
                            .then(response => {
                                for (let i = 0; i < response.data.length; i++) {
                                    var elem = response.data[i].speaker;
                                    this.presentationSpeakers.push(elem);
                                }
                            })
                            .catch(e => {
                                console.log(e);
                            });
                    })
                    .catch(e => {
                        var q = e.toString();
                        if (~q.indexOf("undefined")) {
                            this.presentIsReadySteadyGo = false;
                        }
                    });
            }
        },
        mounted() { 
            this.getPresentationAndInfo();
        }
    };
</script>

<style>

#date {
    float: right;
}
.inline {
    margin-right: 0.5rem;
    display: inline-block;
}
.g-custom{
    --bs-gutter-x: 0rem;
    --bs-gutter-y: 0rem;
}
hr{
    border: none;
    height: 1px;
    color: #6c757d;
    background-color: #6c757d;
}
.linkS{
        position: relative;
        font-size: 1.25rem;
        text-decoration: none;
        /* color:rgb(1, 70, 123); */
        color: rgb(7, 50, 113);
    }
    .linkS::before {
        content: '';
        position: absolute;
        left: 0; bottom: -5px;
        width: 0;
        height: 1.5px;
        /* background-color: rgb(1, 70, 123); */
        background-color: rgb(1, 70, 123);
    }
    .w-mine{
        width: 96%;
    }
</style>