const beautyProducts = [
    {
        description: "The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails.",
        id: 1,
        image: "https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/thumbnail.png",
        name: "Red Nail Polish",
        price: 8.99,
        category: "beauty"
    },
    {
        description: "Luxurious facial moisturizer with hyaluronic acid and vitamin C for hydrated, glowing skin.",
        id: 2,
        image: "https://ezcwbtuecsw.exactdn.com/wp-content/uploads/2023/01/51VWboSvF6L._SL1000_.jpg",
        name: "Facial Moisturizer",
        price: 24.99,
        category: "beauty"
    },
    {
        description: "Professional makeup brush set with 12 essential brushes for flawless application.",
        id: 3,
        image: "https://www.reneecosmetics.in/cdn/shop/files/Allin1MakeupBrushSet_02.jpg",
        name: "Makeup Brush Set",
        price: 29.99,
        category: "beauty"
    },
    {
        description: "Long-lasting matte lipstick in classic red shade with moisturizing formula.",
        id: 4,
        image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/shopsy-rakhi-set/2/u/l/2-insta-beauty-5-in-1-forever-enrich-matte-lipstick-the-red-nude-original-imagcr2zn5ahu7vn.jpeg",
        name: "Matte Lipstick",
        price: 15.99,
        category: "beauty"
    },
    {
        description: "Gentle facial cleanser with natural ingredients for all skin types.",
        id: 11,
        image: "https://mykaoshop.com/cdn/shop/articles/how-to-use-cleanser.png",
        name: "Facial Cleanser",
        price: 19.99,
        category: "beauty"
    },
    {
        description: "Volumizing mascara for dramatic lash effects.",
        id: 12,
        image: "https://guide.lakmeindia.com/cdn/shop/files/29112_S2-8901030859073_1000x.jpg",
        name: "Volume Mascara",
        price: 12.99,
        category: "beauty"
    },
    {
        description: "Refreshing toner with witch hazel and rose water.",
        id: 13,
        image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/toner/a/a/o/100-face-toner-best-quality-glowing-skin-toner-perlente-original-imagtkhx9fzwmfgz.jpeg",
        name: "Facial Toner",
        price: 16.99,
        category: "beauty"
    },
    {
        description: "Hydrating sheet mask pack with collagen and vitamins.",
        id: 14,
        image: "https://www.byrdie.com/thmb/sgNCFfGkMDq6HyIe-WML5nIdSpg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/BYR-tonymoly-all-you-need-mask-set_JESSICAJULIAO_0575.jpg-1ace31503a0e4a74b3ee4a0551fb8dac.jpg",
        name: "Sheet Mask Set",
        price: 14.99,
        category: "beauty"
    },
    {
        description: "Professional hair styling tools with ceramic coating.",
        id: 15,
        image: "https://m.media-amazon.com/images/I/71g0311feWL.jpg",
        name: "Hair Styling Set",
        price: 89.99,
        category: "beauty"
    },
    {
        description: "Luxury perfume with floral and woody notes.",
        id: 16,
        image: "https://www.jiomart.com/images/product/original/rvdbkebmyr/signature-perfume-body-spray-red-deodorant-200-ml-for-men-elegant-distinctive-fragrance-long-lasting-fragrance-skin-friendly-deo-everyday-use-product-images-orvdbkebmyr-p603513441-2-202308021849.jpg",
        name: "Signature Perfume",
        price: 79.99,
        category: "beauty"
    }
];

const womensClothing = [
    {
        description: "Elegant floral summer dress with adjustable straps and flowing skirt.",
        id: 5,
        image: "https://i.etsystatic.com/21412517/r/il/23227c/2152875848/il_570xN.2152875848_20yh.jpg",
        name: "Handpainted Patachitra Saree on Kerala Cotton",
        price: 799,
        category: "sarees"
    },
    {
        description: "Classic denim jacket with vintage wash and brass buttons.",
        id: 6,
        image: "https://5.imimg.com/data5/CW/XF/MY-77101594/handmade-cotton-sarees-500x500.jpg",
        name: "Handmade Cotton Sarees",
        price: 1250,
        category: "sarees"
    },
    {
        description: "Classic denim jacket with vintage wash and brass buttons.",
        id: 7,
        image: "https://www.samyakk.com/blog/wp-content/uploads/2023/03/HE4612.jpg",
        name: "Patan Patola- A Priceless Indian Handmade Saree",
        price: 4999,
        category: "sarees"
    }, 
    {
        description: "Classic denim jacket with vintage wash and brass buttons.",
        id: 8,
        image: "https://www.forsarees.com/cdn/shop/files/LilIndiagiftbox-Saree.jpg?v=1722591140&width=1445",
        name: "Handmade Saree",
        price: 3400,
        category: "sarees"
    },
    {
        description: "Classic denim jacket with vintage wash and brass buttons.",
        id: 9,
        image: "https://brandmandir.com/media/catalog/product/cache/411a7c368a356a11933f7218f5d4cdaa/t/m/tmpTGC3367440_1.jpg",
        name: "Patan Patola- A Priceless Indian Handmade Saree",
        price: 4199,
        category: "sarees"
    },
];

