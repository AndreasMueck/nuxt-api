<script setup>
const props = defineProps({
    filename: String,
});
</script>

<template>
    <div class="videoFullwidth">
        <video class="videoFullwidth__video" :poster="`/videos/${filename}.jpg`" width="1920" height="1080" autoplay muted
            loop>
            <source :src="`/videos/${filename}.mp4`" type="video/mp4">
            <source :src="`/videos/${filename}.ogv`" type="video/ogg">
            Du verwendest leider einen Browser, welcher diesen Video-Standard nicht unterstützt.
        </video>
    </div>
</template>

<style lang="scss">
.videoFullwidth {
    width: 100%;
    height: 75vw;
    max-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    &__video {
        width: auto;
        height: 100%;

        @media (min-aspect-ratio: 16/9) {
            width: 100%;
            height: auto;
        }
    }
}
</style>
