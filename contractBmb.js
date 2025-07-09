
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
})



var bmbContractAddress = "0x6396a06c0D40209c119077b1634aa07CE7eA0a95";
var dailyBMBMiningAddress = "0xa6D9972125fF79d59B6516f57bb556309A6a218B";
var BURN_ADDRESS = '0x0000000000000000000000000000000000000000';
var PAIR_ADDRESS = "0x523549A8a07cE1fA17CC6DAD0FCdF6ee62e6D201";

let lpContract = new web3.eth.Contract(lpABI, PAIR_ADDRESS);
let bmbContract = new web3.eth.Contract(bmbABI, bmbContractAddress);
let dailyBMBMiningContract = new web3.eth.Contract(dailyBMBMiningABI, dailyBMBMiningAddress);



//总奖池
  dailyBMBMiningContract.methods.totalReward().call(null, function (error, data) {
    console.log(data);
    $('#totalReward').html(web3.utils.fromWei(data, "ether"))
  });

  //剩余奖励
  bmbContract.methods.balanceOf(dailyBMBMiningAddress).call(null, function (error, data) {
    console.log(data);
    $('#balanceOf').html(web3.utils.fromWei(data, "ether"))
  });

  //总质押
  dailyBMBMiningContract.methods.totalStaked().call(null, function (error, data) {
    console.log(data);
    $('#totalStaked').html(web3.utils.fromWei(data, "ether"))
  });
  
  //当前天数
  dailyBMBMiningContract.methods.getCurrentDay().call(null, function (error, data) {
    console.log(data);
    $('#getCurrentDay').html(data)
  });

  //沉淀池数据
  dailyBMBMiningContract.methods.bmbDeposit().call(null, function (error, data) {
    console.log(data);
    $('#bmbDeposit').html(web3.utils.fromWei(data, "ether"))
  });

  //拉新总数
  dailyBMBMiningContract.methods.newcomerTotal().call(null, function (error, data) {
    console.log(data);
    $('#newcomerTotal').html(data)
  });
  
//最大算力
  dailyBMBMiningContract.methods.power().call(null, function (error, data) {
    console.log(data);
    $('#power').html(web3.utils.fromWei(data, "ether"))
  });

  //待领取数据
$('#getPendingReward').on('click', async function() {
  console.log(">>>>accounts", accounts)
  dailyBMBMiningContract.methods.pendingReward(accounts).call(null, function (error, data) {
    $('#pendingReward').html(web3.utils.fromWei(data, "ether"))
  });

})

//个人数据
$('#getData').on('click', async function() {
  dailyBMBMiningContract.methods.userInfo(accounts).call(null, function (error, data) {
    $('#getDataInfo').html("质押的LP数量, 未领取收益的起时天数(质押时间), 已领取, 推荐人, 是否设置推荐人, 是否达到门槛 >>>>" + web3.utils.fromWei(data.amount, "ether") + "," +  data.lastClaimDay + ","  + web3.utils.fromWei(data.rewardDebt, "ether") + ","  + data.referrer + ","  + data.hasReferred + ","  + data.hasThreshold)
  });

})

//个人邀请新用户数
$('#getUserNewcomer').on('click', async function() {
  dailyBMBMiningContract.methods.userNewcomer(accounts).call(null, function (error, data) {
    $('#userNewcomerInfo').html(data)
  });
})



/**
 * 绑定
*/
$('#setReferrer').on('click', async function() {
  var referrerAddress = $("#referrerAddress").val();
  dailyBMBMiningContract.methods.setReferrer(referrerAddress).send({from: accounts}, function (error, transactionHash) {
    console.log("setReferrer>>>>>", error, transactionHash);
  });
})


//质押
$('#pledge').on('click', async function() {
  var pledgeAmount = $("#pledgeAmount").val();
  var inLp = web3.utils.toWei(pledgeAmount, "ether");
  lpContract.methods.approve(dailyBMBMiningAddress, inLp).send({ from: accounts }).then((approveHash) => {
    dailyBMBMiningContract.methods.pledge(inLp).send({from: accounts}, function (error, transactionHash) {
      console.log("pledge>>>>>", error, transactionHash);
    });
  });

})

//取回lp
$('#withdraw').on('click', function() {
    console.log('>>>','withdraw');
    var withdrawAmount = $("#withdrawAmount").val();
    dailyBMBMiningContract.methods.withdraw(web3.utils.toWei(withdrawAmount, "ether")).send({from: accounts}, function (error, transactionHash) {
      console.log("withdraw>>>>>", error, transactionHash);
    });
})

//领取收益
$('#claim').on('click', function() {
  console.log('>>>','claim');
  dailyBMBMiningContract.methods.claim().send({from: accounts}, function (error, transactionHash) {
    console.log("claim>>>>>", error, transactionHash);
  });
})


//触发拉新奖励分发
$('#distributeNewcomerReferrer').on('click', function() {
  console.log('>>>','distributeNewcomerReferrer');
  dailyBMBMiningContract.methods.distributeNewcomerReferrer().send({from: accounts}, function (error, transactionHash) {
    console.log("distributeNewcomerReferrer>>>>>", error, transactionHash);
  });

})

