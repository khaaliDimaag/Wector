/* Thanks to : http://javascript-minifier.com/ */
function setHide(){hide=!1}function checkHighlight(){if(!hide){var e="";window.getSelection?e=window.getSelection().toString():document.selection&&"Control"!=document.selection.type&&(e=document.selection.createRange().text),""!=e&&e.length<50&&e!=lastQuery&&(!trie.exists(e)||isFirstLetterCapital(e))&&!isThreeDigitisOrLess(e)&&initializeHome(1,function(){hasSet&&main(e)})}}function isFirstLetterCapital(e){return e.charAt(0)===e.charAt(0).toUpperCase()}function isThreeDigitisOrLess(e){return e.length<=3&&!isNaN(e)?!0:!1}function displaySettingsAlert(){var e=document.createElement("div"),t=chrome.extension.getURL("/logo48w.png");e.innerHTML="<img src = '"+t+"' style='width:40px; vertical-align:middle;' /> needs to know where you are to show you travel estimates. Click here to set it up!",e.id="WectorSetAlert",e.style.position="fixed",e.style.bottom="0",e.style.left="0",e.style.width="100%",e.style.color="white",e.style.font="menu",e.style.fontSize="16px",e.style.border="0",e.style.borderRadius="0px",e.style.zIndex="2147483648",e.style.textAlign="center",e.style.display="none",e.style.padding="0.5%",$(e).on("click",function(){chrome.runtime.sendMessage({message:"showOptions"})}),document.body.appendChild(e),$(e).slideDown("fast"),setTimeout(function(){$(e).slideUp("fast",function(){document.contains(e)&&document.body.removeChild(e)})},6660)}function main(e){var t=e;lastQuery=t;var i=t;$.ajax({type:"GET",url:"https://maps.googleapis.com/maps/api/distancematrix/json?origins="+home+"&destinations="+i+"&language=en-EN",success:function(e){var t=e.rows[0],i=t.elements[0],n=i.status,o=e.destination_addresses[0],s=e.origin_addresses[0];if("ZERO_RESULTS"==n){var a=-1,r=-1;$.ajax({type:"GET",url:"https://maps.googleapis.com/maps/api/geocode/json?address="+o,success:function(e){a=e.results[0].geometry.location.lat,r=e.results[0].geometry.location.lng;var t=getFlight(a,r,latsrc,lonsrc),i="<i class='fa fa-paper-plane-o Wector-plane'></i>  "+t+" hour";1!=t&&(i+="s"),alertUser(s,o,"",i,"","",0,1,0,0)}})}else if("OK"==n){var l=i.distance,d=i.duration,c=" <i class='fa fa-car Wector-car'></i>  "+d.text,m=" <i class='fa fa-paper-plane-o Wector-plane'></i>  ",u=" <i class='zmdi zmdi-directions-walk Wector-walk'></i>  ",h=" <i class='fa fa-bicycle Wector-cycle'></i>  ";if(.95*l.value<=Math.max(maxWalkDist,maxBikeDist)){var y,f=.95*l.value/maxWalkSpd,g=Math.floor(f);y=0==g?" ":1==g?" "+g+" hour":" "+g+" hours";var p=Math.floor(60*(f-g)),x=" "+p+" min";1!=p&&(x+="s"),u+=y+x;var W,k=.95*l.value/maxBikeSpd,v=Math.floor(k);W=0==v?" ":1==v?" "+v+" hour":" "+v+" hours";var B=Math.floor(60*(k-v)),T=" "+B+" min";1!=B&&(T+="s"),h+=W+T;var w=!0;(v>maxBikeTimeH||v==maxBikeTimeH&&B>maxBikeTimeM)&&(w=!1);var E=!0;(g>maxWalkTimeH||g==maxWalkTimeH&&p>maxWalkTimeM)&&(E=!1);var b=1,M=0,I=0;return w?(M=1,b=2,E&&(I=1,M=2,b=3)):E&&(I=1,b=2,w&&(I=1,M=2,b=3)),void alertUser(s,o,c,m,h,u,b,0,M,I)}if(d.value<7200)alertUser(s,o,c,m,h,u,1,0,0,0);else{var a=-1,r=-1;$.ajax({type:"GET",url:"https://maps.googleapis.com/maps/api/geocode/json?address="+o,success:function(e){a=e.results[0].geometry.location.lat,r=e.results[0].geometry.location.lng;var t=getFlight(a,r,latsrc,lonsrc);m+=t+" hour",1!=t&&(m+="s"),d.value<36e3?alertUser(s,o,c,m,h,u,1,2,0,0):alertUser(s,o,c,m,h,u,2,1,0,0)}})}}}})}function findWidth(e,t,i,n){var o=e+t+i+n;return 10==o?"Wector4":6==o?"Wector3":3==o?"Wector2":"Wector1"}function resetBodyClass(){document.getElementsByTagName("body")[0].className=document.getElementsByTagName("body")[0].className.replace(/\bWector1\b/,""),document.getElementsByTagName("body")[0].className=document.getElementsByTagName("body")[0].className.replace(/\bWector2\b/,""),document.getElementsByTagName("body")[0].className=document.getElementsByTagName("body")[0].className.replace(/\bWector3\b/,""),document.getElementsByTagName("body")[0].className=document.getElementsByTagName("body")[0].className.replace(/\bWector4\b/,"")}function alertUser(e,t,i,n,o,s,a,r,l,d){var c="https://www.google.com/maps/dir/"+e+"/"+t;t="<div id = 'WectorAddress'>"+t+"</div>";var m=" "+findWidth(d,l,r,a),u=t,h="<i class='zmdi zmdi-directions Wector-map'></i>  Route";h="<div id = 'WectorLinks'>"+h+"</div>",u+="<div id = 'WectorInfo'>",i="<div class = 'WectorMode'>"+i+"</div>",n="<div class = 'WectorMode'>"+n+"</div>",o="<div class = 'WectorMode'>"+o+"</div>",s="<div class = 'WectorMode'>"+s+"</div>",u+=1==a?i:1==r?n:1==l?o:1==d?s:"",u+=2==a?i:2==r?n:2==l?o:2==d?s:"",u+=3==a?i:3==r?n:3==l?o:3==d?s:"",u+=4==a?i:4==r?n:4==l?o:4==d?s:"",u+="</div>",u+=h;var y=document.createElement("div");y.innerHTML=u,y.id="Wector",y.style.position="fixed",y.style.bottom="0",y.style.left="0",y.style.width="100%",y.style.background="rgba(0,0,0,0.9)",y.style.color="white",y.style.font="menu",y.style.fontSize="16px",y.style.border="0",y.style.borderRadius="0px",y.style.zIndex="2147483648",y.style.textAlign="center",y.style.display="none",y.onclick=function(){lastQuery="",$(y).slideUp("fast",function(){document.body.removeChild(y)})};var f=document.getElementById("Wector");null==f?(resetBodyClass(),document.getElementsByTagName("body")[0].className+=m,document.body.appendChild(y),$(y).slideDown("fast",function(){var e=$("#WectorAddress").height();document.getElementById("WectorInfo").style.lineHeight=e+"px",document.getElementById("WectorLinks").style.lineHeight=e+"px";var t=$("#WectorAddress").width()+$("#WectorInfo").width()+$("#WectorLinks").width(),i=$(this).width();Math.abs(1.03*t-i)>5&&(document.getElementById("WectorAddress").style.width="36%",document.getElementById("WectorInfo").style.width="48%",document.getElementById("WectorLinks").style.width="16%")}),document.getElementById("WectorAddress").onclick=function(){hide=!0},document.getElementById("WectorInfo").onclick=function(){hide=!0},document.getElementById("WectorLinks").onclick=function(){window.open(c,"_blank")},setTimeout(function(){$(y).slideUp("fast",function(){document.contains(y)&&document.body.removeChild(y)})},6660)):$(f).slideUp("fast",function(){document.body.removeChild(f),resetBodyClass(),document.getElementsByTagName("body")[0].className+=m,document.body.appendChild(y),$(y).slideDown("fast",function(){var e=$("#WectorAddress").height();document.getElementById("WectorInfo").style.lineHeight=e+"px",document.getElementById("WectorLinks").style.lineHeight=e+"px";var t=$("#WectorAddress").width()+$("#WectorInfo").width()+$("#WectorLinks").width(),i=$(this).width();Math.abs(1.03*t-i)>5&&(document.getElementById("WectorAddress").style.width="36%",document.getElementById("WectorInfo").style.width="48%",document.getElementById("WectorLinks").style.width="16%")}),document.getElementById("WectorAddress").onclick=function(){hide=!0},document.getElementById("WectorInfo").onclick=function(){hide=!0},document.getElementById("WectorLinks").onclick=function(){window.open(c,"_blank")},setTimeout(function(){$(y).slideUp("fast",function(){document.contains(y)&&document.body.removeChild(y)})},6660)})}function initializeHome(e,t){chrome.storage.sync.get({latitude:42.4534492,longitude:-76.4735027,address:"Cornell University",mWS:5e3,mBS:14e3,mWTH:0,mBTH:0,mWTM:30,mBTM:30,exists:!1},function(i){latsrc=i.latitude,lonsrc=i.longitude,home=i.address,maxWalkSpd=i.mWS,maxBikeSpd=i.mBS,maxWalkTimeH=i.mWTH,maxBikeTimeH=i.mBTH,maxWalkTimeM=i.mWTM,maxBikeTimeM=i.mBTM,maxWalkDist=maxWalkSpd*(maxWalkTimeH+maxWalkTimeM/60),maxBikeDist=maxBikeSpd*(maxBikeTimeH+maxBikeTimeM/60),hasSet=i.exists,hasSet||1!=e||displaySettingsAlert(),t()})}function atWectorML(){try{null!=document.getElementById("thisIsForTheExtension")?(document.getElementById("install").style.display="none",document.getElementById("try").style.display="none",document.getElementById("alreadyhave").style.display="block",document.getElementById("p1a").onclick=function(){chrome.runtime.sendMessage({message:"showOptions"})}):console.log("Thanks for using Wector! Visit us at http://wector.ml")}catch(e){console.log("Wector Error: "+e)}}function getFlight(e,t,i,n){var o=haversine(e,t,i,n),s=Math.min(o,300),a=o-s,r=s/400,l=a/800,d=r+l;return Math.ceil(100*d/100)}function haversine(){var e=Array.prototype.map.call(arguments,function(e){return e/180*Math.PI}),t=e[0],i=e[1],n=e[2],o=e[3],s=6372.8,a=n-t,r=o-i,l=Math.sin(a/2)*Math.sin(a/2)+Math.sin(r/2)*Math.sin(r/2)*Math.cos(t)*Math.cos(n),d=2*Math.asin(Math.sqrt(l));return s*d}function initializeDictionary(){trie=new suffixTree,trie.insertList(words)}var suffixTreeNode=function(e,t,i,n,o){this.data=e,this.keys=t,this.next=i,this.isEnd=n,this.words=o},suffixTree=function(){this.root=new suffixTreeNode(" ",[],[],!1,[])};suffixTree.prototype.insertList=function(e){for(var t=0;t<e.length;t++)this.insertWord(e[t],t)},suffixTree.prototype.insertWord=function(e,t){if(0!=e.length)for(var i=this.root,n=0;n<e.length;n++){var o=e[n];o=o.toLowerCase();var s=i.keys.indexOf(o);-1==s?(i.keys.push(o),i.next.push(new suffixTreeNode(o,[],[],!1,[])),i=i.next[i.next.length-1]):i=i.next[s],i.isEnd=!0,-1==i.words.indexOf(t)&&i.words.push(t)}},suffixTree.prototype.exists=function(e){e=e.toLowerCase();for(var t=this.root,i=0;i<e.length;i++){var n=e[i],o=t.keys.indexOf(n);if(-1==o)return!1;t=t.next[o]}return t.isEnd?!0:!1};var fa_link=document.createElement("link");fa_link.rel="stylesheet",fa_link.href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css",document.getElementsByTagName("head")[0].appendChild(fa_link);var md_link=document.createElement("link");md_link.rel="stylesheet",md_link.href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.0.2/css/material-design-iconic-font.min.css",document.getElementsByTagName("head")[0].appendChild(md_link);var latsrc,lonsrc,home,hasSet,maxWalkSpd,maxBikeSpd,maxWalkTimeH,maxBikeTimeH,maxWalkTimeM,maxBikeTimeM,maxWalkDist,maxBikeDist,lastQuery="",trie;atWectorML(),initializeHome(0,function(){}),initializeDictionary();var hide;window.onload=setHide,document.onmouseup=checkHighlight;