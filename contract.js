
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



var clsContractAddress = "0x4f0C42eFFe797259422D03da2D44899aC164EDbD";
var usdtContractAddress = "0x48afC9801eB27281C3a9d35f34cF15E8533bb87e";
var routerAddress = "0xCc7aDc94F3D80127849D2b41b6439b7CF1eB4Ae0";

var lpRewardsAddress = "0x3C9eD5e12909b6a94d1755FE199a1F5DCeaE926e";

var BURN_ADDRESS = '0x0000000000000000000000000000000000000000';
var PAIR_ADDRESS = "0x1df37D887937E7Ba0FceF59309C7f58FdD94D2Ef";

let usdtContract = new web3.eth.Contract(mbhABI, usdtContractAddress);
let clsContract = new web3.eth.Contract(clsABI, clsContractAddress);
let routerContract = new web3.eth.Contract(routerABI, routerAddress);

let lpRewardsContract = new web3.eth.Contract(lpRewardsABI, lpRewardsAddress);

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
    console.log("burnAmount>>>", burnAmount)
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

//领取nft
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
  console.log("sendTokenAmount>>>", sendTokenAmount);

  clsContract.methods.transfer(clsContractAddress, web3.utils.toWei(sendTokenAmount, "ether")).send({from: accounts}, function (error, transactionHash) {
    console.log("sendTokenTransaction>>>>>", error, transactionHash);
  });
})


//dex(swap)买
$('#testBuy').on('click', async function() {
  const now = Math.floor(Date.now() / 1000) + 60;
  console.log('>>>>', now);
  var amountInUsdt = $("#sendUsdtAmount").val();
  var inUSdt = web3.utils.toWei(amountInUsdt, "ether");
  usdtContract.methods.approve(routerAddress, inUSdt).send({ from: accounts }).then((approveHash) => {
    //swapExactETHForTokensSupportingFeeOnTransferTokens
    //swapExactTokensForTokensSupportingFeeOnTransferTokens
    //token-token币对(例如usdt-token)
    routerContract.methods.swapExactTokensForTokensSupportingFeeOnTransferTokens(
      inUSdt,
          0,
        [usdtContractAddress, clsContractAddress],
        accounts,
        now
      ).send({ from: accounts }, function (error, transactionHash) {
        console.log("testBuy>>>>>", error, transactionHash);
    });

    //evm本链基础币交易(例eth,bnb)
    // routerContract.methods.swapExactETHForTokensSupportingFeeOnTransferTokens(
    //         0,
    //         [WBNB_TOKEN, Token.address],
    //         wallet.address,
    //         now,
    //         {
    //           web3.utils.toWei(amountInUsdt, "ether"),
    //           // gasLimit: 400000,
    //           // gasPrice: ethers.utils.parseUnits("5", "gwei"),
    //         }
    //       ).send({ from: accounts }, function (error, transactionHash) {
    //     console.log("testBuy>>>>>", error, transactionHash);
    // });
    })

})


