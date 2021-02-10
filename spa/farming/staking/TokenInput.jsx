var TokenInput = React.createClass({
    setTokenAddress(tokenAddress) {
        this.setState({tokenAddress})
    },
    render() {
        var props = this.props;
        const { onClick, placeholder, text, width, label } = props;
        var tokenAddress = (this.state && this.state.tokenAddress) || "";
        return <div className={`row mb-3 w-${width || 100}`}>
            { label && <div className="col-12"><h6><b>{label}</b></h6></div> }
            <div className="col-12 flex">
                <input type="text" className="form-control mr-4" value={tokenAddress} onChange={(e) => this.setTokenAddress(e.target.value)} placeholder={placeholder} aria-label={placeholder}/>
                <button className="btn btn-secondary" onClick={() => onClick(tokenAddress) } type="button">{text}</button>
            </div>
        </div>
    }
});