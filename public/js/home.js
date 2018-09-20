new Vue({
    el: '#GameContainer',
    data: {
    },
    methods: {
        test: function() {

        }
    }
})

new Vue({
    el: '#TestBase',
    data: {
      info: null
    },
    mounted () {
      axios
        .get('/api/getAllImage')
        .then(response => (this.info = response.data.message))
    }
})
  
$('.dropdown-toggle').dropdown('toggle')

let imageGame = document.getElementsByClassName("GameItem");

imageGame[0].addEventListener("mouseover", function(event) {
  event.target.style.opacity = 0.5;
  event.target.style.cursor = "crosshair";
});

imageGame[0].addEventListener("mouseout", function(event) {
  event.target.style.opacity = 1;
  event.target.style.cursor = "default";  
});