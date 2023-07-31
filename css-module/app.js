const videoContainer = document.querySelector('.video-container')
const video = document.querySelector('.video')
const videoButton = document.querySelector('.video-button')

const handleClickVideoButton = (e) => {
    e.stopPropagation()
    if (video.paused) {
        videoButton.style.display = 'none'
        video.play()
    }
    else {
        videoButton.style.display = 'block'
        video.pause()
    }
}

videoButton.addEventListener('click', handleClickVideoButton)

video.addEventListener('play', () => {
    videoButton.style.display = 'none'
})

video.addEventListener('pause', () => {
    videoButton.style.display = 'block'
})

