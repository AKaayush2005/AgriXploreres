// Global Variables
let currentStep = 1;
let carouselIntervals = new Map();

// Global timing constant (ms) -- change this to adjust all carousel timings
const CAROUSEL_INTERVAL_MS = 3000;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize Website
function initializeWebsite() {
    initializeNavigation();
    initializeCarousels();
    initializeSmartDashboard();
    initializeFAQ();
    initializeContactForm();
    initializeScrollAnimations();
}

// Navigation Functions
function initializeNavigation() {
    const nav = document.querySelector('.header');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Sticky navigation
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = 'none';
        }
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Carousel Functions
function initializeCarousels() {
    // Initialize all carousels with auto-advance
    const carousels = document.querySelectorAll('.crop-carousel, .health-carousel, .mood-carousel');
    
    carousels.forEach((carousel, index) => {
        const images = carousel.querySelectorAll('.crop-image, .health-image, .mood-image');
        const indicators = carousel.querySelectorAll('.indicator');
        
        if (images.length > 1) {
            let currentIndex = 0;
            
            // Auto-advance every 3 seconds
            const interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                showImage(carousel, currentIndex);
            }, CAROUSEL_INTERVAL_MS);
            
            carouselIntervals.set(carousel, interval);
            
            // Pause on hover
            carousel.addEventListener('mouseenter', () => {
                const _id = carouselIntervals.get(carousel); if (_id) clearInterval(_id);
            });
            
            // Resume on mouse leave
            carousel.addEventListener('mouseleave', () => {
                const newInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % images.length;
                    showImage(carousel, currentIndex);
                }, CAROUSEL_INTERVAL_MS);
                carouselIntervals.set(carousel, newInterval);
            });
            
            // Click indicators
            indicators.forEach((indicator, idx) => {
                indicator.addEventListener('click', () => {
                    currentIndex = idx;
                    showImage(carousel, currentIndex);
                });
            });
        }
    });
}

function showImage(carousel, index) {
    const images = carousel.querySelectorAll('.crop-image, .health-image, .mood-image');
    const indicators = carousel.querySelectorAll('.indicator');
    
    images.forEach((img, idx) => {
        img.classList.toggle('active', idx === index);
    });
    
    indicators.forEach((indicator, idx) => {
        indicator.classList.toggle('active', idx === index);
    });
}

function nextImage(button) {
    const carousel = button.closest('.crop-carousel, .health-carousel, .mood-carousel');
    if (!carousel) return;
    const images = carousel.querySelectorAll('.crop-image, .health-image, .mood-image');
    if (!images || images.length === 0) return;
    let currentIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
    if (currentIndex === -1) currentIndex = 0;
    const nextIndex = (currentIndex + 1) % images.length;
    showImage(carousel, nextIndex);
}

function prevImage(button) {
    const carousel = button.closest('.crop-carousel, .health-carousel, .mood-carousel');
    if (!carousel) return;
    const images = carousel.querySelectorAll('.crop-image, .health-image, .mood-image');
    if (!images || images.length === 0) return;
    let currentIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
    if (currentIndex === -1) currentIndex = 0;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(carousel, prevIndex);
}

function nextHealthImage(button) {
    nextImage(button);
}

function prevHealthImage(button) {
    prevImage(button);
}

function nextMoodImage(button) {
    nextImage(button);
}

function prevMoodImage(button) {
    prevImage(button);
}

// Season Tab Functions
function showSeason(season, event) {
    // Hide all season contents
    const seasonContents = document.querySelectorAll('.season-content');
    seasonContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tabs
    const seasonTabs = document.querySelectorAll('.season-tab');
    seasonTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected season content
    const selectedContent = document.getElementById(season);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }
    
    // Add active class to clicked tab
    event.target.classList.add('active');
}

// Smart Dashboard Functions
function initializeSmartDashboard() {
    // Simulate real-time sensor data updates
    setInterval(updateSensorData, 5000);
    
    // Initialize with random data
    updateSensorData();
}

function updateSensorData() {
    // Temperature (20-30°C)
    const temperature = (20 + Math.random() * 10).toFixed(1);
    const tempElement = document.getElementById('temperature');
    if (tempElement) {
        tempElement.textContent = temperature;
    }
    
    // Humidity (50-80%)
    const humidity = Math.floor(50 + Math.random() * 30);
    const humidityElement = document.getElementById('humidity');
    if (humidityElement) {
        humidityElement.textContent = humidity;
    }
    
    // pH (6.0-7.5)
    const ph = (6.0 + Math.random() * 1.5).toFixed(1);
    const phElement = document.getElementById('ph');
    if (phElement) {
        phElement.textContent = ph;
    }
    
    // Soil Moisture (60-90%)
    const moisture = Math.floor(60 + Math.random() * 30);
    const moistureElement = document.getElementById('moisture');
    if (moistureElement) {
        moistureElement.textContent = moisture;
    }
}

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

function openLoginModal() {
    openModal('loginModal');
}

function openUrbanFarmModal() {
    openModal('urbanFarmModal');
    resetWizard();
}

