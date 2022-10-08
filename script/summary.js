

function loadContentSummary() {
    let name = user['name'];
    document.getElementById('greetingName').innerHTML = `${name}`;
}

async function loadSummary() {
    await init();
    loadContentSummary();
    showTime();
}


function showTime() {
    var d = new Date();
    var time = d.getHours();
    let greetingBox = document.getElementById('time');

    if (time <= 11) {
        greetingBox.innerHTML = `Good morning,`;
    }
    if (time > 11 && time <= 14) {
        greetingBox.innerHTML = `Have a nice Lunch,`;
    }
    if (time > 14 && time <= 17) {
        greetingBox.innerHTML = `Good afternoon,`;
    }
    if (time > 17) {
        greetingBox.innerHTML = `Good evening,`;

    }
}