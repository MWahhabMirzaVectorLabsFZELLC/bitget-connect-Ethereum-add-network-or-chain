const address = document.getElementById("address");
const address1 = document.getElementById("address1");
const chainID = document.getElementById("chainID");

function checkWalletInstallation() {
    const provider = window.bitkeep && window.bitkeep.ethereum;

    if (!provider) {
        alert('Wallet is not installed. Please install the BitKeep wallet.');
        window.open('https://web3.bitget.com/en/wallet-download?type=2');
    } else {
        console.log('BitKeep wallet is installed.');
    }
}

function requestAccounts() {
    const provider = window.bitkeep && window.bitkeep.ethereum;

    if (provider) {
        provider.request({
            method: "eth_requestAccounts"
        }).then((accounts) => {
            // success
            const account = accounts[0];
            address.textContent = `Address: ${('Account:', account)}` ;
            alert('Wallet successfully connected with account: ' + account);
        }).catch((error) => {
            // fail
            console.error('Error requesting accounts:', error);
        });
    } else {
        alert('Wallet is not installed. Please install the BitKeep wallet.');
        window.open('https://web3.bitget.com/en/wallet-download?type=2');
    }
}

document.getElementById('checkWalletButton').addEventListener('click', () => {
    checkWalletInstallation();
    requestAccounts();
});

// Function to handle account and chain ID changes
function handleAccountsChainChanged(accounts, chainId) {
    console.log('Accounts:', accounts);
    console.log('Chain ID:', chainId);

    // Display account address
    address1.textContent = `Address: ${accounts[0]}`;

    // Display chain ID
    chainID.textContent = `Chain ID: ${chainId}`;
}

// Function to connect to Bitkeep Wallet
async function connect() {
    try {
        const accounts = await window.bitkeep.ethereum.request({ method: 'eth_requestAccounts' });
        handleAccountsChainChanged(accounts, await window.bitkeep.ethereum.request({ method: 'eth_chainId' }));
        alert('Connected to Ethereum successfully.');
    } catch (error) {
        if (error.code === 4001) {
            console.log('Please connect to Bitkeep.'); // User rejected connection
        } else {
            console.error('Error connecting to Ethereum:', error); // Other errors
        }
    }
}

// Get the elements
const link1 = document.getElementById('link1');
const link2 = document.getElementById('link2');
const link3 = document.getElementById('link3');
const link4 = document.getElementById('link4');
const link5 = document.getElementById('link5');
const link6 = document.getElementById('link6');
const link7 = document.getElementById('link7');
const link8 = document.getElementById('link8');

// Define the function to add Ethereum chain with dynamic chainId
async function addEthereumChain(chainId) {
    try {
        const currentChainId = await ethereum.request({ method: 'eth_chainId' });
        
        if (currentChainId === chainId) {
            alert('You are already on this chain.');
            return;
        }
        
        await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
                {
                    chainId: chainId,
                    chainName: 'BNB', // Keep this constant or change as needed
                    nativeCurrency: {
                        name: 'BNB',    // Keep this constant
                        symbol: 'BNB',  // Keep this constant
                        decimals: 18,   // Keep this constant
                    },
                    // Uncomment and set these URLs if needed
                    // rpcUrls: ['https://mycustomchain.rpc'],
                    // blockExplorerUrls: ['https://mycustomchain.explorer'],
                },
            ],
        });
        
        console.log('Chain added successfully.');

        // Update chain ID in the interface
        chainID.textContent = `Chain ID: ${chainId}`;
    } catch (error) {
        console.error('Error adding chain:', error);
    }
}

// Add click event listeners to the links
link1.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    addEthereumChain('0x38'); // BNB
});

link2.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    addEthereumChain('0x3d'); // ETH
});

link3.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    addEthereumChain('0x6a'); // Velas
});

link4.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    addEthereumChain('0x89'); // Polygon
});

link5.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    addEthereumChain('0x335fa'); // PlatON
});

link6.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    addEthereumChain('0x39'); // Syscoin
});

link7.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    addEthereumChain('0x19'); // Cronos
});

link8.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    addEthereumChain('0x42'); // OKX Chain
});



// Example usage
document.getElementById('addChainButton').addEventListener('click', addEthereumChain);

