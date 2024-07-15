document.addEventListener('DOMContentLoaded', function() {
    const lookPlannerLink = document.getElementById('lookPlannerLink');
    const outfitBuilderLink = document.getElementById('outfitBuilderLink');
    const plannerContainer = document.getElementById('plannerContainer');
    const outfitBuilderSection = document.getElementById('outfitBuilder');
    const plannerSection = document.getElementById('planner');
    const calendarElement = document.getElementById('calendar');
    const eventFormContainer = document.getElementById('eventFormContainer');
    const outfitsContainer = document.getElementById('outfitsContainer'); // Replace with your actual outfits container ID
    let selectedDateElement = null;

    function generateCalendar(month, year) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();

        let calendarHTML = '<table><thead><tr>';
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        daysOfWeek.forEach(day => calendarHTML += `<th>${day}</th>`);
        calendarHTML += '</tr></thead><tbody><tr>';

        for (let i = 0; i < firstDay; i++) {
            calendarHTML += '<td></td>';
        }

        for (let day = 1; day <= daysInMonth; day++) {
            if ((day + firstDay - 1) % 7 === 0 && day !== 1) {
                calendarHTML += '</tr><tr>';
            }
            calendarHTML += `<td class="calendar-date" data-date="${year}-${month + 1}-${day}">${day}</td>`;
        }

        calendarHTML += '</tr></tbody></table>';
        calendarElement.innerHTML = calendarHTML;
    }

    function setCurrentDate() {
        const today = new Date();
        generateCalendar(today.getMonth(), today.getFullYear());
    }

    lookPlannerLink.addEventListener('click', function(event) {
        event.preventDefault();
        plannerSection.classList.add('active');
        outfitBuilderSection.classList.remove('active');
        plannerContainer.style.display = 'flex';
        setCurrentDate();
        eventFormContainer.style.display = 'none'; // Hide event form initially
        outfitsContainer.style.display = 'none'; // Hide outfits container
    });

    outfitBuilderLink.addEventListener('click', function(event) {
        event.preventDefault();
        outfitBuilderSection.classList.add('active');
        plannerSection.classList.remove('active');
        plannerContainer.style.display = 'none';
        eventFormContainer.style.display = 'none'; // Hide event form when switching to outfit builder
        outfitsContainer.style.display = 'flex'; // Show outfits container
    });

    calendarElement.addEventListener('click', function(event) {
        if (event.target.classList.contains('calendar-date')) {
            const selectedDate = event.target.dataset.date;
            const eventDateTimeInput = document.getElementById('eventDateTime');
            eventDateTimeInput.value = `${selectedDate}T00:00`;
            eventFormContainer.style.display = 'block'; // Show event form on date selection
            selectedDateElement = event.target;
        }
    });

    const eventForm = document.getElementById('eventForm');
    eventForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const eventNameInput = document.getElementById('eventName');
        if (selectedDateElement && eventNameInput.value.trim() !== '') {
            selectedDateElement.innerHTML += `<span class="event-name">${eventNameInput.value}</span>`;
        }
        alert('Event Submitted!');
        eventForm.reset();
        eventFormContainer.style.display = 'none'; // Hide event form after submission

        // Replace content with the provided HTML
        const newContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <style>
        body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    color: #333;
}

header {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 10px 20px;
    border-bottom: 1px solid #ddd;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.logo {
    font-size: 24px;
    font-weight: 700;
    color: #ff3366;
    margin-right: 30px;
}

nav {
    display: flex;
    align-items: center;
    flex-grow: 1;
}

nav a {
    margin: 0 15px;
    text-decoration: none;
    color: #333;
    font-weight: 500;
    position: relative;
}

nav a:hover {
    color: #ff3366;
}

nav input {
    margin-left: auto;
    padding: 5px 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

main {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2em;
        }
        .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 2em;
        }
        .product-card {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition: transform 0.3s ease;
        }
        .product-card:hover {
            transform: translateY(-5px);
        }
        .product-image {
            width: 100%;
            height: 250px; /* Adjust height as needed */
            object-fit: cover; /* Ensures image covers the space without stretching */
        }
        .product-info {
            padding: 1em;
        }
        .product-title {
            font-weight: bold;
            margin-bottom: 0.5em;
        }
        .product-price {
            color: #ff1493;
            font-weight: bold;
        }
        footer {
            background-color: #ff69b4;
            color: white;
            text-align: center;
            padding: 1em;
            margin-top: 2em;
        }
    </style>
