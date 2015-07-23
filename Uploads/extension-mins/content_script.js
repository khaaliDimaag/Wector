function checkHighlight(){var e="";window.getSelection?e=window.getSelection().toString():document.selection&&"Control"!=document.selection.type&&(e=document.selection.createRange().text),""!=e&&e.length<50&&e!=lastQuery&&initializeHome(1,function(){hasSet&&main(e)})}function displaySettingsAlert(){var e=document.createElement("div"),t=chrome.extension.getURL("/logo48w.png");e.innerHTML="<img src = '"+t+"' style='width:40px; vertical-align:middle;' /> needs to know where you are to show you travel estimates. Click here to set it up!",e.id="setAlert",e.style.position="fixed",e.style.bottom="0",e.style.left="0",e.style.width="100%",e.style.color="white",e.style.font="menu",e.style.fontSize="16px",e.style.border="0",e.style.borderRadius="0px",e.style.zIndex="2147483648",e.style.textAlign="center",e.style.display="none",e.style.padding="0.5%",$(e).on("click",function(){chrome.runtime.sendMessage({message:"showOptions"})}),document.body.appendChild(e),$(e).slideDown("fast"),setTimeout(function(){$(e).slideUp("fast",function(){document.contains(e)&&document.body.removeChild(e)})},6660)}function main(e){var t=e;lastQuery=t;var a=t;$.ajax({type:"GET",url:"https://maps.googleapis.com/maps/api/distancematrix/json?origins="+home+"&destinations="+a+"&language=en-EN",success:function(e){var t=e.rows[0],a=t.elements[0],s=a.status,i=e.destination_addresses[0],n=e.origin_addresses[0];if("ZERO_RESULTS"==s){var o=-1,l=-1;$.ajax({type:"GET",url:"https://maps.googleapis.com/maps/api/geocode/json?address="+i,success:function(e){o=e.results[0].geometry.location.lat,l=e.results[0].geometry.location.lng;var t=getFlight(o,l,latsrc,lonsrc),a="<i class='fa fa-paper-plane-o'></i>  "+t+" hour";1!=t&&(a+="s"),alertUser(n,i,"",a,"","",0,1,0,0)}})}else if("OK"==s){var d=a.distance,m=a.duration,r=" <i class='fa fa-car'></i>  "+m.text,c=" <i class='fa fa-paper-plane-o'></i>  ",u=" <i class='zmdi zmdi-directions-walk'></i>  ",y=" <i class='fa fa-bicycle'></i>  ";if(.95*d.value<=Math.max(maxWalkDist,maxBikeDist)){var h,g=.95*d.value/maxWalkSpd,f=Math.floor(g);h=0==f?" ":1==f?" "+f+" hour":" "+f+" hours";var p=Math.floor(60*(g-f)),v=" "+p+" min";1!=p&&(v+="s"),u+=h+v;var k,x=.95*d.value/maxBikeSpd,B=Math.floor(x);k=0==B?" ":1==B?" "+B+" hour":" "+B+" hours";var T=Math.floor(60*(x-B)),w=" "+T+" min";1!=T&&(w+="s"),y+=k+w;var b=!0;(B>maxBikeTimeH||B==maxBikeTimeH&&T>maxBikeTimeM)&&(b=!1);var E=!0;(f>maxWalkTimeH||f==maxWalkTimeH&&p>maxWalkTimeM)&&(E=!1);var M=1,W=0,H=0;return b?(W=1,M=2,E&&(H=1,W=2,M=3)):E&&(H=1,M=2,b&&(H=1,W=2,M=3)),void alertUser(n,i,r,c,y,u,M,0,W,H)}if(m.value<7200)alertUser(n,i,r,c,y,u,1,0,0,0);else{var o=-1,l=-1;$.ajax({type:"GET",url:"https://maps.googleapis.com/maps/api/geocode/json?address="+i,success:function(e){o=e.results[0].geometry.location.lat,l=e.results[0].geometry.location.lng;var t=getFlight(o,l,latsrc,lonsrc);c+=t+" hour",1!=t&&(c+="s"),m.value<36e3?alertUser(n,i,r,c,y,u,1,2,0,0):alertUser(n,i,r,c,y,u,2,1,0,0)}})}}}})}function findWidth(e,t,a,s){var i=e+t+a+s;return 10==i?"four":6==i?"three":3==i?"two":"one"}function resetBodyClass(){document.getElementsByTagName("body")[0].className=document.getElementsByTagName("body")[0].className.replace(/\bone\b/,""),document.getElementsByTagName("body")[0].className=document.getElementsByTagName("body")[0].className.replace(/\btwo\b/,""),document.getElementsByTagName("body")[0].className=document.getElementsByTagName("body")[0].className.replace(/\bthree\b/,""),document.getElementsByTagName("body")[0].className=document.getElementsByTagName("body")[0].className.replace(/\bfour\b/,"")}function alertUser(e,t,a,s,i,n,o,l,d,m){var r="https://www.google.com/maps/dir/"+e+"/"+t;t="<div id = 'address'>"+t+"</div>";var c=" "+findWidth(m,d,l,o),u=t,y="<a href='"+r+"' target='_blank' ><i class='fa fa-external-link'></i></a>";y="<div id = 'links'>"+y+"</div>",u+="<div id = 'info'>",a="<div class = 'mode'>"+a+"</div>",s="<div class = 'mode'>"+s+"</div>",i="<div class = 'mode'>"+i+"</div>",n="<div class = 'mode'>"+n+"</div>",u+=1==o?a:1==l?s:1==d?i:1==m?n:"",u+=2==o?a:2==l?s:2==d?i:2==m?n:"",u+=3==o?a:3==l?s:3==d?i:3==m?n:"",u+=4==o?a:4==l?s:4==d?i:4==m?n:"",u+="</div>",u+=y;var h=document.createElement("div");h.innerHTML=u,h.id="Wector",h.style.position="fixed",h.style.bottom="0",h.style.left="0",h.style.width="100%",h.style.background="rgba(0,0,0,0.9)",h.style.color="white",h.style.font="menu",h.style.fontSize="16px",h.style.border="0",h.style.borderRadius="0px",h.style.zIndex="2147483648",h.style.textAlign="center",h.style.display="none",h.onclick=function(){lastQuery="",$(h).slideUp("fast",function(){document.body.removeChild(h)})};var g=document.getElementById("Wector");null==g?(resetBodyClass(),document.getElementsByTagName("body")[0].className+=c,document.body.appendChild(h),$(h).slideDown("fast",function(){var e=$("#address").height();document.getElementById("info").style.lineHeight=e+"px",document.getElementById("links").style.lineHeight=e+"px";var t=$("#address").width()+$("#info").width()+$("#links").width(),a=$(this).width();Math.abs(1.03*t-a)>5&&(document.getElementById("address").style.width="36%",document.getElementById("info").style.width="60%",document.getElementById("links").style.width="4%")}),setTimeout(function(){$(h).slideUp("fast",function(){document.contains(h)&&document.body.removeChild(h)})},6660)):$(g).slideUp("fast",function(){document.body.removeChild(g),resetBodyClass(),document.getElementsByTagName("body")[0].className+=c,document.body.appendChild(h),$(h).slideDown("fast",function(){var e=$("#address").height();document.getElementById("info").style.lineHeight=e+"px",document.getElementById("links").style.lineHeight=e+"px";var t=$("#address").width()+$("#info").width()+$("#links").width(),a=$(this).width();Math.abs(1.03*t-a)>5&&(document.getElementById("address").style.width="36%",document.getElementById("info").style.width="60%",document.getElementById("links").style.width="4%")}),setTimeout(function(){$(h).slideUp("fast",function(){document.contains(h)&&document.body.removeChild(h)})},6660)})}function initializeHome(e,t){chrome.storage.sync.get({latitude:42.4534492,longitude:-76.4735027,address:"Cornell University",mWS:5e3,mBS:14e3,mWTH:0,mBTH:0,mWTM:30,mBTM:30,exists:!1},function(a){latsrc=a.latitude,lonsrc=a.longitude,home=a.address,maxWalkSpd=a.mWS,maxBikeSpd=a.mBS,maxWalkTimeH=a.mWTH,maxBikeTimeH=a.mBTH,maxWalkTimeM=a.mWTM,maxBikeTimeM=a.mBTM,maxWalkDist=maxWalkSpd*(maxWalkTimeH+maxWalkTimeM/60),maxBikeDist=maxBikeSpd*(maxBikeTimeH+maxBikeTimeM/60),hasSet=a.exists,hasSet||1!=e||displaySettingsAlert(),t()})}function atWectorML(){try{null!=document.getElementById("thisIsForTheExtension")&&(document.getElementById("install").style.display="none",document.getElementById("try").style.display="none",document.getElementById("alreadyhave").style.display="block",document.getElementById("p1a").onclick=function(){chrome.runtime.sendMessage({message:"showOptions"})})}catch(e){console.log("Wector Error: "+e)}}function getFlight(e,t,a,s){var i=haversine(e,t,a,s),n=Math.min(i,300),o=i-n,l=n/400,d=o/800,m=l+d;return Math.ceil(100*m/100)}function haversine(){var e=Array.prototype.map.call(arguments,function(e){return e/180*Math.PI}),t=e[0],a=e[1],s=e[2],i=e[3],n=6372.8,o=s-t,l=i-a,d=Math.sin(o/2)*Math.sin(o/2)+Math.sin(l/2)*Math.sin(l/2)*Math.cos(t)*Math.cos(s),m=2*Math.asin(Math.sqrt(d));return n*m}console.log("Thanks for using Wector! Visit us at http://wector.ml");var fa_link=document.createElement("link");fa_link.rel="stylesheet",fa_link.href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css",document.getElementsByTagName("head")[0].appendChild(fa_link);var md_link=document.createElement("link");md_link.rel="stylesheet",md_link.href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.0.2/css/material-design-iconic-font.min.css",document.getElementsByTagName("head")[0].appendChild(md_link);var latsrc,lonsrc,home,hasSet,maxWalkSpd,maxBikeSpd,maxWalkTimeH,maxBikeTimeH,maxWalkTimeM,maxBikeTimeM,maxWalkDist,maxBikeDist,lastQuery="";atWectorML(),initializeHome(0,function(){}),document.onmouseup=checkHighlight;