function openServiceModal(serviceType) {
    const modal = document.getElementById('serviceModal');
    const title = document.getElementById('serviceModalTitle');
    const content = document.getElementById('serviceModalContent');
    
    const serviceData = {
        community: {
            title: '🌻 Community Gardens',
            content: `
                <div class="service-detail">
                    <h3>🌱 Our Vision</h3>
                    <p>Turning unused urban spaces into mini-farms where communities grow food together, share knowledge, and create a greener, healthier future.</p>
                    
                    <h3>🍅 Why It Matters</h3>
                    <ul>
                        <li><strong>Fresh & Affordable Food</strong> – Locally grown, pesticide-free produce right where you live.</li>
                        <li><strong>Healthier Communities</strong> – Children and adults learn farming hands-on, reconnecting with nature.</li>
                        <li><strong>Eco-Friendly Cities</strong> – Reduces food miles, lowers carbon footprint, and adds greenery.</li>
                        <li><strong>Stronger Bonds</strong> – Neighbors, families, and friends come together, working side by side.</li>
                    </ul>
                    
                    <h3>🌿 How It Works</h3>
                    <ol>
                        <li><strong>Convert Spaces</strong> – Society rooftops, school yards, or public parks are transformed into vibrant gardens.</li>
                        <li><strong>Contribute & Earn</strong> – Members contribute time, tools, or compost. Efforts are rewarded with Green Credits.</li>
                        <li><strong>Share the Harvest</strong> – Tokens can be redeemed for fresh produce, eco-store discounts, or community rewards.</li>
                        <li><strong>Learn & Grow</strong> – Kids and adults gain hands-on farming skills, from seed to harvest.</li>
                    </ol>
                    
                    <div class="cta-section">
                        <button class="btn btn-primary" onclick="showComingSoon()">Join the Garden 🌿</button>
                    </div>
                </div>
            `
        },
        rooftop: {
            title: '🌿 Rooftop & Apartment Farming',
            content: `
                <div class="service-detail">
                    <h3>Vertical Farming Revolution</h3>
                    <p>Have you ever thought about a farm that doesn't spread out across fields but grows upwards like a tall building? That's what vertical farming is all about.</p>
                    
                    <h3>How It Works</h3>
                    <p>The plants aren't sitting in regular soil. Most of the time, they grow through systems like hydroponics or aeroponics. Their roots get fed with water, nutrients, or a fine mist instead of dirt.</p>
                    
                    <h3>Why It's Exciting</h3>
                    <ul>
                        <li><strong>Space Efficient</strong> – One decent rooftop farm can grow as much food as a small patch of farmland</li>
                        <li><strong>Year-Round Harvest</strong> – Climate-controlled environment means fresh greens all year</li>
                        <li><strong>Cleaner Crops</strong> – Usually need far fewer pesticides, so they're healthier</li>
                        <li><strong>Beautiful Design</strong> – Green walls full of fresh plants look amazing and cool down rooms</li>
                    </ul>
                    
                    <div class="cta-section">
                        <button class="btn btn-primary" onclick="showComingSoon()">Start Rooftop Farm 🏠</button>
                    </div>
                </div>
            `
        },
        hydroponics: {
            title: '💧 Urban Hydroponics Kits',
            content: `
                <div class="service-detail">
                    <h3>Grow More with Less</h3>
                    <p>Low-Cost, Low-Power Hydroponics Kits designed for schools, residential buildings, and community spaces. Grow fresh, chemical-free food with 90% less water, minimal power, and no soil.</p>
                    
                    <h3>How to Build It as a Community</h3>
                    <ol>
                        <li><strong>Form a Green Team 🌿</strong> – Schools: Student eco-clubs with teacher guidance. Societies: Volunteer families take turns.</li>
                        <li><strong>Select a Common Space</strong> – Rooftops, courtyards with 6–8 hours of sunlight.</li>
                        <li><strong>Install the System Together</strong> – DIY-friendly kits, quick installation under 2–3 hours.</li>
                        <li><strong>Share Roles & Responsibilities</strong> – Weekly maintenance, shared harvesting.</li>
                        <li><strong>Enjoy the Harvest 🍅</strong> – Fresh vegetables for all members.</li>
                    </ol>
                    
                    <h3>What's in Our Kit</h3>
                    <ul>
                        <li>Hydroponic Structure (NFT / DWC / Vertical Tower)</li>
                        <li>Compact Low-Power Pump</li>
                        <li>Reservoir & Pipes</li>
                        <li>Growing Media & Nutrient Solution</li>
                        <li>Starter Seedlings Pack</li>
                        <li>DIY Setup Guide + Online Support</li>
                    </ul>
                    
                    <div class="cta-section">
                        <button class="btn btn-primary" onclick="showComingSoon()">Get Hydroponics Kit 💧</button>
                    </div>
                </div>
            `
        },
        vertical: {
            title: '🏙 Vertical Farming',
            content: `
                <div class="service-detail">
                    <h3>🌱 Our Vision</h3>
                    <p>Transforming urban rooftops, basements, and community centers into high-yield vertical farms that grow food all year round while saving space, water, and energy.</p>
                    
                    <h3>🍅 Why It Matters</h3>
                    <ul>
                        <li><strong>Space-Smart Farming</strong> – Perfect for cities with limited land</li>
                        <li><strong>Water Efficiency</strong> – Uses up to 90% less water than traditional farming</li>
                        <li><strong>Year-Round Harvests</strong> – Controlled indoor environments mean fresh produce in every season</li>
                        <li><strong>Food Security</strong> – Reduces reliance on long-distance supply chains</li>
                    </ul>
                    
                    <h3>🌿 How It Works</h3>
                    <ol>
                        <li><strong>Vertical Systems</strong> – Stacked layers of crops using hydroponics or aeroponics</li>
                        <li><strong>Smart Environments</strong> – Indoor lighting, climate control, and nutrient management</li>
                        <li><strong>Local Distribution</strong> – Produce harvested on-site delivered directly to residents</li>
                        <li><strong>Sustainable Cycles</strong> – Minimal land, less water, zero pesticides</li>
                    </ol>
                    
                    <div class="cta-section">
                        <button class="btn btn-primary" onclick="showComingSoon()">Explore Vertical Farming 🌿</button>
                    </div>
                </div>
            `
        },
        
        aeroponics: {
            title: '🌬 Aeroponics: Farming in the Air',
            content: `
                <div class="service-detail">
                    <h3>🌱 Our Vision</h3>
                    <p>Growing food without soil or excessive water — using mist, air, and nutrients to cultivate crops faster, healthier, and more sustainably than ever before.</p>
                    
                    <h3>🍅 Why It Matters</h3>
                    <ul>
                        <li><strong>Soil-Free Farming</strong> – Ideal for urban spaces where soil quality is poor</li>
                        <li><strong>Water Savings</strong> – Uses up to 95% less water than traditional farming</li>
                        <li><strong>Higher Yields</strong> – Plants grow up to 3x faster in controlled aeroponic systems</li>
                        <li><strong>Cleaner & Safer</strong> – Zero soil-borne diseases, no pesticides</li>
                    </ul>
                    
                    <h3>🌿 How It Works</h3>
                    <ol>
                        <li><strong>Roots in the Air</strong> – Plant roots are suspended in a closed chamber</li>
                        <li><strong>Nutrient Mist</strong> – Roots are regularly sprayed with nutrient-rich mist</li>
                        <li><strong>Controlled Growth</strong> – Light, humidity, and temperature optimized</li>
                        <li><strong>Harvest Fresh</strong> – High-quality produce in compact setups</li>
                    </ol>
                    
                    <div class="cta-section">
                        <button class="btn btn-primary" onclick="showComingSoon()">Discover Aeroponics 🌬</button>
                        <button class="btn btn-secondary" onclick="showComingSoon()">Get Aeroponics Kit 🌱</button>
                    </div>
                </div>
            `
        },

      agripreneurs: {
    title: '🌱 Seed2Success: Learn, Grow, Lead',
    content: `
        <div class="service-detail">
            <h3>🌿 Why Do This?</h3>
            <ul>
                <li><strong>Promote Sustainability Awareness</strong> – Kids learn how food grows, the importance of green spaces, and eco-friendly practices.</li>
                <li><strong>Hands-on Learning</strong> – Children get real experience in planting, nurturing, and harvesting.</li>
                <li><strong>Entrepreneurship Mindset</strong> – They explore how farming can also mean innovation, teamwork, and small business ideas.</li>
                <li><strong>Healthy Living Habits</strong> – Exposure to fresh food, healthy diets, and connection to nature.</li>
                <li><strong>Leadership & Creativity</strong> – Students take ownership, design solutions, and share their learning with the school community.</li>
            </ul>

            <h3>📘 How? – Step by Step Program</h3>
            <ol>
                <li>
                    <strong>Intro Workshop (Awareness)</strong>
                    <ul>
                        <li>Storytelling session: “From Seed to Salad” – journey of food.</li>
                        <li>Short films/animations about urban & rooftop farming.</li>
                        <li>Group activity: “What if our school roof was a farm?”</li>
                        <li>✅ <em>Impact:</em> Children get curious and inspired.</li>
                    </ul>
                </li>
                <li>
                    <strong>Learning Workshops (Skill Building)</strong>
                    <ul>
                        <li>Basics of urban farming: soil gardening, composting, hydroponics.</li>
                        <li>DIY Session: Make a mini grow kit (bottle hydroponics / recycled pot).</li>
                        <li>Support from AgriXplorers: demos, supply kits, program management.</li>
                        <li>✅ <em>Impact:</em> Kids gain practical skills + schools get structured guidance.</li>
                    </ul>
                </li>
                <li>
                    <strong>AgriPreneurship Challenge</strong>
                    <ul>
                        <li>Students form “Green Crews.”</li>
                        <li>Each team gets a plot/container/rooftop section.</li>
                        <li>They grow fast crops (spinach, lettuce, mint, coriander).</li>
                        <li>Basics of branding, packaging, and marketing.</li>
                        <li>✅ <em>Impact:</em> Teamwork + innovation + business basics.</li>
                    </ul>
                </li>
                <li>
                    <strong>Show & Sell Day</strong>
                    <ul>
                        <li>Mini farmers’ market in school.</li>
                        <li>Kids create labels, posters, and slogans.</li>
                        <li>Sell produce to teachers, parents, and peers.</li>
                        <li>Profits → reinvest in farming or support social causes.</li>
                        <li>✅ <em>Impact:</em> Builds confidence, communication, and social responsibility.</li>
                    </ul>
                </li>
                <li>
                    <strong>Reflection + Recognition</strong>
                    <ul>
                        <li>Students share experiences through presentations / storytelling.</li>
                        <li>Acknowledge top teams for innovation, teamwork, sustainability.</li>
                        <li>Awards: “Young Green Innovator” / “Rooftop Champion.”</li>
                        <li>✅ <em>Impact:</em> Reinforces learning, motivates kids, inspires the next batch.</li>
                    </ul>
                </li>
            </ol>

            <h3>✨ Why It Works</h3>
            <ul>
                <li><strong>Fun & Practical</strong> – Not just lectures.</li>
                <li><strong>Self-Sustaining</strong> – Produce funds the next cycle.</li>
                <li><strong>Scalable</strong> – Easy to roll out in multiple schools.</li>
            </ul>

            <div class="cta-section">
                <button class="btn btn-primary" onclick="showComingSoon()">Join Seed2Success 🌱</button>
                <button class="btn btn-secondary" onclick="partnerWithUs()">Partner with Us 🤝</button>
            </div>
        </div>
    `
},
    };
    
    const service = serviceData[serviceType];
    if (service) {
        title.textContent = service.title;
        content.innerHTML = service.content;
        openModal('serviceModal');
    }
}

