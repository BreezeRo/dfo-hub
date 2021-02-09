var Coin = React.createClass({
    render() {
        var props = this.props;
        return <img className={props.className || "mr-2"} src={`https://assets.trustwalletapp.com/blockchains/ethereum/assets/${props.address}/logo.png`} height={props.height || 24} />
    }
});