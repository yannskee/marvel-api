<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{name: 'characters'}"><img src="./assets/marvel-logo.png" alt="Marvel logo" width="200" /></router-link>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div id="content">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: #000;
  margin-bottom: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
