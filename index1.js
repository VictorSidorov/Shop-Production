let data = ['Счетчики электроэнергии', 'Сварочное оборудование "ФОРСАЖ"', `Системы управления двигателями`];
const refreshProducts = async () => {
    prsEl.innerHTML = '';
    Contract.methods.productlen().call().then(function (tx) { pr2 = tx; });
    
    for (let i = pr2; i > 0; i--) {

            const products = Contract.methods.products(i).call().then(function (tx) {

                products.price = tx.price;
                products.id = i;
                if (tx.status == 1) {

                    const prEl = createElementFromString(
                        `<div class="product card" style="width: 18rem;">
                                 <img src="${'img' + tx.number + '.jpg'}" class="card-img-top" alt="...">
                                <div class="card-body">
                                <h5 class="card-title">${data[tx.number - 1]}</h5>
                                <p class="card-text">${tx.price / 1e18} Eth</p>
                                <button class="btn btn-primary">Купить</button>
                              </div>
                            </div>`
                    );
                    prEl.onclick = buyProduct.bind(null, products);
                    prsEl.appendChild(prEl);
                }
            });
        
        

    }
}

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {

    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}

console.log(new Web3.providers.HttpProvider("http://localhost:7545"));

var Contract = new web3.eth.Contract(abi, addr);

console.log(Contract);


var account;

web3.eth.getAccounts(function (err, accounts) {
    if (err != null) {
        alert("Error retrieving accounts.");
        return;
    }
    if (accounts.length == 0) {
        alert("No account found! Make sure the Ethereum client is configured properly.");
        return;
    }
 
    document.querySelector("#but_login").onclick = function () {

        refreshProducts();
        var sel = document.getElementById('mySelect').selectedIndex;
        var options = document.getElementById('mySelect').options;
        let num = Number(options[sel].value);
        account = accounts[num];
        console.log()
        console.log('Account: ' + account);
        web3.eth.defaultAccount = account;

        web3.eth.getBalance(account).then(function (balance) { document.getElementById("balance").innerHTML = 'Баланс: ' + web3.utils.fromWei(balance, 'ether') + ' ' + 'ETH', console.log('balance: ', balance, 'wei, ', web3.utils.fromWei(balance, 'ether'), 'ether'); });
       
        

    }

    for (var i = 0; i < 8; i++) {

        value = String(i);
        document.getElementById(value).innerHTML = accounts[i];

    }
    web3.eth.getBalance(account).then(function (balance) {
        document.getElementById("balance").innerHTML = 'balance' + ' ' + web3.utils.fromWei(balance, 'ether') + ' ' + 'ETH', console.log('balance: ', balance, 'wei, ', web3.utils.fromWei(balance, 'ether'), 'ether');
        
    });

});








