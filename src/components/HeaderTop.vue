<template>
    <div class="header">
        <nav class="nav">
            <div class="title">{{ title }}</div>
        </nav>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
    },
}
</script>

<style socped>

</style>