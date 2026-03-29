// Main gallery photos (28 images in subfolder)
const photosCount = 28;
// Slideshow photos (1-4 images)
const featuredPhotos = Array.from({ length: 4 }, (_, i) => `${i + 1}.webp`);

const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');

/* --- Slideshow Logic --- */
const featuredDiv = document.createElement('div');
featuredDiv.className = 'featured-photo';

const imgLayerA = document.createElement('img');
const imgLayerB = document.createElement('img');

imgLayerA.src = `images/featured-photo/${featuredPhotos[0]}`;
imgLayerA.style.opacity = 1;
imgLayerA.style.zIndex = 2;
imgLayerB.style.opacity = 0;
imgLayerB.style.zIndex = 1;

featuredDiv.appendChild(imgLayerA);
featuredDiv.appendChild(imgLayerB);

const mainTitle = document.querySelector('.main-title');
if (mainTitle) {
    mainTitle.parentNode.insertBefore(featuredDiv, mainTitle.nextSibling);
    
    // Insert the intro quote right after the slideshow
    const introQuote = document.createElement('section');
    introQuote.className = 'gallery-text-break dream-role-text'; 
    introQuote.innerHTML = `
        <div class="text-content">
            <p>With a suicide behind the scenes, pictures that been taken from the internet and lies.. I got the dream role to be a military photographer.</p>
        </div>
    `;
    featuredDiv.parentNode.insertBefore(introQuote, featuredDiv.nextSibling);
}

let currentIndex = 0;
let activeLayer = imgLayerA;
let hiddenLayer = imgLayerB;

setInterval(() => {
    currentIndex = (currentIndex + 1) % featuredPhotos.length;
    hiddenLayer.src = `images/featured-photo/${featuredPhotos[currentIndex]}`;
    hiddenLayer.onload = () => {
        hiddenLayer.style.opacity = 1;
        activeLayer.style.opacity = 0;
        hiddenLayer.style.zIndex = 2;
        activeLayer.style.zIndex = 1;
        [activeLayer, hiddenLayer] = [hiddenLayer, activeLayer];
    };
}, 4000);

featuredDiv.onclick = () => {
    lightbox.style.display = "block";
    lightboxImg.src = activeLayer.src; 
};

/* --- Scattered Gallery Logic --- */
const layoutClasses = [
    ['medium', 'left', 'push-up'], // 1
    ['small', 'right', 'push-down'], // 2
    ['tall', 'center'],    // 3
    ['medium', 'right', 'mobile-left-force'],   // 4
    ['medium', 'left', 'push-down'], // 5
    ['medium', 'right', 'push-up', 'mobile-margin-top'],    // 6
    ['diptych-member'], // 7
    ['diptych-member'], // 8 
    ['medium', 'right', 'push-up', 'mobile-big-force', 'mobile-landscape-big-force'], // 9
    ['small', 'left', 'push-down'],   // 10
    ['medium', 'right', 'push-up', 'mobile-landscape-big-force'],   // 11
    ['small', 'left', 'push-down'],  // 12
    ['medium', 'right', 'push-up', 'mobile-landscape-big-force'],  // 13 
    ['semi-wide', 'left', 'push-down', 'mobile-landscape-big-force'],  // 14
    ['wide', 'center', 'stacked-pair'], // 15
    ['wide', 'center', 'stacked-pair'],  // 16
    ['small', 'left', 'push-down'],  // 17
    ['medium', 'center', 'push-up'],  // 18
    ['medium', 'right', 'push-down'],  // 19 
    ['medium', 'left', 'push-up'],  // 20
    ['medium', 'right', 'push-down'], // 21
    ['special-medium', 'left', 'push-up'],  // 22
    ['medium', 'right', 'push-down'], // 23
    ['medium', 'left', 'push-up'], // 24
    ['semi-medium'],  // 25
    ['big', 'right', 'right-landscape'], // 26
    ['big', 'left', 'left-landscape'], // 27
    ['huge', 'center'] // 28
];

// This loop generates the items and injects them into the empty #gallery
let diptychContainer = null;
let stackedContainer = null;

