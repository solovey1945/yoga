$(document).ready(function ($) {
    $('.rewiews__slider').slick({
        arrows: true,
        dots: true,
        infinite: true,
        easing: 'ease',
        speed: 500,
        // autoplay: true,
        autoplaySpeed: 5000,
        responsive: [{
            breakpoint: 968,
            settings: {
                arrows: false,
            }
        }]

    });
    $(document).ready(function ($) {
        $('.slider').slick({
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            dots: false,
            arrows: false,
            centerMode: true,
            centerPadding: '350px',
            responsive: [{
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 1,
                        infinite: true,
                        dots: false,
                        centerMode: false
                    }
                }
            ]
        });
    });
});