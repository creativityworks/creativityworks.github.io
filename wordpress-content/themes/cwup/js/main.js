function sidebarLinks() {
    $('.sidebar .blue').add('.sidebar .green').add('.sidebar .speech').each(function () {
        el = $(this);
        var link = el.find('a');
        if (link.length) {
            el.on('click', function (e) {
                e.preventDefault();
                window.location = $.trim(link.attr('href'));
            }).css({
                'cursor': 'pointer'
            });
        }
    });
}

function socialise() {
    //$('body').append('<script type="text/javascript" src="http://s7.addthis.com/js/250/addthis_widget.js#pubid=xa-510ff701460aeeda"></script>');
}

function googlemap() {
    if (!$('#map_canvas').length) return;
    var centerLatLng = new google.maps.LatLng(51.293447,-2.448719);
    var hrLatLng = new google.maps.LatLng(51.291447,-2.448719);
    var mapOptions = {
      center: centerLatLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    var infowindow = new google.maps.InfoWindow({
        content: '<h1>Creativity Works</h1>'
    });

    var marker = new google.maps.Marker({
        position: hrLatLng,
        title:"Creativity Works"
    });
    marker.setMap(map);
    infowindow.open(map,marker);
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });
}

function slider() {
    var slide_container  = $('div.slider');
    var panes            = slide_container.find('ul.panes li');
    var control          = slide_container.find('div.control');
    var control_elements = control.find('li a');
    var current          = slide_container.find('li.current');
    var slideTime        = 5000;
    var slideTimer;

    if (panes.length === 0) return;

    if (panes.length === 1) {
        control.hide();
        return;
    }

    change = function(index) {
        if (typeof(index) !=='undefined') {
            next = $(panes[index]);
        } else {
            next = panes.filter(':visible').next();
        }

        if (!next.length) {
            next = panes.first();
        }

        index = panes.index(next);

        control_elements.removeClass('current');
        $(control_elements[index]).addClass('current');

        current.fadeOut(200, function () {
            next.fadeIn(200);
        });

        current = next;

        slideTimer = window.setTimeout(change, slideTime);
    };

    control_elements.on('click.slider', function (e) {
        e.preventDefault();
        el = $(this);
        window.clearTimeout(slideTimer);
        change(el.parent().index());
    });

    slideTimer = window.setTimeout(change, slideTime, 1);
}

function gallery() {
    gall = $('div.gallery');
    items = gall.find('.item');

    if (!items.length) return;

    items.find('.caption').fadeTo(100, 0);
    items.on({
        mouseenter: function() {
            el = $(this);
            caption = el.find('.caption');
            caption.fadeTo(200, 0.85);
        },
        mouseleave: function() {
            el = $(this);
            caption = el.find('.caption');
            caption.stop().fadeTo(200, 0);
        }
    });

    gall.imagesLoaded(function() {
        gall.masonry({
            itemSelector : '.item'
        });
    });
}

function oembed_soundcloud() {
    $.getJSON('http://soundcloud.com/oembed?callback=?', {format: 'js', url: 'http://snd.sc/yp6VMo', iframe: true },
        function(data) {
            //Stick the html content returned in the object into the page
            $('#your_player_div').html(data['html']);
        }
    );
}

function staffpage() {
    els = $('.staff_member');
    if (!els.length) return;
    els.find('a.showhide').on('click', function (e) {
        e.preventDefault();
        link = $(this);
        bio = link.prev();
        showing = bio.data('showing');
        if (showing == 'short') {
            bio.data('showing', 'full');
            bio.stop().showHtml(bio.data('full'));
        } else {
            bio.data('showing', 'short');
            bio.stop().showHtml(bio.data('short'));
        }
    });
}