function openCropModal(cropType) {
    const modal = document.getElementById('cropModal');
    const title = document.getElementById('cropModalTitle');
    const content = document.getElementById('cropModalContent');
    
    const cropData = {
        cucumber: {
            title: '🥒 Cucumber',
            content: `
                <div class="crop-detail">
                    <div class="crop-info-header">
                        <h3>Nutrition: Hydrating, Vitamin K</h3>
                        <p class="harvest-time">Harvest: 50-60 days</p>
                    </div>
                    
                    <h4>Steps to Grow:</h4>
                    <ol>
                        <li>Sow 2–3 seeds directly in 12–15 inch pots/grow bags</li>
                        <li>Keep only 1–2 healthy seedlings</li>
                        <li>Give trellis/net for climbing</li>
                        <li>Water daily (keep soil moist, not flooded)</li>
                        <li>Add compost every 15 days</li>
                        <li>Spray neem oil weekly for pests</li>
                        <li>Harvest tender cucumbers in 50–60 days</li>
                    </ol>
                    
                    <div class="special-tip">
                        <h4>🌟 Special Tip:</h4>
                        <p>Start trellis early — without support, vines get tangled and fruits may rot.</p>
                    </div>
                </div>
            `
        },
      Amaranthus  : {
            title: '🌿Amaranthus(Red Spinach)',
            content: `
                <div class="crop-detail">
                    <div class="crop-info-header">
                        <h3>Nutrition: Calcium, iron, Vitamin As</h3>
                        <p class="harvest-time">Harvest: 25-35 days</p>
                    </div>
                    
                    <h4>Steps to Grow:</h4>
                    <ol>
                        <li>Sow seeds directly in trays/pots</li>
                        <li>Thin seedlings after 10 days</li>
                        <li>Water lightly daily.</li>
                        <li>Remove weeds weekly</li>
                        <li>Add compost at sowing, then every 20 days</li>
                        <li>Pest issues rare, but neem spray helps</li>
                        <li>Harvest in 25–35 days</li>
                    </ol>
                    
                    <div class="special-tip">
                        <h4>🌟 Special Tip:</h4>
                        <p>Cut leaves, not whole plant — new shoots regrow quickly..</p>
                    </div>
                </div>
            `
        },
        tomato: {
            title: '🍅 Tomato',
            content: `
                <div class="crop-detail">
                    <div class="crop-info-header">
                        <h3>Nutrition: Rich in Vitamin A, C, Lycopene</h3>
                        <p class="harvest-time">Harvest: 70-80 days</p>
                    </div>
                    
                    <h4>Steps to Grow:</h4>
                    <ol>
                        <li>Start seeds in trays (germination 7–10 days)</li>
                        <li>Transplant after 3–4 weeks into 12-inch pots</li>
                        <li>Provide stakes/trellis for support</li>
                        <li>Feed compost every 15 days</li>
                        <li>Neem spray for aphids/whiteflies</li>
                        <li>Harvest red ripe fruits in 70–80 days</li>
                    </ol>
                    
                    <div class="special-tip">
                        <h4>🌟 Special Tip:</h4>
                        <p>Pinch side shoots ("suckers") to get bigger, better fruits.</p>
                    </div>
                </div>
            `
        },

brinjal: {
        title: '🍆 Brinjal (Baingan)',
        content: `
            <div class="crop-detail">
                <div class="crop-info-header">
                    <h3>Nutrition: High fiber, aids digestion</h3>
                    <p class="harvest-time">Harvest: 90–100 days</p>
                </div>
                <h4>Steps to Grow:</h4>
                <ol>
                    <li>Start seeds in trays (7–10 days germination)</li>
                    <li>Transplant after 3–4 weeks into 12-inch pots</li>
                    <li>Use sticks to support tall plants</li>
                    <li>Add compost every 15 days</li>
                    <li>Spray neem oil for fruit borer</li>
                    <li>Harvest shiny purple fruits after 90–100 days</li>
                </ol>
                <div class="special-tip">
                    <h4>🌟 Special Tip:</h4>
                    <p>Do not harvest dull/bruised fruits — wait till shiny and firm.</p>
                </div>
            </div>
        `
    },

     bottleGourd: {
        title: '🥒 Bottle Gourd (Lauki)',
        content: `
            <div class="crop-detail">
                <div class="crop-info-header">
                    <h3>Nutrition: Cooling, good for hydration</h3>
                    <p class="harvest-time">Harvest: 60–70 days</p>
                </div>
                <h4>Steps to Grow:</h4>
                <ol>
                    <li>Sow seeds directly in large pots (16–18 inch depth)</li>
                    <li>Give strong trellis/net for climbing</li>
                    <li>Add compost slurry every 15 days</li>
                    <li>Neem spray for fruit fly</li>
                    <li>Harvest tender fruits in 60–70 days</li>
                </ol>
                <div class="special-tip">
                    <h4>🌟 Special Tip:</h4>
                    <p>Harvest young — older gourds turn hard and bitter.</p>
                </div>
            </div>
        `
    },

okra: {
        title: '🌿 Okra (Bhindi)',
        content: `
            <div class="crop-detail">
                <div class="crop-info-header">
                    <h3>Nutrition: Vitamin C, fiber</h3>
                    <p class="harvest-time">Harvest: 50–60 days</p>
                </div>
                <h4>Steps to Grow:</h4>
                <ol>
                    <li>Sow 2–3 seeds directly in pots</li>
                    <li>Keep only strongest seedling</li>
                    <li>Needs full sunlight</li>
                    <li>Add compost every 20 days</li>
                    <li>Neem oil to control fruit borer</li>
                    <li>Harvest tender pods in 50–60 days</li>
                </ol>
                <div class="special-tip">
                    <h4>🌟 Special Tip:</h4>
                    <p>Harvest pods every 2–3 days — delays make them hard & fibrous.</p>
                </div>
            </div>
        `
    },

springOnion: {
        title: '🌱 Spring Onion ',
        content: `
            <div class="crop-detail">
                <div class="crop-info-header">
                    <h3>Nutrition: Vitamin K, Vitamin C</h3>
                    <p class="harvest-time">Harvest: 30–40 days</p>
                </div>
                <h4>Steps to Grow:</h4>
                <ol>
                    <li>Sow seeds or regrow from onion roots</li>
                    <li>Plant in shallow pots</li>
                    <li>Water every 2 days</li>
                    <li>Add compost monthly</li>
                    <li>Harvest green shoots in 30–40 days</li>
                </ol>
                <div class="special-tip">
                    <h4>🌟 Tip:</h4>
                    <p>Keep harvesting leaves — bulbs keep producing more shoots.</p>
                </div>
            </div>
        `
    },


pumpkin: {
        title: '🎃 Pumpkin (Kaddu)',
        content: `
            <div class="crop-detail">
                <div class="crop-info-header">
                    <h3>Nutrition: Vitamin A, potassium, fiber</h3>
                    <p class="harvest-time">Harvest: 80–90 days</p>
                </div>
                <h4>Steps to Grow:</h4>
                <ol>
                    <li>Sow 2 seeds in large pots/grow bags (18–20 inch)</li>
                    <li>Provide trellis/ground space to spread</li>
                    <li>Water regularly, especially during flowering</li>
                    <li>Add compost slurry every 20 days</li>
                    <li>Neem spray for fruit fly</li>
                    <li>Harvest in 80–90 days</li>
                </ol>
                <div class="special-tip">
                    <h4>🌟 Tip:</h4>
                    <p>Hand-pollinate flowers (male → female) in urban settings for better fruiting.</p>
                </div>
            </div>
        `
    },



colocasia: {
        title: '🍃 Colocasia (Arbi)',
        content: `
            <div class="crop-detail">
                <div class="crop-info-header">
                    <h3>Nutrition: Good carbs, Vitamin E, iron</h3>
                    <p class="harvest-time">Harvest: 90–100 days</p>
                </div>
                <h4>Steps to Grow:</h4>
                <ol>
                    <li>Use corms (arbi roots) instead of seeds</li>
                    <li>Plant in deep pots or soil beds</li>
                    <li>Needs partial shade in humid weather</li>
                    <li>Water moderately, avoid waterlogging</li>
                    <li>Add compost before planting</li>
                    <li>Harvest corms in 90–100 days</li>
                </ol>
                <div class="special-tip">
                    <h4>🌟 Tip:</h4>
                    <p>Leaves are also edible — cook as “Arbi Patra” or curry.</p>
                </div>
            </div>
        `
    },

 bitterGourd: {
        title: '🥒 Bitter Gourd (Karela)',
        content: `
            <div class="crop-detail">
                <div class="crop-info-header">
                    <h3>Nutrition: Controls blood sugar, Vitamin C</h3>
                    <p class="harvest-time">Harvest: 60–70 days</p>
                </div>
                <h4>Steps to Grow:</h4>
                <ol>
                    <li>Sow 2–3 seeds in 12–15 inch pots</li>
                    <li>Provide trellis/net for climbing</li>
                    <li>Water daily, keep soil moist</li>
                    <li>Add compost every 15 days</li>
                    <li>Neem oil spray against fruit fly</li>
                    <li>Harvest in 60–70 days when fruits are tender green</li>
                </ol>
                <div class="special-tip">
                    <h4>🌟 Tip:</h4>
                    <p>Harvest regularly — overripe fruits turn yellow & bitterer.</p>
                </div>
            </div>
        `
    },
ridgeGourd: {
        title: '🥒 Ridge Gourd (Turai)',
        content: `
            <div class="crop-detail">
                <div class="crop-info-header">
                    <h3>Nutrition: Light, digestion-friendly, Vitamin C</h3>
                    <p class="harvest-time">Harvest: 55–65 days</p>
                </div>
                <h4>Steps to Grow:</h4>
                <ol>
                    <li>Sow 2–3 seeds in 12–15 inch pots</li>
                    <li>Provide trellis/net for vines</li>
                    <li>Water daily, keep soil moist</li>
                    <li>Compost slurry every 15 days</li>
                    <li>Watch for fruit fly — neem spray works</li>
                    <li>Harvest in 55–65 days</li>
                </ol>
                <div class="special-tip">
                    <h4>🌟 Tip:</h4>
                    <p>Harvest young fruits (6–8 inches) for best taste & tenderness.</p>
                </div>
            </div>
        `
    },

     garlic: {
        title: '🧄 Garlic (Lahsun)',
        content: `
            <div class="crop-detail">
                <div class="crop-info-header">
                    <h3>Nutrition: Boosts immunity, heart health</h3>
                    <p class="harvest-time">Harvest: 120–150 days</p>
                </div>
                <h4>Steps to Grow:</h4>
                <ol>
                    <li>Use garlic cloves (not seeds)</li>
                    <li>Plant directly in pots (12–15 inch)</li>
                    <li>Keep in full sunlight</li>
                    <li>Water moderately, avoid overwatering</li>
                    <li>Harvest bulbs in 4–5 months</li>
                </ol>
                <div class="special-tip">
                    <h4>🌟 Tip:</h4>
                    <p>Leaves can also be used fresh in cooking.</p>
                </div>
            </div>
        `
    },

carrot: {
        title: '🥕 Carrot (Gajar)',
        content: `
            <div class="crop-detail">
                <div class="crop-info-header">
                    <h3>Nutrition: Vitamin A, beta-carotene</h3>
                    <p class="harvest-time">Harvest: 80–100 days</p>
                </div>
                <h4>Steps to Grow:</h4>
                <ol>
                    <li>Use deep pots (12–15 inch) for straight roots</li>
                    <li>Sow seeds directly, thin seedlings after 15 days</li>
                    <li>Water lightly but regularly</li>
                    <li>Add compost before sowing</li>
                    <li>Keep soil loose, avoid stones</li>
                    <li>Harvest after 80–100 days</li>
                </ol>
                <div class="special-tip">
                    <h4>🌟 Tip:</h4>
                    <p>Do not transplant carrots — sow directly for proper root growth.</p>
                </div>
            </div>
        `
    },

 spinach: {
            title: '🥬 Spinach',
            content: `
                <div class="crop-detail">
                    <div class="crop-info-header">
                        <h3>Nutrition: Iron, folate, Vitamin C</h3>
                        <p class="harvest-time">Harvest: 30-40 days</p>
                    </div>
                    
                    <h4>Steps to Grow:</h4>
                    <ol>
                        <li>Sow seeds directly in shallow trays</li>
                        <li>Water lightly every day</li>
                        <li>Remove weeds regularly</li>
                        <li>Add compost before sowing</li>
                        <li>Neem spray if leaf miner attacks</li>
                        <li>Harvest in 30–40 days by cutting outer leaves</li>
                    </ol>
                    
                    <div class="special-tip">
                        <h4>🌟 Special Tip:</h4>
                        <p>Do not uproot — cut leaves, and new ones will regrow.</p>
                    </div>
                </div>
            `
        },

cauliflower: {
        title: '🌸 Cauliflower (Phool Gobhi)',
        content: `
            <div class="crop-detail">
                <div class="crop-info-header">
                    <h3>Nutrition: Vitamin C, antioxidants</h3>
                    <p class="harvest-time">Harvest: 100–120 days</p>
                </div>
                <h4>Steps to Grow:</h4>
                <ol>
                    <li>Start seeds in trays</li>
                    <li>Transplant after 3–4 weeks into 12-inch pots</li>
                    <li>Water regularly, keep soil moist</li>
                    <li>Add compost every 20 days</li>
                    <li>Protect white curd from sun with leaves</li>
                    <li>Harvest in 100–120 days</li>
                </ol>
                <div class="special-tip">
                    <h4>🌟 Tip:</h4>
                    <p>Tie outer leaves over head to keep it white & tender.</p>
                </div>
            </div>
        `
    },

 peas: {
        title: '🌿 Green Peas (Matar)',
        content: `
            <div class="crop-detail">
                <div class="crop-info-header">
                    <h3>Nutrition: Protein, Vitamin K</h3>
                    <p class="harvest-time">Harvest: 60–70 days</p>
                </div>
                <h4>Steps to Grow:</h4>
                <ol>
                    <li>Sow seeds directly in 12-inch pots</li>
                    <li>Provide support (sticks/trellis)</li>
                    <li>Water lightly every alternate day</li>
                    <li>Add compost every 15 days</li>
                    <li>Harvest in 60–70 days when pods are full</li>
                </ol>
                <div class="special-tip">
                    <h4>🌟 Tip:</h4>
                    <p>Pluck pods regularly — keeps plant producing longer.</p>
                </div>
            </div>
        `
    },

 fenugreek: {
        title: '🌿 Fenugreek (Methi)',
        content: `
            <div class="crop-detail">
                <div class="crop-info-header">
                    <h3>Nutrition: Iron-rich, good for blood</h3>
                    <p class="harvest-time">Harvest: 20–25 days</p>
                </div>
                <h4>Steps to Grow:</h4>
                <ol>
                    <li>Sow seeds directly in shallow trays/pots</li>
                    <li>Soak seeds overnight before sowing</li>
                    <li>Water daily, keep soil moist</li>
                    <li>Harvest leaves in 20–25 days</li>
                </ol>
                <div class="special-tip">
                    <h4>🌟 Tip:</h4>
                    <p>Cut leaves, don’t uproot — plants regrow once more.</p>
                </div>
            </div>
        `
    },

    
    radish: {
        title: '🌱 Radish (Mooli)',
        content: `
            <div class="crop-detail">
                <div class="crop-info-header">
                    <h3>Nutrition: Rich in Vitamin C, digestion-friendly</h3>
                    <p class="harvest-time">Harvest: 40–50 days</p>
                </div>
                <h4>Steps to Grow:</h4>
                <ol>
                    <li>Sow seeds directly in 12-inch pots</li>
                    <li>Thin seedlings to 2–3 inches apart</li>
                    <li>Water regularly (avoid excess water)</li>
                    <li>Add compost before sowing</li>
                    <li>Keep soil loose</li>
                    <li>Harvest in 40–50 days</li>
                </ol>
                <div class="special-tip">
                    <h4>🌟 Tip:</h4>
                    <p>Harvest on time — late harvest makes roots hard & pungent.</p>
                </div>
            </div>
        `
    },

    coriander: {
            title: '🌿 Coriander',
            content: `
                <div class="crop-detail">
                    <div class="crop-info-header">
                        <h3>Nutrition: Vitamin C, antioxidants, good for digestion</h3>
                        <p class="harvest-time">Harvest: 25-30 days</p>
                    </div>
                    
                    <h4>Steps to Grow:</h4>
                    <ol>
                        <li>Soak seeds overnight, crush lightly before sowing</li>
                        <li>Sow directly in pots/trays, shallow depth</li>
                        <li>Water lightly daily</li>
                        <li>Add compost before sowing</li>
                        <li>Harvest leaves in 25–30 days</li>
                    </ol>
                    
                    <div class="special-tip">
                        <h4>🌟 Special Tip:</h4>
                        <p>Sow new seeds every 3 weeks for a continuous supply.</p>
                    </div>
                </div>
            `
        },
        mint: {
            title: '🌿 Mint',
            content: `
                <div class="crop-detail">
                    <div class="crop-info-header">
                        <h3>Nutrition: Cooling, helps digestion</h3>
                        <p class="harvest-time">Harvest: 30-40 days</p>
                    </div>
                    
                    <h4>Steps to Grow:</h4>
                    <ol>
                        <li>Grow from cuttings or rooted stems (not seeds)</li>
                        <li>Plant in shallow wide pots</li>
                        <li>Keep soil moist, water daily</li>
                        <li>Add compost every 20 days</li>
                        <li>Harvest leaves after 30–40 days</li>
                    </ol>
                    
                    <div class="special-tip">
                        <h4>🌟 Special Tip:</h4>
                        <p>Grows fast — cut regularly to avoid overgrowth & drying.</p>
                    </div>
                </div>
            `  },
   
     lettuce: {
        title: '🥬 Lettuce',
        content: `
            <div class="crop-detail">
                <div class="crop-info-header">
                    <h3>Nutrition: Hydrating, Vitamin A</h3>
                    <p class="harvest-time">Harvest: 30–40 days</p>
                </div>
                <h4>Steps to Grow:</h4>
                <ol>
                    <li>Sow seeds in trays/pots</li>
                    <li>Thin seedlings after 2 weeks</li>
                    <li>Keep soil moist</li>
                    <li>Add compost every 15 days</li>
                    <li>Harvest outer leaves from 30–40 days</li>
                </ol>
                <div class="special-tip">
                    <h4>🌟 Tip:</h4>
                    <p>Best harvested in mornings for crisp leaves.</p>
                </div>
            </div>
        `
    },
 
   curryLeaves: {
        title: '🌿 Curry Leaves (Kadi Patta)',
        content: `
            <div class="crop-detail">
                <div class="crop-info-header">
                    <h3>Nutrition: Vitamin A, calcium, aids digestion</h3>
                    <p class="harvest-time">Harvest: 60–70 days</p>
                </div>
                <h4>Steps to Grow:</h4>
                <ol>
                    <li>Grow from stem cuttings or nursery plant</li>
                    <li>Needs sunlight 4–6 hrs daily</li>
                    <li>Water 2–3 times a week</li>
                    <li>Add compost monthly</li>
                    <li>Harvest leaves in 60–70 days</li>
                </ol>
                <div class="special-tip">
                    <h4>🌟 Tip:</h4>
                    <p>Pinch growing tips — encourages bushy growth.</p>
                </div>
            </div>
        `
    },
    chilli: {
        title: '🌶️ Chilli ',
        content: `
            <div class="crop-detail">
                <div class="crop-info-header">
                    <h3>Nutrition: Vitamin C, antioxidants</h3>
                    <p class="harvest-time">Harvest: Leaves 30 days, Fruits 80–90 days</p>
                </div>
                <h4>Steps to Grow:</h4>
                <ol>
                    <li>Grow from seeds or cuttings</li>
                    <li>Needs 6+ hrs sunlight daily</li>
                    <li>Water every 2–3 days</li>
                    <li>Add compost every 20 days</li>
                    <li>Harvest leaves in 30 days, fruits in 80–90 days</li>
                </ol>
                <div class="special-tip">
                    <h4>🌟 Tip:</h4>
                    <p>Harvest leaves sparingly to avoid weakening the plant.</p>
                </div>
            </div>
        `
    },

   aloeVera: {
        title: '🌱 Aloe Vera',
        content: `
            <div class="crop-detail">
                <div class="crop-info-header">
                    <h3>Nutrition: Healing, skin care, digestion aid</h3>
                    <p class="harvest-time">Harvest: 6–8 months</p>
                </div>
                <h4>Steps to Grow:</h4>
                <ol>
                    <li>Plant suckers (baby plants) in 10–12 inch pots</li>
                    <li>Needs partial to full sunlight</li>
                    <li>Water once a week</li>
                    <li>Add compost every 2 months</li>
                    <li>Harvest leaves after 6–8 months</li>
                </ol>
                <div class="special-tip">
                    <h4>🌟 Tip:</h4>
                    <p>Let soil dry between watering — prevents root rot.</p>
                </div>
            </div>
        `
    }
        
};
    
    const crop = cropData[cropType];
    if (crop) {
        title.textContent = crop.title;
        content.innerHTML = crop.content;
        openModal('cropModal');
    }
}

