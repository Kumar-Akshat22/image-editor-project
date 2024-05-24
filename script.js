const chooseImage = document.getElementById("chooseImage");
const fileInput = document.getElementById("fileInput");
const flipOptions = document.querySelector(".flipOptions");
const rotateImage = document.getElementById("rotateImage");
const flipImageHorizontal = document.getElementById("flipImageHorizontal");
const flipImageVertical = document.getElementById("flipImageVertical");
const cropBtn = document.getElementById("cropBtn");


let cropper;
const image = document.getElementById("uploadedImage");

chooseImage.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", handleFileSelect);

function handleFileSelect(event) {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        
        reader.onload = (e) => {

            image.style.display = "block";
            image.src = e.target.result;

            if(cropper){

                cropper.destroy();
            }

            cropper = new Cropper(image , {

                aspectRatio : 0,
                viewMode: 0,
            })
        
        
        }

        reader.readAsDataURL(file);
    }
}

rotateImage.addEventListener('click' , ()=>{

    if(cropper){

        cropper.rotate(90);

    }
});

flipImageHorizontal.addEventListener('click' , ()=>{

    if(cropper){


        cropper.scaleX(-cropper.getData().scaleX || -1);
    }
    flipOptions.classList.remove("active");
});

flipImageVertical.addEventListener('click' , ()=>{
    
    if(cropper){
        
        cropper.scaleY(-cropper.getData().scaleY || -1);
        
    }
    flipOptions.classList.remove("active");
});


document.getElementById("flipImage").addEventListener("click", function () {
    flipOptions.classList.add("active");
});

cropBtn.addEventListener('click' , ()=>{

    if(cropper){

        const croppedImage = cropper.getCroppedCanvas();
        const outputImage = document.getElementById("outputImage");
        outputImage.src = croppedImage.toDataURL();
        cropper.destroy();
    }
})