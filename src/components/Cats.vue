<template>
  <div class="cats">
    <p>
      <router-link v-bind:to="{ name: 'AskQuestion' }">Ask Question</router-link>
      &bull;
      <router-link v-bind:to="{ name: 'Cats' }">Cats</router-link>
    </p>
    <form v-on:submit.prevent="findCats">
      <p>Click Meow to find pictures of cats</p>
        <p><button type="submit">Meow</button></p>
    </form>
    
    <ul v-if="results && results.length > 0" class="results">
      <div>
        <spinner v-if="showSpinner"></spinner>
        <p><img :src="results[0].url_m"></p>
      </div>
    </ul>

    <ul v-else="errors.length > 0" class="errors">
      <li v-for="error in errors">
        {{ error.message }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import CubeSpinner from '@/components/CubeSpinner';

export default {
  name: 'findCats',
  components: {
    spinner: CubeSpinner
  },
  data () {
    return {
      results: null,
      errors: [],
      showSpinner: false,
    }
  },
  methods: {
    findCats: function() {
      this.showSpinner = true;
      axios.get('https://crossorigin.me/https://api.flickr.com/services/rest/', {
        params: {
          method: "flickr.photos.search",
          tags: "cat",
          api_key: 'fde5ff5837b1a0218a974201d0272c29',
          format: 'json',
          nojsoncallback: "1",
          extras: "url_m"
        }
      })
      .then( response => {
        this.showSpinner = false;
        this.results = response.data.photos.photo;
      })
      .catch( error => {
        this.showSpinner = false;
        this.errors.push(error);
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

button{
  background: #f07851;
  padding: 0.5rem;
  font-weight: 300;
  color: #eef0e9;
  border: none;
  cursor: pointer;
  font-size: 1.4rem;
}
h1, h2 {
  font-weight: normal;
}
ul.results {
  list-style-type: none;
  padding: 0;
}
.results li {
  display: inline-block;
  margin: 10px;
  border: solid 1px #333;
  padding: 0.5rem;
  width: 200px;
  min-height: 100px;
  color: #fff;
  background: rgba(0,0,0,0.7);
}
ul.errors {
  list-style-type: none;
}
.errors li {
  border: 1px solid red;
  color: red;
  padding: 0.5rem;
  margin: 10px 0;
}
a {
  color: #42b983;
}
</style>

