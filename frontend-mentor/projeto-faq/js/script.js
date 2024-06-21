document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.button');

    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const paragraph = document.querySelector(`.p${index + 1}-hide`);
            const icon = button.querySelector('.img');

            if (paragraph.classList.contains('visible')) {
                paragraph.classList.remove('visible');

                setTimeout(() => {
                    paragraph.style.display = 'none';
                }, 300);

                icon.src = './assets/images/icon-plus.svg';
            } else {
                paragraph.style.display = 'block';

                setTimeout(() => {
                    paragraph.classList.add('visible');
                }, 10);

                icon.src = './assets/images/icon-minus.svg';
            }
        });
    });
});
