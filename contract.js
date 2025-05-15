
/*global ethereum, MetamaskOnboarding */


const forwarderOrigin = 'http://localhost:9011'




/**
 * 添加网络方法
 * 参数 params
 * 参数示例
 * [
    {
      chainId: '0x38',
      chainName: 'BSC',
      nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: ['https://bsc-dataseed.binance.org/'],
      blockExplorerUrls: ['https://bscscan.com/'],
    },
  ]
*/
function wallet_addEthereumChain(params) {
  window.ethereum &&
    window.ethereum
      .request({
        method: 'wallet_addEthereumChain',
        params: params,
      })
      .then(() => {
        console.log('添加成功')
      })
      .catch((e) => {

      })
}

$('#wallet_addEthereumChain').on('click', function() {
  console.log('wallet_addEthereumChain');
  var params = [
    {
      chainId: '0x38',
      chainName: 'BSC',
      nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: ['https://bsc-dataseed.binance.org/'],
      blockExplorerUrls: ['https://bscscan.com/'],
    },
  ];
  wallet_addEthereumChain(params);
})

/**
 * 切换网络
 * 参数params
 * 参数示例
 * [
    {
      "chainId": "0x64"
    },
  ]
*/
function wallet_switchEthereumChain(params) {
  window.ethereum &&
    window.ethereum
      .request({
        method: 'wallet_switchEthereumChain',
        params: params,
      })
      .then(() => {
        console.log('切换成功')
      })
      .catch((e) => {

      })
}

$('#wallet_switchEthereumChain').on('click', function() {
  console.log('wallet_switchEthereumChain');
  var params = [
    {
      "chainId": "0x64"
    },
  ];
  wallet_switchEthereumChain(params);
})


/**
 * 请求权限
 * 参数params
 * 参数示例
 * [
    {
      "chainId": "0x64"
    },
  ]
*/
function wallet_requestPermissions(params) {
  window.ethereum &&
    window.ethereum
      .request({
        method: 'wallet_requestPermissions',
        params: params,
      })
      .then(() => {
        console.log('请求权限')
      })
      .catch((e) => {

      })
}

$('#wallet_requestPermissions').on('click', function() {
  console.log('wallet_requestPermissions');
  var params = [
    {
      "eth_accounts": {}
    },
  ];
  wallet_requestPermissions(params);
})


/**
 * 获取权限(帐号、钱包地址)
 * 参数params 可为空
 * 参数示例
*/
function wallet_getPermissions(params) {
  window.ethereum &&
    window.ethereum
      .request({
        method: 'wallet_getPermissions',
        params: params,
      })
      .then(res => {
        console.log(res)
      })
      .catch((e) => {

      })
}

$('#wallet_getPermissions').on('click', function() {
  console.log('wallet_getPermissions');
  var params = [];
  wallet_getPermissions(params);
})

/**
 * 获取钱包地址列表(帐号、钱包地址)--
 * 参数params 可为空
 * 参数示例
*/
function eth_accounts(params) {

  const data = null;
  window.ethereum &&
    window.ethereum
      .request({
        method: 'eth_accounts',
        params: params,
      })
      .then(res => {
        console.log(res)
        
      })
      .catch((e) => {

      })
}

$('#eth_accounts').on('click', function() {
  console.log('eth_accounts');
  var params = [];
  eth_accounts(params);
})

let accounts = "";
web3.eth.getAccounts().then(res => {
  accounts = res[0];
  getrefMap1();
})



var clsContractAddress = "0xDAE5D52283E621A29F00d2bB1A57e5c126c3262C";
var usdtContractAddress = "0x48afC9801eB27281C3a9d35f34cF15E8533bb87e";
var routerAddress = "0xCc7aDc94F3D80127849D2b41b6439b7CF1eB4Ae0";

var BURN_ADDRESS = '0x0000000000000000000000000000000000000000';
var PAIR_ADDRESS = "0x1df37D887937E7Ba0FceF59309C7f58FdD94D2Ef";

