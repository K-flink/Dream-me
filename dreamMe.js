
const fileInput = document.getElementById("fileInput");
const uploadArea = document.getElementById("uploadArea");
const dreamButton = document.getElementById("dreamButton");
const processing = document.getElementById("processing");
const downloadButton = document.getElementById("downloadButton");
const resultCanvas = document.getElementById("resultCanvas");
const ctx = resultCanvas.getContext("2d");
const brightnessSlider = document.getElementById("brightness");
const contrastSlider = document.getElementById("contrast");
const saturationSlider = document.getElementById("saturation");

const textInput = document.getElementById("textInput");
const textSize = document.getElementById("textSize");
const textColor = document.getElementById("textColor");
const addTextBtn = document.getElementById("addTextBtn");
const fontSelect = document.getElementById("fontSelect");

const valentinePortraitOverlays = [
  "assets/valentines/portrait/filter-1.png",
  "assets/valentines/portrait/filter-2.png",
  "assets/valentines/portrait/filter-3.png",
  "assets/valentines/portrait/filter-4.png",
];

const valentineLandscapeOverlays = [
  "assets/valentines/landscape/filter-5.png",
  "assets/valentines/landscape/filter-6.png",
  "assets/valentines/landscape/filter-7.png",
  "assets/valentines/landscape/filter-8.png",
  "assets/valentines/landscape/filter-9.png",
  "assets/valentines/landscape/filter-10.png",
  "assets/valentines/landscape/filter-11.png",
  "assets/valentines/landscape/filter-12.png",
  "assets/valentines/landscape/filter-13.png",
  "assets/valentines/landscape/filter-14.png",
  "assets/valentines/landscape/filter-15.png",
  "assets/valentines/landscape/filter-16.png",
];


let draggingText = null;
let offsetX = 0;
let offsetY = 0;

let currentImage = null;
let textLayers = [];

let selectedFile = null;

let selectedOverlayImage = null;


/*This is how it uploads*/

uploadArea.onclick = () => {
  if (!selectedFile) {
    fileInput.value = null;
    fileInput.click();
  }
};

uploadArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadArea.classList.add("dragging");
});

uploadArea.addEventListener("dragleave", () => {
  uploadArea.classList.remove("dragging");
});

uploadArea.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadArea.classList.remove("dragging");

  const file = e.dataTransfer.files[0];
  if (!file) return;

  selectedFile = file;
  fileInput.files = e.dataTransfer.files;

  imagePreview.src = URL.createObjectURL(file);
  uploadArea.classList.add("has-image");
  dreamButton.disabled = false;
});

/*image preview*/

const imagePreview = document.getElementById("imagePreview");

fileInput.onchange = () => {
  selectedFile = fileInput.files[0]; 
  if (!selectedFile) return;

  imagePreview.src = URL.createObjectURL(selectedFile);

  uploadArea.classList.add("has-image");
  dreamButton.disabled = false;
};


/* Dream Button */

dreamButton.onclick = () => {
  if (!selectedFile) return;

  processing.classList.add("visible");

  const img = new Image();
  img.src = URL.createObjectURL(selectedFile);

  img.onload = () => {
    resultCanvas.width = img.width;
    resultCanvas.height = img.height;

    currentImage = img;
    const isPhotoPortrait = img.height > img.width;

    let overlaysToUse = isPhotoPortrait
      ? valentinePortraitOverlays
      : valentineLandscapeOverlays;

    selectedOverlaySrc =
      overlaysToUse[Math.floor(Math.random() * overlaysToUse.length)];

    selectedOverlayImage = new Image();
    selectedOverlayImage.src = selectedOverlaySrc;

selectedOverlayImage.onload = () => {
  drawCanvas();
};


    drawCanvas();

    uploadArea.classList.add("has-result");
    downloadButton.classList.add("visible");
    processing.classList.remove("visible");
  };
};

const newPhotoBtn = document.getElementById("newPhotoBtn");

newPhotoBtn.onclick = () => {
  // Reset state
  selectedFile = null;
  currentImage = null;
  selectedOverlayImage = null;
  textLayers = [];

  // Clear canvas
  ctx.clearRect(0, 0, resultCanvas.width, resultCanvas.height);

  // Reset UI
  imagePreview.src = "";
  uploadArea.classList.remove("has-image");
  uploadArea.classList.remove("has-result");
  downloadButton.classList.remove("visible");

  dreamButton.disabled = true;
};


/*for the theme buttons*/

const themeCards = document.querySelectorAll(".theme-card");
let selectedTheme = "valentine";

document.querySelector('.theme-card.valentine').classList.add('selected');

themeCards.forEach(card => {
  card.onclick = () => {
    themeCards.forEach(c => c.classList.remove("selected"));
    card.classList.add("selected");
    selectedTheme = card.dataset.theme;
  };
});

function drawCanvas() {
  if (!currentImage) return;

  ctx.clearRect(0, 0, resultCanvas.width, resultCanvas.height);

  ctx.filter = `brightness(${brightnessSlider.value})
                contrast(${contrastSlider.value})
                saturate(${saturationSlider.value})`;

  ctx.drawImage(currentImage, 0, 0);

  if (selectedOverlayImage) {
    ctx.drawImage(
      selectedOverlayImage,
      0,
      0,
      resultCanvas.width,
      resultCanvas.height
    );
  }

  ctx.filter = "none";

  drawTextLayers();
}


function drawTextLayers() {
  textLayers.forEach(text => {
    ctx.font = `${text.size}px ${text.font}`;
    ctx.fillStyle = text.color;
    ctx.fillText(text.text, text.x, text.y);
  });
}

brightnessSlider.oninput = drawCanvas;
contrastSlider.oninput = drawCanvas;
saturationSlider.oninput = drawCanvas;


addTextBtn.onclick = () => {
  if (!textInput.value) return;

  textLayers.push({
  text: textInput.value,
  size: textSize.value,
  color: textColor.value,
  font: fontSelect.value,
  x: resultCanvas.width / 2,
  y: resultCanvas.height / 2
});

  drawCanvas();
};

resultCanvas.addEventListener("mousedown", (e) => {
  const rect = resultCanvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  textLayers.forEach(text => {
    ctx.font = `${text.size}px ${text.font}`;
    const width = ctx.measureText(text.text).width;
    const height = text.size;

    if (
      mouseX > text.x &&
      mouseX < text.x + width &&
      mouseY < text.y &&
      mouseY > text.y - height
    ) {
      draggingText = text;
      offsetX = mouseX - text.x;
      offsetY = mouseY - text.y;
    }
  });
});

resultCanvas.addEventListener("mousemove", (e) => {
  if (!draggingText) return;

  const rect = resultCanvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  draggingText.x = mouseX - offsetX;
  draggingText.y = mouseY - offsetY;

  drawCanvas();
});

resultCanvas.addEventListener("mouseup", () => {
  draggingText = null;
});

resultCanvas.addEventListener("mouseleave", () => {
  draggingText = null;
});

/* for downloading */

downloadButton.onclick = () => {
  const link = document.createElement("a");
  link.download = "dream-me.png";
  link.href = resultCanvas.toDataURL();
  link.click();
};