// Farm Wizard Functions
function resetWizard() {
    currentStep = 1;
    updateWizardStep();
    
    // Clear form data
    const form = document.querySelector('.farm-form');
    if (form) {
        form.reset();
    }
}

function nextStep() {
    if (validateCurrentStep()) {
        currentStep++;
        updateWizardStep();
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateWizardStep();
    }
}

function updateWizardStep() {
    // Update step indicators
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.classList.toggle('active', index + 1 === currentStep);
    });
    
    // Update step content
    const stepContents = document.querySelectorAll('.step-content');
    stepContents.forEach((content, index) => {
        content.classList.toggle('active', index + 1 === currentStep);
    });
}

function validateCurrentStep() {
    const currentStepElement = document.querySelector(`#step${currentStep}`);
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    
    for (let field of requiredFields) {
        if (!field.value.trim()) {
            field.focus();
            return false;
        }
    }
    
    return true;
}

function updateSpaceInfo() {
    const spaceType = document.getElementById('spaceType').value;
    const spaceSize = document.getElementById('spaceSize');
    
    // Update placeholder based on space type
    const spaceSuggestions = {
        balcony: '10',
        rooftop: '50',
        kitchen: '100',
        hydroponics: '20',
        aeroponics: '15',
        community: '200'
    };
    
    if (spaceSize && spaceSuggestions[spaceType]) {
        spaceSize.placeholder = `e.g., ${spaceSuggestions[spaceType]}`;
    }
}

