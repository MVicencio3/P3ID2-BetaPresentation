let canvas;

let introSong;

let tracks = [];
let currentTrackIndex = 0;
let currentSong;
const totalTracks = 3;

let hoverSound, clickSound;

let startBtn, playBtn, pauseBtn, resetBtn, skip10Btn, prevBtn, nextBtn, volumeSlider;

let musicStarted = false;
let firstClickDone = false;
let playlistStarted = false;
let pauseState = false;

function setup() {
    const canvasWidth = 800;
    const canvasHeight = 450;
    const canvasX = (windowWidth - canvasWidth) / 2;
    const canvasY = 50;

    // Create canvas and position
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.position(canvasX, canvasY);

    introSong = createAudio("thememusic1.mp3");
    introSong.loop();
    introSong.volume(1);
    introSong.hide();
    introSong.stop();

    for (let i = 1; i <= totalTracks; i++) {
        let track = createAudio(`erevemusic${i}.mp3`);
        track.loop();
        track.volume(1);
        track.hide();
        track.stop();
        tracks.push(track);
    }

    currentSong = tracks[0];

    // Mouse hover and click
    hoverSound = createAudio("mousehover.mp3");
    clickSound = createAudio("mouseclick.mp3");
    hoverSound.hide();
    clickSound.hide();

    // Start button
    startBtn = createButton("Start");
    startBtn.position(canvasX + 350, canvasY + canvasHeight + 50);
    startBtn.mousePressed(startGame);

    // Main UI buttons
    playBtn = createButton("Play");
    playBtn.position(canvasX, canvasY + canvasHeight + 80);
    playBtn.mousePressed(playPlaylist);
    playBtn.hide();

    pauseBtn = createButton("Pause");
    pauseBtn.position(canvasX + 100, canvasY + canvasHeight + 80);
    pauseBtn.mousePressed(togglePause);
    pauseBtn.hide();

    resetBtn = createButton("Reset");
    resetBtn.position(canvasX + 225, canvasY + canvasHeight + 80);
    resetBtn.mousePressed(resetSong);
    resetBtn.hide();

    skip10Btn = createButton("Skip +10s");
    skip10Btn.position(canvasX + 350, canvasY + canvasHeight + 80);
    skip10Btn.mousePressed(skipAhead);
    skip10Btn.hide();

    prevBtn = createButton("Prev Track");
    prevBtn.position(canvasX + 500, canvasY + canvasHeight + 80);
    prevBtn.mousePressed(prevTrack);
    prevBtn.hide();

    nextBtn = createButton("Next Track");
    nextBtn.position(canvasX + 650, canvasY + canvasHeight + 80);
    nextBtn.mousePressed(nextTrack);
    nextBtn.hide();

    volumeSlider = createSlider(0, 1, 1, 0.01);
    volumeSlider.size(200);
    volumeSlider.position(canvasX + 350, canvasY + canvasHeight + 140);
    volumeSlider.input(changeVolume);
    volumeSlider.hide();
}

// Start
function start() {
    clickSound.play();
    musicStarted = true;

    startBtn.hide();

    playBtn.show();
    pauseBtn.show();
    resetBtn.show();
    skip10Btn.show();
    prevBtn.show();
    nextBtn.show();
    volumeSlider.show();
}

// Click
function mousePressed() {
    if (!firstClickDone) {
        introSong.play();
        firstClickDone = true;
    }
}

// Playlist functions
function playPlaylist() {
    clickSound.play();
    if (!playlistStarted) {
        playlistStarted = true;
        introSong.stop();
        currentSong.time(0);
        currentSong.play();
        currentSong.elt.onended = nextTrackAuto;
    }
}

function togglePause() {
    clickSound.play();
    if (!playlistStarted) return;

    if (!pauseState) {
        currentSong.pause();
        pauseState = true;
    } else {
        currentSong.play();
        pauseState = false;
    }
}

function nextTrackAuto() {
    currentSong.stop();
    currentTrackIndex = (currentTrackIndex + 1) % totalTracks;
    currentSong = tracks[currentTrackIndex];
    currentSong.time(0);
    currentSong.play();
    currentSong.elt.onended = nextTrackAuto;
}

function nextTrack() {
    clickSound.play();
    if (!playlistStarted) return;

    currentSong.stop();
    currentTrackIndex = (currentTrackIndex + 1) % totalTracks;
    currentSong = tracks[currentTrackIndex];
    currentSong.time(0);
    currentSong.play();
    currentSong.elt.onended = nextTrackAuto;
}

function prevTrack() {
    clickSound.play();
    if (!playlistStarted) return;

    currentSong.stop();
    currentTrackIndex = (currentTrackIndex - 1 + totalTracks) % totalTracks;
    currentSong = tracks[currentTrackIndex];
    currentSong.time(0);
    currentSong.play();
    currentSong.elt.onended = nextTrackAuto;
}

function skipAhead() {
    clickSound.play();
    if (!playlistStarted) return;

    currentSong.time(currentSong.time() + 10);
}

function resetSong() {
    clickSound.play();
    if (!playlistStarted) return;

    currentSong.time(0);
}

function changeVolume() {
    if (!playlistStarted) return;

    currentSong.volume(volumeSlider.value());
}

// Draw canvas
function draw() {
    background(50);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(48);
    text("MapleMusic", width / 2, height / 2);
}
