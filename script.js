let userLocation = '';
let emergencyMessage = '';

function getLocation() {
    const status = document.getElementById('status');
    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported on this device.';
        return;
    }
    status.textContent = 'Getting your location...';
    navigator.geolocation.getCurrentPosition(
        function(position) {
            userLocation = 'https://www.google.com/maps?q=' + position.coords.latitude + ',' + position.coords.longitude;
            status.textContent = 'Location Retrieved Successfully ✅';
        },
        function(error) {
            status.textContent = error.code === 1 ? 'Location permission was denied ❌' : 'Unable to get location. Please enable GPS.';
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
}

function generateMessage() {
    const name = document.getElementById('name').value.trim();
    if (!name) {
        document.getElementById('name').focus();
        alert('Enter your name');
        return;
    }
    emergencyMessage = '🚨 EMERGENCY ALERT 🚨\n\n' +
        'Name: ' + name + '\n' +
        'I need immediate help.\n\n' +
        'My Location:\n' + (userLocation || 'Location not retrieved yet.');
    document.getElementById('status').textContent = 'Emergency message generated successfully ✅';
}

function sendSMS() {
    const contact = document.getElementById('contact').value.trim();
    if (!contact || !emergencyMessage) {
        alert('Generate SOS and enter contact number first!');
        return;
    }
    window.location.href = 'sms:' + encodeURIComponent(contact) + '?body=' + encodeURIComponent(emergencyMessage);
}

function sendWhatsApp() {
    const contact = document.getElementById('contact').value.trim();
    if (!contact || !emergencyMessage) {
        alert('Generate SOS and enter contact number first!');
        return;
    }
    const cleanContact = contact.replace(/[\s()+-]/g, '');
    const whatsappURL = 'https://wa.me/' + cleanContact + '?text=' + encodeURIComponent(emergencyMessage);
    window.location.href = whatsappURL;
}
