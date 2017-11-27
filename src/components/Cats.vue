<template>
  <div class="cats">
    <p>
      <router-link v-bind:to="{ name: 'AskQuestion' }">Ask Question</router-link>
      &bull;
      <router-link v-bind:to="{ name: 'Cats' }">Cats</router-link>
    </p>
    <form v-on:submit.prevent="findCats">
      <p>Click submit to find pictures of cats</p>
        <p><button type="submit">Submit</button></p>
    </form>
    
    <ul v-if="results && results.length > 0" class="results">
      <li v-for="item in results" class="item">
        <p><strong>{{ item.word }}</strong></p>
        <p>{{ item.score }}</p>
      </li>
    </ul>

    <ul v-else-if="errors.length > 0" class="errors">
      <li v-for="error in errors">
        {{ error.message }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'findCats',
  data () {
    return {
      results: null,
      errors: [],
    }
  },
  methods: {
    findCats: function() {
      axios.get('https://www.flickr.com/services/api/', {
        params: {
          APPID: 'fde5ff5837b1a0218a974201d0272c29'
        }
      })
      .then( response => {
        this.results = response.data;
      })
      .catch( error => {
        this.errors.push(error);
      })
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rhyme-preceding {
  font-size: 1.4rem;
}
input[type="text"]{
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #333;
  width: 300px;
  font-size: 1.4rem;
  color: #2c3e50;
  font-weight: 300;
  background: rgba(0,0,0,0.02);
  padding: 0.5rem;
}
button{
  background: #333;
  padding: 0.5rem;
  font-weight: 300;
  color: #fff;
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

