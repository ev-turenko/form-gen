<template>
    <div class="home-page">
        <h1>Генератор форм</h1>
        <p>
            Сделано на Vue.js 3 с использованием TypeScript, Pinia, Vue Router и SCSS.
        </p>
        <div class="links">
            <RouterLink to="/demo1">К форме 1</RouterLink>
            <RouterLink to="/demo2">К форме 2</RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts"></script>


<style lang="scss" scoped>
.home-page {
    padding: 2rem;
    text-align: center;

    h1 {
        font-size: 2rem;
        color: #2c3e50;
    }

    p {
        font-size: 1.2rem;
        color: #555;
        margin: 1rem 0;
    }

    .links {
        display: flex;
        justify-content: center;
        gap: 2rem;
        margin-top: 1.5rem;

        a {
            padding: 0.5rem 1rem;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            transition: background-color 0.3s;

            &:hover {
                background-color: #0056b3;
            }
        }
    }
}
</style>