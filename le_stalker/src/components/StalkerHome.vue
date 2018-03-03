<template>
	<div>
		<Navbar></Navbar>
		<Header></Header>
	</div>
</template>

<script>
import Header from './Header'
import Navbar from './Navbar'
export default {
  name: 'stalkerHome',
  components: {Header, Navbar},
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
