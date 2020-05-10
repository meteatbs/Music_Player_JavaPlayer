const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

//Song titles
const songs=['faded','infinity','stars'];

//Keep track of song

let songIndex=1;

//Initially load song details into DOM
loadSong(songs[songIndex]);

//Update song details

function loadSong(song) {
    title.innerText=song;
    audio.src=`music/${song}.mp3`;
    cover.src=`images/${song}.jpg`;
}

//Play song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}




//Pause song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}



//Previous song
        function prevSong() {
            songIndex--;
            if (songIndex<0) {
                songIndex=songs.length-1;
            }
            loadSong(songs[songIndex]);

            playSong();
        }


        //Next song
        function nextSong() {
            songIndex++;
            if (songIndex>songs.length-1) {
                songIndex=0;
            }
            loadSong(songs[songIndex]);

            playSong();
        }


        //Update progress bar

        function updateProgress(e) {
            const{duration,currentTime}=e.srcElement;
            // console.log(duration,currentTime);
            const progressPercent=(currentTime/duration)*100;
            // console.log(progressPercent);
            progress.style.width=`${progressPercent}%`;
        }


        //set progress bar
        function setProgress(e) {
            const width=this.clientWidth;
            const clickX=e.offsetX;
            // console.log(width);
            const duration=audio.duration;

            audio.currentTime=(clickX/width)*duration;
            console.log(clickX);
        }

//Event listeners
playBtn.addEventListener('click',() => {
    const isPlaying=musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    }else{
        playSong();
    }
});

//Change Song
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);


//Time/song update
audio.addEventListener('timeupdate',updateProgress);


//Click on progress bar event
progressContainer.addEventListener('click',setProgress);

//Song Ends

audio.addEventListener('ended',nextSong);