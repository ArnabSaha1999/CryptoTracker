let container = document.querySelector('.container'); //selects the container div in which everything will be

axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false') //gets the CoinGecko API using Axios
.then(res => {
    for(let data of res.data) {
        let row = document.createElement('DIV'); //creates a div named row which will fill all the currency details
        let img = document.createElement('IMG'); //creates image element which will hold currency image
        let name = document.createElement('P'); //createes a paragraph element which will hold currency name
        let rank = document.createElement('P'); //createes a paragraph element which will hold currency rank
        let symbol = document.createElement('P'); //createes a paragraph element which will hold currency symbol
        let currentPrice = document.createElement('P'); //createes a paragraph element which will hold currency's current price
        let marketCap = document.createElement('P'); //createes a paragraph element which will hold currency's market cap
        let totalVolume = document.createElement('P'); //createes a paragraph element which will hold currency total volume
        let priceChange = document.createElement('P'); //createes a paragraph element which will hold currency price change percentage in last 24 hours
         
        img.src = data.image; //sets the src of image element to the currency image
        name.append(data.name); //append the name of the currency to name element
        symbol.append(data.symbol.toUpperCase()); //append the symbol of the currency in UpperCase letter
        rank.append("#",data.market_cap_rank); // appends the rank of the currency
        currentPrice.innerHTML = '&#8377; '; //adds the INR sign before current price
        currentPrice.append(data.current_price.toLocaleString()); //set the current price of the currency
        totalVolume.innerHTML = '&#8377; ';//add the the INR sign before the total volume
        totalVolume.append(data.total_volume.toLocaleString()) //sets the total volume of the currency
        marketCap.innerHTML = '&#8377;'; // add the INR sign before market cap
        marketCap.append(data.market_cap.toLocaleString()) //sets the market cap of the currency
        priceChange.append(data.price_change_percentage_24h.toFixed(2)) //sets the price change percentage in last 24 hours
        if(data.price_change_percentage_24h < 0) { //checks if the currency price is in loss or in growth in last 24 hours
            priceChange.classList.add('negetive-growth') // if the currency is in loss then the color
        } else { 
            priceChange.prepend("+") // if the change is in profit then + sign is added infront 
            priceChange.classList.add('positive-growth') // if the currency is in profit then the color
        }

        row.classList.add('row'); //class name is added to the div named row
        img.classList.add('currency-image'); // class name is added to the image
        name.classList.add("currency-details");
        rank.classList.add("currency-rank"); 
        symbol.classList.add("currency-details,symbol");
        currentPrice.classList.add("currency-details"); // class name is added to paragraph element
        marketCap.classList.add("currency-details");
        totalVolume.classList.add("currency-details");
        priceChange.classList.add("currency-details");
        row.append( img ,rank , name , symbol , currentPrice , totalVolume , priceChange , marketCap); //all the currency details stored in the above created elements are appended into the div element named row
        container.append(row) // the row named div is added to the container div
        // adding the search event 
        let searchBox = document.querySelector('.search-box');
        searchBox.addEventListener('keyup' , e => {
            if(!row.children[2].innerText.toLowerCase().includes(searchBox.value.toLowerCase())) {
                row.style.display = "none";
                isFound = false;
            } else {
                row.style.display = "";
                isFound = true;
            }
        })

        let screenMedia = window.matchMedia('screen and (max-width : 1300px)');
        let screenMediaTab = window.matchMedia('screen and (max-width : 1200px)');
        let screenMediaMobile = window.matchMedia('screen and (max-width : 700px)');
            
        // checking for the reponsiveness of the web page
        //when the screen size is smaller than 1300px
        const ifSmallerScreen = () => {
            if(screenMedia.matches) {
                rank.style.display = "none"
            } else {
                rank.style.display = "";
                container.style.maxWidth = "";
            }
        }
        //when the screen size is smaller than 1200px
        const ifTabScreen = () => {
            if(screenMediaTab.matches) {
                marketCap.style.display = "none";
                totalVolume.style.display = "none";
            } else {
                marketCap.style.display = "";
                totalVolume.style.display = "";
            }
        }
        //when the screen size is smaller than 700px
        const ifMobileScreen = () => {
            if(screenMediaMobile.matches) {
                priceChange.style.position = "absolute";
                priceChange.style.left = 75 + "%";
                priceChange.style.transform = "translateY(10px)";
                currentPrice.style.position = "absolute";
                currentPrice.style.left = 75 + "%";
                currentPrice.style.transform = "translateY(-15px)";
                symbol.style.position = "absolute";
                symbol.style.left = 20 + "%";
                symbol.style.transform = "translateY(10px)"
                name.style.position = "absolute";
                name.style.left = 20 + "%";
                name.style.transform = "translateY(-15px)"
                row.style.margin = "20px 0";
            } else {
                priceChange.style.position = "";
                priceChange.style.left = "";
                priceChange.style.transform = "";
                currentPrice.style.position = "";
                currentPrice.style.left = "";
                currentPrice.style.transform = "";
                name.style.position = "";
                name.style.left = "";
                name.style.transform = "";
                symbol.style.position = "";
                symbol.style.left = "";
                symbol.style.transform = "";
            }
        }
        //this is called when the page is opened
        ifSmallerScreen();
        ifTabScreen();
        ifMobileScreen();
        //event for the resize property
        window.addEventListener('resize' , e => {
           ifSmallerScreen();
           ifTabScreen();
           ifMobileScreen();
        })
    }
})


//event for the dark mode & light mode feature

let row = document.querySelectorAll('.row');
let fa = document.querySelector('.fas');
fa.addEventListener('click' , e => {
    document.body.classList.toggle('dark-mode');
    document.body.style.transition = "transform 0.5s";
    if(document.body.classList.contains('dark-mode')) {
        fa.classList.add("fa-moon");
        fa.classList.remove("fa-sun")
    } else {
        fa.classList.add("fa-sun");
        fa.classList.remove("fa-moon");
    }
})
