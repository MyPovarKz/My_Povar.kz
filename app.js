const SUPABASE_URL = "https://hgqbuugyabmyzhtitdns.supabase.co";
const SUPABASE_KEY = "sb_publishable_cUHKXZ2UgudRveqcmNdQiQ_qobOnLCl";const tg=window.Telegram?.WebApp; if(tg){tg.ready();tg.expand();}
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
let dishes=[];
let cart=[];
async function loadDishes(){const {data,error}=await supabase.from("dishes").select("*");
dishes=data||[];
render();}
const cards=document.getElementById("cards");
function render(filter="all",q=""){const list=dishes.filter(x=>(filter==="all"||x.cat===filter)&&(!q||x.name.toLowerCase().includes(q.toLowerCase())));cards.innerHTML=list.map(x=>`<article class="card"><div class="pic">${x.emoji}</div><div class="info"><div class="name">${x.name}</div><div class="meta">${x.meta}</div><span class="price">${x.price.toLocaleString()} ₸</span><button class="add" onclick="add(${x.id})">+</button></div></article>`).join("");}
function add(id){const x=dishes.find(d=>d.id===id);cart.push(x);document.getElementById("count").textContent=cart.length; if(tg?.HapticFeedback)tg.HapticFeedback.impactOccurred("light")}

function showCart(){openModal(`<h2>🛒 Корзина</h2>${cart.length?cart.map(x=>`<p>${x.emoji} ${x.name} — ${x.price.toLocaleString()} ₸</p>`).join(""):`<p>Корзина пока пустая.</p>`}${cart.length?`<hr><b>Итого: ${cart.reduce((a,x)=>a+x.price,0).toLocaleString()} ₸</b><button class="checkout" onclick="checkout()">Оформить заказ</button>`:""}`);}
function checkout(){
const text="Новый заказ «Мой Повар»%0A"+cart.map(x=>`${x.name} — ${x.price} ₸`).join("%0A");
if(tg?.openTelegramLink)tg.openTelegramLink("https://t.me/share/url?url=&text="+text);
else alert("Заказ сформирован. В следующей версии подключим отправку продавцу.");}
function openModal(html){document.getElementById("modalContent").innerHTML=html;document.getElementById("modal").classList.remove("hidden")}
function closeModal(){document.getElementById("modal").classList.add("hidden")}document.querySelectorAll(".chip").forEach(b=>b.onclick=()=>{document.querySelectorAll(".chip").forEach(x=>x.classList.remove("active"));b.classList.add("active");render(b.dataset.cat,document.getElementById("search").value)});document.getElementById("search").oninput=e=>render(document.querySelector(".chip.active").dataset.cat,e.target.value);document.getElementById("profileBtn").onclick=()=>openModal("<h2>👤 Профиль</h2><p>Войдите через Telegram — профиль будет создан автоматически.</p>");document.getElementById("profileNav").onclick=()=>openModal("<h2>👤 Профиль</h2><p>Здесь будут ваши данные, адреса, избранное и история заказов.</p>");document.getElementById("ordersBtn").onclick=()=>openModal("<h2>📦 Заказы</h2><p>Пока заказов нет.</p>");
loadDishes();