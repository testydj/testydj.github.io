
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

    // 2. 获取分配模式
    const distributionMode = $("#distributionMode").val();
    console.log('分配模式:', distributionMode);

    // 3. 获取持币地址列表
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
        const address = parts[0].trim();
        
        // 验证地址格式
        if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
            console.warn('无效地址格式:', address);
            continue;
        }

        let amount = 0;
        if (parts.length === 2) {
            // 有冒号，尝试解析数量
            const parsedAmount = parseFloat(parts[1].trim());
            if (!isNaN(parsedAmount) && parsedAmount > 0) {
                amount = parsedAmount;
            } else {
                // 数量无效，默认为1（方便平分模式计算占比）
                amount = 1;
                console.warn('地址数量无效，使用默认值1:', address);
            }
        } else {
            // 没有冒号，只有地址，默认为1（平分模式使用）
            amount = 1;
            console.log('地址没有持币数量，使用默认值1:', address);
        }

        holderMap[address] = amount;
        totalHoldings += amount;
    }

    if (Object.keys(holderMap).length === 0) {
        alert('未找到有效的地址！请确保地址格式正确（0x开头的40位十六进制地址）。');
        return;
    }

    if (totalHoldings <= 0) {
        alert('总持币量必须大于0！');
        return;
    }

    // 4. 获取排除地址列表
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

    // 5. 收集排除地址信息
    let excludedHoldings = 0;
    const excludedAddresses = [];
    const nonExcludedAddresses = [];
    
    for (const [address, holdings] of Object.entries(holderMap)) {
        if (excludeSet.has(address)) {
            excludedHoldings += holdings;
            excludedAddresses.push({
                address: address,
                holdings: holdings
            });
        } else {
            nonExcludedAddresses.push({
                address: address,
                holdings: holdings
            });
        }
    }

    // 6. 检查是否有非排除地址
    if (nonExcludedAddresses.length === 0) {
        alert('没有非排除地址可以参与分配！');
        return;
    }

    // 7. 根据模式计算
    let results = [];
    let distributedTotal = 0;

    if (distributionMode === 'equal') {
        // 模式2：排除地址不参与分配，剩余地址平分
        
        // 计算每个非排除地址平分的金额
        const equalShare = Math.round((totalAmount / nonExcludedAddresses.length) * 10000) / 10000;

        console.log(`平分模式: ${nonExcludedAddresses.length} 个地址平分 ${totalAmount}, 每个 ${equalShare}`);

        // 非排除地址平分
        for (const item of nonExcludedAddresses) {
            const ratio = totalHoldings > 0 ? (item.holdings / totalHoldings * 100).toFixed(2) + '%' : 'N/A';
            results.push({
                address: item.address,
                holdings: item.holdings,
                ratio: ratio,
                amount: equalShare,
                isExcluded: false,
                note: '平分'
            });
            distributedTotal += equalShare;
        }

        // 排除地址（不参与分配）
        for (const item of excludedAddresses) {
            const ratio = totalHoldings > 0 ? (item.holdings / totalHoldings * 100).toFixed(2) + '%' : 'N/A';
            results.push({
                address: item.address,
                holdings: item.holdings,
                ratio: ratio,
                amount: 0,
                isExcluded: true,
                note: '不参与分配'
            });
        }

        // 显示结果
        let resultText = '===== 发放计算结果 =====\n\n';
        resultText += `分配模式: 排除地址不参与分配（剩余地址平分）\n`;
        resultText += `总发放数量: ${totalAmount}\n`;
        resultText += `总地址数: ${Object.keys(holderMap).length}\n`;
        resultText += `排除地址数: ${excludedAddresses.length}\n`;
        resultText += `参与分配地址数: ${nonExcludedAddresses.length}\n`;
        resultText += `每个地址平分: ${equalShare.toFixed(4)}\n`;
        resultText += `实际发放总量: ${distributedTotal.toFixed(4)}\n`;
        resultText += `（四舍五入误差: ${(totalAmount - distributedTotal).toFixed(4)}）\n\n`;
        
        resultText += '--- 发放明细 ---\n';
        resultText += '地址\t发放数量\t备注\n';
        resultText += '-'.repeat(80) + '\n';

        // 排序：非排除地址排在前面
        results.sort((a, b) => {
            if (a.isExcluded && !b.isExcluded) return 1;
            if (!a.isExcluded && b.isExcluded) return -1;
            return a.amount - b.amount;
        });

        for (const r of results) {
            const amountStr = r.isExcluded ? '0' : r.amount.toFixed(4);
            resultText += `${r.address}\t${amountStr}\t${r.note}\n`;
        }

        // 显示结果
        $("#distributionResult").val(resultText);

        // 控制台输出
        console.log('计算结果:', {
            distributionMode: 'equal',
            totalAmount,
            totalAddresses: Object.keys(holderMap).length,
            excludedCount: excludedAddresses.length,
            participatingCount: nonExcludedAddresses.length,
            equalShare,
            distributedTotal: distributedTotal.toFixed(4),
            results: results
        });

        // 弹窗提示
        alert(`计算完成！\n\n` +
              `分配模式: 排除地址不参与分配（剩余地址平分）\n` +
              `排除地址: ${excludedAddresses.length}个\n` +
              `参与地址: ${nonExcludedAddresses.length}个\n` +
              `每个地址平分: ${equalShare.toFixed(4)}\n` +
              `实际发放总量: ${distributedTotal.toFixed(4)}\n` +
              `请查看下方结果区域详情。`);

    } else {
        // 模式1：排除地址不参与分配（按权重分配）
        // 注意：权重模式需要持币数量，如果用户只填地址没填数量，会有警告
        const effectiveTotalHoldings = totalHoldings - excludedHoldings;

        if (effectiveTotalHoldings <= 0) {
            alert('排除所有地址后，没有有效的持币地址可以参与分配！');
            return;
        }

        // 检查是否有地址的持币量为默认值1（可能用户忘了填数量）
        let hasDefaultAmount = false;
        for (const [address, holdings] of Object.entries(holderMap)) {
            if (!excludeSet.has(address) && holdings === 1) {
                // 检查用户原始输入是否真的没有冒号
                const foundLine = holderLines.find(line => line.trim().startsWith(address));
                if (foundLine && !foundLine.includes(':')) {
                    hasDefaultAmount = true;
                }
            }
        }

        if (hasDefaultAmount) {
            alert('注意：有地址没有填写持币数量，使用默认值1进行权重计算。\n建议在权重模式下填写正确的持币数量。');
        }

        for (const [address, holdings] of Object.entries(holderMap)) {
            if (excludeSet.has(address)) {
                continue;
            }

            const ratio = holdings / effectiveTotalHoldings;
            const distributeAmount = ratio * totalAmount;
            const roundedAmount = Math.round(distributeAmount * 10000) / 10000;

            results.push({
                address: address,
                holdings: holdings,
                ratio: (ratio * 100).toFixed(2) + '%',
                amount: roundedAmount,
                isExcluded: false,
                note: '按权重分配'
            });

            distributedTotal += roundedAmount;
        }

        // 添加排除地址（不参与分配）
        for (const item of excludedAddresses) {
            const ratio = totalHoldings > 0 ? (item.holdings / totalHoldings * 100).toFixed(2) + '%' : 'N/A';
            results.push({
                address: item.address,
                holdings: item.holdings,
                ratio: ratio,
                amount: 0,
                isExcluded: true,
                note: '不参与分配'
            });
        }

        // 显示结果
        let resultText = '===== 发放计算结果 =====\n\n';
        resultText += `分配模式: 排除地址不参与分配（按权重分配）\n`;
        resultText += `总发放数量: ${totalAmount}\n`;
        resultText += `总持币量: ${totalHoldings}\n`;
        resultText += `排除地址数: ${excludedAddresses.length}\n`;
        resultText += `排除地址持币量: ${excludedHoldings}\n`;
        resultText += `有效总持币量: ${effectiveTotalHoldings}\n`;
        resultText += `实际参与地址数: ${results.filter(r => !r.isExcluded).length}\n`;
        resultText += `实际发放总量: ${distributedTotal.toFixed(4)}\n`;
        resultText += `（四舍五入误差: ${(totalAmount - distributedTotal).toFixed(4)}）\n\n`;
        
        resultText += '--- 发放明细 ---\n';
        resultText += '地址\t发放数量\t持币占比\t持币量\t备注\n';
        resultText += '-'.repeat(80) + '\n';

        // 排序：非排除地址按发放数量从高到低
        results.sort((a, b) => {
            if (a.isExcluded && !b.isExcluded) return 1;
            if (!a.isExcluded && b.isExcluded) return -1;
            return b.amount - a.amount;
        });

        for (const r of results) {
            const amountStr = r.isExcluded ? '0' : r.amount.toFixed(4);
            resultText += `${r.address}\t${amountStr}\t${r.ratio}\t${r.holdings}\t${r.note}\n`;
        }

        $("#distributionResult").val(resultText);

        console.log('计算结果:', {
            distributionMode: 'weighted',
            totalAmount,
            totalHoldings,
            excludedHoldings,
            effectiveTotalHoldings,
            participatingAddresses: results.filter(r => !r.isExcluded).length,
            excludedAddresses: excludedAddresses.length,
            distributedTotal: distributedTotal.toFixed(4),
            results: results
        });

        alert(`计算完成！\n\n` +
              `分配模式: 排除地址不参与分配（按权重分配）\n` +
              `参与地址: ${results.filter(r => !r.isExcluded).length}个\n` +
              `排除地址: ${excludedAddresses.length}个\n` +
              `实际发放总量: ${distributedTotal.toFixed(4)}\n` +
              `请查看下方结果区域详情。`);
    }
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