let usdtContract = new web3.eth.Contract(mbhABI, usdtContractAddress);
let clsContract = new web3.eth.Contract(clsABI, clsContractAddress);
let routerContract = new web3.eth.Contract(routerABI, routerAddress);

/**
 * 客户端铸造
*/
$('#band').on('click', async function() {
  var parentAddress = $("#parentAddress").val();
  clsContract.methods.band(parentAddress).send({from: accounts}, function (error, transactionHash) {
    console.log("band>>>>>", error, transactionHash);
    alert("交易哈希:" + transactionHash);
  });
})


/**
 * 客户端铸造
*/
$('#mintProduct').on('click', async function() {
  var amountInBNB = $("#mintAmount").val();
    web3.eth.sendTransaction({
      from: accounts,
      to: clsContractAddress,
      value: web3.utils.toWei(amountInBNB, "ether")
    }).then(res => {
      console.log("转账成功，交易哈希：", res.transactionHash);
    }).catch(err => {
      console.error("转账失败：", err);
    });
})

//销毁
$('#burnProduct').on('click', async function() {
  var burnAmount = $("#burnAmount").val();

    clsContract.methods.burn(web3.utils.toWei(burnAmount, "ether")).send({from: accounts}, function (error, transactionHash) {
      console.log("burnProduct>>>>>", error, transactionHash);
    });
})


$('#divieBnb').on('click', function() {
    console.log('>>>','divieBnb');
    clsContract.methods.divieBnb().send({from: accounts}, function (error, transactionHash) {
      console.log("divieBnb>>>>>", error, transactionHash);
    });
  
})

$('#divieNft').on('click', function() {
  console.log('>>>','divieNft');
  clsContract.methods.divieNft().send({from: accounts}, function (error, transactionHash) {
    console.log("divieNft>>>>>", error, transactionHash);
  });

})

//购买
$('#sendTransaction').on('click', function() {
    console.log('>>>','sendTransaction');

    var amountInBNB = $("#sendAmount").val();

    web3.eth.sendTransaction({
      from: accounts,
      to: clsContractAddress,
      value: web3.utils.toWei(amountInBNB, "ether")
    }).then(res => {
      console.log("转账成功，交易哈希：", res.transactionHash);
    }).catch(err => {
      console.error("转账失败：", err);
    });
})


//卖出
$('#sendTokenTransaction').on('click', function() {
  console.log('>>>','sendTokenTransaction');

  var sendTokenAmount = $("#sendTokenAmount").val();

  clsContract.methods.transfer(clsContractAddress, web3.utils.toWei(sendTokenAmount, "ether")).send({from: accounts}, function (error, transactionHash) {
    console.log("divieBnb>>>>>", error, transactionHash);
  });
})



$('#testBuy').on('click', async function() {
  const now = Math.floor(Date.now() / 1000) + 60;
  console.log('>>>>', now);
  var amountInUsdt = $("#sendUsdtAmount").val();
  var inUSdt = web3.utils.toWei(amountInUsdt, "ether");
  usdtContract.methods.approve(routerAddress, inUSdt).send({ from: accounts }).then((approveHash) => {
    routerContract.methods.swapExactTokensForTokensSupportingFeeOnTransferTokens(
      inUSdt,
          0,
        [usdtContractAddress, clsContractAddress],
        accounts,
        now
      ).send({ from: accounts }, function (error, transactionHash) {
        console.log("testBuy>>>>>", error, transactionHash);
    });
  })

})



$('#testSell').on('click', async function() {
  const now = Math.floor(Date.now() / 1000) + 60;
  var dexTokenAmount = $("#dexTokenAmount").val();
  clsContract.methods.approve(routerAddress, web3.utils.toWei(dexTokenAmount, "ether")).send({ from: accounts }).then((approveHash) => {
    routerContract.methods.swapExactTokensForTokensSupportingFeeOnTransferTokens(
      web3.utils.toWei(dexTokenAmount, "ether"),
          0,
          [clsContractAddress, usdtContractAddress],
          accounts,
          now
      ).send({ from: accounts }, function (error, transactionHash) {
        console.log("release>>>>>", error, transactionHash);
        if (!error) {
            console.log("交易成功，交易哈希：", transactionHash.hash);
        }
    });
  })

})

