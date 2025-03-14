(() => {
  const init = async () => {
    let productDetail = document.querySelector(".product-detail");
    if (!productDetail) {
      console.warn(" '.product-detail' bulunamadı");
      productDetail = document.body;
    }
    buildCSS();
    buildHTML(productDetail);
    await fetchProducts();
    setEvents();
  };

  const buildCSS = () => {
    const style = document.createElement("style");
    style.textContent = `
              .carousel-container {
                  position: relative;
                  width: 90%;
                  margin: auto;
                  overflow: hidden;
                  display: block;
              }
              .carousel-title {
                  font-size: 18px;
                  font-weight: bold;
                  margin-bottom: 10px;
                  text-align: center;
              }
              .carousel-track {
                  display: flex;
                  transition: transform 0.5s ease-in-out;
                  will-change: transform;
              }
              .carousel-item {
                  min-width: 250px;
                  flex: 1 0 auto;
                  margin: 10px;
                  background: #fff;
                  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                  border-radius: 8px;
                  text-align: center;
                  padding: 10px;
                  position: relative;
              }
              .carousel-item img {
                  width: 100%;
                  max-width: 200px;
                  border-radius: 5px;
              }
              .favorite-icon {
                  position: absolute;
                  top: 10px;
                  right: 10px;
                  cursor: pointer;
                  font-size: 20px;
                  color: gray;
              }
              .favorite-icon.favorited {
                  color: blue;
              }
              .carousel-button {
                  position: absolute;
                  top: 50%;
                  transform: translateY(-50%);
                  background-color: rgba(0,0,0,0.5);
                  color: white;
                  border: none;
                  cursor: pointer;
                  padding: 10px;
                  font-size: 20px;
                  z-index: 10;
              }
              .left-button {
                  left: 0;
              }
              .right-button {
                  right: 0;
              }
          `;
    document.head.appendChild(style);
  };

  const buildHTML = (parent) => {
    const container = document.createElement("div");
    container.classList.add("carousel-container");

    const title = document.createElement("div");
    title.classList.add("carousel-title");
    title.textContent = "Bunları da Beğeneblirsinsz";

    const leftButton = document.createElement("button");
    leftButton.classList.add("left-button", "carousel-button");
    leftButton.innerHTML = "&#10094;";

    const track = document.createElement("div");
    track.classList.add("carousel-track");

    const rightButton = document.createElement("button");
    rightButton.classList.add("right-button", "carousel-button");
    rightButton.innerHTML = "&#10095;";

    container.appendChild(title);
    container.appendChild(leftButton);
    container.appendChild(track);
    container.appendChild(rightButton);

    parent.after(container);
  };

  const fetchProducts = async () => {
    const productData = [
      {
        id: 1,
        name: "Bisiklet Yaka Düz Kısa Kollu Kadın Elbise",
        url: "https://www.lcwaikiki.com/tr-TR/TR/urun/LC-WAIKIKI/kadin/Elbise/5593210/2268761",
        img: "https://img-lcwaikiki.mncdn.com/mnresize/1024/-/pim/productimages/20221/5593210/v1/l_20221-s26331z8-cvl_a.jpg",
        price: 125.99,
      },
      {
        id: 2,
        name: "Standart Fit Cep Detaylı Kadın Rodeo Jean Şort",
        url: "https://www.lcwaikiki.com/tr-TR/TR/urun/LC-WAIKIKI/kadin/Jean-Sort/5732790/2374591",
        img: "https://img-lcwaikiki.mncdn.com/mnresize/1024/-/pim/productimages/20221/5732790/l_20221-s2ee14z8-311_a.jpg",
        price: 99.99,
      },
      {
        id: 3,
        name: "Bisiklet Yaka Nakış İşlemeli Uzun Kollu Viskon Kadın Bluz",
        url: "https://www.lcwaikiki.com/tr-TR/TR/urun/LC-WAIKIKI/kadin/Bluz/4919203/1591053",
        img: "https://img-lcwaikiki.mncdn.com/mnresize/1024/-/pim/productimages/20211/4919203/v1/l_20211-s1ca24z8-lrk_a1.jpg",
        price: 64.99,
      },
      {
        id: 4,
        name: "Bisiklet Yaka Kısa Kollu Erkek Spor Tişört",
        url: "https://www.lcwaikiki.com/tr-TR/TR/urun/LC-WAIKIKI/erkek/Tisort/5622474/2232459",
        img: "https://img-lcwaikiki.mncdn.com/mnresize/1024/-/pim/productimages/20212/5622474/l_20212-w1kd76z8-ffb_a.jpg",
        price: 59.99,
      },
      {
        id: 5,
        name: "Büyük Beden V Yaka Düz Kısa Kollu Pamuklu Kadın Elbise",
        url: "https://www.lcwaikiki.com/tr-TR/TR/urun/LC-WAIKIKI/kadin/Elbise/5353958/1689752",
        img: "https://img-lcwaikiki.mncdn.com/mnresize/1024/-/pim/productimages/20211/5353958/v2/l_20211-s1lc50z8-cvl_a.jpg",
        price: 125.99,
      },
      {
        id: 6,
        name: "V Yaka Düz Kısa Kollu Pamuklu Hamile Elbise",
        url: "https://www.lcwaikiki.com/tr-TR/TR/urun/LC-WAIKIKI/kadin/Elbise/5771510/2366533",
        img: "https://img-lcwaikiki.mncdn.com/mnresize/1024/-/pim/productimages/20221/5771510/l_20221-s2fs71z8-cvl_a.jpg",
        price: 135.99,
      },
      {
        id: 7,
        name: "Bisiklet Yaka Çizgili Kısa Kollu Kadın Elbise",
        url: "https://www.lcwaikiki.com/tr-TR/TR/urun/LC-WAIKIKI/kadin/Elbise/5593222/2300514",
        img: "https://img-lcwaikiki.mncdn.com/mnresize/1024/-/pim/productimages/20221/5593222/l_20221-s26332z8-lgs_a.jpg",
        price: 150.99,
      },
      {
        id: 8,
        name: "Büyük Beden Bisiklet Yaka Düz Kısa Kollu A Kesim Kadın Elbise",
        url: "https://www.lcwaikiki.com/tr-TR/TR/urun/LC-WAIKIKI/kadin/Elbise/5377552/1688005",
        img: "https://img-lcwaikiki.mncdn.com/mnresize/1024/-/pim/productimages/20211/5377552/v3/l_20211-s1lk77z8-ufs_a.jpg",
        price: 150.99,
      },
      {
        id: 9,
        name: "Beli Lastikli Düz Cep Detaylı Kadın Şort",
        url: "https://www.lcwaikiki.com/tr-TR/TR/urun/LC-WAIKIKI/kadin/Sort/5697917/2331359",
        img: "https://img-lcwaikiki.mncdn.com/mnresize/1024/-/pim/productimages/20221/5697917/l_20221-s2ci85z8-h9g_a.jpg",
        price: 90.99,
      },
      {
        id: 10,
        name: "Bisiklet Yaka Beli Kemerli Kolsuz Pamuklu Kadın Elbise",
        url: "https://www.lcwaikiki.com/tr-TR/TR/urun/LC-WAIKIKI/kadin/Elbise/5088825/1832093",
        img: "https://img-lcwaikiki.mncdn.com/mnresize/1024/-/pim/productimages/20211/5088825/l_20211-s1h145z8-hkd_a.jpg",
        price: 120.99,
      },
    ];

    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const track = document.querySelector(".carousel-track");

    productData.forEach((product) => {
      const item = document.createElement("div");
      item.classList.add("carousel-item");

      const img = document.createElement("img");
      img.src = product.img;
      img.alt = product.name;

      const title = document.createElement("h3");
      title.textContent = product.name;

      const link = document.createElement("a");
      link.href = product.url;
      link.target = "_blank";
      link.textContent = "Ürünü İncele";

      const price = document.createElement("p");
      price.textContent = product.price;

      const favIcon = document.createElement("span");
      favIcon.innerHTML = "&#x2665;";
      favIcon.classList.add("favorite-icon");
      if (savedFavorites.includes(product.id))
        favIcon.classList.add("favorited");
      favIcon.addEventListener("click", () => {
        favIcon.classList.toggle("favorited");
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (favorites.includes(product.id)) {
          favorites = favorites.filter((id) => id !== product.id);
        } else {
          favorites.push(product.id);
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
        updateCarousel();
      });

      item.appendChild(favIcon);
      item.appendChild(img);
      item.appendChild(title);
      item.appendChild(link);
      item.appendChild(price);
      track.appendChild(item);
    });
  };

  const updateCarousel = () => {
    const track = document.querySelector(".carousel-track");
    track.innerHTML = "";
    fetchProducts();
  };

  const setEvents = () => {
    const track = document.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    let currentIndex = 0;

    function updateSlidePosition() {
      const widthToMove = slides[0].clientWidth + 20;
      track.style.transform = `translateX(-${currentIndex * widthToMove}px)`;
    }

    document.querySelector(".right-button").addEventListener("click", () => {
      if (currentIndex < slides.length - 3) {
        currentIndex++;
        updateSlidePosition();
      }
    });

    document.querySelector(".left-button").addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlidePosition();
      }
    });
  };

  init();
})();
