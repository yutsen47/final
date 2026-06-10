const CATEGORIES = [
  {
    id: 'books', name: '書本',
    subs: [
      {
        id: 'fiction', name: '文學小說',
        products: [
          { id: 1,  img: 'img/2025eslite_top10_yearend01.jpg', name: '年度選書 01', price: 'NT$ 380' },
          { id: 2,  img: 'img/2025eslite_top10_yearend02.jpg', name: '年度選書 02', price: 'NT$ 520' },
          { id: 3,  img: 'img/2025eslite_top10_yearend03.jpg', name: '年度選書 03', price: 'NT$ 290' },
        ],
      },
      {
        id: 'business', name: '商業理財',
        products: [
          { id: 4,  img: 'img/2025eslite_top10_yearend04.jpg', name: '年度選書 04', price: 'NT$ 450' },
          { id: 5,  img: 'img/2025eslite_top10_yearend05.jpg', name: '年度選書 05', price: 'NT$ 680' },
          { id: 6,  img: 'img/2025eslite_top10_yearend06.jpg', name: '年度選書 06', price: 'NT$ 350' },
        ],
      },
      {
        id: 'psychology', name: '心理勵志',
        products: [
          { id: 7,  img: 'img/2025eslite_top10_yearend07.jpg', name: '年度選書 07', price: 'NT$ 380' },
          { id: 8,  img: 'img/2025eslite_top10_yearend08.jpg', name: '年度選書 08', price: 'NT$ 520' },
          { id: 9,  img: 'img/2025eslite_top10_yearend09.jpg', name: '年度選書 09', price: 'NT$ 290' },
          { id: 10, img: 'img/2025eslite_top10_yearend10.jpg', name: '年度選書 10', price: 'NT$ 450' },
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
          { id: 11, img: 'img/pen01.jpeg', name: '精選鋼筆 01', price: 'NT$ 280' },
          { id: 12, img: 'img/pen02.jpeg', name: '精選鋼筆 02', price: 'NT$ 350' },
          { id: 13, img: 'img/pen03.jpeg', name: '精選鋼筆 03', price: 'NT$ 420' },
          { id: 14, img: 'img/pen04.jpeg', name: '精選鋼筆 04', price: 'NT$ 180' },
          { id: 15, img: 'img/pen05.jpeg', name: '精選鋼筆 05', price: 'NT$ 260' },
          { id: 16, img: 'img/pen06.jpeg', name: '精選鋼筆 06', price: 'NT$ 390' },
        ],
      },
      {
        id: 'notebooks', name: '筆記本',
        products: [
          { id: 17, img: 'img/note01jpeg.jpeg', name: '手帳本 01', price: 'NT$ 220' },
          { id: 18, img: 'img/note02.jpeg',     name: '手帳本 02', price: 'NT$ 280' },
          { id: 19, img: 'img/note03.jpeg',     name: '手帳本 03', price: 'NT$ 320' },
          { id: 20, img: 'img/note04.jpeg',     name: '手帳本 04', price: 'NT$ 250' },
          { id: 21, img: 'img/note05.jpeg',     name: '手帳本 05', price: 'NT$ 290' },
          { id: 22, img: 'img/note06.jpeg',     name: '手帳本 06', price: 'NT$ 380' },
        ],
      },
      {
        id: 'stickers', name: '貼紙',
        products: [
          { id: 23, img: 'img/fire01.jpeg', name: '插畫貼紙 01', price: 'NT$ 120' },
          { id: 24, img: 'img/fire02.jpeg', name: '插畫貼紙 02', price: 'NT$ 150' },
          { id: 25, img: 'img/fire04.jpeg', name: '插畫貼紙 03', price: 'NT$ 130' },
          { id: 26, img: 'img/fire05.jpeg', name: '插畫貼紙 04', price: 'NT$ 160' },
          { id: 27, img: 'img/fire06.jpeg', name: '插畫貼紙 05', price: 'NT$ 140' },
        ],
      },
    ],
  },
  {
    id: 'creative', name: '文創商品',
    subs: [
      {
        id: 'postcards', name: '明信片',
        products: [
          { id: 28, img: 'img/crea01.jpeg', name: '文創明信片 01', price: 'NT$ 80' },
          { id: 29, img: 'img/crea02.jpeg', name: '文創明信片 02', price: 'NT$ 80' },
        ],
      },
      {
        id: 'cups', name: '杯子',
        products: [
          { id: 30, img: 'img/crea03.jpeg', name: '文藝馬克杯 01', price: 'NT$ 380' },
          { id: 31, img: 'img/crea04.jpeg', name: '文藝馬克杯 02', price: 'NT$ 420' },
        ],
      },
      {
        id: 'bags', name: '帆布袋',
        products: [
          { id: 32, img: 'img/crea05.jpeg', name: '書店帆布袋 01', price: 'NT$ 480' },
          { id: 33, img: 'img/crea06.jpeg', name: '書店帆布袋 02', price: 'NT$ 520' },
        ],
      },
    ],
  },
];

const BESTSELLER_IDS = [1, 5, 11, 17, 23, 30];
