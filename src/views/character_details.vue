<template>
    <div>
        <div class="text-center">
            <font-awesome-icon v-if="isLoading" icon="spinner" size="2x" spin />
        </div>
        <div v-if="character.length > 0">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-sm-3">
                        <img :src="character[0].thumbnail" class="img-fluid">
                    </div>
                    <div class="col-12 col-sm-9">
                        <h1>{{ character[0].name }}</h1>
                        <p>
                            <span v-if="character[0].description">
                                {{ character[0].description }}
                            </span>
                            <span v-else>Description unavailable</span>
                        </p>
                        <div class="row">
                            <div class="col-12">
                                <h2>Comics list<span v-if="character[0].comics && character[0].comics.available"> ({{ character[0].comics.available }})</span></h2>
                                <ul v-if="character[0].comics.items.length > 0" class="comics-list">
                                    <li v-for="comic in character[0].comics.items" :key="comic.name" v-text="comic.name"></li>
                                </ul>
                                <span v-else>Unavailable</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
/* eslint-disable */
var md5 = require("js-md5");

export default {
  name: "Characters",
  mounted() {
    this.character_id = this.$route.params.character_id ? this.$route.params.character_id : null
    if(this.character_id) {
        this.fetchCharacterDetails()
    } else {
        this.$router.push('/')
    }
  },
  data() {
    return {
        isLoading: false,
        character_id: null,
        character: []
    }
  },
  methods: {
    fetchCharacterDetails() {
        this.isLoading = true;
        let ts = Date.now();
        let hash = md5(ts+process.env.VUE_APP_MARVEL_PRIVATE_KEY+process.env.VUE_APP_MARVEL_PUBLIC_KEY);
        this.axios.get('http://gateway.marvel.com/v1/public/characters/'+this.character_id, {
            params: {
              apikey: process.env.VUE_APP_MARVEL_PUBLIC_KEY,
              ts,
              hash
            }
        }).then((res) => {
            this.isLoading = false;
            this.character = res.data.data.results.map(character => {
                return {
                    name : character.name,
                    description : character.description,
                    thumbnail : [character.thumbnail.path,character.thumbnail.extension].join('.'),
                    comics : character.comics       
                }
            })
        }).catch(() => {
            this.isLoading = false;
            this.$router.push('/');
        })
    }
  }
};
</script>
<style scoped>
    h1 {
        text-align: left;
        margin: 0;
        text-transform: uppercase;
    } 
    .character-description {
        text-align: left;
    }
    .comics-list {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
    .comics-list li {
        padding: 10px;
    }

</style>
