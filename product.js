/* ============================================================
   product.js  ─  商品詳細頁邏輯
   依賴：data.js (CATEGORIES, BESTSELLER_IDS)
         shared.js (購物車、toast、header 相關)
   URL 參數：?id=<product_id>
   ============================================================ */

/* ---------- 靜態資料補充（介紹、規格、標籤、庫存） ---------- */

const PRODUCT_EXTRA = {
  // 書本
  1:  { desc: '近年最受矚目的AI教父黃仁勳，將自己成功的經歷娓娓道來，讓我們一起聽聽他的成功之道。', specs: [['作者','黃仁勳'],['出版社','時光文庫'],['頁數','328 頁'],['語言','繁體中文'],['ISBN','978-986-000-001-0']], tags:['文學','年度選書','獲獎'] },
  2:  { desc: '集結五位當代作家的短篇故事，跨越時空探索記憶與失憶的邊界。每篇故事如同一塊碎片，拼湊出完整而令人動容的人生圖景。', specs: [['作者','合著'],['出版社','島嶼書房'],['頁數','256 頁'],['語言','繁體中文'],['ISBN','978-986-000-002-7']], tags:['短篇','多作者','限量'] },
  3:  { desc: '以詩意散文書寫城市角落的日常，在快節奏的生活裡尋找慢下來的理由。適合每一個需要片刻寧靜的靈魂。', specs: [['作者','陳夜語'],['出版社','慢行文化'],['頁數','184 頁'],['語言','繁體中文'],['ISBN','978-986-000-003-4']], tags:['散文','城市','療癒'] },
  4:  { desc: '從零開始學習財務自由的思維框架，融合東西方投資哲學，以生動案例說明如何在不確定的時代做出明智決策。', specs: [['作者','吳明德'],['出版社','精進商學院'],['頁數','312 頁'],['語言','繁體中文'],['ISBN','978-986-000-004-1']], tags:['投資','財務自由','暢銷'] },
  5:  { desc: '深入解析新世代創業者的成功方程式，訪談 50 位創始人，歸納出可複製的商業模式與心法。', specs: [['作者','村上春樹'],['出版社','商策出版'],['頁數','400 頁'],['語言','繁體中文'],['ISBN','978-986-000-005-8']], tags:['創業','商業','訪談'] },
  6:  { desc: '以行為經濟學視角解讀職場人際關係，教你如何在複雜組織中保持核心競爭力，同時維護自身心理健康。', specs: [['作者','林佳慧'],['出版社','新思維出版'],['頁數','240 頁'],['語言','繁體中文'],['ISBN','978-986-000-006-5']], tags:['職場','行為經濟學'] },
  7:  { desc: '帶你走進內心世界，以溫柔而不迴避的方式面對自我的傷痛與困惑。書中的每一章都是一次和解的邀請。', specs: [['作者','蘇怡安'],['出版社','心光書屋'],['頁數','272 頁'],['語言','繁體中文'],['ISBN','978-986-000-007-2']], tags:['心理','自我成長','療癒'] },
  8:  { desc: '融合正念冥想與認知行為療法，提供一套可立即實踐的每日情緒管理方法，讓你不再被焦慮綁架。', specs: [['作者','王依晨'],['出版社','平靜書院'],['頁數','228 頁'],['語言','繁體中文'],['ISBN','978-986-000-008-9']], tags:['正念','焦慮','實踐'] },
  9:  { desc: '從科學角度剖析習慣養成的神經機制，搭配 21 天實踐計畫，讓改變不再只是一時的熱情。', specs: [['作者','陳博智'],['出版社','行動力文化'],['頁數','260 頁'],['語言','繁體中文'],['ISBN','978-986-000-009-6']], tags:['習慣','神經科學','計畫'] },
  10: { desc: '日本療癒系插畫師聯手心理諮商師的跨界合作，以溫暖圖文陪伴你走過人生低谷，找回內心的柔軟。', specs: [['作者','田中美惠子'],['出版社','暖光文化'],['頁數','192 頁'],['語言','繁體中文'],['ISBN','978-986-000-010-2']], tags:['圖文','療癒','日系'] },
  11:  { desc: '近年最受矚目的AI教父黃仁勳，將自己成功的經歷娓娓道來，讓我們一起聽聽他的成功之道。', specs: [['作者','黃仁勳'],['出版社','時光文庫'],['頁數','328 頁'],['語言','繁體中文'],['ISBN','978-986-000-001-0']], tags:['文學','年度選書','獲獎'] },
  12:  { desc: '集結五位當代作家的短篇故事，跨越時空探索記憶與失憶的邊界。每篇故事如同一塊碎片，拼湊出完整而令人動容的人生圖景。', specs: [['作者','合著'],['出版社','島嶼書房'],['頁數','256 頁'],['語言','繁體中文'],['ISBN','978-986-000-002-7']], tags:['短篇','多作者','限量'] },
  13:  { desc: '以詩意散文書寫城市角落的日常，在快節奏的生活裡尋找慢下來的理由。適合每一個需要片刻寧靜的靈魂。', specs: [['作者','陳夜語'],['出版社','慢行文化'],['頁數','184 頁'],['語言','繁體中文'],['ISBN','978-986-000-003-4']], tags:['散文','城市','療癒'] },
  14:  { desc: '從零開始學習財務自由的思維框架，融合東西方投資哲學，以生動案例說明如何在不確定的時代做出明智決策。', specs: [['作者','吳明德'],['出版社','精進商學院'],['頁數','312 頁'],['語言','繁體中文'],['ISBN','978-986-000-004-1']], tags:['投資','財務自由','暢銷'] },
  15:  { desc: '深入解析新世代創業者的成功方程式，訪談 50 位創始人，歸納出可複製的商業模式與心法。', specs: [['作者','村上春樹'],['出版社','商策出版'],['頁數','400 頁'],['語言','繁體中文'],['ISBN','978-986-000-005-8']], tags:['創業','商業','訪談'] },
  16:  { desc: '以行為經濟學視角解讀職場人際關係，教你如何在複雜組織中保持核心競爭力，同時維護自身心理健康。', specs: [['作者','林佳慧'],['出版社','新思維出版'],['頁數','240 頁'],['語言','繁體中文'],['ISBN','978-986-000-006-5']], tags:['職場','行為經濟學'] },
  17:  { desc: '帶你走進內心世界，以溫柔而不迴避的方式面對自我的傷痛與困惑。書中的每一章都是一次和解的邀請。', specs: [['作者','蘇怡安'],['出版社','心光書屋'],['頁數','272 頁'],['語言','繁體中文'],['ISBN','978-986-000-007-2']], tags:['心理','自我成長','療癒'] },
  18:  { desc: '融合正念冥想與認知行為療法，提供一套可立即實踐的每日情緒管理方法，讓你不再被焦慮綁架。', specs: [['作者','王依晨'],['出版社','平靜書院'],['頁數','228 頁'],['語言','繁體中文'],['ISBN','978-986-000-008-9']], tags:['正念','焦慮','實踐'] },
  19:  { desc: '從科學角度剖析習慣養成的神經機制，搭配 21 天實踐計畫，讓改變不再只是一時的熱情。', specs: [['作者','陳博智'],['出版社','行動力文化'],['頁數','260 頁'],['語言','繁體中文'],['ISBN','978-986-000-009-6']], tags:['習慣','神經科學','計畫'] },
  20: { desc: '日本療癒系插畫師聯手心理諮商師的跨界合作，以溫暖圖文陪伴你走過人生低谷，找回內心的柔軟。', specs: [['作者','田中美惠子'],['出版社','暖光文化'],['頁數','192 頁'],['語言','繁體中文'],['ISBN','978-986-000-010-2']], tags:['圖文','療癒','日系'] },
  // 文具
  21: { desc: '德國工藝精製，14K 金尖書寫流暢，附贈轉換器可使用瓶裝墨水。握持手感絕佳，適合長時間書寫或收藏。', specs: [['材質','樹脂 / 鍍金'],['筆尖','F（細字）'],['容量','轉換器 / 卡水'],['產地','德國'],['長度','138 mm']], tags:['鋼筆','德製','收藏'] },
  22: { desc: '義大利設計師限量款，以深海珊瑚為靈感，搭配玫瑰金筆夾，兼具藝術性與書寫實用性。', specs: [['材質','壓克力樹脂'],['筆尖','M（中字）'],['容量','卡水 / 轉換器'],['產地','義大利'],['長度','142 mm']], tags:['限量','義大利','珊瑚色'] },
  23: { desc: '日本職人手工制，14K 金尖經過特殊研磨，書寫時如絲綢般滑順。外觀簡潔俐落，適合商務使用。', specs: [['材質','鈦合金'],['筆尖','B（粗字）'],['容量','轉換器'],['產地','日本'],['長度','140 mm']], tags:['日製','職人','商務'] },
  24: { desc: '入門款鋼筆首選，輕量設計適合初學者，EF 筆尖適合書寫細小字體或繪製線稿。附贈 3 支卡水。', specs: [['材質','鋁合金'],['筆尖','EF（極細）'],['容量','卡水（附贈 3 支）'],['產地','台灣'],['長度','135 mm']], tags:['入門','台灣製','輕量'] },
  25: { desc: '復古赤木漆桿配合現代鋼尖，傳統美學與書寫機能的完美結合。適合喜歡日系侘寂風格的使用者。', specs: [['材質','木漆 / 鋼'],['筆尖','F（細字）'],['容量','卡水 / 吸墨'],['產地','日本'],['長度','136 mm']], tags:['木桿','復古','侘寂'] },
  26: { desc: '法國品牌經典款，18K 金尖加持，書寫彈性極佳，適合仿古書法風格或日常快寫。', specs: [['材質','樹脂 / 18K 金尖'],['筆尖','Flex（彈性）'],['容量','轉換器'],['產地','法國'],['長度','145 mm']], tags:['法國','彈性尖','書法'] },
  27: { desc: 'A5 規格手帳本，採用 120g 高白道林紙，墨水不透背，適合鋼筆、萬年筆或一般原子筆書寫。', specs: [['規格','A5（148×210 mm）'],['內頁','空白 / 橫線 / 方格'],['紙質','120g 道林紙'],['頁數','192 頁'],['封面','牛皮紙']], tags:['A5','道林紙','手帳'] },
  28: { desc: '日本 Hobonichi 合作款，薄葉紙書寫不滲透，適合極細鋼筆。全年月計劃配合週計畫，使用者一致好評。', specs: [['規格','A6（105×148 mm）'],['內頁','週計畫＋月計畫'],['紙質','Tomoe River 52g'],['頁數','256 頁'],['封面','軟皮']], tags:['A6','薄葉紙','週計畫'] },
  29: { desc: '手工裝訂義大利皮革封面，Fabriano 內頁紙張質感細膩，適合素描、水彩淡彩或鋼筆塗鴉。', specs: [['規格','B5（176×250 mm）'],['內頁','水彩紙 200g'],['頁數','80 頁'],['封面','真皮（植鞣）'],['產地','義大利']], tags:['皮革','水彩','手工裝訂'] },
  30: { desc: '台灣設計師插畫封面，限定圖案每季更新。內附貼紙索引及口袋，機能性強，外出攜帶方便。', specs: [['規格','A5'],['內頁','橫線 80g'],['頁數','160 頁'],['特色','附口袋＋貼紙索引'],['設計','台灣原創']], tags:['插畫封面','限定','台灣設計'] },
  31: { desc: '牛皮紙封面搭配方格內頁，適合子彈筆記法（Bullet Journal）愛好者，每頁左下方印有頁碼。', specs: [['規格','A5'],['內頁','5mm 方格 90g'],['頁數','192 頁'],['特色','頁碼印刷'],['適用','Bullet Journal']], tags:['方格','子彈筆記','牛皮'] },
  32: { desc: '竹漿環保再生紙封面，FSC 認證。內頁採用100% 再生紙，書寫手感依然細緻，對環境更友善。', specs: [['規格','A5'],['內頁','空白 85g 再生紙'],['頁數','160 頁'],['認證','FSC 環保認證'],['特色','可分解封面']], tags:['環保','再生紙','FSC'] },
  33: { desc: '台灣插畫家手繪，以城市日常為主題，一組 6 款各異，適合信件搭配或手帳裝飾。防水塗層，耐磨耐刮。', specs: [['尺寸','6 × 6 cm'],['材質','防水 PVC'],['數量','一組 6 款'],['設計','台灣原創'],['用途','手帳 / 信件']], tags:['插畫','防水','手帳裝飾'] },
  34: { desc: '復古植物標本風格，金屬質感印刷搭配燙金細節，在手帳或信封上都能呈現精緻感。', specs: [['尺寸','各異（約 3–6 cm）'],['材質','金屬貼紙紙'],['數量','一組 30 枚'],['設計','植物標本'],['特色','燙金細節']], tags:['復古','植物','燙金'] },
  35: { desc: '台灣限定款，以夜市文化為靈感，珍珠奶茶、雞排、臭豆腐…以幽默插畫呈現庶民美食，送禮自用兩相宜。', specs: [['尺寸','各異（約 4–7 cm）'],['材質','防水 PVC'],['數量','一組 12 枚'],['主題','台灣夜市'],['適用','禮物 / 自用']], tags:['台灣限定','夜市','趣味'] },
  36: { desc: '日式和風圖案，和紙材質貼紙，可撕貼不殘膠，適合筆記本、包裝紙或手帳裝飾使用。', specs: [['尺寸','各異（約 3–5 cm）'],['材質','和紙'],['數量','一組 24 枚'],['特色','可重複撕貼'],['風格','日式和風']], tags:['和紙','可重貼','和風'] },
  37: { desc: '台灣在地藝術家設計，以山林自然意象為主題，細膩線條搭配低彩度配色，適合喜歡清雅風格的使用者。', specs: [['尺寸','各異（約 4–8 cm）'],['材質','霧面防水膜'],['數量','一組 10 枚'],['風格','自然系'],['特色','霧面質感']], tags:['自然','霧面','藝術家'] },
  38: { desc: '台灣攝影師鏡頭下的書店角落，以底片色調呈現文字與光影的交織，每張明信片都是一首無聲的詩。', specs: [['尺寸','10 × 15 cm'],['材質','300g 美術紙'],['印刷','雙面彩印'],['設計','書店攝影'],['產地','台灣']], tags:['攝影','書店','底片色調'] },
  39: { desc: '以台灣各地書店為主題的手繪插畫系列，細節豐富充滿故事感，是書迷與文具迷的收藏首選。', specs: [['尺寸','10 × 15 cm'],['材質','300g 美術紙'],['印刷','雙面彩印'],['設計','書店插畫'],['數量','一組 6 款']], tags:['插畫','書店地圖','收藏'] },
  40: { desc: '以日本萬葉集詩句作為杯身設計，骨瓷材質溫潤細膩，容量 380ml，微波爐及洗碗機可用。', specs: [['材質','紙'],['內頁','380 ml'],['尺寸','Ø 82 × H 95 mm'],['特色','紙張滑順'],['設計','萬葉集詩句']], tags:['骨瓷','詩句','日常器物'] },
  41: { desc: '以老書店的書架為靈感設計，立體浮雕書脊環繞杯身，握持紮實，是愛書人最喜歡的書桌伴侶。', specs: [['材質','陶瓷'],['容量','420 ml'],['尺寸','Ø 88 × H 100 mm'],['特色','浮雕書脊設計'],['產地','台灣']], tags:['陶瓷','浮雕','愛書人'] },
  42: { desc: '以厚磅帆布製作，書店限定圖樣精印，肩帶加寬加厚不易勒肩，容量大適合裝書、文具及日常雜物。', specs: [['材質','12oz 棉帆布'],['尺寸','38 × 42 cm'],['肩帶','加寬 3.5 cm'],['印刷','絲網印刷'],['特色','書店限定圖樣']], tags:['帆布袋','書店限定','耐用'] },
  // 文創
  
  43: { desc: '與台灣插畫家聯名，以城市書房為主題，拉鍊袋設計方便收納零錢或小物，兼具實用與美感。', specs: [['材質','11oz 帆布'],['尺寸','35 × 40 cm'],['特色','內附拉鍊袋'],['設計','插畫家聯名'],['產地','台灣']], tags:['聯名','插畫','拉鍊口袋'] },
  44: { desc: '台灣攝影師鏡頭下的書店角落，以底片色調呈現文字與光影的交織，每張明信片都是一首無聲的詩。', specs: [['尺寸','10 × 15 cm'],['材質','300g 美術紙'],['印刷','雙面彩印'],['設計','書店攝影'],['產地','台灣']], tags:['攝影','書店','底片色調'] },
  45: { desc: '以台灣各地書店為主題的手繪插畫系列，細節豐富充滿故事感，是書迷與文具迷的收藏首選。', specs: [['尺寸','10 × 15 cm'],['材質','300g 美術紙'],['印刷','雙面彩印'],['設計','書店插畫'],['數量','一組 6 款']], tags:['插畫','書店地圖','收藏'] },
  46: { desc: '以日本萬葉集詩句作為杯身設計，骨瓷材質溫潤細膩，容量 380ml，微波爐及洗碗機可用。', specs: [['材質','紙'],['內頁','380 ml'],['尺寸','Ø 82 × H 95 mm'],['特色','紙張滑順'],['設計','萬葉集詩句']], tags:['骨瓷','詩句','日常器物'] },
  47: { desc: '以老書店的書架為靈感設計，立體浮雕書脊環繞杯身，握持紮實，是愛書人最喜歡的書桌伴侶。', specs: [['材質','陶瓷'],['容量','420 ml'],['尺寸','Ø 88 × H 100 mm'],['特色','浮雕書脊設計'],['產地','台灣']], tags:['陶瓷','浮雕','愛書人'] },
  48: { desc: '以厚磅帆布製作，書店限定圖樣精印，肩帶加寬加厚不易勒肩，容量大適合裝書、文具及日常雜物。', specs: [['材質','12oz 棉帆布'],['尺寸','38 × 42 cm'],['肩帶','加寬 3.5 cm'],['印刷','絲網印刷'],['特色','書店限定圖樣']], tags:['帆布袋','書店限定','耐用'] },
 
};

