
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



var lafDaoAddress = "0x7C79Bb4F8A4173Ce62AbbC285FaB96358CC02Eb5";
var raisingAddress = "0x6E04478eA898c24215Ad5Bc6a0F5DB99C5a2deb5";
var BURN_ADDRESS = '0x0000000000000000000000000000000000000000';
var USDT_ADDRESS = "0x48afC9801eB27281C3a9d35f34cF15E8533bb87e";

let usdtContract = new web3.eth.Contract(erc20ABI, USDT_ADDRESS);
let lafDaoContract = new web3.eth.Contract(erc20ABI, lafDaoAddress);
let raisingContract = new web3.eth.Contract(raisingABI, raisingAddress);
let participatingAmount = [100,200,300];

  
///-------
  //最大募集
const loadContractData = () => {

  raisingContract.methods.totalSupplyMax().call(null, function (error, data) {
    console.log(data);
    $('#totalSupplyMax').html(web3.utils.fromWei(data, "ether"))
  });

  //已募集额度
  raisingContract.methods.totalSupply().call(null, function (error, data) {
    console.log(data);
    $('#totalSupply').html(web3.utils.fromWei(data, "ether"))
  });
  

  //私募额
  raisingContract.methods.participatingAccountAmount(accounts).call(null, function (error, data) {
    console.log(data);
    $('#participatingAccountAmount').html(web3.utils.fromWei(data, "ether"))
  });



  //代币余额
  raisingContract.methods.balanceOf(accounts).call(null, function (error, data) {
    console.log(data);
    $('#balanceOf').html(web3.utils.fromWei(data, "ether"))
  });


  //奖励额
  raisingContract.methods.awardsToken(accounts).call(null, function (error, data) {
    console.log(data);
    $('#awardsToken').html(web3.utils.fromWei(data, "ether"))
  });


  //是否绑定邀请人
  raisingContract.methods.isBindReferral(accounts).call(null, function (error, data) {
    console.log(data);
    $('#isBindReferral').html(data)
  });


  
  //查询邀请人地址
  raisingContract.methods.getReferral(accounts).call(null, function (error, data) {
    console.log(data);
    $('#getReferral').html(data)
  });


  //推荐人数查询
  raisingContract.methods.getReferralCount(accounts).call(null, function (error, data) {
    console.log(data);
    $('#getReferralCount').html(data)
  });


  //推荐列表
  raisingContract.methods.getReferralsList(accounts).call(null, function (error, data) {
    console.log(data);
    $('#getReferralsList').html(data)
  });


  //向上查找邀请人链路
  raisingContract.methods.getReferrals(accounts, 30).call(null, function (error, data) {
    console.log(data);
    $('#getReferrals').html(data)
  });
}

  //绑定邀请人
$('#setReferrer').on('click', async function() {
  var referrerAddress = $("#referrerAddress").val();
  raisingContract.methods.bindReferral(referrerAddress).send({from: accounts}, function (error, transactionHash) {
    console.log("setReferrer>>>>>", error, transactionHash);
  });
})


//参与
$('#participating').on('click', async function() {
  var participatingIndex = $("#participatingIndex").val();
  var usdtAmount = participatingAmount[participatingIndex];
  var inUsdt = web3.utils.toWei(usdtAmount.toLocaleString(), "ether");
  usdtContract.methods.approve(raisingAddress, inUsdt).send({ from: accounts }).then((approveHash) => {
    raisingContract.methods.participating(participatingIndex).send({from: accounts}, function (error, transactionHash) {
      console.log("participating>>>>>", error, transactionHash);
    });
  });

})


//绑定地址直接参与
$('#participatingWithInviter').on('click', function() {
    console.log('>>>','participatingWithInviter');
    var parentAddress = $("#parentAddress").val();
    var participatingWithInviterIndex = $("#participatingWithInviterIndex").val();
    var usdtAmount = participatingAmount[participatingWithInviterIndex];
    var inUsdt = web3.utils.toWei(usdtAmount.toLocaleString(), "ether");
    usdtContract.methods.approve(raisingAddress, inUsdt).send({ from: accounts }).then((approveHash) => {
      raisingContract.methods.participatingWithInviter(participatingWithInviterIndex, parentAddress).send({from: accounts}, function (error, transactionHash) {
        console.log("participatingWithInviter>>>>>", error, transactionHash);
      });
  });
})

//领取代币
$('#divieToken').on('click', function() {
  console.log('>>>','divieToken');
  raisingContract.methods.divieToken().send({from: accounts}, function (error, transactionHash) {
    console.log("divieToken>>>>>", error, transactionHash);
  });
})



//设置代币地址
$('#setToken').on('click', function() {
  console.log('>>>','setToken');
  var tokenAddress = $("#tokenAddress").val();
  raisingContract.methods.setToken(tokenAddress).send({from: accounts}, function (error, transactionHash) {
    console.log("setToken>>>>>", error, transactionHash);
  });
})

//设置白名单比例
$('#setProportion').on('click', function() {
  console.log('>>>','setProportion');
  var proportion = $("#proportion").val();
  raisingContract.methods.setProportion(web3.utils.toWei(proportion, "ether")).send({from: accounts}, function (error, transactionHash) {
    console.log("setToken>>>>>", error, transactionHash);
  });
})



//提取剩余usdt
$('#emergencyWithdrawUsdt').on('click', function() {
  console.log('>>>','emergencyWithdrawUsdt');
  var toAddress = $("#toAddress").val();
  var usetAmount = $("#usetAmount").val();
  raisingContract.methods.emergencyWithdrawUsdt(toAddress,web3.utils.toWei(usetAmount, "ether")).send({from: accounts}, function (error, transactionHash) {
    console.log("emergencyWithdrawUsdt>>>>>", error, transactionHash);
  });
})


//提取剩余代币
$('#emergencyWithdrawToken').on('click', function() {
  console.log('>>>','emergencyWithdrawToken');
  var toTokenAddress = $("#toTokenAddress").val();
  var tokenAmount = $("#tokenAmount").val();
  raisingContract.methods.emergencyWithdrawToken(toTokenAddress, web3.utils.toWei(tokenAmount, "ether")).send({from: accounts}, function (error, transactionHash) {
    console.log("emergencyWithdrawToken>>>>>", error, transactionHash);
  });
})




const initialize = async () => {

    ethereum.on('accountsChanged', handleAccountsChanged);
    ethereum.on('chainChanged', handleChainChanged);

    await getAccounts();
    async function handleAccountsChanged(newAccounts) {
      console.log("账户发生变化:", newAccounts);
      accounts = newAccounts[0] || ""; // 更新当前账户
      window.location.reload(); // 刷新页面
    }

    async function handleChainChanged() {
    window.location.reload(); // 链变化时刷新页面
    }
}

const getAccounts = async () => {
    try {
        // 使用 eth_requestAccounts 方法请求账户访问权限
        const accountList = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
        });
        
        accounts = accountList[0]; // 获取第一个账户地址
        console.log("当前账户:", accounts);
        
        // 这里可以调用其他需要账户地址的函数
        // updateContractData();
        loadContractData();
        
    } catch (error) {
        console.error("获取账户失败:", error);
    }
}

window.addEventListener('DOMContentLoaded', initialize)