Vue.use(axios)

var app = new Vue({
    el: '#GameContainer',
    data: {
    },
    methods: {
        test: function() {
            console.log("mdr");
        }
    }
})

new Vue({
    el: '#TestBase',
    data () {
      return {
        info: null
      }
    },
    mounted () {
      axios
        .get('/api/get')
        .then(response => (this.info = response))
    }
  })
  


$('.dropdown-toggle').dropdown('toggle')
