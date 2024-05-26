const chooseImage = document.getElementById("chooseImage");
const fileInput = document.getElementById("fileInput");
const flipOptions = document.querySelector(".flipOptions");
const rotateImage = document.getElementById("rotateImage");
const flipImageHorizontal = document.getElementById("flipImageHorizontal");
const flipImageVertical = document.getElementById("flipImageVertical");
const cropBtn = document.getElementById("cropBtn");
const frameButtons = document.querySelectorAll(".frame");
const image = document.getElementById("uploadedImage");
const outputImage = document.getElementById("outputImage"); 
const useThisImageButton = document.getElementById("useThisImageButton");
const finalFramedImage = document.getElementById("finalFramedImage");
const imageEditor = document.querySelector(".imageEditor");
const closeEditor = document.querySelector(".closeEditor");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector('.close-button');
const finalImageContainer = document.querySelector(".finalImageContainer");

let cropper;
let frameType = 'original';

chooseImage.addEventListener("click", () => {
    fileInput.click();
});


closeEditor.addEventListener("click" , ()=>{

    imageEditor.classList.remove("active");
});

closeModal.addEventListener('click' , ()=>{

    modal.style.display = 'none';
    
})

fileInput.addEventListener("change", handleFileSelect);

function handleFileSelect(event) {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        
        reader.onload = (e) => {

            imageEditor.classList.add("active");
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

    imageEditor.classList.remove("active");
    modal.style.display = 'block';
    if(cropper){

        const croppedImage = cropper.getCroppedCanvas();
        
        outputImage.src = croppedImage.toDataURL();

    }


});

frameButtons.forEach(button=>{

    button.addEventListener('click' , (event) => {

        frameType = event.currentTarget.getAttribute('data-frame');
        console.log(frameType);
        applyFrame(frameType);
    })
})

function applyFrame(frameType){

    if(!outputImage.src)
        return;

    outputImage.className = `frame ${frameType}`;


}

useThisImageButton.addEventListener('click' , ()=>{

    modal.style.display = 'none';
    const croppedImage = cropper.getCroppedCanvas();
    finalFramedImage.src = croppedImage.toDataURL();
    finalFramedImage.className = `frame ${frameType}`;
    finalImageContainer.classList.add("active");
    cropper.destroy();
})