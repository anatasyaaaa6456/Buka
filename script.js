// Select elements
const title = document.getElementById('title');
const nameInput = document.getElementById('nameInput');
const startButton = document.getElementById('startButton');
const story = document.getElementById('story');
const storyText = document.getElementById('storyText');
const choices = document.getElementById('choices');
const backsound = document.getElementById('backsound');

// Ensure backsound plays automatically
document.addEventListener('DOMContentLoaded', () => {
    backsound.play().catch((error) => {
        console.error("Backsound failed to play:", error);
    });

    // Create floating hearts and stars on page load
    createFloatingHearts();
    createTwinklingStars();
});

// Typing effect
function typeWriter(text, element, callback) {
    let index = 0;
    const interval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, 50);
}

// Event listener for the start button
startButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (!name) {
        alert("Masukkan nama kamu dulu ya!");
        return;
    }

    // Update title and show story
    title.textContent = `Halo, ${name} ❤️`;
    setTimeout(() => {
        title.style.opacity = 0;
        nameInput.style.display = 'none';
        startButton.style.display = 'none';

        setTimeout(() => {
            story.classList.remove('hidden');
            const storyLines = [
                `Halo, ${name}. Aku ingin mengungkapkan sesuatu yang sangat penting untukmu.`,
                `Sejak pertama kali bertemu, kamu telah mengubah hidupku menjadi lebih indah.`,
                `Setiap senyuman darimu adalah sinar matahari yang menerangi hariku.`,
                `Aku tidak bisa membayangkan hidup tanpa dirimu di sisiku.`,
                `Kamu adalah alasan mengapa aku selalu tersenyum setiap hari.`,
                `Dan sekarang, aku ingin bertanya padamu...`,
                `Maukah kamu menjadi bagian dari sisa hidupku? ❤️`
            ];

            let lineIndex = 0;
            function showNextLine() {
                if (lineIndex < storyLines.length) {
                    typeWriter(storyLines[lineIndex], storyText, () => {
                        lineIndex++;
                        setTimeout(showNextLine, 1000);
                    });
                } else {
                    // Show choices
                    setTimeout(() => {
                        choices.classList.remove('hidden');
                    }, 1000);
                }
            }

            showNextLine();
        }, 1000);
    }, 1000);
});

// Event listeners for choices
document.getElementById('yesButton').addEventListener('click', () => {
    window.location.href = 'yes.html';
});

document.getElementById('maybeButton').addEventListener('click', () => {
    window.location.href = 'maybe.html';
});

let noClickCount = 0;
document.getElementById('noButton').addEventListener('click', () => {
    noClickCount++;
    if (noClickCount === 1) {
        alert("Kamu yakin?");
    } else if (noClickCount === 2) {
        alert("Maaf...");
    } else if (noClickCount === 3) {
        document.body.classList.add('error');
        setTimeout(() => {
            alert("Error: Hati ini hancur 💔");
            window.location.reload();
        }, 2000);
    }
});

// Countdown Feature
document.getElementById('countdownButton').addEventListener('click', () => {
    const targetDate = new Date('January 5, 2026 00:00:00').getTime();

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        alert(`Waktu tersisa menuju 5 Januari 2026:\n${days} Hari, ${hours} Jam, ${minutes} Menit, ${seconds} Detik`);

        if (distance < 0) {
            clearInterval(countdownInterval);
            alert("Waktu telah tiba! ❤️");
        }
    }, 1000);
});

// Floating hearts effect
function createFloatingHearts() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = Math.random() * 100 + 'vh';
            heart.style.animationDuration = Math.random() * 3 + 2 + 's';
            document.body.appendChild(heart);

            // Remove the heart after animation ends
            heart.addEventListener('animationend', () => {
                heart.remove();
            });
        }, i * 100);
    }
}

// Twinkling stars effect
function createTwinklingStars() {
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.classList.add('twinkling-star');
            star.style.left = Math.random() * 100 + 'vw';
            star.style.top = Math.random() * 100 + 'vh';
            star.style.animationDuration = Math.random() * 2 + 1 + 's';
            document.body.appendChild(star);

            // Remove the star after animation ends
            star.addEventListener('animationend', () => {
                star.remove();
            });
        }, i * 100);
    }
}

