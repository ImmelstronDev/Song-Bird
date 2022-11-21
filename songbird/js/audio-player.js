import util from "./util.js"


const coefficientToPercent = 100


const initializePlayer = (volume, audioTag, progressBar, currentTimeSpan, durationSpan) => {
    const currentVolume = volume.value / coefficientToPercent
    audioTag.volume = currentVolume
    progressBar.value = 0
    currentTimeSpan.textContent = calculateTime(audioTag.currentTime)
    durationSpan.textContent = calculateTime(audioTag.duration)
}

const togglePlayerControl = (playState, pauseState) => {
    playState.classList.toggle('hidden')
    pauseState.classList.toggle('hidden')
}

const playerControlHandler = (audioTag, playState, pauseState) => {
    if(audioTag.paused){
        audioTag.play();
        togglePlayerControl(playState, pauseState)
    } else {
        audioTag.pause()
        togglePlayerControl(playState, pauseState)
    }
}

const playerStopHandler = (audioTag, playState, pauseState) => {
    if(audioTag.ended) {
        togglePlayerControl(playState, pauseState)
    }
}

const volumeHandler = (audioTag, volume) => {
    audioTag.volume = volume / coefficientToPercent
}

const calculateTime = (time) => {
    time = Math.floor(time)
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time - minutes * 60)
    let totalMinutes = minutes
    let totalSeconds = seconds
    if(minutes < 10){
         totalMinutes = '0' + minutes
    }

    if(seconds < 10){
         totalSeconds = '0' + seconds
        
    }
    return totalMinutes + ':' + totalSeconds
}

const calculateProgressBar = (audioTag, progressBar, currentTimeSpan) => {
    const progress = (Math.floor(audioTag.currentTime) / Math.floor(audioTag.duration)) * coefficientToPercent
    console.log(progress)
    progressBar.value = progress
    currentTimeSpan.textContent = calculateTime(audioTag.currentTime)
}

const editedProgressBar = (progressBarValue, audioTag) => {
    audioTag.currentTime = progressBarValue * audioTag.duration / coefficientToPercent
}

const handleAudioPlayer = (audioPlayer) => {
    const audioTag = audioPlayer.querySelector('.audio-tag')
    const progressBar = audioPlayer.querySelector('.timebar')
    const volume = audioPlayer.querySelector('.volume')
    const playButton = audioPlayer.querySelector('.play-button')
    const playState = audioPlayer.querySelector('.play')
    const pauseState = audioPlayer.querySelector('.pause')
    const currentTimeSpan = audioPlayer.querySelector('.current-time')
    const durationSpan = audioPlayer.querySelector('.duration')



    audioTag.addEventListener('loadeddata', () => initializePlayer(volume, audioTag, progressBar, currentTimeSpan, durationSpan))
    playButton.addEventListener('click', () => playerControlHandler(audioTag, playState, pauseState));
    audioTag.addEventListener('timeupdate', () => playerStopHandler(audioTag, playState, pauseState));
    volume.addEventListener('input', (evt) => volumeHandler(audioTag, evt.target.value));
    audioTag.addEventListener('timeupdate', () => calculateProgressBar(audioTag, progressBar, currentTimeSpan))
    progressBar.addEventListener('input', (evt) => editedProgressBar(evt.target.value, audioTag))
}


const createAudioPlayer = (audioSource, classes) => {
    const audioPlayer = util.createCustomAudioPlayerMarkup(audioSource)

    handleAudioPlayer(audioPlayer)

    return audioPlayer
}

export default createAudioPlayer