</head>
<body>
   
    <header>
            <div class="logo">Myntra</div>
            <nav>
                <a href="#">MEN</a>
                <a href="#">WOMEN</a>
                <a href="#">KIDS</a>
                <a href="#">BEAUTY</a>
                <input type="text" placeholder="Search for products, brands and more">
                <a href="#" id="outfitBuilderLink">Outfit Builder</a>
                <a href="#" id="lookPlannerLink">Look Planner</a>
                <a href="#">Profile</a>
                <a href="#">Wishlist</a>
                <a href="#">Bag</a>
            </nav>
        </header>
        
    <div class="container">
        <h2 id="outfits">Birthday Outfits</h2>
        <div class="product-grid">
            <div class="product-card">
                <img src="images/1.jpg" alt="Sparkly Black Sequin Dress" class="product-image">
                <div class="product-info">
                    <div class="product-title">Sparkly Black Sequin Dress</div>
                    <div class="product-price">3000</div>
                </div>
            </div>
            <div class="product-card">
                <img src="images/2.jpg" alt="Tulle Skirt" class="product-image">
                <div class="product-info">
                    <div class="product-title">Tulle Skirt</div>
                    <div class="product-price">2000</div>
                </div>
            </div>
            <div class="product-card">
                <img src="images/3.jpg" alt="Black Jumpsuit" class="product-image">
                <div class="product-info">
                    <div class="product-title">Black Jumpsuit</div>
                    <div class="product-price">4000</div>
                </div>
            </div>
            <div class="product-card">
                <img src="images/4.jpg" alt="Black Velvet Dress" class="product-image">
                <div class="product-info">
                    <div class="product-title"> Black Velvet Dress</div>
                    <div class="product-price">1000</div>
                </div>
            </div>
            <div class="product-card">
                <img src="images/5.jpg" alt="Elegant Black Gown" class="product-image">
                <div class="product-info">
                    <div class="product-title">Elegant Black Gown</div>
                    <div class="product-price">2000</div>
                </div>
            </div>
            <div class="product-card">
                <img src="images/6.jpg" alt="Floral Maxi Dress" class="product-image">
                <div class="product-info">
                    <div class="product-title">Floral Maxi Dress</div>
                    <div class="product-price">2000</div>
                </div>
            </div>
            <div class="product-card">
                <img src="images/7.jpg" alt="Chic Sequined Romper" class="product-image">
                <div class="product-info">
                    <div class="product-title">Chic Sequined Romper</div>
                    <div class="product-price">1000</div>
                </div>
            </div>
        </div>
    </div>
   
</body>
</html>
        `;

        document.open();
        document.write(newContent);
        document.close();
    });

    // Outfit Builder Functionality
    const items = document.querySelectorAll('.outfit');
    items.forEach(item => {
        item.addEventListener('dragstart', function(event) {
            const bgImage = event.target.style.backgroundImage;
            event.dataTransfer.setData('text/plain', event.target.id);
        });
    });

    const mannequin = document.getElementById('mannequin');
    mannequin.addEventListener('dragover', function(event) {
        event.preventDefault();
    });

    mannequin.addEventListener('drop', function(event) {
        event.preventDefault();
        const itemId = event.dataTransfer.getData('text/plain');
        const itemElement = document.getElementById(itemId);
        if (itemElement) {
            const bgImage = itemElement.style.backgroundImage;
            const imgSrc = bgImage.slice(5, -2); // Adjust if needed
            const rect = mannequin.getBoundingClientRect();
            const dropX = event.clientX - rect.left;
            const dropY = event.clientY - rect.top;
            addOutfitToMannequin(imgSrc, mannequin, dropX, dropY);
        }
    });

    function addOutfitToMannequin(imgSrc, mannequinElement, dropX, dropY) {
        const overlayImg = document.createElement('div');
        overlayImg.className = 'outfit-overlay';
        overlayImg.style.backgroundImage = `url(${imgSrc})`;
        overlayImg.style.position = 'absolute';
        overlayImg.style.width = '100px'; // Initial size
        overlayImg.style.height = '150px'; // Initial size
        overlayImg.style.left = `${dropX - 25}px`;
        overlayImg.style.top = `${dropY - 37.5}px`;

        // Add resize handles
        const handles = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
        handles.forEach(handleClass => {
            const handle = document.createElement('div');
            handle.className = `resize-handle ${handleClass}`;
            overlayImg.appendChild(handle);

            handle.addEventListener('mousedown', function(event) {
                event.preventDefault();
                const startX = event.clientX;
                const startY = event.clientY;
                const startWidth = parseInt(window.getComputedStyle(overlayImg).width, 10);
                const startHeight = parseInt(window.getComputedStyle(overlayImg).height, 10);

                function onMouseMove(moveEvent) {
                    const dx = moveEvent.clientX - startX;
                    const dy = moveEvent.clientY - startY;
                    if (handleClass.includes('top')) {
                        overlayImg.style.height = `${Math.max(startHeight - dy, 20)}px`;
                    } else {
                        overlayImg.style.height = `${Math.max(startHeight + dy, 20)}px`;
                    }
                    if (handleClass.includes('left')) {
                        overlayImg.style.width = `${Math.max(startWidth - dx, 20)}px`;
                    } else {
                        overlayImg.style.width = `${Math.max(startWidth + dx, 20)}px`;
                    }
                }

                function onMouseUp() {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                }

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });
        });

        // Make the outfit draggable and constrain movement within the mannequin
        overlayImg.addEventListener('mousedown', function(event) {
            event.preventDefault();
            const offsetX = event.clientX - overlayImg.getBoundingClientRect().left;
            const offsetY = event.clientY - overlayImg.getBoundingClientRect().top;

            function onMouseMove(moveEvent) {
                const mannequinRect = mannequinElement.getBoundingClientRect();
                const overlayRect = overlayImg.getBoundingClientRect();
                const newX = moveEvent.clientX - offsetX - mannequinRect.left;
                const newY = moveEvent.clientY - offsetY - mannequinRect.top;

                // Constrain movement within mannequin
                overlayImg.style.left = `${Math.max(0, Math.min(newX, mannequinRect.width - overlayRect.width))}px`;
                overlayImg.style.top = `${Math.max(0, Math.min(newY, mannequinRect.height - overlayRect.height))}px`;
            }

            function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        mannequinElement.appendChild(overlayImg);
    }
});
