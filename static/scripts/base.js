const mobile_width = 660;

function initializeListeners() {
    $('.display-source').click(function(event) {
        console.log('Displaying source.');
        let href = $( this ).attr('href');
        let open_in_modal = false;
        let target_modal = null;
        if (open_in_modal) {
            target_modal = $( this ).attr('data-target');
        }
        if (href.includes('.pdf')) {
            event.preventDefault();
            href = `/static/libraries/pdfjs/web/viewer.html?file=${href}`;
            if (open_in_modal) {
                $(target_modal).find('.modal-body').html(`
                    <div class="embed-responsive embed-responsive-210by297">
                        <iframe class="embed-responsive-item" src="${href}" allowfullscreen></iframe>
                    </div>
                `);
            } else {
                window.open(href, '_blank');
            }
            return false;  // prevent modal from popping up
        } else if (href.includes('.epub')) {
            console.log('Opening ePub');
        }
    });
}

function setGetParam(key, value) {
    if (history.pushState) {
        let params = new URLSearchParams(window.location.search);
        params.set(key, value);
        let newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + params.toString();
        console.log(newUrl);
        window.history.pushState({path:newUrl},'', newUrl);
    }
}

function lazyLoadImages() {
    let lazyImages = [].slice.call(document.querySelectorAll("img.lazy,.lazy-bg"));
    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    if (lazyImage.classList.contains('lazy-bg')) {
                        lazyImage.classList.remove("lazy-bg");
                        lazyImage.style.backgroundImage = `url("${lazyImage.dataset.img}")`;
                    } else {
                        lazyImage.src = lazyImage.dataset.src;
                        // lazyImage.srcset = lazyImage.dataset.srcset;
                        lazyImage.classList.remove("lazy");
                        lazyImageObserver.unobserve(lazyImage);
                    }
                }
            });
        });
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fall back to a more compatible method of lazy-loading images
        let active = false;
        const lazyLoad = function() {
            if (active === false) {
                active = true;
                setTimeout(function() {
                    lazyImages.forEach(function(lazyImage) {
                        if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                            lazyImage.src = lazyImage.dataset.src;
                            lazyImage.srcset = lazyImage.dataset.srcset;
                            lazyImage.classList.remove("lazy");

                            lazyImages = lazyImages.filter(function(image) {
                                return image !== lazyImage;
                            });

                            if (lazyImages.length === 0) {
                                document.removeEventListener("scroll", lazyLoad);
                                window.removeEventListener("resize", lazyLoad);
                                window.removeEventListener("orientationchange", lazyLoad);
                            }
                        }
                    });
                    active = false;
                }, 200);
            }
        };
        document.addEventListener("scroll", lazyLoad);
        window.addEventListener("resize", lazyLoad);
        window.addEventListener("orientationchange", lazyLoad);
    }
}

$(function() {
    console.log('base.js');

    // any page
    initializeListeners();

    // lazy-load images
    lazyLoadImages();

    // SERP
    let serp_container_selector = '.serp-container';
    let serp_container = $(serp_container_selector).first();
    // If the page is a SERP
    if (serp_container[0]) {
        let display_option_selector = '.display-options .display-option';
        let searchParams = new URLSearchParams(window.location.search);
        $(display_option_selector).on('click', function() {
            let input = $(this).find('input');
            if (!input.is(':checked')) {
                $(`${display_option_selector} input:checked`).each(function() {
                    let previously_selected_option = $(this);
                    // TODO: Confirm this works as expected, and clean it up
                    previously_selected_option.prop('checked', false);
                    previously_selected_option.removeAttr('checked');
                    if (previously_selected_option.prop('checked')) {
                        // If we don't see this in the console,
                        // the behavior is probably correct even though
                        // the element inspector might show that the previously
                        // selected option still is checked.  : /
                        console.log('WTH');
                    }
                });
                // $(`${display_option_selector} input:checked`).prop('checked', false);
                console.log(`Selecting option: ${input.val()}`);
                input.prop('checked', true);
                let url = new URL(window.location.href);
                url.searchParams.set('display', input.val());
                window.location.href = url.href;
            }
        });
        let result_selector = '.results > .card, .results > .result';
        let active_result = $(result_selector).first();
        if (active_result[0]) {
            if (searchParams.has('key')) {
                let key = searchParams.get('key');
                let active_result_selector = `[data-key=${key}]`;
                if ($(active_result_selector).length) {
                    active_result = $(active_result_selector).first();
                }
            } else {
                setGetParam('key', active_result.attr('data-key'));
            }

            // If not mobile, load 2pane for the first result
            if ($(window).width() > mobile_width) {
                active_result.addClass('active');
                if (!active_result.visible) {
                    active_result[0].scrollIntoView();
                }
                // Initial load of view-detail
                let detail_href = active_result.attr('data-href') + 'part';
                $('.view-detail').load(detail_href, function() {
                    initializeListeners();
                    lazyLoadImages();
                });
            }

            // Load view-detail when a card is clicked
            $(result_selector).click(function() {
                $(`${result_selector}.active`).removeClass('active');
                $( this ).addClass('active');
                let detail_href = $( this ).attr('data-href') + 'part';
                let key = $( this ).attr('data-key');
                $('.view-detail').load(detail_href, function() {
                    if ($(window).width() <= mobile_width) {
                        console.log('Mobile width detected.');
                        let content = $(this).html();
                        let modal = $('#modal');
                        let modal_body = modal.find('.modal-body');
                        modal_body.html(content).addClass('view-detail');
                        let iframe;
                        let iframe_width;
                        let iframe_height;
                        let aspect_ratio;
                        modal_body.find('iframe').each(function() {
                            iframe = $(this);
                            iframe_width = iframe.attr('width');
                            iframe_height = iframe.attr('height');
                            let calculated_width = iframe.width();
                            if (iframe_width && iframe_height && iframe_width > calculated_width) {
                                console.log('iframe may need to be resized');
                                aspect_ratio = iframe_width / iframe_height;
                                // TODO
                            }
                        });
                        modal.modal();
                    }
                    initializeListeners();
                    lazyLoadImages();
                });
                setGetParam('key', key);
            });
        }

        // Enable slideout menu
        const toggler = document.getElementById('sliderToggle');
        const slider = document.getElementById('slider');
        function openSlider() {
            slider.classList.remove('closed');
            slider.classList.add('open');
            toggler.style.left = `${slider.offsetWidth - 5}px`;  // TODO: Use stylesheet rather than JS
        }
        function closeSlider() {
            slider.classList.remove('open');
            slider.classList.add('closed');
            toggler.style.left = '0';  // TODO: make this safer; use stylesheet rather than JS
        }
        // Toggle button
        toggler.addEventListener('click', function() {
            if (slider.classList.contains('closed')) {
                openSlider();
            } else if (slider.classList.contains('open')) {
                closeSlider();
            }
        });
    }

    // Enable hiding admin controls
    $('.hide-admin-controls').click(function(event) {
        // $('.edit-object-button').hide();
        event.preventDefault();
        $('head').append(`<style>.edit-object-button {display: none}</style>`);
    });
});//ready