function startTime(){var e=["January","February","March","April","May","June","July","August","September","October","November","December"],t=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],n=new Date,a=[n.getHours(),n.getMinutes(),n.getSeconds()],o=[n.getDate(),n.getDay(),n.getMonth(),n.getFullYear()],r=a[0],i=a[1],s=a[2],l=r>=12?"PM":"AM",c=o[0],u=t[o[1]],d=e[o[2]],h=o[3];r%=12,r=r?r:12,i=i<10?"0"+i:i,s=s<10?"0"+s:s,document.getElementById("time").innerHTML=r+":"+i+":"+s+" "+l,document.getElementById("date").innerHTML=u+", "+d+" "+c+", "+h;setTimeout(startTime,500)}function randomQuote(){var e=["If you are depressed you are living in the past. If you are anxious you are living in the future. If you are at peace you are living in the present.","Madness, as you know, is a lot like gravity, all it takes is a little push.","The surest way to corrupt a youth is to instruct him to hold in higher esteem those who think alike than those who think differently.","Life has many ways of testing a person's will, either by having nothing happen at all or by having everything happen all at once.","There is no excellent beauty that hath not some strangeness in its proportions.","Children are fantastic little creatures, because next to drunk people, they are the only truly honest people on earth.","I begin with an idea, and then it becomes something else.","Be who you are and say what you feel because those who mind don't matter and those who matter don't mind.","You can make more friends in two months by becoming interested in other people than you can in two years by trying to get people interested in you.","An essential aspect of creativity is not being afraid to fail.","Antisocial behavior is a trait of intelligence in a world of conformists.","What you do today can improve all your tomorrows.","A creative man is motivated by the desire to achieve, not by the desire to beat others.","Don't watch the clock; do what it does. Keep going.","If you can dream it, you can do it.","You can't build a reputation on what you're going to do."],t=["Lao Tzu","Joker","Friedrich Nietzsche","Paulo Coelho","Sir Francis Bacon","Mads Nipper","Pablo Picasso","Dr. Seuss","Dale Carnegie","Edwin Land","Nikola Tesla","Ralph Marston","Ayn Rand","Sam Levenson","Walt Disney","Henry Ford"],n=Math.floor(Math.random()*e.length);document.getElementById("quote").innerHTML="&ldquo;"+e[n]+"&rdquo; &mdash; <small>"+t[n]+"</small>"}function randomBackground(e){var t=["buildings","nature","objects"],n=Math.floor(Math.random()*t.length),a=new UnsplashPhoto;"daily"==e||"weekly"==e?a.all().randomize(e).fromCategory(t[n]).fetch():a.all().fromCategory(t[n]).fetch(),document.body.style.backgroundImage="url("+a.url+")"}function fetchBookmarks(){var e=6;chrome.bookmarks.getTree(function(t){t.forEach(function(t){t.children[0].children.forEach(function(t){t.children&&e>=1&&(console.log(t.title+" "+t.title.charAt(0).toLowerCase()),t.children.forEach(function(e){var t=e.title.match(/\[(.*?)\]/);t&&console.log(e.title+" "+e.url+" "+e.title.match(t[1]))}),console.log(""),e--)})})});var t=document.createElement("div");t.className="left",document.getElementById("box").appendChild(t);var n=document.createElement("div");n.className="right",document.getElementById("box").appendChild(n)}function bindMousetraps(){$.each($(".parent"),function(e,t){Mousetrap.bind($(t).attr("data-key"),function(e){$("a#"+$(t).attr("id")).toggleClass("active").next().slideToggle(150),$.each($(t).parent().find(".tab"),function(e,t){Mousetrap.bind($(t).attr("data-key"),function(e){window.location.href=$(t).attr("href")})}),Mousetrap.bind($(t).attr("data-key"),function(e){resetMousetraps()})})}),Mousetrap.bind("esc",function(e){resetMousetraps()}),Mousetrap.bind("w",function(e){window.location.href=document.getElementById("weatherlink")}),Mousetrap.bind("g",function(e){window.location.href="https://github.com/pschfr/start"}),Mousetrap.bind("space",function(e){refreshStuff()})}function resetMousetraps(){$(".subMenu").slideUp(150),$("li a").removeClass("active"),Mousetrap.reset(),bindMousetraps()}function getWeather(e){var t="3dc48ab835ed1b4369c089d0e742ff03",n="flags,daily,minutely,alerts",a="https://api.darksky.net/forecast/"+t+"/"+e+"?exclude="+n,o=new XMLHttpRequest;o.open("GET",a,!0),o.onreadystatechange=function(){if(4==o.readyState&&200==o.status){var t=JSON.parse(o.responseText);document.getElementById("weather").innerHTML='<a id="weatherlink" href="https://darksky.net/forecast/'+e+'">'+t.currently.summary+", "+Math.trunc(t.currently.temperature)+"&deg;</a>",document.getElementById("details").innerHTML=t.hourly.summary,"rain"!=t.currently.icon&&"snow"!=t.currently.icon&&"sleet"!=t.currently.icon||snow()}},o.send(null)}function geolocWeather(){"geolocation"in navigator?navigator.geolocation.getCurrentPosition(function(e){getWeather(e.coords.latitude+","+e.coords.longitude)}):getWeather("40.4406, -79.9959")}function lastfmRequest(){var e="paul_r_schaefer",t="0f680404e39c821cac34008cc4d803db",n="https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user="+e+"&api_key="+t+"&limit=1&format=json",a=document.getElementById("lastFM"),o=new XMLHttpRequest;o.open("GET",n,!0),o.onreadystatechange=function(){if(4==o.readyState&&200==o.status){var e=JSON.parse(o.responseText).recenttracks["@attr"].total,t=JSON.parse(o.responseText).recenttracks.track[0];t["@attr"]&&""!==t["@attr"].nowplaying?a.innerHTML='<span title="'+e+' total streamed">currently listening to:</span> ':a.innerHTML='<span title="'+e+' total streamed">last listened to:</span> ',a.innerHTML+='<a href="'+t.url+'" title="on album: '+t.album["#text"]+'">'+t.artist["#text"]+" &mdash; "+t.name+"</a> "}},o.send(null)}function getOptions(){chrome.storage.sync.get({backgroundCategory:"category/nature",backgroundRefresh:"daily",lastFMusername:"paul_r_schaefer"},function(e){console.log(e.backgroundCategory),console.log(e.backgroundRefresh),console.log(e.lastFMusername)})}function snow(){function e(){t.height=t.offsetHeight,t.width=t.offsetWidth}var t=document.getElementById("snow"),n=t.getContext("2d"),a=[];t.style.pointerEvents="none",t.style.position="fixed",t.style.top=0,t.style.left=0,t.style.width="100vw",t.style.height="100vh",e(),window.onresize=function(){e()};var o=Math;setInterval(function(){n.clearRect(0,0,t.width,t.height),n.beginPath();var e=o.random(),r=.05+.95*e;for(flake={},flake.x=1.5*t.width*o.random()-.5*t.width,flake.y=-9,flake.velX=2*r*(o.random()/2+.5),flake.velY=(4+2*o.random())*r,flake.radius=o.pow(5*e,2)/5,flake.update=function(){var e=this;e.x+=e.velX,e.y+=e.velY,n.beginPath(),n.arc(e.x,e.y,e.radius,0,2*o.PI,!1),n.fillStyle="#FFF",n.fill()},a.push(flake),b=0;b<a.length;b++)a[b].y>t.height?a.splice(b,1):a[b].update()},16)}$(function(){startTime(),randomQuote(),randomBackground(),bindMousetraps(),geolocWeather(),lastfmRequest(),$("li a.parent").click(function(){$(this).parent("li").find("ul").slideToggle(150),$(this).toggleClass("active")}),document.getElementById("background").addEventListener("click",resetMousetraps,!1)});