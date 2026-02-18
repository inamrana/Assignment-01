window.onload = function () {

    const upload = document.getElementById("upload");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const brightnessSlider = document.getElementById("brightness");
    const saturationSlider = document.getElementById("saturation");
    const inversionSlider = document.getElementById("inversion");
    const grayscaleSlider = document.getElementById("grayscale");
    const sepiaSlider = document.getElementById("sepia");
    const blurSlider = document.getElementById("blur");
    const rotateSlider = document.getElementById("rotate");

    const brightnessValue = document.getElementById("brightnessValue");
    const saturationValue = document.getElementById("saturationValue");
    const inversionValue = document.getElementById("inversionValue");
    const grayscaleValue = document.getElementById("grayscaleValue");
    const sepiaValue = document.getElementById("sepiaValue");
    const blurValue = document.getElementById("blurValue");
    const rotateValue = document.getElementById("rotateValue");

    const flipH = document.getElementById("flipH");
    const flipV = document.getElementById("flipV");
    const resetBtn = document.getElementById("reset");
    const saveBtn = document.getElementById("save");
    const undoBtn = document.getElementById("undo");
    const redoBtn = document.getElementById("redo");
    const historyList = document.getElementById("historyList");

    let rollLastTwo = 39;
    let step = rollLastTwo % 2 === 0 ? 2 : 3;

    brightnessSlider.step = step;
    saturationSlider.step = step;
    inversionSlider.step = step;
    grayscaleSlider.step = step;
    sepiaSlider.step = step;
    blurSlider.step = step;
    rotateSlider.step = step;

    let brightness = 100;
    let saturation = 100;
    let inversion = 0;
    let grayscale = 0;
    let sepia = 0;
    let blur = 0;
    let rotation = 0;
    let flipHorizontal = 1;
    let flipVertical = 1;

    let history = [];
    let currentIndex = -1;

    let img = new Image();

    upload.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (event) {
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });

    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        applyFilter();
        saveState("Original");
    };

    function applyFilter() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.scale(flipHorizontal, flipVertical);
        ctx.filter =
            "brightness(" + brightness + "%) " +
            "saturate(" + saturation + "%) " +
            "invert(" + inversion + "%) " +
            "grayscale(" + grayscale + "%) " +
            "sepia(" + sepia + "%) " +
            "blur(" + blur + "px)";
        ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2);
        ctx.restore();
    }

    function saveState(action) {
        history = history.slice(0, currentIndex + 1);
        history.push({
            brightness,
            saturation,
            inversion,
            grayscale,
            sepia,
            blur,
            rotation,
            flipHorizontal,
            flipVertical,
            action
        });
        currentIndex++;
        renderHistory();
        updateButtons();
    }

    function restoreState(index) {
        const state = history[index];
        brightness = state.brightness;
        saturation = state.saturation;
        inversion = state.inversion;
        grayscale = state.grayscale;
        sepia = state.sepia;
        blur = state.blur;
        rotation = state.rotation;
        flipHorizontal = state.flipHorizontal;
        flipVertical = state.flipVertical;

        brightnessSlider.value = brightness;
        saturationSlider.value = saturation;
        inversionSlider.value = inversion;
        grayscaleSlider.value = grayscale;
        sepiaSlider.value = sepia;
        blurSlider.value = blur;
        rotateSlider.value = rotation;

        brightnessValue.innerText = brightness;
        saturationValue.innerText = saturation;
        inversionValue.innerText = inversion;
        grayscaleValue.innerText = grayscale;
        sepiaValue.innerText = sepia;
        blurValue.innerText = blur;
        rotateValue.innerText = rotation;

        currentIndex = index;
        applyFilter();
        renderHistory();
        updateButtons();
    }

    function renderHistory() {
        historyList.innerHTML = "";
        history.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "history-item";
            if (index === currentIndex) div.classList.add("active");
            div.innerText = item.action;
            div.onclick = function () {
                restoreState(index);
            };
            historyList.appendChild(div);
        });
    }

    function updateButtons() {
        undoBtn.disabled = currentIndex <= 0;
        redoBtn.disabled = currentIndex >= history.length - 1;
    }

    function handleChange(action) {
        applyFilter();
        saveState(action);
    }

    brightnessSlider.addEventListener("input", function () {
        brightness = brightnessSlider.value;
        brightnessValue.innerText = brightness;
        handleChange("Brightness " + brightness + "%");
    });

    saturationSlider.addEventListener("input", function () {
        saturation = saturationSlider.value;
        saturationValue.innerText = saturation;
        handleChange("Saturation " + saturation + "%");
    });

    inversionSlider.addEventListener("input", function () {
        inversion = inversionSlider.value;
        inversionValue.innerText = inversion;
        handleChange("Inversion " + inversion + "%");
    });

    grayscaleSlider.addEventListener("input", function () {
        grayscale = grayscaleSlider.value;
        grayscaleValue.innerText = grayscale;
        handleChange("Grayscale " + grayscale + "%");
    });

    sepiaSlider.addEventListener("input", function () {
        sepia = sepiaSlider.value;
        sepiaValue.innerText = sepia;
        handleChange("Sepia " + sepia + "%");
    });

    blurSlider.addEventListener("input", function () {
        blur = blurSlider.value;
        blurValue.innerText = blur;
        handleChange("Blur " + blur + "px");
    });

    rotateSlider.addEventListener("input", function () {
        rotation = rotateSlider.value;
        rotateValue.innerText = rotation;
        handleChange("Rotate " + rotation + "°");
    });

    flipH.addEventListener("click", function () {
        flipHorizontal *= -1;
        handleChange("Flip Horizontal");
    });

    flipV.addEventListener("click", function () {
        flipVertical *= -1;
        handleChange("Flip Vertical");
    });

    resetBtn.addEventListener("click", function () {
        brightness = 100;
        saturation = 100;
        inversion = 0;
        grayscale = 0;
        sepia = 0;
        blur = 0;
        rotation = 0;
        flipHorizontal = 1;
        flipVertical = 1;
        applyFilter();
        saveState("Reset");
    });

    saveBtn.addEventListener("click", function () {
        const link = document.createElement("a");
        link.download = "edited-image.png";
        link.href = canvas.toDataURL();
        link.click();
    });

    undoBtn.addEventListener("click", function () {
        if (currentIndex > 0) restoreState(currentIndex - 1);
    });

    redoBtn.addEventListener("click", function () {
        if (currentIndex < history.length - 1) restoreState(currentIndex + 1);
    });
};
