<template>
    <div>
        <h1>MARVEL CHARACTERS</h1>
        <div class="text-center">
            <font-awesome-icon v-if="isLoading" icon="spinner" size="2x" spin />
        </div>
        <div class="characters-list" v-if="characters.length > 0">
            <router-link tag="div" v-for="character in characters" :key="character.id" class="character-wrapper" :to="{name: 'character_details', params: { character_id : character.id }}">
                <div class="cover">
                    <img :src="character.thumbnail" />                  
                </div>
                <div class="title">
                    <span>{{ character.name }}</span>
                </div>
            </router-link>
        </div>
        <div class="text-center" v-if="!isLoading && characters.length == 0" >No data available</div>
    </div>
</template>

<script>
/* eslint-disable */
// @ is an alias to /src
var md5 = require("js-md5");

export default {
  name: "Characters",
  mounted() {
    this.fetchCharacters()
  },
  data() {
    return {
        isLoading: true,
        characters: []
    }
  },
  methods: {
    fetchCharacters() {
        let ts = Date.now();
        let hash = md5(ts+process.env.VUE_APP_MARVEL_PRIVATE_KEY+process.env.VUE_APP_MARVEL_PUBLIC_KEY);
        this.axios.get('http://gateway.marvel.com/v1/public/characters',{
            params: {
              apikey: process.env.VUE_APP_MARVEL_PUBLIC_KEY,
              ts,
              hash
            }
        }).then((res) => {
            this.isLoading = false;
            if(res.data.data.count > 0) {
                this.characters = res.data.data.results.map(character => {
                    return {
                        id : character.id,
                        name : character.name,
                        thumbnail : [character.thumbnail.path,character.thumbnail.extension].join('.'),
                    }
                });                
            }
        }).catch(() => {
            this.isLoading = false;
            /* display error message to the user */
        })
    }
  }
};
</script>
<style scoped>
    h1 {
        margin: 50px 0;
        text-align: center;
    } 
    .characters-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    .character-wrapper {
        margin: 20px;
        width: 200px;
        height: 350px;
        cursor: pointer;
    }
    .character-wrapper .cover {
        height: 200px;
        overflow: hidden;
    }
    .character-wrapper .cover img {
        width: 200px;
        height: 200px;
        overflow: hidden;
        transition: .3s all;
    }
    .character-wrapper .title {
        position: relative;
        display: flex;
        height: 150px;
        background-color: #000;
        padding: 20px;
        color: #fff;
        font-weight: 700;
        text-align: left;
        align-items: flex-start;
        align-content: flex-start;
        text-transform: uppercase;
        line-height: 1.3em;
    }
    .character-wrapper .title span {
        z-index: 1;
    }
    .character-wrapper .title::before {
        content: "";
        z-index: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 0px;
        background-color: #e62429;
        transition: .3s height;
    }
    .character-wrapper:hover .title::before {
        height: 150px;
    }
    .character-wrapper:hover .cover img {
        transform: scale(1.2);
    }

</style>