function generatePlan() {
    if (!validateCurrentStep()) return;
    
    const userName = document.getElementById('userName').value;
    const spaceType = document.getElementById('spaceType').value;
    const spaceSize = document.getElementById('spaceSize').value;
    const cropType = document.getElementById('cropType').value;
    
    const planContent = generatePlanContent(userName, spaceType, spaceSize, cropType);
    document.getElementById('farmPlan').innerHTML = planContent;
    
    nextStep();
}

function generatePlanContent(userName, spaceType, spaceSize, cropType) {
    const plans = {
        balcony: {
            spinach: {
                title: 'Balcony Spinach Garden',
                containers: '3 grow bags (12-inch each) OR railing planters',
                soil: '7 kg potting mix (60% soil, 20% compost, 20% cocopeat)',
                seeds: '50 g spinach seeds',
                watering: 'Once daily (avoid waterlogging)',
                sunlight: '4–5 hours',
                harvest: '30–35 days',
                yield: '1–1.5 kg spinach/month',
                cost: '₹500–700 initial setup',
                impact: 'Saves ~₹150–200/month on greens'
            }
        },
        rooftop: {
            tomato: {
                title: 'Rooftop Tomato Farm',
                containers: '5 grow bags (15-inch each) + 2 vertical trellis frames',
                soil: '20 kg potting mix (50% soil, 30% compost, 20% cocopeat)',
                seeds: '30–40 tomato seeds',
                watering: 'Once daily, more in summer',
                sunlight: '6–7 hours full sunlight',
                harvest: '60–70 days',
                yield: '8–10 kg tomatoes/month',
                cost: '₹1,500–2,000 initial setup',
                impact: 'Saves ~₹500–700/month, reduces heat on rooftop'
            }
        },
        kitchen: {
            mixed: {
                title: 'Kitchen Garden - Mixed Vegetables',
                containers: 'Direct sowing in ground beds (raised beds recommended)',
                soil: 'Enrich with 30–40 kg compost + natural fertilizers',
                seeds: 'Mixed pack (100 g assorted vegetable seeds)',
                watering: 'Twice a week (depending on rainfall)',
                sunlight: '5–7 hours',
                harvest: '25–30 days (greens), 45+ days (roots/beans)',
                yield: '15–20 kg mixed veggies/month',
                cost: '₹2,000–2,500 for initial soil prep, seeds, fencing',
                impact: 'Can meet 20–30% of family\'s monthly veggie needs'
            }
        },
        hydroponics: {
            lettuce: {
                title: 'Indoor Hydroponics - Lettuce System',
                containers: '1 NFT (Nutrient Film Technique) hydroponic unit with 20 grow slots',
                soil: 'Hydroponic A+B nutrients (1L each)',
                seeds: '100 lettuce seeds',
                watering: 'Automatic circulation, 24/7 pump',
                sunlight: '12–14 hrs with LED grow lights',
                harvest: '25–30 days',
                yield: '3–4 kg lettuce/month',
                cost: '₹7,000–10,000 setup (system + lights + nutrients)',
                impact: 'Fresh pesticide-free greens, saves ~₹500–600/month, space efficient'
            }
        },
        aeroponics: {
            strawberry: {
                title: 'Aeroponics Tower - Strawberry System',
                containers: 'Aeroponic vertical tower with misting nozzles (15–20 plant slots)',
                soil: 'Aeroponic nutrient pack (pH balanced)',
                seeds: '10–12 strawberry saplings',
                watering: 'Automated misting system (every 15 mins)',
                sunlight: '12 hrs artificial grow lights (if indoors)',
                harvest: '60–70 days',
                yield: '1.5–2 kg strawberries/month',
                cost: '₹12,000–15,000 setup',
                impact: 'High-tech farming, minimal water usage, great for premium crops'
            }
        },
        community: {
            mixed: {
                title: 'Community Garden - Mixed Leafy Greens',
                containers: '6–8 raised soil beds (4x4 ft each)',
                soil: '100–150 kg compost + organic manure',
                seeds: '300–500 g mixed leafy seeds',
                watering: 'Shared drip irrigation or hose, 3x/week',
                sunlight: '5–6 hours',
                harvest: '20–25 days (leafy greens)',
                yield: '30–40 kg leafy greens/month (shared among members)',
                cost: '₹5,000–8,000 community setup (shared)',
                impact: 'Strengthens community, provides fresh veggies, reduces food cost for 5–7 families'
            }
        }
    };
    
    const defaultPlan = {
        title: 'Custom Urban Farm Plan',
        containers: 'Suitable containers based on your space',
        soil: 'Organic potting mix with compost',
        seeds: 'Quality seeds for your chosen crop',
        watering: 'Regular watering schedule',
        sunlight: 'Adequate sunlight exposure',
        harvest: '30-90 days depending on crop',
        yield: 'Fresh produce for your family',
        cost: '₹500-2,000 depending on setup',
        impact: 'Fresh, healthy food and reduced grocery bills'
    };
    
    const plan = plans[spaceType]?.[cropType] || plans[spaceType]?.mixed || defaultPlan;
    
    return `
        <div class="plan-header">
            <h3 class="plan-title">🌱 ${plan.title}</h3>
            <p class="plan-subtitle">Personalized plan for ${userName}</p>
        </div>
        
        <div class="plan-details">
            <div class="plan-section">
                <h4>📦 Containers Needed</h4>
                <p>${plan.containers}</p>
            </div>
            
            <div class="plan-section">
                <h4>🌱 Soil Mix</h4>
                <p>${plan.soil}</p>
            </div>
            
            <div class="plan-section">
                <h4>🌰 Seed Requirement</h4>
                <p>${plan.seeds}</p>
            </div>
            
            <div class="plan-section">
                <h4>💧 Watering</h4>
                <p>${plan.watering}</p>
            </div>
            
            <div class="plan-section">
                <h4>☀️ Sunlight</h4>
                <p>${plan.sunlight}</p>
            </div>
            
            <div class="plan-section">
                <h4>🌾 First Harvest</h4>
                <p>${plan.harvest}</p>
            </div>
            
            <div class="plan-section">
                <h4>📈 Approx. Yield</h4>
                <p>${plan.yield}</p>
            </div>
            
            <div class="plan-section">
                <h4>💰 Cost Estimate</h4>
                <p>${plan.cost}</p>
            </div>
        </div>
        
        <div class="plan-highlight">
            <h4>🌍 Impact</h4>
            <p>${plan.impact}</p>
        </div>
    `;
}

