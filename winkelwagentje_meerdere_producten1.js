var naam = ["The bastard small", "Barbe cook", "Redfire", "outmary", "Beretii","weber master"];
var prijs = [219, 79.99, 500,166.99,347.35,279];
//var src = ["i"];

var products = [
    {
        name: "The bastard small",
        price: 219,
        discount: 0,
        image: "img_1.jpg"
    },
    {
        name: "Barbe cook",
        price: 79.99,
        discount: 0,
        image: "img_2.jpg"
    },
    {
        name: "Redfire",
        price: 500,
        discount: 50,
        image: "img_3.jpg"
    },
    {
        name: "outmary",
        price: 166.99,
        discount: 70,
        image: "img_4.jpg"
    },
    {
        name: "Beretii",
        price: 347.35,
        discount: 0,
        image: "img_4.jpg"
    },
    {
        name: "weber master",
        price: 279,
        discount: 0,
        image: "img_4.jpg"
    }
];


function toonProductInformatie() {
    var producten = "";
    var productenInMandje = "";
    for (teller = 0; teller < products.length; teller++) {

        var name = products[teller].name;
        var price = (products[teller].price).toFixed(2);
        var discount = products[teller].discount;
        var totalPrice = (products[teller].price - products[teller].discount).toFixed(2);
        var priceClass = "bedrag";

        
        var discountClass = discount > 0 ? "korting" : "hideDiscount";
        var priceClass = discount > 0 ? "bedrag discounted" : "bedrag";

        producten += `
        <div class="bold product">
            <img src="${products[teller].image}">
            <label>${name}</label>
            <div class="${priceClass}">${price}</div>
            <div class="${discountClass}">${totalPrice}</div>
            <div class="actie">
                <button onclick="plusMin('plus', 'aantal_${teller}');"><i class="fas fa-plus"></i></button>
                <button onclick="plusMin('min', 'aantal_${teller}');"><i class="fas fa-minus"></i></button>
            </div>
        </div>
        `;

        productenInMandje += `
        <div class="bold productInMandje">
            <label>${name}</label>
            <div class="bedrag">${totalPrice}</div>
            <div><input type="number" id="aantal_${teller}" value="0" /></div>
            <div class="actie">
                <button onclick="plusMin('plus', 'aantal_${teller}');"><i class="fas fa-plus"></i></button>
                <button onclick="plusMin('min', 'aantal_${teller}');"><i class="fas fa-minus"></i></button>
            </div>
        </div>
        `;
    }

    document.getElementById("producten").innerHTML = producten;
    document.getElementById("productenInMandje").innerHTML = productenInMandje;
}
function plusMin(actie, id) {
    var aantal = Number(document.getElementById(id).value);    
    if (actie == "plus") {       
        aantal++;
    }
    else {
        if (aantal > 0) {
            aantal--;
        }
    }

    document.getElementById(id).value = aantal;

    verwerkTotalen();
}

function berekenTransportKost(land, totaal_excl_btw) {
    var transportkost = 0;
    if (totaal_excl_btw > 0) {
        if (land == "België") {
            transportkost = 10;
            if (totaal_excl_btw > 300) {
                transportkost = 0;
            }
        }
        else if (land == "Nederland" || land == "Luxemburg") {
            transportkost = 13;
            if (totaal_excl_btw > 500) {
                transportkost = 0;
            }
        }
        else if (land == "Duitsland" || land == "Frankrijk") {
            transportkost = 15;
            if (totaal_excl_btw > 700) {
                transportkost = 0;
            }
        }
    }
    return transportkost;
}

function verwerkTotalen() {  
    /* bereken het totaal excl. BTW en excl. transportkost */
    var totaal_excl_btw_excl_transport = 0;
    for (teller = 0; teller < naam.length; teller++) {
        aantal = Number(document.getElementById("aantal_" + teller).value);
        totaal_excl_btw_excl_transport = totaal_excl_btw_excl_transport + (aantal * prijs[teller]);
    }

    /* bereken de transportkost */
    var land = document.getElementById("land").value;
    var transportkost = berekenTransportKost(land, totaal_excl_btw_excl_transport);
    
    /* bereken het totaal excl. BTW en incl. transportkost */
    totaal_excl_btw = totaal_excl_btw_excl_transport + transportkost;

    /* bereken het totaal incl. BTW en de btw */
    var totaal_incl_btw = totaal_excl_btw * 1.21;
    var btw = totaal_incl_btw - totaal_excl_btw;

    /* plaats de bedragen terug in de html */
    if (transportkost > 0) {
        document.getElementById("transportkost").innerHTML = "&euro; " + transportkost;
    }
    else {
        document.getElementById("transportkost").innerHTML = "gratis";
    }
    document.getElementById("totaal_excl_transport").innerHTML = "&euro; " + totaal_excl_btw_excl_transport.toFixed(2);
    document.getElementById("totaal_excl_btw").innerHTML = "&euro; " + totaal_excl_btw.toFixed(2);
    document.getElementById("btw").innerHTML = "&euro; " + btw.toFixed(2);
    document.getElementById("totaal_incl_btw").innerHTML = "&euro; " + totaal_incl_btw.toFixed(2);
}