//设置初始地址
$('#setStartAddress').on('click', function() {
  console.log('>>>','setStartAddress');
  var startAddress = $("#startAddress").val();
  dailyBMBMiningContract.methods.setStartAddress(startAddress).send({from: accounts}, function (error, transactionHash) {
    console.log("setStartAddress>>>>>", error, transactionHash);
  });
})

//配置开始
$('#startMining').on('click', async function() {
  console.log('>>>','startMining');
  var startTime = $("#startTime").val();
  let totalReward = await dailyBMBMiningContract.methods.totalReward().call();
  // await Token.connect(user1).approve(DailyBMBMiningAddress, ethers.utils.parseEther("100000"));
  bmbContract.methods.approve(dailyBMBMiningAddress, totalReward).send({ from: accounts }).then((approveHash) => {
    dailyBMBMiningContract.methods.startMining(startTime).send({from: accounts}, function (error, transactionHash) {
      console.log("startMining>>>>>", error, transactionHash);
    });
  })
})

//提取剩余bmb
$('#withdrawRemaining').on('click', function() {
  console.log('>>>','withdrawRemaining');
  dailyBMBMiningContract.methods.withdrawRemaining().send({from: accounts}, function (error, transactionHash) {
    console.log("withdrawRemaining>>>>>", error, transactionHash);
  });
})


//提取剩余lp
$('#withdrawRemainingLp').on('click', function() {
  console.log('>>>','withdrawRemainingLp');
  dailyBMBMiningContract.methods.withdrawRemainingLp().send({from: accounts}, function (error, transactionHash) {
    console.log("withdrawRemainingLp>>>>>", error, transactionHash);
  });
})

//设置领取收益手续费
$('#setClaimBmbFee').on('click', function() {
  console.log('>>>','setClaimBmbFee');
  var claimBmbFee = $("#claimBmbFee").val();
  dailyBMBMiningContract.methods.setClaimBmbFee(claimBmbFee).send({from: accounts}, function (error, transactionHash) {
    console.log("setClaimBmbFee>>>>>", error, transactionHash);
  });
})

//设置取回Lp手续费
$('#setWithdrawLpFee').on('click', function() {
  console.log('>>>','setWithdrawLpFee');
  var withdrawLpFee = $("#withdrawLpFee").val();
  dailyBMBMiningContract.methods.setWithdrawLpFee(withdrawLpFee).send({from: accounts}, function (error, transactionHash) {
    console.log("setWithdrawLpFee>>>>>", error, transactionHash);
  });
})

//设置最大算力
$('#setPower').on('click', function() {
  console.log('>>>','setPower');
  var power = $("#power").val();
  dailyBMBMiningContract.methods.setPower(web3.utils.toWei(power, "ether")).send({from: accounts}, function (error, transactionHash) {
    console.log("setPower>>>>>", error, transactionHash);
  });
})

//设置最大奖励
$('#setTotalReward').on('click', function() {
  console.log('>>>','setTotalReward');
  var totalReward = $("#totalReward").val();
  dailyBMBMiningContract.methods.setTotalReward(web3.utils.toWei(totalReward, "ether")).send({from: accounts}, function (error, transactionHash) {
    console.log("setTotalReward>>>>>", error, transactionHash);
  });
})

//设置最大产出天数
$('#setTotalClaimDay').on('click', function() {
  console.log('>>>','setTotalClaimDay');
  var totalClaimDay = $("#totalClaimDay").val();
  dailyBMBMiningContract.methods.setTotalClaimDay(totalClaimDay).send({from: accounts}, function (error, transactionHash) {
    console.log("setTotalClaimDay>>>>>", error, transactionHash);
  });
})

//设置推荐人手续费
$('#setRewardPercent').on('click', function() {
  console.log('>>>','setRewardPercent');
  var rewardPercent = $("#rewardPercent").val();
  dailyBMBMiningContract.methods.setRewardPercent(rewardPercent).send({from: accounts}, function (error, transactionHash) {
    console.log("setRewardPercent>>>>>", error, transactionHash);
  });
})

//设置间接推荐人手续费
$('#setReferrerRewardPercent').on('click', function() {
  console.log('>>>','setReferrerRewardPercent');
  var referrerRewardPercent = $("#setReferrerRewardPercent").val();
  dailyBMBMiningContract.methods.setReferrerRewardPercent(referrerRewardPercent).send({from: accounts}, function (error, transactionHash) {
    console.log("setReferrerRewardPercent>>>>>", error, transactionHash);
  });
})

//设置门槛
$('#setThreshold').on('click', function() {
  console.log('>>>','setThreshold');
  var threshold = $("#threshold").val();
  dailyBMBMiningContract.methods.setThreshold(web3.utils.toWei(threshold, "ether")).send({from: accounts}, function (error, transactionHash) {
    console.log("setThreshold>>>>>", error, transactionHash);
  });
})



const initialize = () => {

    ethereum.on('accountsChanged', handleAccountsChanged);
    ethereum.on('chainChanged', handleAccountsChanged);

    async function handleAccountsChanged() {
        window.location.reload();
    }
}
window.addEventListener('DOMContentLoaded', initialize)