function downloadPlan() {
    const planContent = document.getElementById('farmPlan').innerText;
    const blob = new Blob([planContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-urban-farm-plan.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// FAQ Functions
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            toggleFAQ(this);
        });
    });
}

function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    const allFaqItems = document.querySelectorAll('.faq-item');
    allFaqItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<div class="loading"></div> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'var(--success-color)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset();
                }, 2000);
            }, 2000);
        });
    }
}

// Coming Soon Alert
function showComingSoon() {
    const alert = document.getElementById('comingSoonAlert');
    if (alert) {
        alert.classList.add('show');
    }
}

function closeComingSoon() {
    const alert = document.getElementById('comingSoonAlert');
    if (alert) {
        alert.classList.remove('show');
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .feature-card, .crop-card, .health-card, .mood-card, .overview-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Close modals when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        const modalId = e.target.id;
        closeModal(modalId);
    }
});

// Close modals with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            closeModal(openModal.id);
        }
        
        const openAlert = document.querySelector('.alert-overlay.show');
        if (openAlert) {
            closeComingSoon();
        }
    }
});

// Smooth scroll for all anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading states to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn') && !e.target.disabled) {
        const btn = e.target;
        const originalText = btn.innerHTML;
        
        // Don't add loading to modal close buttons or navigation
        if (btn.classList.contains('close') || btn.closest('.nav-menu')) {
            return;
        }
        
        btn.innerHTML = '<div class="loading"></div> Loading...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1000);
    }
});

