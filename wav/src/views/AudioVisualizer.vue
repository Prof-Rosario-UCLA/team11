<script setup>
import { onMounted } from 'vue'
import { initializeAudioVisualizer } from '../audioVisualizer.js'

onMounted(() => {
  initializeAudioVisualizer()
})
</script>

<template>
  <div id="container">
    <canvas id="canvas-audio"></canvas>
    <div id="audio-container">
      <audio id="audio-player" controls></audio>
      <input type="file" id="fileupload" accept="audio/*" />
    </div>
  </div>
</template>

<style scoped>
#container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
}
#canvas-audio {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(4px) contrast(5);
}
#audio-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  top: 80px;
  align-items: center;
  z-index: 100;
}
#audio-player {
  width: 40%;
}
#fileupload {
  margin-top: 50px;
  color: white;
}
</style>