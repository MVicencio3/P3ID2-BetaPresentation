let canvas;

let introSong;

let tracks = [];
let currentTrackIndex = 0;
let currentSong;
let totalTracks = 3;

let hoverSound, clickSound;

let startBtn, playBtn, pauseBtn, resetBtn, skip10Btn, prevBtn, nextBtn, volumeSlider;

let musicStarted = false;
let firstClickDone = false;
let playlistStarted = false;
let pauseState = false;

function setup() {
    let canvasWidth = 800;
    let canvasHeight = 450;
    let canvasX = (windowWidth - canvasWidth) / 2;
    let canvasY = 50;
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

    hoverSound = createAudio("mousehover.mp3");
    clickSound = createAudio("mouseclick.mp3");
    hoverSound.hide();
    clickSound.hide();

    startBtn = createButton("Start");
    startBtn.id("startBtn");
    startBtn.position(canvasX + 350, canvasY + canvasHeight + 50);
    startBtn.size(100, 50);
    startBtn.mousePressed(start);
    startBtn.mouseOver(() => hoverSound.play());

    playBtn = createButton("Play");
    playBtn.id("playBtn");
    playBtn.position(canvasX - 50, canvasY + canvasHeight + 80);
    styleButton(playBtn);
    playBtn.mousePressed(playPlaylist);
    playBtn.hide();

    pauseBtn = createButton("Pause");
    pauseBtn.id("pauseBtn");
    pauseBtn.position(canvasX + 100, canvasY + canvasHeight + 80);
    styleButton(pauseBtn);
    pauseBtn.mousePressed(togglePause);
    pauseBtn.hide();

    resetBtn = createButton("Reset");
    resetBtn.id("resetBtn");
    resetBtn.position(canvasX + 250, canvasY + canvasHeight + 80);
    styleButton(resetBtn);
    resetBtn.mousePressed(resetSong);
    resetBtn.hide();

    skip10Btn = createButton("Skip +10s");
    skip10Btn.id("skip10Btn");
    skip10Btn.position(canvasX + 400, canvasY + canvasHeight + 80);
    styleButton(skip10Btn);
    skip10Btn.mousePressed(skipAhead);
    skip10Btn.hide();

    prevBtn = createButton("Prev Track");
    prevBtn.id("prevBtn");
    prevBtn.position(canvasX + 550, canvasY + canvasHeight + 80);
    styleButton(prevBtn);
    prevBtn.mousePressed(prevTrack);
    prevBtn.hide();

    nextBtn = createButton("Next Track");
    nextBtn.id("nextBtn");
    nextBtn.position(canvasX + 700, canvasY + canvasHeight + 80);
    styleButton(nextBtn);
    nextBtn.mousePressed(nextTrack);
    nextBtn.hide();

    volumeSlider = createSlider(0, 1, 1, 0.01);
    volumeSlider.id("volumeSlider");
    volumeSlider.size(200);
    volumeSlider.position(canvasX + 350, canvasY + canvasHeight + 140);
    volumeSlider.input(changeVolume);
    volumeSlider.hide();
}

function styleButton(btn) {
    btn.style("background-color", "#444");
    btn.style("color", "white");
    btn.style("font-size", "16px");

    btn.mouseOver(() => {
        hoverSound.play();
        btn.style("background-color", "#666");
    });

    btn.mouseOut(() => {
        btn.style("background-color", "#444");
    });

    btn.mousePressed(() => clickSound.play());
}

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

function mousePressed() {
    if (!firstClickDone) {
        introSong.play();
        firstClickDone = true;
    }
}

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

function draw() {
    background(50);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(48);
    text("MapleMusic", width / 2, height / 2);
}
