<template>
    <div class = "sidebar">
        pog
    </div>
</template>


<script>
export default {
    name: 'EquationEditorSidebar',
    props: {
    }
}
</script>

<style>
    :root {
        font-size: 20px;
        --sidebar-bg: #f1f0f0;
    }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.sidebar {
    color: black;
    background-color: var(--sidebar-bg);
    
    z-index: 1;
    top: 50px;
    left: 0;
    height: 100%;
    width: 350px;
    position: fixed;

    padding: 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    border-right: 1px solid rgba(0, 0, 0, 0.2);

}

.graphTypes {
    display: flex;
    flex-direction: row;
    list-style: none;
    align-items: center;
    justify-content: space-around;

    margin: 0;
    padding: 0;
}

.graphTypes li {
    margin: auto;
    text-align: center;
    margin: 10px;
}

</style>
