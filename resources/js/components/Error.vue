<template>
    <div v-if="isError" class="modal">
        <div class="modal-content">
            <h3>Upps, coś poszło nie tak!</h3>
            <h6 class="text-justify">{{ message }}</h6>
            <div class="d-flex mt-3">
                <button @click.prevent="hide" class="btn btn-light mr-3">Ukryj</button>
                <a href="/" class="btn btn-light">Strona główna</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    created() { this.$root.$on("error", this.handleError); },
    beforeDestroy() { this.$root.$off("error"); },
    data() {
        return {
            isError: false,
            message: ''
        };
    },
    methods: {
        hide() { this.isError = false; },
        handleError(err) {
            this.isError = true;
            if (err.response) {
                this.message = `${err.response.statusText} - ${err.response.status}`;
            } else {
                this.message = "HTTP Error!";
            }
            console.log(err);
        }
    },
    watch: {
        $route(to, from) {
            this.hide();
        }
    }
};
</script>
<style scoped>
.modal {
    display: flex;
    position: absolute;
	width: 300px;
	height: 280px;
    top: 25%;
    left: 20%;
	background: #F65656;
	border-radius: 3px;
	box-shadow: 4px 8px 12px 0 rgba(0,0,0,0.4);
	text-align: center;
	overflow: hidden;
	animation: show-modal .7s ease-in-out;
}
.modal-content{
    background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}
/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  animation: hide-modal .6s ease-in-out both;

}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
  
}

</style>