import { set } from "mongoose";
import regeneratorRuntime from "regenerator-runtime";
const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;

const handleStop = () => {
  startBtn.innerText = "Start Recording";
  startBtn.addEventListener("click", handleStart);
  startBtn.removeEventListener("click", handleStop);
};

const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);

  const recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => console.log(e);
  console.log(recorder);
  recorder.start();
  console.log(recorder)
  setTimeout(() => {
      recorder.stop();
  }, 10000)
};

const init = async () => {
  stream = await navigator.mediaDevices.getDisplayMedia({
    video: { width: 800, height: 300 },
    audio: true,
  });
  video.srcObject = stream;
  video.play();
};

init();

startBtn.addEventListener("click", handleStart);