/* 評論資料 */
const PRODUCT_REVIEWS = {
  1:  [
    { author:'書蟲小花', rating:5, date:'2026-05-18', text:'激勵人心，讀完久久無法忘懷。尤其是第三章，受到許多啟發。強烈推薦！', verified:true },
    { author:'阿明讀書中', rating:4, date:'2026-04-30', text:'讚', verified:false },
    { author:'茉莉花茶', rating:5, date:'2026-03-12', text:'值得入手', verified:true },
  ],
  5:  [
    { author:'創業者 K', rating:5, date:'2026-06-01', text:'訪談內容非常真實，沒有過度包裝的成功學，讀完後立刻調整了我的商業計畫。', verified:true },
    { author:'PM 日常', rating:4, date:'2026-05-20', text:'已購買小孩愛用', verified:true },
  ],
  11: [
    { author:'墨水控', rating:5, date:'2026-05-28', text:'大牌子真的差很多！用過之後回不去了，書寫超流暢。', verified:true },
    { author:'Pen lover 陳', rating:5, date:'2026-04-15', text:'讚', verified:false },
    { author:'日常書寫者', rating:3, date:'2026-03-28', text:'值得入手', verified:true },
  ],
  17: [
    { author:'手帳達人 M', rating:5, date:'2026-05-10', text:'120g 紙真的不透，連用 Noodler\'s 都沒有洇墨，非常推薦！', verified:true },
    { author:'文具新手', rating:4, date:'2026-04-22', text:'已購買小孩愛用', verified:false },
  ],
  23: [
    { author:'手帳族 Lisa', rating:5, date:'2026-05-25', text:'很漂亮', verified:true },
    { author:'包裝控', rating:4, date:'2026-04-08', text:'讚', verified:false },
  ],
  30: [
    { author:'喝茶的日子', rating:5, date:'2026-06-03', text:'讚', verified:true },
    { author:'器物迷', rating:4, date:'2026-05-14', text:'值得入手', verified:true },
  ],
};
/* ---------- 工具函式 ---------- */

