(window.onload = () => {
  axios.get("../../../util_api/liffId.php").then((res) => {
    liff.init({liffId: res.data.liffId}).then(() => {
      const { createApp } = Vue;
      const vuetify = Vuetify.createVuetify({
        theme: {
     
        }
      });
    
      createApp({
        data() {
          return {
            text:"",
            lists: [],
            loading: false,
            isInit: false
          }
        },
        methods:{
          submit(){
            this.loading = true;
            let post = new FormData();
            post.append("destination", this.text);
            axios.post("./add.php", post).then(res => {
              this.loading = false;
            }).catch(err => {
              this.loading = false;
            });
          },
          submitDone(e){
            this.loading = true;
            let post = new FormData();
            post.append("destination", e);
            axios.post("./done.php", post).then(res => {
              this.loading = false;
            }).catch(err => {
              this.loading = false;
            }); 
          }
        },
        mounted(){
          axios.get("./get.php").then(res => {
            if(res.data.result == 1){
              this.loading = false;
              this.lists = res.data.lists;
              this.isInit = true;
            }
          }).catch(err => {
            this.loading = false;
          })
        }
      }).use(vuetify).mount('#container');
    });
  });
});