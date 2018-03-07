/* -----------------------------------------------
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */

/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
/*
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});
*/

/* Otherwise just put the config content (json): */

particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 250,
            "density": {
                "enable": true,
                "value_area": 1000
            }
        },
        "color": {
            "value": "#FFFFFF"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 5,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 10,
                "size_min": 0.3,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 120,
            "color": "#FFFFFF",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true,
    "config_demo": {
        "hide_card": false,
        "background_color": "#b61924",
        "background_image": "",
        "background_position": "50% 50%",
        "background_repeat": "no-repeat",
        "background_size": "cover"
    }
});




/* ANIMATIONS */ 

var TL = null;
var loader = document.querySelector('#loader');
var icon = document.querySelector('.icon-loader');
var logo = document.querySelector('.logo');
var claim = document.querySelector('.claim');
var particles = document.querySelector('#particles-js');

function setAnimation(){
  var TL = new TimelineMax({onComplete:endAnimation});

  TL.from(icon, .5, {y:'-100%', ease:Back.easeOut},'+=.5')
    .to(icon, .5, {scale:.5,autoAlpha:0},'+=1.5')
    .to(loader, .5, {autoAlpha:0},'-=.4')
    .from(logo, .8, {scale:.8, autoAlpha:0, ease:Power2.easeOut},'-=.2')
    .from(claim, .6, {y:'+=50', autoAlpha:0, ease:Power4.easeOut},'+=.1')
    .from(particles, 1, {autoAlpha:0, ease:Power4.easeOut},'-=.3')
}

function endAnimation(){
  document.body.classList.remove('mask');
}

document.addEventListener("DOMContentLoaded", function(event) {
    icon.style.opacity = 1;
  setAnimation();
});