function getParam(key) {
  return new URLSearchParams(location.search).get(key);
}

function findProduct(id) {
  for (const cat of CATEGORIES) {
    for (const sub of cat.subs) {
      for (const p of sub.products) {
        if (p.id === id) return { product: p, cat, sub };
      }
    }
  }
  return null;
}

function priceToNumber(str) {
  return parseInt(str.replace(/[^0-9]/g, ''), 10) || 0;
}

function starsHTML(rating, cls = 'rv-star') {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += `<span class="${cls}${i <= rating ? ' on' : ''}">★</span>`;
  }
  return html;
}

function avgRating(reviews) {
  if (!reviews || !reviews.length) return 0;
  return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
}

/* ---------- 主流程 ---------- */

document.addEventListener('DOMContentLoaded', () => {
  const id = parseInt(getParam('id'), 10);
  if (!id) { location.href = 'shop.html'; return; }

  const found = findProduct(id);
  if (!found) { location.href = 'shop.html'; return; }

  const { product, cat, sub } = found;
  const extra = PRODUCT_EXTRA[id] || {};
  const reviews = [...(PRODUCT_REVIEWS[id] || [])];

  // ---------- 基本資訊 ----------
  document.title = `${product.name} — 店名`;

  document.getElementById('bc-category').textContent = cat.name;
  document.getElementById('bc-product').textContent = product.name;
  document.getElementById('pd-cat-tag').textContent = `${cat.name} › ${sub.name}`;
  document.getElementById('pd-name').textContent = product.name;
  document.getElementById('pd-price').textContent = product.price;
  document.getElementById('pd-desc').textContent = extra.desc || '精選商品，品質保證。';

  // 圖片
  const mainImg = document.getElementById('pd-main-img');
  mainImg.src = product.img;
  mainImg.alt = product.name;

  // 縮圖（目前只有一張，之後可擴充）
  const thumbsWrap = document.getElementById('pd-thumbs');
  const thumb = document.createElement('div');
  thumb.className = 'pd-thumb active';
  thumb.innerHTML = `<img src="${product.img}" alt="${product.name}" />`;
  thumbsWrap.appendChild(thumb);

  // 規格
  const specsTable = document.getElementById('pd-specs-table');
  (extra.specs || []).forEach(([label, value]) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${label}</td><td>${value}</td>`;
    specsTable.appendChild(tr);
  });
  if (!extra.specs || !extra.specs.length) {
    document.getElementById('pd-specs-block').style.display = 'none';
  }

  // 標籤
  const tagsWrap = document.getElementById('pd-tags');
  (extra.tags || []).forEach(tag => {
    const span = document.createElement('span');
    span.className = 'pd-tag';
    span.textContent = `# ${tag}`;
    tagsWrap.appendChild(span);
  });

  // ---------- 評分 ----------
  renderRating(reviews);

  // ---------- 評論列表 ----------
  renderReviews(reviews);

  // ---------- 加入購物車 ----------
  const qtyInput = document.getElementById('pd-qty');
  document.getElementById('qty-minus').onclick = () => {
    if (parseInt(qtyInput.value) > 1) qtyInput.value = parseInt(qtyInput.value) - 1;
  };
  document.getElementById('qty-plus').onclick = () => {
    if (parseInt(qtyInput.value) < 99) qtyInput.value = parseInt(qtyInput.value) + 1;
  };

  document.getElementById('pd-add-cart').onclick = () => {
    const qty = Math.max(1, parseInt(qtyInput.value) || 1);
    if (typeof addToCart === 'function') {
      for (let i = 0; i < qty; i++) addToCart(product);
      showToast(`已加入購物車：${product.name} × ${qty}`);
    }
  };

  // 收藏按鈕（視覺 toggle）
  const wishBtn = document.getElementById('pd-wishlist');
  wishBtn.onclick = () => {
    wishBtn.classList.toggle('active');
    showToast(wishBtn.classList.contains('active') ? '已加入收藏' : '已移除收藏');
  };

  // ---------- 同類商品 ----------
  const related = sub.products.filter(p => p.id !== id).slice(0, 4);
  const grid = document.getElementById('pd-related-grid');
  if (related.length) {
    related.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <a href="product.html?id=${p.id}" class="card-img-link">
          <div class="card-img-wrap"><img src="${p.img}" alt="${p.name}" loading="lazy" /></div>
        </a>
        <div class="card-body">
          <p class="card-name">${p.name}</p>
          <p class="card-price">${p.price}</p>
          <button class="card-add-btn" data-id="${p.id}">加入購物車</button>
        </div>`;
      card.querySelector('.card-add-btn').onclick = () => {
        if (typeof addToCart === 'function') addToCart(p);
        showToast(`已加入購物車：${p.name}`);
      };
      grid.appendChild(card);
    });
  } else {
    document.querySelector('.pd-related-section').style.display = 'none';
  }

  // ---------- 撰寫評價 ----------
  let pickedStar = 0;
  const stars = document.querySelectorAll('.pick-star');
  stars.forEach(s => {
    s.onmouseenter = () => {
      stars.forEach((x, i) => x.classList.toggle('selected', i < parseInt(s.dataset.v)));
    };
    s.onmouseleave = () => {
      stars.forEach((x, i) => x.classList.toggle('selected', i < pickedStar));
    };
    s.onclick = () => {
      pickedStar = parseInt(s.dataset.v);
      stars.forEach((x, i) => x.classList.toggle('selected', i < pickedStar));
    };
  });

  document.getElementById('pd-review-submit').onclick = () => {
    const author = document.getElementById('pd-review-author').value.trim() || '匿名';
    const text = document.getElementById('pd-review-text').value.trim();
    if (!pickedStar) { showToast('請先選擇星等'); return; }
    if (!text) { showToast('請輸入評價內容'); return; }
    const newReview = {
      author, rating: pickedStar,
      date: new Date().toISOString().slice(0, 10),
      text, verified: false,
    };
    reviews.unshift(newReview);
    renderRating(reviews);
    renderReviews(reviews);
    document.getElementById('pd-review-author').value = '';
    document.getElementById('pd-review-text').value = '';
    pickedStar = 0;
    stars.forEach(x => x.classList.remove('selected'));
    showToast('感謝您的評價！');
  };
});

/* ---------- 評分渲染 ---------- */
function renderRating(reviews) {
  const avg = avgRating(reviews);
  const total = reviews.length;
  const rounded = Math.round(avg * 10) / 10;

  document.getElementById('pd-rating-score').textContent = rounded.toFixed(1);
  document.getElementById('pd-rating-count').textContent = `（${total} 則評價）`;

  // 頂部星星
  const summaryStars = document.getElementById('pd-stars-summary');
  summaryStars.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const s = document.createElement('span');
    s.className = 'star' + (i <= Math.floor(avg) ? ' filled' : (i - avg < 1 && i > avg ? ' half' : ''));
    s.textContent = '★';
    summaryStars.appendChild(s);
  }

  // 大數字區
  document.getElementById('pbs-number').textContent = rounded.toFixed(1);
  document.getElementById('pbs-total').textContent = `${total} 則評價`;
  const pbsStars = document.getElementById('pbs-stars');
  pbsStars.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const s = document.createElement('span');
    s.className = 'rv-star' + (i <= Math.round(avg) ? ' on' : '');
    s.textContent = '★';
    pbsStars.appendChild(s);
  }

  // 長條圖
  const counts = [0, 0, 0, 0, 0];
  reviews.forEach(r => { if (r.rating >= 1 && r.rating <= 5) counts[r.rating - 1]++; });
  const chart = document.getElementById('pd-bar-chart');
  chart.innerHTML = '';
  for (let i = 5; i >= 1; i--) {
    const pct = total ? Math.round((counts[i - 1] / total) * 100) : 0;
    const row = document.createElement('div');
    row.className = 'rating-bar-row';
    row.innerHTML = `
      <span class="rating-bar-label">${i} ★</span>
      <div class="rating-bar-track"><div class="rating-bar-fill" style="width:${pct}%"></div></div>
      <span class="rating-bar-count">${counts[i - 1]}</span>`;
    chart.appendChild(row);
  }
}

/* ---------- 評論列表渲染 ---------- */
function renderReviews(reviews) {
  const list = document.getElementById('pd-review-list');
  list.innerHTML = '';
  if (!reviews.length) {
    list.innerHTML = '<p style="color:#aaa;font-size:.85rem;font-family:\'Noto Sans TC\',sans-serif;">還沒有評價，成為第一個評價的人吧！</p>';
    return;
  }
  reviews.forEach(r => {
    const card = document.createElement('div');
    card.className = 'pd-review-card';
    card.innerHTML = `
      <div class="rv-top">
        <div class="rv-avatar">${r.author.charAt(0)}</div>
        <div class="rv-meta">
          <div>
            <span class="rv-author">${r.author}</span>
            <span class="rv-date">${r.date}</span>
          </div>
          <div class="rv-stars">${starsHTML(r.rating)}</div>
        </div>
        ${r.verified ? '<span class="rv-verified">✓ 已購買</span>' : ''}
      </div>
      <p class="rv-text">${r.text}</p>
      <div class="rv-helpful">
        <span>這則評價有幫助嗎？</span>
        <button class="rv-helpful-btn">👍 有幫助</button>
      </div>`;
    card.querySelector('.rv-helpful-btn').onclick = function () {
      this.textContent = '👍 已標記';
      this.disabled = true;
    };
    list.appendChild(card);
  });
}

/* ---------- Toast（若 shared.js 未提供則自行定義） ---------- */
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2400);
}
