<script setup>
import { ref, onMounted } from 'vue'
import { initializeAudioVisualizer } from '../audioVisualizer.js'
import TrackList from '../components/TrackList.vue'

const props = defineProps({
  userId: {
    type: Number,
    required: true
  }
})

const audioElement = ref(null)
const fileInput = ref(null)
const trackList = ref(null)

const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  const objectUrl = URL.createObjectURL(file)
  audioElement.value.src = objectUrl
  
  // Extract metadata
  const metadata = {
    title: file.name.replace(/\.[^/.]+$/, ""),
    artist: 'Unknown',
    duration: 0,
    filePath: objectUrl,
    userId: props.userId
  }

  // Save track data
  try {
    const response = await fetch('/api/tracks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(metadata)
    })
    const data = await response.json()
    if (data.success) {
      trackList.value.fetchTracks()
    } else {
      console.error('Could not save track metadata.')
    }
  } catch (error) {
    console.error('Error saving track:', error)
  }
}

const handleTrackSelected = (track) => {
  audioElement.value.src = track.filePath
  audioElement.value.play()
}

onMounted(() => {
  initializeAudioVisualizer()
})
</script>

<template>
  <div id="container">
    <canvas id="canvas-audio"></canvas>
    <div id="audio-container">
      <input 
        type="file" 
        id="file-upload" 
        ref="fileInput" 
        accept="audio/*" 
        @change="handleFileUpload" 
      />
      <audio id="audio-player" ref="audioElement" aria-label="Audio player" controls></audio>
    </div>
    <TrackList ref="trackList" :userId="userId" @track-selected="handleTrackSelected" />
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
  width: 82%;
  display: flex;
  flex-direction: row;
  top: 80px;
  align-items: center;
  justify-content: center;
}
#audio-player {
  width: 30%;
}
#file-upload {
  color: #ededed;
}

/* iPad Portrait */
@media (max-width: 820px) {
  #audio-container {
    flex-direction: column-reverse;
    width: 75%;
  }
  #audio-player {
    width: 60%;
  }
  #file-upload {
    margin-top: 40px;
  }
}
/* Mobile Portrait */
@media (max-width: 480px) {
  #audio-container {
    top: 40px;
    height: 120px;
    flex-direction: column-reverse;
    width: 70%;
  }
  #audio-player {
    width: 90%;
  }
}
</style>