const template = document.getElementById('clock-template');
const digitContainers = [];

// 1. Initialize 6 digit boxes (HH:MM:SS)
for (let d = 0; d < 6; d++) {
    const container = document.getElementById(`digit-${d}`);
    digitContainers.push(container);
    
    // Populate each digit with 24 clocks
    for (let i = 0; i < 24; i++) {
        container.appendChild(template.content.cloneNode(true));
    }
}

// 2. Mapping symbols from your images
const angles = {
    "┌": [0, 90],
    "┐": [90, 180],
    "┘": [180, 270],
    "└": [0, 270],
    "-": [0, 180],
    "|": [90, 270],
    " ": [135, 135]
};

// 3. Digit layout definitions
const SHAPES = {
    "4": ["┌","┐","┌","┐","|","|","|","|","|","└","┘","|","└","-","┐","|"," "," ","|","|"," "," ","└","┘"],
    "0": ["┌","-","-","┐","|","┌","┐","|","|","|","|","|","|","|","|","|","|","└","┘","|","└","-","-","┘"],
    "1": [" "," ","┌","┐"," "," ","|","|"," "," ","|","|"," "," ","|","|"," "," ","|","|"," "," ","└","┘"],
    "2": ["┌","-","-","┐","└","-","┐","|","┌","-","┘","|","|","┌","-","┘","|","└","-","┐","└","-","-","┘"],
    "3": ["┌","-","-","┐","└","-","┐","|","┌","-","┘","|","└","-","┐","|","┌","-","┘","|","└","-","-","┘"],
    "5": ["┌","-","-","┐","|","┌","-","┘","|","└","-","┐","└","-","┐","|","┌","-","┘","|","└","-","-","┘"],
    "6": ["┌","-","-","┐","|","┌","-","┘","|","└","-","┐","|","┌","┐","|","|","└","┘","|","└","-","-","┘"],
    "7": ["┌","-","-","┐","└","-","┐","|"," "," ","|","|"," "," ","|","|"," "," ","|","|"," "," ","└","┘"],
    "8": ["┌","-","-","┐","|","┌","┐","|","|","└","┘","|","|","┌","┐","|","|","└","┘","|","└","-","-","┘"],
    "9": ["┌","-","-","┐","|","┌","┐","|","|","└","┘","|","└","-","┐","|","┌","-","┘","|","└","-","-","┘"]
};

/**
 * Updates a digit container to display a specific number
 */
function updateDigit(container, num) {
    const clocks = container.querySelectorAll('.clock');
    const shape = SHAPES[num] || SHAPES["0"];

    shape.forEach((symbol, index) => {
        const hands = clocks[index].querySelectorAll('.hand');
        const [angle1, angle2] = angles[symbol] || angles[" "];
        hands[0].style.rotate = `${angle1}deg`;
        hands[1].style.rotate = `${angle2}deg`;
    });
}

/**
 * Main clock logic based on image: replace(/\D/g, "").split("")
 */
function tick() {
    const time = new Date().toLocaleTimeString("en-US", {
        hour12: true, // As seen in your image "10:08:14 AM"
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    // Extract exactly 6 digits: "10:08:14 AM" -> ["1", "0", "0", "8", "1", "4"]
    const digits = time.replace(/\D/g, "").slice(0, 6).split("");

    digits.forEach((num, i) => {
        updateDigit(digitContainers[i], num);
    });
}

// Initial update and interval
tick();
setInterval(tick, 1000);