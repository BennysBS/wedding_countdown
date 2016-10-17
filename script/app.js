'use strict';

var gifPath = 'gifs/';
var gifs = [
  'f1.gif',
  'f2.gif',
  'f3.gif',
  'f4.gif',
  'f5.gif',
  'f6.gif',
  'f7.gif',
  'f8.gif',
  'f9.gif',
  'f10.gif',
  'f11.gif'
];

function gifStuff(){
  return new Vue({
    el: '#gifholder',
    data: {

    },
    methods: {
      updateTimer: function(arr){

      }
    },
    attached: function(){
      var el = this.$els.imggif;
      el.src = gifPath + gifs[Math.floor(Math.random() * gifs.length)];
      setInterval(function(){
        el.src = gifPath + gifs[Math.floor(Math.random() * gifs.length)];

      }.bind(this), 8000);
    }
  });
}

function countDown(){
  return new Vue({
    el: '#countdown',
    data: {},
    methods: {},
    attached: function(){
      var clock = this.$els.count;
      var targetDate = new Date('Sat Apr 22 2017 19:00:00');

      function getTimeRemaining(endtime){
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );
        var hours = Math.floor( (t/(1000*60*60)) % 24 );
        var days = Math.floor( t/(1000*60*60*24) );
        return {
          'total': t,
          'days': days,
          'hours': hours,
          'minutes': minutes,
          'seconds': seconds
        };
      }

      function initializeClock(id, endtime){
        var clock = document.getElementById(id);
        var timeinterval = setInterval(function(){


          var t = getTimeRemaining(endtime);
          clock.textContent = t.days + ' Dagar' + ', ' +
                            t.hours + ' Timmar' + ', ' +
                            t.minutes +' Minuter' + ', ' +
                            t.seconds + ' Sekunder';
          if(t.total <= 0){
            clearInterval(timeinterval);
          }
        }, 1000);
      }

      initializeClock('countdown', targetDate);

    }
  });
}

function init(){
  countDown();
  gifStuff();
}

window.onload = init;