for (let i = 1; i <= photosCount; i++) {
    const div = document.createElement('div');
    div.classList.add('photo-item', ...layoutClasses[i - 1]);

    if (i === 5) {
        // Comparison Slider
        div.innerHTML = `
            <div class="comparison-slider gallery-slider">
                <img src="images/edited/2.webp" alt="After" class="img-after">
                <div class="img-before">
                    <img src="images/edited/1.webp" alt="Before">
                </div>
                <div class="slider-handle">
                    <div class="handle-line"></div>
                    <div class="handle-circle"></div>
                </div>
                <input type="range" min="0" max="100" value="50" class="slider-input">
            </div>
        `;
    } else {
        // Regular Gallery Photo
        const img = document.createElement('img');
        img.src = `images/gallery-photos/${i}.webp`;
        img.alt = `Gallery Image ${i}`;
        img.loading = "lazy";
        img.onclick = () => {
            lightbox.style.display = "block";
            lightboxImg.src = img.src;
        };
        div.appendChild(img);
    }

    if (i === 7 || i === 8) {
        // Handle Diptych Group
        if (!diptychContainer) {
            diptychContainer = document.createElement('div');
            diptychContainer.className = 'diptych-row';
            gallery.appendChild(diptychContainer);
        }
        diptychContainer.appendChild(div);
        if (i === 8) {
        const cameraQuote = document.createElement('section');
        cameraQuote.className = 'gallery-text-break dream-role-text'; 
        cameraQuote.innerHTML = `
            <div class="text-content">
                <p>Never in my life did I think a camera had more than one big button on the side.</p>
            </div>
        `;
        gallery.appendChild(cameraQuote);
    }
    } 
    else if (i === 15 || i === 16) {
        // Handle Stacked Column Group
        if (!stackedContainer) {
            stackedContainer = document.createElement('div');
            stackedContainer.className = 'stacked-column'; 
            gallery.appendChild(stackedContainer);
        }
        stackedContainer.appendChild(div);

        if (i === 16) {
            const logisticsQuote = document.createElement('section');
            logisticsQuote.className = 'gallery-text-break dream-role-text'; 
            logisticsQuote.innerHTML = `
                <div class="text-content">
                    <p>I was assigned to the public relations section of the Logistics Corps.<br>
                    The corps of storekeepers, cooks, drivers and all the inferiors of society of all kinds.<br>
                    I'm the inferior military photographer.</p>
                </div>
            `;
            gallery.appendChild(logisticsQuote);
        }
    } 
    else {
        gallery.appendChild(div);

        if (i === 25) {
            const finalQuote = document.createElement('section');
            finalQuote.className = 'gallery-text-break dream-role-text'; 
            finalQuote.innerHTML = `
                <div class="text-content">
                    <p>Three years went by and I can tell you right now that everything was beautiful and nothing hurt. (:</p>
                </div>
            `;
            gallery.appendChild(finalQuote);
        }
    }

    if (i === 27) {
        // Insert Text Break after photo 27
        const textBreak = document.createElement('section');
        textBreak.className = 'gallery-text-break';
        textBreak.innerHTML = `
            <div class="text-content">
                <p>"If you'll believe in me, I will believe in you. Is that a bargain?"</p>
            </div>
        `;
        gallery.appendChild(textBreak);
    }
}

/* --- Comparison Slider Logic --- */
const initSliders = () => {
    const sliders = document.querySelectorAll('.comparison-slider');
    
    sliders.forEach(slider => {
        const input = slider.querySelector('.slider-input');
        const beforeContainer = slider.querySelector('.img-before');
        const beforeImg = beforeContainer.querySelector('img');
        const handle = slider.querySelector('.slider-handle');

        const syncImageSize = () => {
            const sliderWidth = slider.offsetWidth;
            if (sliderWidth > 0) {
                beforeImg.style.width = sliderWidth + 'px';
            }
        };

        syncImageSize();
        window.addEventListener('resize', syncImageSize);

        input.addEventListener('input', (e) => {
            const value = e.target.value + "%";
            beforeContainer.style.width = value; 
            handle.style.left = value;
        });
    });
};
// Call the function to initialize sliders after DOM content is loaded
initSliders();

/* --- UI Handlers --- */
closeBtn.onclick = () => lightbox.style.display = "none";
lightbox.onclick = (e) => {
    if (e.target !== lightboxImg) lightbox.style.display = "none";
};

function closeContactCard() {
    document.getElementById('floatingCard').style.display = 'none';
}

const topNav = document.querySelector('.top-nav');
const triggerElement = document.querySelector('.featured-photo');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            topNav.classList.add('visible');
        } else {
            topNav.classList.remove('visible');
        }
    });
}, {
    threshold: 0.1
});

if (triggerElement && topNav) {
    navObserver.observe(triggerElement);
}

function toggleBio() {
    const bioOverlay = document.getElementById('bioOverlay');
    const isVisible = bioOverlay.style.display === 'flex';
    
    if (isVisible) {
        bioOverlay.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    } else {
        bioOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Disable background scrolling
    }
}

// Close bio if clicking outside the content box
window.addEventListener('click', (e) => {
    const bioOverlay = document.getElementById('bioOverlay');
    if (e.target === bioOverlay) {
        toggleBio();
    }
});