const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')
const playListButton = document.getElementById('playlist')

const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton= document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress = document.getElementById('current-progress')

// Sira
let index

// Dongu
let loop = true

// Sarki listesi
const songsList = [
    {
        name: "Gelo Ew Ki Bu",
        link: "assets/gelo-ew-ki-bu.mp3",
        artist: "Aram Tigran",
        image: "assets/aram-tigran.jpeg"
    },
    {
        name: "Gitme Kal",
        link: "assets/yara-bere-icindeyim.mp3",
        artist: "Hira-i Zerdust",
        image: "assets/hirai.jpeg"
    },
    {
        name: "Aramam",
        link: "assets/aramam.mp3",
        artist: "Ibrahim Tatlises",
        image: "assets/ibrahim-tatlises.jpeg"
    },
    {
        name: "Ax Eman",
        link: "assets/ax-eman.mp3",
        artist: "Rewsan Celiker",
        image: "assets/rewsan-celiker.jpeg"
    },
    {
        name: "Dinle",
        link: "assets/dinle.mp3",
        artist: "Mahsun Kirmizigul",
        image: "assets/mahsun.jpeg"
    }
]

// Sarki ata
const setSong = (arrayIndex) =>{
    let {name, link, artist, image} = songsList[arrayIndex]
    audio.src = link
    songName.innerHTML = name
    songArtist.innerHTML =artist
    songImage.src = image

    // Sarkı yuklenildiginde, calismaya veya durdurmaya hazir oldugunda 
    audio.onloadeddata =() =>{
        maxDuration.innerText = timeFormatter(audio.duration) // 240
    }

    playAudio()
    playListContainer.classList.add("hide")
}

// Oynatma listesini goster
playListButton.addEventListener("click", () =>{
    playListContainer.classList.remove("hide")
})

// Oynatma listesi Gizle
closeButton.addEventListener("click", ()=>{
    playListContainer.classList.add("hide")
})

// Tekrar tiklandiginda
repeatButton.addEventListener("click", ()=>{
    if(repeatButton.classList.contains("active")){
        repeatButton.classList.remove("active")
        audio.loop = false
        console.log("Tekrar kapalı")
    } else{
        repeatButton.classList.add("active")
        audio.loop = true
        console.log("tekrar acik")
    }
})

// Karistirici tiklandiginda
shuffleButton.addEventListener("click", ()=>{
    if(shuffleButton.classList.contains("active")){
        shuffleButton.classList.remove("active")
        loop = true
        console.log("Karistirici kapalı")
    } else{
        shuffleButton.classList.add("active")
        loop = true
        console.log("Karistirici acik")
    }
})

// İlerleme cubuguna tiklandiginda
progressBar.addEventListener("click", (event)=>{
    let coordStart = progressBar.getBoundingClientRect().left
    console.log(coordStart)

    let coordEnd = event.clientX
    console.log(coordEnd)
    console.log(progressBar.offsetWidth)

    let progress = (coordEnd - coordStart) / progressBar.offsetWidth
    currentProgress.style.width = progress * 100 + "%"
    audio.currentTime = progress * audio.duration
    // currentProgress.style.background = "orangered";
})

// Zaman tutucu
setInterval(() => {
    currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%"
}, 1000);

// Sarkıyı oynat
const playAudio = () =>{
    audio.play()
    playButton.classList.add("hide")
    pauseButton.classList.remove("hide")
}
// setSong(4)

// Sarkiyi durdur
const pauseAudio = () =>{
    audio.pause()
    pauseButton.classList.add("hide")
    playButton.classList.remove("hide")
}

// Sonraki sarki
const nextSong = () =>{
    if(loop){ // Dongu açıksa 
        if(index == (songsList.length - 1)) // Son sarkida ise başa sar.
        {
            index = 0
        } else{ 
            index ++
        }
        setSong(index)
    } else{
        //karistirici aciksa
        let randIndex = Math.floor(Math.random) * songsList.length
        setSong(randIndex)
    }
}

// Onceki sarkı
const previousSong = () =>{
    pauseAudio()
    if(index > 0){
        index --
    } else{
        index = songsList.length - 1 
    }
    setSong(index)
}

// Sarkı bittiğinde
audio.onended = () =>{
    nextSong()
}

// Zaman duzenlemesi
const timeFormatter = (timeInput) =>{
    let minute = Math.floor(timeInput / 60)
    minute = minute < 10 ? "0" + minute : minute

    let second = Math.floor(timeInput % 60)
    second = second < 10 ? "0" + second : second
    return `${minute}.${second}`
}

// Sarki suresi degistikce
audio.addEventListener("timeupdate", ()=>{
    currentTimeRef.innerText = timeFormatter(audio.currentTime)
})

// Sarki listesini oluştur
const initPlayList = () =>{
    for (const i in songsList) {
        playListSongs.innerHTML += `<li class="playListSong" onclick="setSong(${i})">
        <div class="playlist-image-container">
        <img src="${songsList[i].image}" />
        </div>
        <div class="playlist-song-details">
        <span id="playlist-song-name">${songsList[i].name}</span>
        <span id="playlist-song-artist-album">${songsList[i].artist}</span>
        </div>
        </li>`  
    }
}

// Oynat tiklandiginda 
playButton.addEventListener("click", playAudio)

// Dur tiklandiginda
pauseButton.addEventListener("click", pauseAudio)

// Sonraki tiklandiginda
nextButton.addEventListener("click", nextSong)

// Onceki tiklandiginda
prevButton.addEventListener("click", previousSong)

window.onload = () =>{
    index = 0
    setSong(index)
    pauseAudio()
    initPlayList()
}
