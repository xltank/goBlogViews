<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>

export default {
    name: 'App',
    watch: {
        "$route" (to, from) {
            console.log(to.fullPath, from.fullPath)
        }
    }
}
</script>

<style>

#app {
    /*width: 100%;*/
    /*height: 100%;*/
}

body {
    background-color: #EEEEEE;
    padding: 0 0;
    margin: 0 0;
    border: 0;
}

</style>
