<template>
    <div>
        Dashboard component
        <div v-if="user">Zalogowany użytkownik: {{ user }} </div>
        <br />
        <router-link :to="{ name: 'home' }">Home |</router-link>
        <router-link v-if="!isLogged" :to="{ name: 'login' }">Login |</router-link>
        <a v-if="isLogged" @click.prevent="logout" href>Logout |</a>
        <router-link v-if="isLogged" :to="{ name: 'dashboard' }">Dashboard</router-link>
    </div>
</template>
<script>
export default {
    data() {
        return { isLogged: null };
    },
    created() {
        this.isLogged = localStorage.getItem("isLogged");
        this.$root.$on("isLogged", value => {
            this.isLogged = value;
        });
    },
    beforeDestroy() {
        this.$root.$off("isLogged");
    },
    methods: {
        async logout() {
            try {
                await axios.post("/api/logout");
                localStorage.removeItem("isLogged");
                this.isLogged = false;
                if (this.$route.name != "home") {
                    this.$router.push({ name: "home" });
                }
            } catch (err) { console.log(err); }
        }

    }
};
</script>