// Initialize tooltips (if needed)
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Performance optimization: Lazy load images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Error handling for images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400';
    }
}, true);

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWebsite);
} else {
    initializeWebsite();
}

// Service Modal Carousel Functions
function initializeServiceModalCarousel() {
    const carousel = document.querySelector('.service-modal-carousel');
    if (!carousel) return;
    
    let currentIndex = 0;
    const images = carousel.querySelectorAll('.service-modal-image');
    const indicators = carousel.querySelectorAll('.indicator');
    
    // Auto-advance every 4 seconds
    const interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        showServiceModalImage(currentIndex);
    }, CAROUSEL_INTERVAL_MS);
    
    // Store interval for cleanup
    carousel.carouselInterval = interval;
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        if (carousel.carouselInterval) clearInterval(carousel.carouselInterval);
    });
    
    // Resume on mouse leave
    carousel.addEventListener('mouseleave', () => {
        const newInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            showServiceModalImage(currentIndex);
        }, CAROUSEL_INTERVAL_MS);
        carousel.carouselInterval = newInterval;
    });
}

function showServiceModalImage(index) {
    const carousel = document.querySelector('.service-modal-carousel');
    if (!carousel) return;
    
    const images = carousel.querySelectorAll('.service-modal-image');
    const indicators = carousel.querySelectorAll('.indicator');
    
    images.forEach((img, idx) => {
        img.classList.toggle('active', idx === index);
    });
    
    indicators.forEach((indicator, idx) => {
        indicator.classList.toggle('active', idx === index);
    });
}

function nextServiceImage(button) {
    const carousel = button.closest('.service-modal-carousel');
    const images = carousel.querySelectorAll('.service-modal-image');
    const currentIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
    const nextIndex = (currentIndex + 1) % images.length;
    showServiceModalImage(nextIndex);
}

function prevServiceImage(button) {
    const carousel = button.closest('.service-modal-carousel');
    const images = carousel.querySelectorAll('.service-modal-image');
    const currentIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    showServiceModalImage(prevIndex);
}

function showServiceImage(indicator, index) {
    showServiceModalImage(index);
}

// Cleanup intervals on unload to avoid runaway timers
window.addEventListener('beforeunload', () => {
    carouselIntervals.forEach(id => { if (id) clearInterval(id); });
    const svc = document.querySelector('.service-modal-carousel');
    if (svc && svc.carouselInterval) clearInterval(svc.carouselInterval);
});
