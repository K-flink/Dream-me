
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

const valentineOverlays = [
  "assets/valentines/filter-1.png",
  "assets/valentines/filter-2.png",
  "assets/valentines/filter-3.png",
  "assets/valentines/filter-4.png",
  "assets/valentines/filter-5.png",
  "assets/valentines/filter-6.png",
  "assets/valentines/filter-7.png",
  "assets/valentines/filter-8.png",
  "assets/valentines/filter-9.png",
  "assets/valentines/filter-10.png",
  "assets/valentines/filter-11.png",
  "assets/valentines/filter-12.png",
  "assets/valentines/filter-13.png",
  "assets/valentines/filter-15.png",
  "assets/valentines/filter-16.png",
];

let draggingText = null;
let offsetX = 0;
let offsetY = 0;

let currentImage = null;
let textLayers = [];

let selectedFile = null;

/*This is how it uploads*/

uploadArea.onclick = () => fileInput.click();

/* image preview*/

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
    drawCanvas();

    uploadArea.classList.add("has-result");
    downloadButton.classList.add("visible");
    processing.classList.remove("visible");
  };
};


  function applyThemeEffect(theme) {
  if (selectedTheme === "valentine") {

  const randomStyle = Math.floor(Math.random() * 3);

  // Option 1 or 2: Add pink overlay + glow
  if (randomStyle === 1 || randomStyle === 2) {
    // Pink tint
    ctx.fillStyle = "rgba(255, 105, 180, 0.15)";
    ctx.fillRect(0, 0, resultCanvas.width, resultCanvas.height);

    // Soft glow
    ctx.shadowColor = "rgba(255, 105, 180, 0.6)";
    ctx.shadowBlur = 40;
    ctx.drawImage(currentImage, 0, 0);
    ctx.shadowBlur = 0;
  }

  // Option 0 or 2: Add frame overlay
  if (randomStyle === 0 || randomStyle === 2) {
    const randomOverlay =
      valentineOverlays[Math.floor(Math.random() * valentineOverlays.length)];

    const overlayImage = new Image();
    overlayImage.src = randomOverlay;

    overlayImage.onload = () => {
      ctx.drawImage(
        overlayImage,
        0,
        0,
        resultCanvas.width,
        resultCanvas.height
      );

      drawTextLayers();
    };

    return;
  }

  drawTextLayers();
}
  
  if (theme === "christmas") {
    ctx.fillStyle = "rgba(0, 150, 0, 0.2)";
    ctx.fillRect(0, 0, resultCanvas.width, resultCanvas.height);
  }

  if (theme === "halloween") {
    ctx.fillStyle = "rgba(255, 140, 0, 0.25)";
    ctx.fillRect(0, 0, resultCanvas.width, resultCanvas.height);
  }

  if (theme === "newyear") {
    ctx.fillStyle = "rgba(255, 215, 0, 0.2)";
    ctx.fillRect(0, 0, resultCanvas.width, resultCanvas.height);
  }
}



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

  resultCanvas.width = currentImage.width;
  resultCanvas.height = currentImage.height;

  ctx.clearRect(0, 0, resultCanvas.width, resultCanvas.height);

  // Apply sliders
  ctx.filter = `
    brightness(${brightnessSlider.value})
    contrast(${contrastSlider.value})
    saturate(${saturationSlider.value})
  `;

  ctx.drawImage(currentImage, 0, 0);
  ctx.filter = "none";

  // VALENTINE THEME
  if (selectedTheme === "valentine") {

    const randomStyle = Math.floor(Math.random() * 3);

    // Pink overlay + glow
    if (randomStyle === 1 || randomStyle === 2) {

      ctx.fillStyle = "rgba(255, 182, 193, 0.25)";
      ctx.fillRect(0, 0, resultCanvas.width, resultCanvas.height);

      ctx.shadowColor = "rgba(255, 105, 180, 0.6)";
      ctx.shadowBlur = 50;
      ctx.globalCompositeOperation = "lighter";
      ctx.drawImage(currentImage, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.shadowBlur = 0;
    }

    // Frame overlay
    if (randomStyle === 0 || randomStyle === 2) {
      const randomOverlay =
        valentineOverlays[Math.floor(Math.random() * valentineOverlays.length)];

      const overlayImage = new Image();
      overlayImage.src = randomOverlay;

      overlayImage.onload = () => {
        ctx.drawImage(
          overlayImage,
          0,
          0,
          resultCanvas.width,
          resultCanvas.height
        );

        drawTextLayers();
      };

      return; // wait for overlay before drawing text
    }
  }

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
