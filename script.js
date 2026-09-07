let userLocation="", emergencyMessage="", holdTimer=null, holdStarted=false;
function setStatus(message,ok=true){const el=document.getElementById("status");if(!el)return;el.textContent=message;el.style.color=ok?"#8ff0bc":"#ff91a9";}
function getLocation(){
 const title=document.getElementById("locationTitle");
 if(!navigator.geolocation){setStatus("Geolocation is not supported on this device.",false);return;}
 title.textContent="Finding your location…";setStatus("Requesting location permission…");
 navigator.geolocation.getCurrentPosition(function(position){
  const lat=position.coords.latitude,lon=position.coords.longitude;
  userLocation="https://www.google.com/maps?q="+lat+","+lon;
  title.textContent="Location detected ✓";
  const mapLink=document.getElementById("mapLink");mapLink.href=userLocation;mapLink.classList.remove("hidden");
  setStatus("Location retrieved successfully ✓");
 },function(){title.textContent="Location unavailable";setStatus("Please allow location access and try again.",false);},{enableHighAccuracy:true,timeout:10000,maximumAge:30000});
}
function generateMessage(){
 const name=document.getElementById("name").value.trim();
 if(!name){setStatus("Please enter your name first.",false);document.getElementById("name").focus();return;}
 if(!userLocation){setStatus("Get your location before generating the SOS.",false);return;}
 emergencyMessage="🚨 EMERGENCY ALERT 🚨\n\nName: "+name+"\nI need immediate help.\n\nMy Location:\n"+userLocation;
 document.getElementById("messagePreview").textContent=emergencyMessage;
 document.getElementById("messageState").textContent="READY TO SEND";
 document.getElementById("messageState").style.color="#8ff0bc";
 setStatus("Emergency message generated successfully ✓");
}
function sendSMS(){
 const contact=document.getElementById("contact").value.trim();
 if(!contact||!emergencyMessage){setStatus("Generate SOS and enter a contact number first.",false);return;}
 window.location.href="sms:"+contact+"?body="+encodeURIComponent(emergencyMessage);
}
function sendWhatsApp(){
 const contact=document.getElementById("contact").value.trim().replace(/\D/g,"");
 if(!contact||!emergencyMessage){setStatus("Generate SOS and enter a contact number first.",false);return;}
 window.location.href="https://wa.me/"+contact+"?text="+encodeURIComponent(emergencyMessage);
}
function startHold(e){
 e.preventDefault();if(holdStarted)return;holdStarted=true;
 const button=document.getElementById("sosButton");button.querySelector("small").textContent="KEEP HOLDING…";
 let elapsed=0;holdTimer=setInterval(()=>{elapsed+=100;if(elapsed>=3000){clearInterval(holdTimer);holdStarted=false;button.querySelector("small").textContent="HOLD 3 SEC";generateMessage();}},100);
}
function cancelHold(){if(holdTimer)clearInterval(holdTimer);holdTimer=null;if(holdStarted){holdStarted=false;const b=document.getElementById("sosButton");if(b)b.querySelector("small").textContent="HOLD 3 SEC";}}
document.addEventListener("DOMContentLoaded",()=>{const sos=document.getElementById("sosButton");if(sos){sos.addEventListener("pointerdown",startHold);sos.addEventListener("pointerup",cancelHold);sos.addEventListener("pointerleave",cancelHold);sos.addEventListener("pointercancel",cancelHold);}});
