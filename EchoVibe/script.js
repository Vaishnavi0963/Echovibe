
const songs = [
  { src: "assets/music/song1.mp3", title: "Song 1", lyrics: "You're the light, you're the night, you're the color of my blood..." },
  { src: "assets/music/song2.mp3", title: "Song 2", lyrics: "When you try your best but you don't succeed..." },
  { src: "assets/music/song3.mp3", title: "Song 3", lyrics: "Hello from the other side, I must've called a thousand times..." }
];

let current = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("trackTitle");
const lyrics = document.getElementById("lyricsText");
const likeIcon = document.getElementById("likeIcon");
const switchInput = document.getElementById("themeSwitch");

function loadSong(index) {
  audio.src = songs[index].src;
  title.textContent = songs[index].title;
  lyrics.textContent = songs[index].lyrics;
  updateLikeIcon();
  audio.play();
}

audio.addEventListener("ended", () => {
  current = (current + 1) % songs.length;
  loadSong(current);
});

likeIcon.addEventListener("click", () => {
  const liked = JSON.parse(localStorage.getItem("likedSongs") || "[]");
  const song = songs[current].title;
  if (liked.includes(song)) {
    localStorage.setItem("likedSongs", JSON.stringify(liked.filter(s => s !== song)));
  } else {
    liked.push(song);
    localStorage.setItem("likedSongs", JSON.stringify(liked));
  }
  updateLikeIcon();
});

function updateLikeIcon() {
  const liked = JSON.parse(localStorage.getItem("likedSongs") || "[]");
  likeIcon.textContent = liked.includes(songs[current].title) ? "❤️" : "🤍";
}

switchInput.addEventListener("change", () => {
  document.body.classList.toggle("light-mode");
});

// Voice search
document.getElementById("micButton").addEventListener("click", () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();
  recognition.onresult = function(event) {
    const spoken = event.results[0][0].transcript.toLowerCase();
    const index = songs.findIndex(s => s.title.toLowerCase().includes(spoken));
    if (index !== -1) {
      current = index;
      loadSong(current);
    } else {
      alert("Song not found: " + spoken);
    }
  };
});

loadSong(current);
