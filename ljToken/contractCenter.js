
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



var centerAddress = "0xc28006cDf47684949d18877b8237278F84640420";
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

$('#getUserReferralCount').on('click', function() {
  console.log('>>>','getUserReferralCount');
  var agentAddress = $("#agentAddress").val();
  centerContract.methods.getUserReferralCount(agentAddress).call(null, function (error, data) {
    console.log(centerContract);
    $('#userReferralCount').html(data)
  });
})

$('#getReferrals').on('click', function() {
  console.log('>>>','getReferrals');
  var agentReferralAddress = $("#agentReferralAddress").val();
  centerContract.methods.getReferrals(agentReferralAddress).call(null, function (error, data) {
    console.log(data);
    $('#referrals').html(data)
  });
})

$('#getUserInfo').on('click', function() {
  console.log('>>>','getUserInfo');
  var userAddress = $("#userAddress").val();
  centerContract.methods.getUserInfo(userAddress).call(null, function (error, data) {
    console.log(data);
    $('#userInfo').html(data)
  });
})

$('#batchValidate').on('click', function() {
  console.log('>>>','batchValidate');
  var batchAddressArray = $("#batchAddressArray").val();
  
  var jsonStr = batchAddressArray.replace(/(0x[a-fA-F0-9]{40})/g, '"$1"');
  console.log("jsonStr>>>", jsonStr)

  // 解析成数组
  var arr = JSON.parse(jsonStr);

  centerContract.methods.batchValidate(arr).send({from: accounts}, function (error, transactionHash) {
    console.log("batchValidate>>>>>", error, transactionHash);
  });
})

//发放nft卡牌的lf奖励
$('#distributeTokenRewards').on('click', function() {
  console.log('>>>','distributeTokenRewards');
  centerContract.methods.distributeTokenRewards().send({from: accounts}, function (error, transactionHash) {
    console.log("distributeTokenRewards>>>>>", error, transactionHash);
  });
})

//发放nft卡牌的bnb奖励
$('#forceDistributeNftRewards').on('click', function() {
  console.log('>>>','forceDistributeNftRewards');
  centerContract.methods.forceDistributeNftRewards().send({from: accounts}, function (error, transactionHash) {
    console.log("forceDistributeNftRewards>>>>>", error, transactionHash);
  });
})

//设置nft卡牌奖励额(每张)
$('#setCardRewardAmount').on('click', function() {
  console.log('>>>','setCardRewardAmount');
  var cardRewardAmount = $("#cardRewardAmount").val();
  centerContract.methods.setCardRewardAmount(web3.utils.toWei(cardRewardAmount, "ether")).send({from: accounts}, function (error, transactionHash) {
    console.log("setCardRewardAmount>>>>>", error, transactionHash);
  });
})

//设置nft卡牌发放奖励额
$('#setTriggerAmount').on('click', function() {
  console.log('>>>','setTriggerAmount');
  var triggerAmount = $("#triggerAmount").val();
  centerContract.methods.setCardRewardAmount(web3.utils.toWei(triggerAmount, "ether")).send({from: accounts}, function (error, transactionHash) {
    console.log("setTriggerAmount>>>>>", error, transactionHash);
  });
})

//设置nft卡牌奖励发放地址数
$('#setMaxTokenDistributions').on('click', function() {
  console.log('>>>','setMaxTokenDistributions');
  var maxTokenDistributions = $("#maxTokenDistributions").val();
  centerContract.methods.setMaxTokenDistributions(maxTokenDistributions).send({from: accounts}, function (error, transactionHash) {
    console.log("setMaxTokenDistributions>>>>>", error, transactionHash);
  });
})

//设置nft卡牌奖励发放数
$('#setLjRewardPerHolder').on('click', function() {
  console.log('>>>','setLjRewardPerHolder');
  var ljRewardPerHolder = $("#ljRewardPerHolder").val();
  centerContract.methods.setLjRewardPerHolder(web3.utils.toWei(ljRewardPerHolder, "ether")).send({from: accounts}, function (error, transactionHash) {
    console.log("setLjRewardPerHolder>>>>>", error, transactionHash);
  });
})


  //设置卡牌地址
$('#setNftCard').on('click', async function() {
    console.log(">>>>>setNftCard");
  var nftCard = $("#nftCard").val();
  console.log(">>>>>nftCard", nftCard);
  centerContract.methods.setNftCard(nftCard).send({from: accounts}, function (error, transactionHash) {
    console.log("setNftCard>>>>>", error, transactionHash);
  });
})

