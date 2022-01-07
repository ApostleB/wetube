const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = async () => {
    a.href = videoFile;
    a.download = "MyRecording.webm";
    document.body.appendChild(a);
    a.click();
}

const handleStop = () => {
  startBtn.innerText = "Download Recording";
  startBtn.addEventListener("click", handleDownload);
  startBtn.removeEventListener("click", handleStop);

  recorder.stop();
  console.log("stop")
};

const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);

  //저장 시작
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => {
      videoFile = URL.createObjectURL(e.data);
      video.srcObject = null;
      video.src = videoFile
      video.loop = true;
      video.play();
  }
  recorder.start();
};

//녹화시작
const init = async () => {
  stream = await navigator.mediaDevices.getDisplayMedia({
    video: { width: 800, height: 800 },
    audio: true,
  });
  video.srcObject = stream;
  video.play();
};

init();

startBtn.addEventListener("click", handleStart);