const homeDecors = [
    {
        description: "Handcrafted ceramic vase with abstract geometric patterns.",
        id: 8,
        image: "https://feltpaperscissors.com/wp-content/uploads/2021/05/Geometric_Paper_Vases_4.jpeg",
        name: "Geometric Vase",
        price: 39.99,
        category: "Home decors"
    },
    {
        description: "Modern wall clock with minimalist design and silent movement.",
        id: 9,
        image: "https://funkydecors.com/cdn/shop/products/funkytradition-modern-minimalist-creative-simple-flower-shape-metal-wall-clock-watch-decor-for-home-office-clocks-995.jpg",
        name: "Minimalist Wall Clock",
        price: 44.99,
        category: "Home decors"
    },
    {
        description: "Decorative throw pillows set of 4.",
        id: 24,
        image: "https://m.media-amazon.com/images/I/91PS4a--8UL.jpg",
        name: "Throw Pillow Set",
        price: 49.99,
        category: "Home decors"
    },
    {
        description: "Macrame wall hanging handmade design.",
        id: 25,
        image: "https://i.etsystatic.com/12804288/r/il/68d74e/2037314028/il_1080xN.2037314028_gdke.jpg",
        name: "Macrame Wall Art",
        price: 34.99,
        category: "Home decors"
    },
    {
        description: "LED string lights for cozy ambiance.",
        id: 26,
        image: "https://m.media-amazon.com/images/I/51M-0OzscIL._AC_UF1000,1000_QL80_.jpg",
        name: "String Lights",
        price: 24.99,
        category: "Home decors"
    },
    {
        description: "Scented candle set with wooden wicks.",
        id: 27,
        image: "https://nestasia.in/cdn/shop/files/candlestand_2_b5f5ef30-3158-4412-9ab5-9d53f466d6c8.webp",
        name: "Luxury Candle Set",
        price: 39.99,
        category: "Home decors"
    },
    {
        description: "Modern metal wall shelves set of 3.",
        id: 28,
        image: "https://ouchcart.com/cdn/shop/products/61f9KZKQpiL._SL1000_1024x.jpg",
        name: "Wall Shelves",
        price: 59.99,
        category: "Home decors"
    },
    {
        description: "Decorative mirror with gold frame.",
        id: 29,
        image: "https://alfadesigns.in/wp-content/uploads/2023/04/wood-framed-mirror.jpg",
        name: "Gold Frame Mirror",
        price: 89.99,
        category: "Home decors"
    },
    {
        description: "Artificial plant in modern planter.",
        id: 30,
        image: "https://masonhome.in/cdn/shop/files/IMG_0689.jpg",
        name: "Artificial Plant",
        price: 29.99,
        category: "Home decors"
    },
    {
        description: "Woven basket set for storage.",
        id: 31,
        image: "https://www.adairs.com.au/globalassets/13.-ecommerce/03.-product-images/2024_images/campaignsseasonal/10.-mys/xmarketing---mid-year-sale---55446_adairs-scalloped-storage_natural_square.jpg",
        name: "Storage Baskets",
        price: 44.99,
        category: "Home decors"
    }
];

const arts = [
    {
        description: "Original abstract canvas painting with vibrant colors.",
        id: 10,
        image: "https://m.media-amazon.com/images/I/91ZESYqQzXL._AC_UF1000,1000_QL80_.jpg",
        name: "Abstract Canvas Art",
        price: 129.99,
        category: "Arts"
    },
    {
        description: "Digital art print of urban landscape.",
        id: 32,
        image: "https://m.media-amazon.com/images/I/91qJsnkAytL._AC_UY1100_.jpg",
        name: "Urban Digital Print",
        price: 79.99,
        category: "Arts"
    },
    {
        description: "Handmade pottery bowl set.",
        id: 33,
        image: "https://i.etsystatic.com/24690085/r/il/97cfa4/3953700580/il_570xN.3953700580_lm12.jpg",
        name: "Ceramic Bowl Set",
        price: 89.99,
        category: "Arts"
    },
    {
        description: "Glass sculpture with color accents.",
        id: 34,
        image: "https://i.pinimg.com/736x/f3/3b/36/f33b363b124f6d70b61d10b0f214ea9b.jpg",
        name: "Glass Art Piece",
        price: 149.99,
        category: "Arts"
    },
    {
        description: "Limited edition photography print.",
        id: 35,
        image: "https://printbucket.com/content/images/new-products/photos/webp/prints1.webp",
        name: "Photography Print",
        price: 199.99,
        category: "Arts"
    },
    {
        description: "Metal wall sculpture modern design.",
        id: 36,
        image: "https://metalwalldecor.in/wp-content/uploads/2023/11/Giant-Metal-Tree-Wall-Art-with-LED-Light-for-Living.webp",
        name: "Metal Wall Art",
        price: 169.99,
        category: "Arts"
    },
    {
        description: "Handwoven textile wall hanging.",
        id: 37,
        image: "https://static.wixstatic.com/media/c44af2_1eadeb9d3e2c414d84df213f11f2969d~mv2.jpg/v1/fill/w_760,h_533,al_c,q_85/c44af2_1eadeb9d3e2c414d84df213f11f2969d~mv2.jpg",
        name: "Textile Art",
        price: 119.99,
        category: "Arts"
    },
    {
        description: "Mixed media collage artwork.",
        id: 38,
        image: "https://gelpress.com/cdn/shop/articles/mixed-media-magic-with-modge-podge-gel-press.jpg",
        name: "Mixed Media Art",
        price: 159.99,
        category: "Arts"
    },
    {
        description: "Wooden sculpture handcrafted.",
        id: 39,
        image: "https://webneel.com/daily/sites/default/files/images/daily/07-2015/16-animal-wood-sculpture-by-giuseppe-rumerio.jpg",
        name: "Wood Sculpture",
        price: 189.99,
        category: "Arts"
    },
    {
        description: "Contemporary oil painting landscape.",
        id: 40,
        image: "https://www.shutterstock.com/image-illustration/seven-horse-painting-significance-vaastu-600nw-2430501479.jpg",
        name: "Oil Landscape",
        price: 249.99,
        category: "Arts"
    }
];

const products = [
    // ...beautyProducts,
    ...womensClothing,
    ...homeDecors,
    ...arts
];

export default products;