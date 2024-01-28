import RaydiumSwap from "./RaydiumSwap"

const swap = async () => {
    const executeSwap = false; // Change to true to execute swap
    const tokenAAmount = 0.01; // e.g. 0.01 SOL -> B_TOKEN

    const tokenAAddress = 'So11111111111111111111111111111111111111112';    // e.g. SOLANA mint address
    const tokenBAddress = 'HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3';   // e.g. PYTH mint address

    const raydiumSwap = new RaydiumSwap(process.env.RPC_URL, process.env.WALLET_PRIVATE_KEY);
    console.log(`Raydium swap initialized`);

    // Loading with pool keys from https://api.raydium.io/v2/sdk/liquidity/mainnet.json
    await raydiumSwap.loadPoolKeys();
    console.log(`Loaded pool keys`);


    // Trying to find pool info in the json we loaded earlier and by comparing baseMint and tokenBAddress
    const poolInfo = raydiumSwap.findPoolInfoForTokens(tokenAAddress, tokenBAddress);
    console.log('Found pool info')

    const tx = await raydiumSwap.getSwapTransaction(
        tokenAAddress,
        tokenBAddress,
        tokenAAmount,
        poolInfo,
        100000 // Max amount of lamports
    )

    if (executeSwap) {
        const txid = await raydiumSwap.sendTransaction(tx);
        console.log(`https://solscan.io/tx/${txid}`);
    } else {
        const simRes = await raydiumSwap.simulateTransaction(tx);
        console.log(simRes)
    }
}

swap();