
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



var centerAddress = "0x0f164fd661059F75616bdA862281E32a4029af1f";
var BURN_ADDRESS = '0x0000000000000000000000000000000000000000';
var WBNB_ADDRESS = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
let centerContract = new web3.eth.Contract(centerAbi, centerAddress);

  
///-------
  
const loadContractData = () => {
//创世地址
  centerContract.methods.genesisAddress().call(null, function (error, data) {
    console.log(centerContract);
    $('#genesisAddress').html(data)
  });

  //收币地址
  centerContract.methods.receiveAddress().call(null, function (error, data) {
    console.log(data);
    $('#receiveAddress').html(data)
  });
  

  //管理地址
  centerContract.methods.admin().call(null, function (error, data) {
    console.log(data);
    $('#admin').html(data)
  });

}

  //设置收币地址
$('#setReceiveAddress').on('click', async function() {
    console.log(">>>>>setReceiveAddress");
  var receiveAddress = $("#receive").val();
  console.log(">>>>>receiveAddress", receiveAddress);
  centerContract.methods.setReceiveAddress(receiveAddress).send({from: accounts}, function (error, transactionHash) {
    console.log("setReceiveAddress>>>>>", error, transactionHash);
  });
})



//提取剩余
$('#withdrawRemainingRewards').on('click', function() {
  console.log('>>>','withdrawRemainingRewards');
  var toAddress = $("#toAddress").val();
  var wbnbAmount = $("#wbnbAmount").val();
  centerContract.methods.withdrawRemainingRewards(toAddress,web3.utils.toWei(wbnbAmount, "ether")).send({from: accounts}, function (error, transactionHash) {
    console.log("withdrawRemainingRewards>>>>>", error, transactionHash);
  });
})


//提取剩余代币
$('#withdrawToken').on('click', function() {
  console.log('>>>','withdrawToken');
  var toTokenAddress = $("#toTokenAddress").val();
  centerContract.methods.withdrawToken(toTokenAddress).send({from: accounts}, function (error, transactionHash) {
    console.log("withdrawToken>>>>>", error, transactionHash);
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