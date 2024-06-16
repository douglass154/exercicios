function changeColorsButtons() {
    const buttons = document.querySelectorAll('.rating button');
    buttons.forEach((button, index1) => {
        button.addEventListener('click', () => {
            console.log(index1);

            buttons.forEach((button, index2) => {
                index1 >= index2
                    ? button.classList.add('active')
                    : button.classList.remove('active');
            });
        });
    });
}

function submit() {
    const button = document.querySelector('.container .submit');
    const main = document.querySelector('.container');
    const thanks = document.querySelector('.thanks');

    button.addEventListener('click', () => {
        main.style.display = 'none';
        thanks.style.display = 'flex';

        selectedRating();
    });
}

function selectedRating() {
    const buttons = document.querySelectorAll('.rating .active');
    let rating = 0;

    if(buttons.length > 0) {
        rating = buttons[buttons.length - 1].innerText;
    }

    document.querySelector('.thanks .selected-rating').innerText = rating
}

function main() {
    changeColorsButtons();
    submit();
}

main();