// 根据持币量计算发放数量
$('#calculateDistribution').on('click', function() {
    console.log('>>>', 'calculateDistribution');
    
    // 1. 获取总发放数量
    const totalAmount = parseFloat($("#totalDistributeAmount").val().trim());
    if (isNaN(totalAmount) || totalAmount <= 0) {
        alert('请输入有效的总发放数量！');
        return;
    }

    // 2. 获取持币地址列表
    const holderText = $("#holderInput").val().trim();
    if (!holderText) {
        alert('请输入地址和持币数量！');
        return;
    }

    // 解析地址和持币数量
    const holderLines = holderText.split('\n').filter(line => line.trim() !== '');
    const holderMap = {};
    let totalHoldings = 0;

    for (const line of holderLines) {
        const parts = line.split(':');
        if (parts.length === 2) {
            const address = parts[0].trim();
            const amount = parseFloat(parts[1].trim());
            if (address && !isNaN(amount) && amount > 0) {
                // 验证地址格式
                if (/^0x[a-fA-F0-9]{40}$/.test(address)) {
                    holderMap[address] = amount;
                    totalHoldings += amount;
                } else {
                    console.warn('无效地址格式:', address);
                }
            }
        }
    }

    if (Object.keys(holderMap).length === 0) {
        alert('未找到有效的地址和持币数据！请确保格式为：地址:数量');
        return;
    }

    if (totalHoldings <= 0) {
        alert('总持币量必须大于0！');
        return;
    }

    // 3. 获取排除地址列表
    const excludeText = $("#excludeAddresses").val().trim();
    const excludeSet = new Set();
    if (excludeText) {
        // 支持逗号和换行分隔
        const excludeList = excludeText.split(/[,，\n]/).map(s => s.trim()).filter(s => s !== '');
        for (const addr of excludeList) {
            if (/^0x[a-fA-F0-9]{40}$/.test(addr)) {
                excludeSet.add(addr);
            }
        }
    }

    // 4. 【修改】先计算排除地址的持币总量，然后从总持币量中扣除
    let excludedHoldings = 0;
    const excludedAddresses = [];
    
    // 先遍历一遍，计算排除地址的总持币量
    for (const [address, holdings] of Object.entries(holderMap)) {
        if (excludeSet.has(address)) {
            excludedHoldings += holdings;
            excludedAddresses.push({
                address: address,
                holdings: holdings
            });
        }
    }

    // 实际参与分配的总持币量 = 总持币量 - 排除地址的持币量
    const effectiveTotalHoldings = totalHoldings - excludedHoldings;

    if (effectiveTotalHoldings <= 0) {
        alert('排除所有地址后，没有有效的持币地址可以参与分配！');
        return;
    }

    // 5. 计算每个地址的发放数量（基于有效总持币量）
    const results = [];
    let distributedTotal = 0;

    for (const [address, holdings] of Object.entries(holderMap)) {
        // 检查是否在排除列表中
        if (excludeSet.has(address)) {
            continue; // 跳过排除地址，不参与分配
        }

        // 【修改】计算分配数量： (持币量 / 有效总持币量) * 总发放数量
        const ratio = holdings / effectiveTotalHoldings;
        const distributeAmount = ratio * totalAmount;
        const roundedAmount = Math.round(distributeAmount * 10000) / 10000; // 保留4位小数

        results.push({
            address: address,
            holdings: holdings,
            ratio: (ratio * 100).toFixed(2) + '%',
            amount: roundedAmount
        });

        distributedTotal += roundedAmount;
    }

    // 6. 显示结果
    let resultText = '===== 发放计算结果 =====\n\n';
    resultText += `总发放数量: ${totalAmount}\n`;
    resultText += `总持币量: ${totalHoldings}\n`;
    resultText += `排除地址持币量: ${excludedHoldings}\n`;
    resultText += `有效总持币量: ${effectiveTotalHoldings}\n`;
    resultText += `实际参与地址数: ${results.length}\n`;
    resultText += `排除地址数: ${excludedAddresses.length}\n`;
    resultText += `实际发放总量: ${distributedTotal.toFixed(4)}\n`;
    resultText += `（四舍五入误差: ${(totalAmount - distributedTotal).toFixed(4)}）\n\n`;
    
    resultText += '--- 发放明细 ---\n';
    resultText += '地址\t发放数量\t占比\t持币量\n';
    resultText += '-'.repeat(60) + '\n';

    // 按发放数量从高到低排序
    results.sort((a, b) => b.amount - a.amount);

    for (const r of results) {
        resultText += `${r.address}\t${r.amount.toFixed(4)}\t${r.ratio}\t${r.holdings}\n`;
    }

    if (excludedAddresses.length > 0) {
        resultText += '\n--- 排除地址 (不参与分配) ---\n';
        resultText += '地址\t持币量\n';
        resultText += '-'.repeat(60) + '\n';
        for (const item of excludedAddresses) {
            resultText += `${item.address}\t${item.holdings}\n`;
        }
    }

    // 显示结果
    $("#distributionResult").val(resultText);

    // 同时输出到控制台
    console.log('计算结果:', {
        totalAmount,
        totalHoldings,
        excludedHoldings,
        effectiveTotalHoldings,
        participatingAddresses: results.length,
        excludedAddresses: excludedAddresses.length,
        distributedTotal: distributedTotal.toFixed(4),
        results: results,
        excludedDetails: excludedAddresses
    });

    // 6. 显示汇总信息弹窗
    alert(`计算完成！\n\n参与地址: ${results.length}个\n排除地址: ${excludedAddresses.length}个\n排除地址持币量: ${excludedHoldings}\n有效总持币量: ${effectiveTotalHoldings}\n实际发放总量: ${distributedTotal.toFixed(4)}\n请查看下方结果区域详情。`);
});

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