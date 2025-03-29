<template>
  <div id="app">
    <nav>
      <RouterLink to="/">Главная</RouterLink> |
      <RouterLink to="/demo1">Форма 1</RouterLink> |
      <RouterLink to="/demo2">Форма 2</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  padding: 1rem;

  a {
    margin: 0 0.5rem;
    color: #007bff;
    text-decoration: none;

    &.router-link-exact-active {
      color: #0056b3;
    }
  }
}
</style>