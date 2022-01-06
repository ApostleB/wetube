import { set } from "mongoose";
import regeneratorRuntime from "regenerator-runtime";
const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = () => {
    const a = document.createElement("a");
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

const init = async () => {
  stream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: true,
  });
  video.srcObject = stream;
  video.play();
};

init();

startBtn.addEventListener("click", handleStart);