//dex(swap)卖
$('#testSell').on('click', async function() {
  const now = Math.floor(Date.now() / 1000) + 60;
  var dexTokenAmount = $("#dexTokenAmount").val();
  clsContract.methods.approve(routerAddress, web3.utils.toWei(dexTokenAmount, "ether")).send({ from: accounts }).then((approveHash) => {
    //swapExactTokensForETHSupportingFeeOnTransferTokens
    //swapExactTokensForTokensSupportingFeeOnTransferTokens
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

    //evm本链基础币交易(例eth,bnb)
    // routerContract.methods.swapExactTokensForETHSupportingFeeOnTransferTokens(
    // web3.utils.toWei(dexTokenAmount, "ether"),
    // 0,
    // [clsContractAddress, usdtContractAddress],
    // owner.address,
    // deadline,
    // {
    //     gasLimit: 400000,
    //     gasPrice: ethers.utils.parseUnits("5", "gwei"),
    // }
    // ).send({ from: accounts }, function (error, transactionHash) {
    //     console.log("release>>>>>", error, transactionHash);
    //     if (!error) {
    //         console.log("交易成功，交易哈希：", transactionHash.hash);
    //     }
    // });

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
  var recipient_address = $("#recipient_address").val();
  clsContract.methods.updateParam(3, 2, recipient_address).send({from: accounts}, function (error, transactionHash) {
    console.log("updateParam_2>>>>>", error, transactionHash);
  });
})


//募集完成-清空合约bnb
$('#clearDivieBnb').on('click', function() {
  console.log('>>>','clearDivieBnb');
  clsContract.methods.clearDivieBnb().send({from: accounts}, function (error, transactionHash) {
    console.log("clearDivieBnb>>>>>", error, transactionHash);
  });
})



$('#updateParam_6').on('click', function() {
  console.log('>>>','updateParam_6');
  var pair_address = $("#pair_address").val();
  clsContract.methods.updateParam(2, 2, pair_address).send({from: accounts}, function (error, transactionHash) {
    console.log("updateParam_6>>>>>", error, transactionHash);
  });
})

//白名单交易
$('#updateParam_3').on('click', function() {
  console.log('>>>','updateParam_3');

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

$('#updateParam2_8').on('click', function() {
  console.log('>>>','updateParam2_8');
  var swap_router = $("#swap_router").val();
  clsContract.methods.updateParam2(8, 1, swap_router).send({from: accounts}, function (error, transactionHash) {
    console.log("updateParam2_8>>>>>", error, transactionHash);
  });
})

$('#updateParam2_9').on('click', function() {
  console.log('>>>','updateParam2_9');
  var wbnb = $("#wbnb_address").val();
  clsContract.methods.updateParam2(9, 1, wbnb).send({from: accounts}, function (error, transactionHash) {
    console.log("updateParam2_9>>>>>", error, transactionHash);
  });
})

$('#updateParam2_10').on('click', function() {
  console.log('>>>','updateParam2_10');
  var nft_address = $("#nft_address").val();
  clsContract.methods.updateParam2(10, 1, nft_address).send({from: accounts}, function (error, transactionHash) {
    console.log("updateParam2_10>>>>>", error, transactionHash);
  });
})

//收尾11
$('#updateParam2_11').on('click', function() {
  console.log('>>>','updateParam2_11');
  var deadAmount = $("#deadAmount").val();
  clsContract.methods.updateParam2(11, web3.utils.toWei(deadAmount, "ether"), accounts).send({from: accounts}, function (error, transactionHash) {
    console.log("updateParam2_11>>>>>", error, transactionHash);
  });
})


//收尾12
$('#updateParam2_12').on('click', function() {
  console.log('>>>','updateParam2_12');
  var totalSupplyKc = $("#totalSupplyKc").val();
  clsContract.methods.updateParam2(12, web3.utils.toWei(totalSupplyKc, "ether"), accounts).send({from: accounts}, function (error, transactionHash) {
    console.log("updateParam2_11>>>>>", error, transactionHash);
  });
})

//添加超级白名单
$('#addMintWhite').on('click', function() {
  console.log('>>>','addMintWhite');
  //type 0--超级白名单，2--白名单
  var white_type = $("#white_type").val();
  var addMintWhiteAddress = $("#addMintWhiteAddress").val();
  console.log("addMintWhiteAddress>>>", addMintWhiteAddress);
  var result = $("#result").val();
  clsContract.methods.addMintWhite(white_type, addMintWhiteAddress, result).send({from: accounts}, function (error, transactionHash) {
    console.log("addMintWhite>>>>>", error, transactionHash);
  });
})



 //已烧烧数量
$('#dividAmountMap').on('click', function() {
  console.log('>>>','dividAmountMap');
  clsContract.methods.dividAmountMap(accounts).call(null, function (error, data) {
    console.log("dividAmountMap>>>>>", error, data);
    $('#dividAmountMapInfo').html("错误信息，已燃烧数量>>>>>" + error + data)
  });
})


async function getrefMap1() {
  clsContract.methods.getrefMap1(accounts).call(null, function (error, data) {
    // mintAmount[adr],refMintCount[adr],teamMintCount[adr],teamMintAmount[adr],waitGetBnb[adr],waitGetBnbS[adr], 0
    console.log("错误信息，mint数量,个人分享数,团队人数,团队数量,累计可领,未领, 0>>>>>", error, data);
    $('#infoAddress').html("错误信息，mint数量,个人分享数,团队人数,团队数量,累计可领,未领, 0>>>>>" + error + data)
  });

    //推荐地址列表
  // clsContract.methods.refAddresses(accounts).call(null, function (error, data) {
  //   console.log('>>>', data);
  // });
}


$('#getrefMap').on('click', function() {
  console.log('>>>','getrefMap');
  getrefMap();
})


async function getrefMap() {
  clsContract.methods.getrefMap(accounts).call(null, function (error, data) {
    // refMap[adr],refCount[adr],refCountALL[adr],nodeAddresseMap[adr],mintAmount[adr],waitGetBurnBnb[adr], 0
    console.log("错误信息，推荐地址,直接分享数,团队分享数,是否节点,铸造额度,所有铸造奖励, 0>>>>>", error, data);
    $('#getrefMapInfo').html("错误信息，推荐地址,直接分享数,团队分享数,是否节点,铸造额度,所有铸造奖励, 0>>>>>" + error + data)
  });
}


$('#getrefMap2').on('click', function() {
  console.log('>>>','getrefMap2');
  getrefMap2();
})

// 燃烧页
async function getrefMap2() {
  clsContract.methods.getrefMap2(accounts).call(null, function (error, data) {
    //refMap[adr], burnAmountBnb[adr], burnAmountR[adr], refIncomeMap[adr],nodeIncomeMap[adr], refAmountALL[adr],childAddresses[adr].length

    console.log("错误信息，推荐地址,燃烧价值bnb,燃烧额度token,推荐奖励,节点奖励, 团队燃烧金额, 推荐地址数>>>>>", error, data);
    $('#getrefMap2Info').html("错误信息，推荐地址,燃烧价值bnb,燃烧额度token,推荐奖励,节点奖励, 团队燃烧金额, 推荐地址数>>>>>" + error + data)
  });

  //推荐地址列表
  // clsContract.methods.childAddresses(accounts).call(null, function (error, data) {
  //   console.log('>>>', data);
  // });
}


$('#getStatData2').on('click', function() {
  console.log('>>>','getStatData2');
  getStatData2();
})

//仪表数据
async function getStatData2() {
  clsContract.methods.getStatData2().call(null, function (error, data) {
    // _balances[address(this)],address(this).balance,_totalSupply,deadAmount,deadCount,allUsersV.length,feeAmount
    console.log("错误信息，合约的token余额,合约的余额,总量,燃烧数量,燃烧次数,燃烧地址数,累计手续费 >>>>>", error, data);
    $('#getStatData2Info').html("错误信息，推荐地址,燃烧价值bnb,燃烧额度token,推荐奖励,节点奖励, 团队燃烧金额, 推荐地址数>>>>>" + error + data)
  });
}

//
async function getStatData() {
  clsContract.methods.getStatData().call(null, function (error, data) {
    // totalBurnCounted,dividAmountS, profitTokenAmount,dividAmount,maxBurnCountDay,totalBurnCounted,0,0,0 ,mintEnable,allUsersV.length,stayBnbMax
    console.log("错误信息，当天销毁数,滑点数量,盈利税数量,0,最大燃烧次数,0,累计手续费 >>>>>", error, data);
    $('#getStatData2Info').html("错误信息，推荐地址,燃烧价值bnb,燃烧额度token,推荐奖励,节点奖励, 团队燃烧金额, 推荐地址数>>>>>" + error + data)
  });
}

//预估数量
async function getAmountOut() {
  console.log('>>>','getAmountOut');
  var amountOut = $("#amountOut").val();
  var isBuy = true; // 买-true,卖false
  clsContract.methods.getAmountOut(amountOut, isBuy).call(null, function (error, data) {
    console.log("错误信息，数量 >>>>>", error, data);
  });
}
//获取价格
async function getReserves() {
  console.log('>>>','getReserves');
  clsContract.methods.getReserves().call(null, function (error, data) {
    console.log("错误信息，价格 >>>>>", error, data);
  });
}

//烯烧总价值
async function totalWeightedBurnValue() {
  console.log('>>>','totalWeightedBurnValue');
  clsContract.methods.totalWeightedBurnValue().call(null, function (error, data) {
    console.log("错误信息，燃烧总价值 >>>>>", error, data);
  });
}

//黑洞量
$('#getBlackHole').on('click', function() {
  console.log('>>>','getBlackHole');
  clsContract.methods.balanceOf("0x000000000000000000000000000000000000dEaD").call(null, function (error, data) {
    console.log("getBlackHole>>>>>", error, data);
    // $('#getBlackHoleInfo').html("错误信息，黑洞数量>>>>>" + error + data)
  });
})


//保底
$('#activeRewardsAccount').on('click', function() {
  console.log('>>>','activeRewardsAccount');

  var rewardsAccount = $("#rewardsAccount").val();
  var rewardsAmount = $("#rewardsAmount").val();

  lpRewardsContract.methods.activeRewardsAccount(rewardsAccount, web3.utils.toWei(rewardsAmount, "ether")).send({from: accounts}, function (error, transactionHash) {
    console.log("rewardsAccount>>>>>", error, transactionHash);
  });
})

//保底地址
$('#activeAndendRewards').on('click', function() {
  console.log('>>>','activeRewardsAccount');

  var rewardAddresses = $("#rewardAddresses").val();

  lpRewardsContract.methods.activeAndendRewards(rewardAddresses).send({from: accounts}, function (error, transactionHash) {
    console.log("activeAndendRewards>>>>>", error, transactionHash);
  });
})



const initialize = () => {

    ethereum.on('accountsChanged', handleAccountsChanged);
    ethereum.on('chainChanged', handleAccountsChanged);

    async function handleAccountsChanged() {
        window.location.reload();
    }
}
window.addEventListener('DOMContentLoaded', initialize);