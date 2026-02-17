window.onload = function () {

    const upload = document.getElementById("upload");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const brightnessSlider = document.getElementById("brightness");
    const brightnessValue = document.getElementById("brightnessValue");

    const inversionSlider = document.getElementById("inversion");
    const grayscaleSlider = document.getElementById("grayscale");
    const sepiaSlider = document.getElementById("sepia");
    const blurSlider = document.getElementById("blur");
    const rotateSlider = document.getElementById("rotate");

    const inversionValue = document.getElementById("inversionValue");
    const grayscaleValue = document.getElementById("grayscaleValue");
    const sepiaValue = document.getElementById("sepiaValue");
    const blurValue = document.getElementById("blurValue");
    const rotateValue = document.getElementById("rotateValue");

    const flipH = document.getElementById("flipH");
    const flipV = document.getElementById("flipV");

    const resetBtn = document.getElementById("reset");
    const saveBtn = document.getElementById("save");

    let inversion = 0;
    let grayscale = 0;
    let sepia = 0;
    let blur = 0;
    let rotation = 0;

    let flipHorizontal = 1;
    let flipVertical = 1;

    let img = new Image();
    let brightness = 100;

    upload.addEventListener("change", function (e) {

        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (event) {
            img.src = event.target.result;
        };

        reader.readAsDataURL(file);
    });

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



    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;

        applyFilter();
    };

    

    brightnessSlider.addEventListener("input", function () {
        brightness = brightnessSlider.value;
        brightnessValue.innerText = brightness;
        applyFilter();
    });

    const saturationSlider = document.getElementById("saturation");
    const saturationValue = document.getElementById("saturationValue");
    let saturation = 100;

    saturationSlider.addEventListener("input", function () {
    saturation = saturationSlider.value;
    saturationValue.innerText = saturation;
    applyFilter();
    });

inversionSlider.addEventListener("input", function () {
    inversion = inversionSlider.value;
    inversionValue.innerText = inversion;
    applyFilter();
});

grayscaleSlider.addEventListener("input", function () {
    grayscale = grayscaleSlider.value;
    grayscaleValue.innerText = grayscale;
    applyFilter();
});

sepiaSlider.addEventListener("input", function () {
    sepia = sepiaSlider.value;
    sepiaValue.innerText = sepia;
    applyFilter();
});

blurSlider.addEventListener("input", function () {
    blur = blurSlider.value;
    blurValue.innerText = blur;
    applyFilter();
});

rotateSlider.addEventListener("input", function () {
    rotation = rotateSlider.value;
    rotateValue.innerText = rotation;
    applyFilter();
});

flipH.addEventListener("click", function () {
    flipHorizontal = flipHorizontal * -1;
    applyFilter();
});

flipV.addEventListener("click", function () {
    flipVertical = flipVertical * -1;
    applyFilter();
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

    brightnessSlider.value = 100;
    saturationSlider.value = 100;
    inversionSlider.value = 0;
    grayscaleSlider.value = 0;
    sepiaSlider.value = 0;
    blurSlider.value = 0;
    rotateSlider.value = 0;

    brightnessValue.innerText = 100;
    saturationValue.innerText = 100;
    inversionValue.innerText = 0;
    grayscaleValue.innerText = 0;
    sepiaValue.innerText = 0;
    blurValue.innerText = 0;
    rotateValue.innerText = 0;

    applyFilter();
});

saveBtn.addEventListener("click", function () {

    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = canvas.toDataURL();
    link.click();
});




};

