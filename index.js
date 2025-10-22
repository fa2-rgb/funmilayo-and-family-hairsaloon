document.addEventListener('DOMContentLoaded', function () {

    const navbarHeight = document.getElementById('mainNavbar') ? document.getElementById('mainNavbar').offsetHeight : 70;
    document.body.setAttribute('data-bs-offset', navbarHeight + 10);
    new bootstrap.ScrollSpy(document.body, {
        target: '#mainNavbar',
        offset: navbarHeight + 10
    });


    // Swiper.js for Testimonials
    // Ensure the selector targets the element with the 'swiper' class (formerly 'swiper-container')
    if (document.querySelector('.testimonial-slider.swiper')) {
        new Swiper('.testimonial-slider.swiper', { // Updated selector if needed, or ensure .testimonial-slider is on the swiper div
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination', // Targets the div with class 'swiper-pagination'
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                },
                992: { // Changed from 992 to lg breakpoint for consistency
                    slidesPerView: 3,
                    spaceBetween: 50,
                }
            }
        });
    }

    let flatpickrInstanceDate, flatpickrInstanceTime;
    if (document.getElementById('bookingDate')) {
        flatpickrInstanceDate = flatpickr("#bookingDate", {
            altInput: true,
            altFormat: "F j, Y",
            dateFormat: "Y-m-d",
            minDate: "today"
        });
    }
    if (document.getElementById('bookingTime')) {
        flatpickrInstanceTime = flatpickr("#bookingTime", {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            time_24hr: false,
            minuteIncrement: 30,
            minTime: "09:00",
            maxTime: "18:30"
        });
    }



    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Basic client-side validation (HTML5 'required' handles most)
            // Check if all required fields are filled (Bootstrap 5 adds .was-validated for its own styling)
            if (!bookingForm.checkValidity()) {
                e.stopPropagation();
                // Optionally, trigger Bootstrap's validation display if not already done
                bookingForm.classList.add('was-validated');
                // SweetAlert for error
                Swal.fire({
                    title: 'Oops!',
                    text: 'Please fill out all required fields correctly.',
                    icon: 'error',
                    confirmButtonText: 'Okay',
                    confirmButtonColor: 'var(--primary-color)'
                });
                return;
            }
            bookingForm.classList.remove('was-validated'); // Reset validation display for next time


            const formData = new FormData(bookingForm);
        let message = "New Appointment Request:\n\n";
        for (const [key, value] of formData.entries()) {
            message += `${key}: ${value}\n`;
        }

        // Replace with your WhatsApp number (including country code, without +)
        const whatsappNumber = "+2348141264541"; 
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        // Open WhatsApp in a new tab/window
        window.open(whatsappUrl, '_blank');

            Swal.fire({
                title: 'Thank You!',
                text: 'Your appointment request has been submitted. We will contact you shortly to confirm.',
                icon: 'success',
                confirmButtonText: 'Great!',
                confirmButtonColor: 'var(--primary-color)'
            });
            bookingForm.reset();
            if (flatpickrInstanceDate) flatpickrInstanceDate.clear();
            if (flatpickrInstanceTime) flatpickrInstanceTime.clear();
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!contactForm.checkValidity()) {
                e.stopPropagation();
                contactForm.classList.add('was-validated');
                Swal.fire({
                    title: 'Error!',
                    text: 'Please fill out all fields in the contact form.',
                    icon: 'error',
                    confirmButtonText: 'Okay',
                    confirmButtonColor: 'var(--primary-color)'
                });
                return;
            }
            contactForm.classList.remove('was-validated');

            Swal.fire({
                title: 'Message Sent!',
                text: 'Thank you for contacting us. We will get back to you soon.',
                icon: 'success',
                confirmButtonText: 'Okay',
                confirmButtonColor: 'var(--primary-color)'
            });
            contactForm.reset();
        });
    }

    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

}); // End DOMContentLoaded