//触发分币
$('#distributeDividends').on('click', function() {
  console.log('>>>','distributeDividends');
  clsContract.methods.distributeDividends().send({from: accounts}, function (error, transactionHash) {
    console.log("distributeDividends>>>>>", error, transactionHash);
  });

})

//触发节点分币
$('#distributeNode').on('click', function() {
  console.log('>>>','distributeNode');
  clsContract.methods.distributeNode().send({from: accounts}, function (error, transactionHash) {
    console.log("distributeNode>>>>>", error, transactionHash);
  });

})


//开始募集
$('#updateParam_1').on('click', function() {
  console.log('>>>','updateParam_1');
  clsContract.methods.updateParam(3, 1, BURN_ADDRESS).send({from: accounts}, function (error, transactionHash) {
    console.log("updateParam_1>>>>>", error, transactionHash);
  });
})

//募集完成
$('#updateParam_2').on('click', function() {
  console.log('>>>','updateParam_2');

  clsContract.methods.updateParam(3, 2, BURN_ADDRESS).send({from: accounts}, function (error, transactionHash) {
    console.log("updateParam_2>>>>>", error, transactionHash);
  });
})

$('#updateParam_6').on('click', function() {
  console.log('>>>','updateParam_6');

  clsContract.methods.updateParam(2, 2, PAIR_ADDRESS).send({from: accounts}, function (error, transactionHash) {
    console.log("updateParam_6>>>>>", error, transactionHash);
  });
})

//白名单交易
$('#updateParam_3').on('click', function() {
  console.log('>>>','updateParam_2');

  clsContract.methods.updateParam(3, 3, PAIR_ADDRESS).send({from: accounts}, function (error, transactionHash) {
    console.log("updateParam_3>>>>>", error, transactionHash);
  });
})

//超集白名单交易
$('#updateParam_4').on('click', function() {
  console.log('>>>','updateParam_4');

  clsContract.methods.updateParam(3, 4, PAIR_ADDRESS).send({from: accounts}, function (error, transactionHash) {
    console.log("updateParam_4>>>>>", error, transactionHash);
  });
})

//开放交易
$('#updateParam_5').on('click', function() {
  console.log('>>>','updateParam_5');

  clsContract.methods.updateParam(3, 5, PAIR_ADDRESS).send({from: accounts}, function (error, transactionHash) {
    console.log("updateParam_5>>>>>", error, transactionHash);
  });
})

//关闭价格验证
$('#updateParam2_1').on('click', function() {
  console.log('>>>','updateParam2_1');

  clsContract.methods.updateParam2(5, 0, PAIR_ADDRESS).send({from: accounts}, function (error, transactionHash) {
    console.log("updateParam_5>>>>>", error, transactionHash);
  });
})

//开启价格验证
$('#updateParam2_2').on('click', function() {
  console.log('>>>','updateParam2_1');

  clsContract.methods.updateParam2(5, 1, PAIR_ADDRESS).send({from: accounts}, function (error, transactionHash) {
    console.log("updateParam_5>>>>>", error, transactionHash);
  });
})

async function getrefMap1() {
  clsContract.methods.getrefMap1(accounts).call(null, function (error, data) {
    console.log("错误信息，mint数量,个人分享数,团队人数,团队数量,累计可领,未领, 0>>>>>", error, data);
    $('#infoAddress').html("错误信息，mint数量,个人分享数,团队人数,团队数量,累计可领,未领, 0>>>>>" + error + data)
  });
}

const initialize = () => {

    ethereum.on('accountsChanged', handleAccountsChanged);
    ethereum.on('chainChanged', handleAccountsChanged);

    async function handleAccountsChanged() {
        window.location.reload();
    }
}
window.addEventListener('DOMContentLoaded', initialize);