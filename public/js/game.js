new Vue({
    el: '#TestBase',
    data: {
        info: [],
        myImage: '',
        i: 0
    },
    mounted () {
        axios.get('/api/getAllImage', auth).then(response => {
            if (response.data.message == "Error") {
                this.info = "Error";
            } else
                this.info = response.data.message;
        })
    },
    updated () {
        this.myImage = "./public/imageTest/" + this.info[this.i].image + ".jpg";
        console.log(this.myImage); 
    },
    methods: {
        nextImage: function() {
            console.log("clicked");
            this.i++;
        }
    }
})