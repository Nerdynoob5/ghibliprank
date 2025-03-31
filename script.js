function uploadImage() {
    let input = document.getElementById('imageInput');
    if (input.files.length === 0) {
        alert("Please upload an image!");
        return;
    }

    let file = input.files[0];
    let reader = new FileReader();

    reader.onload = function(e) {
        let img = new Image();
        img.src = e.target.result;

        img.onload = function() {
            let canvas = document.getElementById('outputCanvas');
            let ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;

            // Show fake processing animation
            document.getElementById('processing').classList.remove('hidden');

            // Fake AI processing time (7-12 sec)
            let processingTime = Math.floor(Math.random() * 5000) + 7000;

            setTimeout(() => {
                document.getElementById('processing').classList.add('hidden');

                // Draw image
                ctx.drawImage(img, 0, 0, img.width, img.height);

                // Add black overlay
                let rectWidth = img.width * 0.7;
                let rectHeight = img.height * 0.5;
                let rectX = (img.width - rectWidth) / 2;
                let rectY = (img.height - rectHeight) / 2;

                ctx.fillStyle = "black";
                ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

                // Roast Message
                ctx.font = `${Math.max(img.width / 20, 30)}px Arial`;
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                let lines = [
                    "Bhai kya soch raha tha?",
                    "Teri tarah AI bhi free hai?",
                    "Coding file hai yeh, Studio Ghibli nahi!",
                    "April Fool ka asar ho gaya!",
                    "Agli baar dimag laga, AI nahi!"
                ];

                let lineHeight = Math.max(img.height / 15, 40);
                let startY = rectY + 50;
                lines.forEach((line, index) => {
                    ctx.fillText(line, img.width / 2, startY + index * lineHeight);
                });

                // Show canvas & buttons
                document.querySelector(".canvas-container").classList.remove('hidden');
            }, processingTime);
        };
    };

    reader.readAsDataURL(file);
}

// Download Pranked Image
function downloadImage() {
    let canvas = document.getElementById('outputCanvas');
    let link = document.createElement('a');
    link.download = 'april-fools-prank.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// Share Prank
function sharePrank() {
    alert("Share this with your friends and watch them get fooled! 😂");
}
