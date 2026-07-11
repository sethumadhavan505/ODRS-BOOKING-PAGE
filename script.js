const form = document.getElementById('form');

form.addEventListener('submit', function(e){

    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const offer = document.getElementById('offer').value;
    const dept = document.getElementById('dept').value.trim();

    // Must sign in with Google
    if(email === ''){
        alert('Please Sign in with Google first');
        return;
    }

    if(name === '' || phone === '' || offer === '' || dept === ''){
        alert('Please fill all details');
        return;
    }

    // Allow only Gmail accounts from Google Sign-In
    if(!email.endsWith('@gmail.com')){
        alert('Only Gmail accounts are allowed');
        return;
    }

    // Phone validation
if(!/^[0-9]{10}$/.test(phone)){
    alert('Please enter a valid 10-digit mobile number');
    return;
}

// Reject repeated numbers like 1111111111, 2222222222, etc.
if(/^(\d)\1{9}$/.test(phone)){
    alert('Repeated numbers like 1111111111 are not allowed');
    return;
}

// Reject common fake numbers
if(
    phone === '1234567890' ||
    phone === '7345678902' ||
    phone === '9123456780' ||
    phone === '1122222222' ||
    phone === '1222222222' ||
    phone === '0122222222' ||
    phone === '8234567891' ||
    phone === '1234444444' ||
    phone === '0123456789' ||
    phone === '9876543210'
){
    alert('Please enter a genuine mobile number');
    return;
}
    // Reject if one digit appears 9 or more times
const digitCount = {};

for (const digit of phone) {
    digitCount[digit] = (digitCount[digit] || 0) + 1;
}

if (Math.max(...Object.values(digitCount)) >= 8) {
    alert('Please enter a genuine mobile number');
    return;
}

    localStorage.setItem('odrsName', name);
    localStorage.setItem('odrsEmail', email);
    localStorage.setItem('odrsPhone', phone);
    localStorage.setItem('odrsOffer', offer);
    localStorage.setItem('odrsDept', dept);

    window.location.href = '/payment';

});
