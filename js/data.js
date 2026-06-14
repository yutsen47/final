const CATEGORIES = [
  {
    id: 'books', name: '書本',
    subs: [
      {
        id: 'fiction', name: '文學小說',
        products: [
          { id: 1,  img: 'img/2025eslite_top10_yearend08.jpg', name: '世界盡頭的咖啡館', price: 'NT$ 560' },
          { id: 2,  img: 'img/2025eslite_top10_yearend05.jpg', name: '城與不確定的牆', price: 'NT$ 445' },
          { id: 3,  img: 'img/2025eslite_top10_yearend02.jpg', name: '變成自己想望的大人', price: 'NT$ 520' },
          { id: 4,  img: 'img/2025eslite_top10_yearend07.jpg', name: '如果歷史是一群喵', price: 'NT$ 385' },
          { id: 5,  img: 'img/11.jpg', name: '如果尼采是一隻獨角鯨', price: 'NT$ 380' },
        ],
      },
      {
        id: 'business', name: '商業理財',
        products: [
          { id: 6,  img: 'img/2025eslite_top10_yearend01.jpg', name: '黃仁勳傳', price: 'NT$ 569' },
          { id: 7, img: 'img/2025eslite_top10_yearend10.jpg', name: '張忠謀自傳', price: 'NT$ 570' },
          { id: 8, img: 'img/2024top10-08.jpg', name: '給存股族的ETF實驗筆記', price: 'NT$ 480' },
          { id: 9, img: 'img/2025eslite_top10_02.jpg', name: '輝達之道', price: 'NT$ 575' },
        ],
      },
      {
        id: 'psychology', name: '心理勵志',
        products:[
          { id: 10,  img: 'img/2025eslite_top10_yearend04.jpg', name: '失控的焦慮世代', price: 'NT$ 599' },
          { id: 11,  img: 'img/2025eslite_top10_yearend03.jpg', name: '想哭就哭吧，你不需要那麼懂事。', price: 'NT$ 290' },
          { id: 12,  img: 'img/2025eslite_top10_yearend09.jpg', name: '把日子慢慢變好', price: 'NT$ 290' },
          { id: 13,  img: 'img/2025eslite_top10_yearend06.jpg', name: '生命中最大的寶藏就是你自己', price: 'NT$ 350' },
          { id: 14,  img: 'img/12.jpg', name: '那些得不到保護的人', price: 'NT$ 420' },
          { id: 15,  img: 'img/2024top10-01.jpg', name: '你願意，人生就會值得', price: 'NT$ 385' },
          { id: 16,  img: 'img/2024top10-03.jpg', name: '今天不會都是壞事', price: 'NT$ 340' },
          { id: 17,  img: 'img/2024top10-06.jpg', name: '好事即將發生', price: 'NT$ 340' },
          { id: 18, img: 'img/2024top10-10.jpg', name: '親密恐懼', price: 'NT$ 275' },
          { id: 19, img: 'img/2025eslite_top10_05.jpg', name: '真誠', price: 'NT$ 355' },
          { id: 20, img: 'img/2025eslite_top10_06.jpg', name: '不執著的練習', price: 'NT$ 470' },
        ],
      },
    ],
  },
  {
    id: 'stationery', name: '文具',
    subs: [
      {
        id: 'pens', name: '筆類',
        products: [
          { id: 21, img: 'img/pen01.jpeg', name: '多色原子筆組', price: 'NT$ 220' },
          { id: 22, img: 'img/pen02.jpeg', name: 'Juice果汁原之筆組', price: 'NT$ 320' },
          { id: 23, img: 'img/pen03.jpeg', name: 'Juice螢光筆組', price: 'NT$ 250' },
          { id: 24, img: 'img/pen04.jpeg', name: '方形螢光筆組', price: 'NT$ 199' },
          { id: 25, img: 'img/pen05.jpeg', name: '花朵聯名原子筆組', price: 'NT$ 260' },
          { id: 26, img: 'img/pen06.jpeg', name: '原子筆組', price: 'NT$ 275' },
        ],
      },
      {
        id: 'notebooks', name: '筆記本',
        products: [
          { id: 27, img: 'img/note01jpeg.jpeg', name: '多彩手帳本', price: 'NT$ 55' },
          { id: 28, img: 'img/note02.jpeg',     name: '簡約橫條紋手帳本', price: 'NT$ 40' },
          { id: 29, img: 'img/note03.jpeg',     name: '歐式燙金筆記本', price: 'NT$ 120' },
          { id: 30, img: 'img/note04.jpeg',     name: '療癒系手帳本', price: 'NT$ 69' },
          { id: 31, img: 'img/note05.jpeg',     name: '皮革多工手帳本', price: 'NT$ 300' },
          { id: 32, img: 'img/note06.jpeg',     name: '透明INS風筆記本', price: 'NT$ 30' },
        ],
      },
      {
        id: 'fire', name: '火漆',
        products: [
          { id: 33, img: 'img/fire01.jpeg', name: '故宮聯名火漆組', price: 'NT$ 279' },
          { id: 34, img: 'img/fire02.jpeg', name: '世界地圖火漆組', price: 'NT$ 249' },
          { id: 35, img: 'img/fire04.jpeg', name: '經典火漆組-白款', price: 'NT$ 199' },
          { id: 36, img: 'img/fire05.jpeg', name: '經典火漆組-蝴蝶款6入', price: 'NT$ 270' },
          { id: 37, img: 'img/fire06.jpeg', name: '森林章火漆組', price: 'NT$ 195' },
          { id: 38, img: 'img/fire09.jpeg', name: '民國復古火漆組', price: 'NT$ 265' },
           { id: 39, img: 'img/fire10.jpeg', name: '火漆蠟補充包10色', price: 'NT$ 249' },
          { id: 40, img: 'img/fire11.jpeg', name: '火漆蠟補充包24色', price: 'NT$ 559' },
           { id: 41, img: 'img/fire12.jpeg', name: '流金火漆蠟粒補充包', price: 'NT$ 650' },
          { id: 42, img: 'img/fire13.jpeg', name: '流金蠟粒補充包3罐組', price: 'NT$ 320' },
        ],
      },
    ],
  },
  {
    id: 'creative', name: '文創商品',
    subs: [
      {
        id: 'type', name: '紙膠帶',
        products: [
         { id: 43, img: 'img/crea01.jpeg', name: '故宮紙膠帶', price: 'NT$ 120' },
        ],
      },
      {
        id: 'others', name: '聯名商品',
        products: [
          { id: 44, img: 'img/crea03.jpeg', name: '手動式文創日曆', price: 'NT$ 135' },
          { id: 45, img: 'img/crea02.jpeg', name: '台灣博物館聯名收納木盒', price: 'NT$ 250' },
        ],
      },
      {
        id: 'stamp', name: '印章',
        products:[
          { id: 46, img: 'img/crea04.jpeg', name: '6入可愛插畫印章組', price: 'NT$ 150' },
          { id: 47, img: 'img/crea05.jpeg', name: '動物插畫印章印泥組', price: 'NT$ 340' },
          { id: 48, img: 'img/crea06.jpeg', name: '卡通插畫印章組64入組', price: 'NT$ 560' },
        ],
      },
    ],
  },
];

const BESTSELLER_IDS = [1, 5, 11, 17, 23, 30];
