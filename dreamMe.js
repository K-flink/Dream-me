
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
const toggleColorOverlay = document.getElementById("toggleColorOverlay");
const overlayColorInput = document.getElementById("overlayColor");
const overlayOpacityInput = document.getElementById("overlayOpacity");

const themes = {
  valentine: {
    portrait: [
      "assets/valentines/portrait/filter-1.png",
      "assets/valentines/portrait/filter-2.png",
      "assets/valentines/portrait/filter-3.png",
      "assets/valentines/portrait/filter-4.png",
      "assets/valentines/portrait/filter-17.png",
      "assets/valentines/portrait/filter-18.png",
      "assets/valentines/portrait/filter-19.png",
      "assets/valentines/portrait/filter-20.png",
      "assets/valentines/portrait/filter-21.png",
      "assets/valentines/portrait/filter-22.png",
      "assets/valentines/portrait/filter-23.png",
      "assets/valentines/portrait/filter-24.png",
      "assets/valentines/portrait/filter-25.png",
      "assets/valentines/portrait/filter-26.png",
    ],
    landscape: [
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
    ],
  },

  christmas: {
    portrait: [
      "assets/christmas/portrait/filter-1.png",
      "assets/christmas/portrait/filter-2.png",
      "assets/christmas/portrait/filter-3.png",
      "assets/christmas/portrait/filter-4.png",
      "assets/christmas/portrait/filter-5.png",
      "assets/christmas/portrait/filter-6.png",
      "assets/christmas/portrait/filter-7.png",
      "assets/christmas/portrait/filter-8.png",
      "assets/christmas/portrait/filter-9.png",
      "assets/christmas/portrait/filter-10.png",
      "assets/christmas/portrait/filter-11.png",
      "assets/christmas/portrait/filter-12.png",
    ],
    landscape: [
      "assets/christmas/landscape/filter-1.png",
      "assets/christmas/landscape/filter-2.png",
      "assets/christmas/landscape/filter-3.png",
      "assets/christmas/landscape/filter-4.png",
      "assets/christmas/landscape/filter-5.png",
      "assets/christmas/landscape/filter-6.png",
      "assets/christmas/landscape/filter-7.png",
      "assets/christmas/landscape/filter-8.png",
      "assets/christmas/landscape/filter-9.png",
      "assets/christmas/landscape/filter-10.png",
      "assets/christmas/landscape/filter-11.png",
      "assets/christmas/landscape/filter-12.png",
    ],
  },

  halloween: {
    portrait: [
      "assets/halloween/portrait/filter-19.png",
      "assets/halloween/portrait/filter-20.png",
      "assets/halloween/portrait/filter-21.png",
      "assets/halloween/portrait/filter-22.png",
      "assets/halloween/portrait/filter-23.png",
      "assets/halloween/portrait/filter-24.png",
      "assets/halloween/portrait/filter-25.png",
      "assets/halloween/portrait/filter-26.png",
      "assets/halloween/portrait/filter-27.png",
      "assets/halloween/portrait/filter-28.png",
      "assets/halloween/portrait/filter-29.png",
      "assets/halloween/portrait/filter-30.png",
      "assets/halloween/portrait/filter-31.png",
      "assets/halloween/portrait/filter-32.png",
      
    ],
    landscape: [
      "assets/halloween/landscape/filter-1.png",
      "assets/halloween/landscape/filter-2.png",
      "assets/halloween/landscape/filter-3.png",
      "assets/halloween/landscape/filter-4.png",
      "assets/halloween/landscape/filter-5.png",
      "assets/halloween/landscape/filter-6.png",
      "assets/halloween/landscape/filter-7.png",
      "assets/halloween/landscape/filter-8.png",
      "assets/halloween/landscape/filter-9.png",
      "assets/halloween/landscape/filter-10.png",
      "assets/halloween/landscape/filter-11.png",
      "assets/halloween/landscape/filter-12.png",
      "assets/halloween/landscape/filter-13.png",
      "assets/halloween/landscape/filter-14.png",
      "assets/halloween/landscape/filter-15.png",
      "assets/halloween/landscape/filter-16.png",
      "assets/halloween/landscape/filter-17.png",
      "assets/halloween/landscape/filter-18.png",
    ],
  },
  newyear: {
    portrait: [
    "assets/new-years/portrait/filter-11.png",
    "assets/new-years/portrait/filter-12.png",
    "assets/new-years/portrait/filter-13.png",
    "assets/new-years/portrait/filter-14.png",
    "assets/new-years/portrait/filter-15.png",
    "assets/new-years/portrait/filter-16.png",
    "assets/new-years/portrait/filter-17.png",
    "assets/new-years/portrait/filter-18.png",
    "assets/new-years/portrait/filter-19.png",
    "assets/new-years/portrait/filter-20.png",
  ],
    landscape: [
      "assets/new-years/landscape/filter-1.png",
      "assets/new-years/landscape/filter-2.png",
      "assets/new-years/landscape/filter-3.png",
      "assets/new-years/landscape/filter-4.png",
      "assets/new-years/landscape/filter-5.png",
      "assets/new-years/landscape/filter-6.png",
      "assets/new-years/landscape/filter-7.png",
      "assets/new-years/landscape/filter-8.png",
      "assets/new-years/landscape/filter-9.png",
      "assets/new-years/landscape/filter-10.png",
    ]
  },
};


