window.onload = function () {

    const upload = document.getElementById("upload");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

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

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
    };

};
