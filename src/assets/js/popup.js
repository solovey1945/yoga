
const popup = () => {
    
    function bindModal(btnSelector, popupSelector, closeSelector) {
        const popup = document.getElementById(popupSelector);
        const close = document.querySelector(closeSelector);
        const trigger = document.querySelectorAll(btnSelector);

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }
                popup.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
            
        })

        close.addEventListener('click', () => {
            popup.style.display = 'none';
            document.body.style.overflow = '';
        });

        popup.addEventListener("click", (e) => {
            if (e.target === popup) {
                popup.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    bindModal('.popup__btn', 'popup', '.popup__inner-close')
};