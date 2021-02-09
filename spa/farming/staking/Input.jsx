
var Input = React.createClass({
    setVal(val) {
        this.setState({val});
    },
    onRealChange(value) {
        this.setVal(value);
        console.log(parseFloat(value) > parseFloat(balance))
        onChange(this.onDetectedChange(value));
    },
    onDetectedChange(value, sendBalance) {
        if (sendBalance) return { target: { value: balance } };
        if (!value) return { target: { value: 0 } };
        return { target: { value } };
    },
    render() {
        var props = this.props;
        const { label, min, max, value, onChange, showBalance, balance, showMax, showCoin, address, name, step, extra } = props;
        var val = (this.state && this.state.val) || "";
        var _this = this;
        return (
            <React.Fragment>
                { label && <h6><b>{label}</b></h6>}
                <div className="input-group" tabIndex={0}>
                    {
                        showMax && <div className="input-group-prepend">
                            <button className="btn btn-secondary" onClick={() => onChange(_this.onDetectedChange(0, balance))} type="button">MAX</button>
                        </div>
                    }
                    <input type="number" lang="en-US" step="any" className={`form-control input-form-field ${parseFloat(val) > parseFloat(balance) ? 'is-invalid' : ''}`} value={val} min={min} max={max || balance} onChange={(e) => _this.onRealChange(e.target.value)} />
                    {
                        showCoin && <div className={`input-group-append no-border-right`}>
                            <span className={`input-group-text ${parseFloat(val) > parseFloat(balance) ? 'is-invalid' : ''}`} id=""><Coin address={address} /> {name}</span>
                        </div>
                    }
                </div>
                { showBalance && <small className="form-text text-muted">Balance: {balance} {name} {extra ? extra : ''}</small>}
            </React.Fragment>
        )
    }
});