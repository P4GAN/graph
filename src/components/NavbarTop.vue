<template>
    <nav class = "navbar">
        <ul class = "graphTypes">
            <li>
                <a>2D Graph</a>

            </li>
            <li>
                <a>3D Graph</a>

            </li>
        </ul>

    </nav>
</template>

<script>
export default {
    name: 'NavbarTop',
    props: {
    }
}
</script>

<style>
    :root {
        font-size: 20px;
        --navbar-bg: #5fc5e7;
    }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.navbar {
    color: white;
    background-color: var(--navbar-bg);
    
    z-index: 2;
    top: 0;
    left: 0;
    height: 50px;
    width: 100%;
    position: fixed;

    padding: 0;

    display: flex;
    flex-direction: row;
    align-items: center;

    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

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