let draggingText = null;
let offsetX = 0;
let offsetY = 0;

let currentImage = null;
let textLayers = [];

let selectedFile = null;

let selectedOverlayImage = null;

let colorOverlayEnabled = false;
let colorOverlayValue = "#ff69b4";
let colorOverlayOpacity = 0.3;

let selectedTextLayer = null;

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

    const orientation = isPhotoPortrait ? "portrait" : "landscape";

    const overlaysToUse = themes[selectedTheme][orientation];

    if (!overlaysToUse || overlaysToUse.length === 0) {
  console.error("No overlays found for theme:", selectedTheme);
  return;
}
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

  
  ctx.filter = "none";

  
  if (selectedOverlayImage) {
    ctx.drawImage(
      selectedOverlayImage,
      0,
      0,
      resultCanvas.width,
      resultCanvas.height
    );
  }

  
   if (colorOverlayEnabled) {
    ctx.globalCompositeOperation = "soft-light"; // turn blend mode on
    ctx.fillStyle = hexToRgba(colorOverlayValue, colorOverlayOpacity);
    ctx.fillRect(0, 0, resultCanvas.width, resultCanvas.height);
    ctx.globalCompositeOperation = "source-over"; // turn blend mode OFF
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
// sliders
brightnessSlider.oninput = drawCanvas;
contrastSlider.oninput = drawCanvas;
saturationSlider.oninput = drawCanvas;
//text updates
textInput.oninput = () => {
  if (!selectedTextLayer) return;

  selectedTextLayer.text = textInput.value;
  drawCanvas();
};
textSize.oninput = () => {
  if (!selectedTextLayer) return;
  selectedTextLayer.size = textSize.value;
  drawCanvas();
};

textColor.oninput = () => {
  if (!selectedTextLayer) return;
  selectedTextLayer.color = textColor.value;
  drawCanvas();
};

fontSelect.onchange = () => {
  if (!selectedTextLayer) return;
  selectedTextLayer.font = fontSelect.value;
  drawCanvas();
};

toggleColorOverlay.onchange = () => {
  colorOverlayEnabled = toggleColorOverlay.checked;
  drawCanvas();
};

overlayColorInput.oninput = () => {
  colorOverlayValue = overlayColorInput.value;
  drawCanvas();
};

overlayOpacityInput.oninput = () => {
  colorOverlayOpacity = overlayOpacityInput.value;
  drawCanvas();
};

addTextBtn.onclick = () => {
  if (!textInput.value) return;

  if (selectedTextLayer) {
    // for editing the existing text
    selectedTextLayer.text = textInput.value;
    selectedTextLayer.size = textSize.value;
    selectedTextLayer.color = textColor.value;
    selectedTextLayer.font = fontSelect.value;

    selectedTextLayer = null;
  } else {
    // for adding new text
    textLayers.push({
      text: textInput.value,
      size: textSize.value,
      color: textColor.value,
      font: fontSelect.value,
      x: resultCanvas.width / 2,
      y: resultCanvas.height / 2
    });
  }

  drawCanvas();
};

function hexToRgba(hex, opacity) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

resultCanvas.addEventListener("mousedown", (e) => {
  const rect = resultCanvas.getBoundingClientRect();

  const scaleX = resultCanvas.width / rect.width;
  const scaleY = resultCanvas.height / rect.height;

  const mouseX = (e.clientX - rect.left) * scaleX;
  const mouseY = (e.clientY - rect.top) * scaleY;

  textLayers.forEach(text => {
    ctx.font = `${text.size}px ${text.font}`;
    const width = ctx.measureText(text.text).width;
    const height = text.size;

    if (
      mouseX > text.x &&
      mouseX < text.x + width &&
      mouseY > text.y - height &&
      mouseY < text.y
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

  const scaleX = resultCanvas.width / rect.width;
  const scaleY = resultCanvas.height / rect.height;

  const mouseX = (e.clientX - rect.left) * scaleX;
  const mouseY = (e.clientY - rect.top) * scaleY;

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

resultCanvas.addEventListener("dblclick", (e) => {
  const rect = resultCanvas.getBoundingClientRect();

  const scaleX = resultCanvas.width / rect.width;
  const scaleY = resultCanvas.height / rect.height;

  const mouseX = (e.clientX - rect.left) * scaleX;
  const mouseY = (e.clientY - rect.top) * scaleY;

  selectedTextLayer = null;

  textLayers.forEach(text => {
    ctx.font = `${text.size}px ${text.font}`;
    const width = ctx.measureText(text.text).width;
    const height = text.size;

    if (
      mouseX > text.x &&
      mouseX < text.x + width &&
      mouseY > text.y - height &&
      mouseY < text.y
    ) {
      selectedTextLayer = text;
    }
  });

  if (selectedTextLayer) {
    textInput.value = selectedTextLayer.text;
    textSize.value = selectedTextLayer.size;
    textColor.value = selectedTextLayer.color;
    fontSelect.value = selectedTextLayer.font;

    textInput.focus();
  }
});

/* for downloading */

downloadButton.onclick = () => {
  try {
    const link = document.createElement("a");
    link.download = "dream-me.png";
    link.href = resultCanvas.toDataURL("image/png");
    link.click();
  } catch (error) {
    console.error("Download failed:", error);
    alert("Download failed. Check console.");
  }
};