function rxNav() {
    navicon = $('.navicon, .clickblocker');
    body = $('body');
    reveals = $('.rx-nav a.reveal');
    top_lis = $('.rx-nav>ul>li');
    navicon.on('click', function (e) {
        e.preventDefault();
        if (body.hasClass('rx-nav-open')) {
            body.removeClass('rx-nav-open');
        } else {
            body.addClass('rx-nav-open');
        }
    });
    reveals.on('click', function (e) {
        e.preventDefault();
        reveal = $(this);
        li = reveal.closest('li');
        add = !li.hasClass('current_page_ancestor');
        top_lis.removeClass('current_page_ancestor');
        if (add) {
            li.addClass('current_page_ancestor');
        }
    });
    body.on('swiperight', function () {
        body.removeClass('rx-nav-open');
    }).on('movestart', function(e) {
      // If the movestart is heading off in an upwards or downwards
      // direction, prevent it so that the browser scrolls normally.
      body = $('body');

      if (!body.hasClass('rx-nav-open') ||
          (e.distX > e.distY && e.distX < -e.distY) ||
          (e.distX < e.distY && e.distX > -e.distY)) {
        e.preventDefault();
      }
    });
}

function initSwitchTextSize() {
    $('.textsize a').on('click', function (e) {
        e.preventDefault();
        el = $(this);
        switchTextSize(el.data('size'));
    });
    current = $.cookie('text-size');
    if (current) {
        switchTextSize(current);
    }
}

function switchTextSize(size) {
    html = $('html');
    $('.textsize a').removeClass('current');
    if (size == 'regular') {
        html.css('font-size', '14px');
        $('.textsize .regular').addClass('current');
        $.cookie('text-size', 'regular', { path: '/' });
    } else if ( size == 'large') {
        html.css('font-size', '17px');
        $('.textsize .large').addClass('current');
        $.cookie('text-size', 'large', { path: '/' });
    } else if ( size == 'larger') {
        html.css('font-size', '20px');
        $('.textsize .larger').addClass('current');
        $.cookie('text-size', 'larger', { path: '/' });
    }
}

function initFancybox() {
    $(".ytfb").click(function(e) {
        e.preventDefault();
        $.fancybox({
                'padding'       : 0,
                'autoScale'     : false,
                'transitionIn'  : 'none',
                'transitionOut' : 'none',
                'width'         : 680,
                'height'        : 495,
                'href'          : this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
                'type'          : 'swf',
                'swf'           : {
                     'wmode'        : 'transparent',
                     'allowfullscreen'   : 'true'
                }
            });

        return false;
    });
}

function initTestimonials() {
    items = $('.testimonials blockquote');
    if (items.length < 2) return;

    height = 0;
    items.each(function (index, item) {
        el = $(item);
        display = el.css('display');
        el.css('display', 'block');
        height = Math.max(height, el.height());
        el.css('display', display);
    }).css('height', height - 24);

    window.setTimeout(nextTestimonial, 12000);
}

function nextTestimonial() {
    items = $('.testimonials blockquote');
    current = items.filter(':visible');
    next = current.next();
    if (!next.length) {
        next = items.first();
    }
    current.fadeOut(200, function () {
        next.fadeIn(200);
        window.setTimeout(nextTestimonial, 12000);
    });
}

var unpeekTimer;
function initSubNav() {
    $('nav#primary li').on({
        mouseenter: function() {
            window.clearTimeout(unpeekTimer);
            unNavPeek();
            el = $(this);
            id = el.data('id');
            target = $('nav#secondary ul[data-parent=' + id + ']');
            target.addClass('peek');
            if (target.length) {
                current = $('nav#secondary ul.current').not(target);
                current.addClass('peeked');
            }
        },
        mouseleave: function() {
            unpeekTimer = window.setTimeout(unNavPeek, 2000);
        }
    });
    $('nav#secondary ul').on({
        mouseenter: function() {
            window.clearTimeout(unpeekTimer);
        },
        mouseleave: function() {
            unpeekTimer = window.setTimeout(unNavPeek, 2000);
        }
    });
}

function unNavPeek() {
    target = $('nav#secondary ul');
    target.removeClass('peek').removeClass('peeked');
}

function initPlaceholders() {
    $('input, textarea').placeholder();
}

// document.ready to set us off
$(function () {

    sidebarLinks();
    socialise();
    googlemap();
    slider();
    gallery();
    staffpage();
    // initSwitchTextSize();
    initFancybox();
    initTestimonials();
    initSubNav();
    rxNav();
    initPlaceholders();

    //$.cookieCuttr({
    //    cookieAnalytics: true,
    //    cookieAcceptButtonText: 'OK'
    //});

});


