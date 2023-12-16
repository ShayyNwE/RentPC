document.addEventListener('DOMContentLoaded', function () {
    const carouselInner = document.getElementById('carouselInner');
    const thumbnailContainer = document.getElementById('thumbnailContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    const images = document.querySelectorAll('.carousel-item img');
    const totalImages = images.length;
    const thumbnailItems = [];

    let currentIndex = 0;

    // Définir la largeur totale de .carousel-inner
    carouselInner.style.width = `${totalImages * 100}%`;

    // Définir la largeur de chaque .carousel-item
    images.forEach(image => {
        image.parentElement.style.width = `${100 / totalImages}%`;
    });

    // Populate thumbnails
    images.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.classList.add('thumbnail-item');
        thumbnail.innerHTML = `<img src="${image.src}" alt="Thumbnail ${index + 1}">`;
        thumbnail.addEventListener('click', () => {
            showSlide(index);
        });
        thumbnailContainer.appendChild(thumbnail);
        thumbnailItems.push(thumbnail);
    });

    function showSlide(index) {
        const translateX = `-${index * (100 / totalImages)}%`;
        carouselInner.style.transform = `translateX(${translateX})`;

        // Highlight the selected thumbnail
        thumbnailItems.forEach((item, i) => {
            item.classList.toggle('selected', i === index);
        });

        currentIndex = index;
    }

    function navigate(direction) {
        currentIndex += direction;
        if (currentIndex < 0) {
            currentIndex = totalImages - 1;
        } else if (currentIndex >= totalImages) {
            currentIndex = 0;
        }
        const translateX = `-${currentIndex * (100 / totalImages)}%`;
        carouselInner.style.transform = `translateX(${translateX})`;

        // Highlight the selected thumbnail
        thumbnailItems.forEach((item, i) => {
            item.classList.toggle('selected', i === currentIndex);
        });
    }

    prevBtn.addEventListener('click', function () {
        navigate(-1);
    });

    nextBtn.addEventListener('click', function () {
        navigate(1);
    });
});
