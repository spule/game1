import Web3 from 'web3';

export default class Web3Provider {
    private web3: Web3 | undefined;
    private account: string | undefined;

    constructor() {
        this.initialize();
    }

    private async initialize() {
        if (window.ethereum) {
            this.web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                this.account = (await this.web3.eth.getAccounts())[0];
                console.log(`Connected account: ${this.account}`);
            } catch (error) {
                console.error('User denied account access');
            }
        } else if (window.web3) {
            this.web3 = new Web3(window.web3.currentProvider);
            this.account = (await this.web3.eth.getAccounts())[0];
            console.log(`Connected account: ${this.account}`);
        } else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    }

    public getAccount(): string | undefined {
        return this.account;
    }

    public getWeb3(): Web3 | undefined {
        return this.web3;
    }
}