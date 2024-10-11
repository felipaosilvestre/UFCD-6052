document.getElementById('my_button')
.addEventListener('click',
    () => {
        document.getElementById('demo').innerHTML = new Date();
    }
);