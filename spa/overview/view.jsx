var Overview = React.createClass({
    requiredModules: [
        'spa/editor',
        'spa/dFOMetadata'
    ],
    requiredScripts: [
        'spa/loaderMini.jsx',
        'spa/okBoomer.jsx',
        'spa/loaderMinimino.jsx'
    ],
    uploadFile(e) {
        e && e.preventDefault && e.preventDefault(true) && e.stopPropagation && e.stopPropagation(true);
        var file = e.currentTarget.files[0];
        var _this = this;
        var reader = new FileReader();
        reader.addEventListener("load", function () {
            _this.indexValue.value = reader.result;
        }, false);
        reader.readAsDataURL(file);
    },
    changeElementInfo(e) {
        if (!e) {
            return;
        }
        e && e.preventDefault && e.preventDefault(true) && e.stopPropagation && e.stopPropagation(true);
        var data = window.getData($($(e.currentTarget).parent()).parent());
        this.controller[this.state.change + 'Change'](data);
    },
    componentDidMount() {
        var _this = this;
        delete _this.props.element.updating;
        window.updateInfo(_this, _this.props.element);
        /*window.blockchainCall(_this.props.element.dFO.methods.read, 'getMinimumBlockNumberForSurvey', '0x').then(blocks => {
            _this.props.element.blocks = window.web3.eth.abi.decodeParameters(['uint256'], blocks)[0];
            _this.forceUpdate();
        });*/
        this.controller.checkStakingAndFixedInflaction();
    },
    renderChangeButton(name) {
        var _this = this;
        if (!_this.props.edit) {
            return;
        }
        return (<a className={"LinkVisualButton LinkVisualButtonB" + (_this.state && _this.state.change === name ? " Editing" : "")} href="javascript:;" onClick={() => _this.setState({ change: _this.state && _this.state.change === name ? null : name })}>Change</a>);
    },
    renderChanger(args) {
        var _this = this;
        if (!_this.props.edit || !_this.state || !_this.state.change) {
            return;
        }
        for (var i in args) {
            var name = args[i];
            if (_this.state.change === name) {
                var method = _this['render' + name.substring(0, 1).toUpperCase() + name.substring(1) + 'Changer'];
                return (<section className="DFOFunctionIndexIcon">
                    {method && method()}
                    <aside>
                        <a href="javascript:;" className="LinkVisualButton LinkVisualButtonB" onClick={_this.changeElementInfo}>Propose</a>
                    </aside>
                </section>);
            }
        }
    },
    renderIndexChanger() {
        return (
            <ul>
                <li>
                    <p className="GIGIMIO">DFOs Front-End is designed to work in two layers, the "Distributed Layer" and the "Decentralized Layer." The Distributed Layer is a version of the Front-End deployed via IPFS or Swarn, for fast and free updates. The Decentralized Layer is a version of the Front-End via On-Chain files, expensive but critical to making a DFO Censorship Resistant. The ENS automatically redirects users to the Distributed Layer and if it's Censored to the Decentralized Layer.</p>
                </li>
                <li>
                    <section>
                        <a href={this.props.element.link ? "javascript:;" : undefined} className={!this.props.element.link ? undefined : "LinkVisualButton" + (this.state && this.state.indexShow === 'link' ? ' Editing' : "")} onClick={() => this.props.element.link && this.setState({ indexShow: this.state && this.state.indexShow === 'link' ? null : 'link' })}>Code</a>
                        <input id="linkCheck" type="checkbox" className="DFOFunctionIndexIconSelector" ref={ref => this.linkCheck = ref} onChange={e => { this.linkValue.value = this.props.element.link || ''; this.linkValue.disabled = !e.currentTarget.checked; this.indexCheck.checked = false; this.indexFile.disabled = true; }} />
                        <label htmlFor="linkCheck">Distributed Layer</label>
                        <input className="DFOFunctionIndexIconText" id="link" type="text" placeholder="Link IPFS Swarm" ref={ref => (this.linkValue = ref) && (ref.value = this.props.element.link || '')} disabled />
                    </section>
                    <section>
                        <a href={this.props.element.index ? 'javascript:;' : undefined} className={!this.props.element.index ? undefined : "LinkVisualButton" + (this.state && this.state.indexShow === 'index' ? ' Editing' : "")} onClick={() => this.props.element.index && this.props.element.index !== '0' && this.setState({ indexShow: this.state && this.state.indexShow === 'index' ? null : 'index' })}>Code</a>
                        <input type="hidden" id="index" ref={ref => (this.indexValue = ref) && (ref.value = this.props.element.index)} />
                        <input id="indexCheck" type="checkbox" className="DFOFunctionIndexIconSelector" ref={ref => this.indexCheck = ref} onChange={e => { this.indexValue.value = this.props.element.index; this.indexFile.value = ''; this.indexFile.disabled = !e.currentTarget.checked; this.linkCheck.checked = false; this.linkValue.disabled = true; }} />
                        <label htmlFor="indexCheck">Decentralized Layer</label>
                        <input className="DFOFunctionIndexIconUpload" id="indexFile" type="file" accept=".html,.htm" ref={ref => this.indexFile = ref} disabled onChange={this.uploadFile} />
                    </section>
                </li>
                {this.state && this.state.indexShow && <section>
                    {this.state.indexShow === 'index' && <Editor lang="html" readonly="true" first={this.state.indexShow === 'index' ? this.props.element.index : undefined} />}
                    {this.state.indexShow === 'link' && <Editor lang="html" readonly="true" link={this.state.indexShow === 'link' ? this.props.element.link : undefined} />}
                </section>}
            </ul>
        );
    },
    renderSurveySingleRewardChanger() {
        return this.renderDefaultChanger("The number of Voting Tokens as a reward to the issuer for every single Successful Proposal.", "Dev Incentives", "surveySingleReward", window.fromDecimals(this.props.element.surveySingleReward, this.props.element.decimals));
    },
    renderProposalLengthChanger() {
        return this.renderDefaultChanger("Every survey has a length expressed in Blocks. Here you can set the duration of Surveys for this DFO.", "Proposal Length", "proposalLength", this.props.element.blocks);
    },
    renderEmergencyLengthChanger() {
        return this.renderDefaultChanger("The length in Blocks for Emergency Surveys.", "Emergency Length", "minimumBlockNumberForEmergencySurvey", this.props.element.minimumBlockNumberForEmergencySurvey);
    },
    renderEmergencyPenaltyChanger() {
        return this.renderDefaultChanger("The Fee that Emergency Proposal Issuer must stake to propose it. This stake will be lost if the Proposal fails.", "Emergency Penalty", "emergencySurveyStaking", window.fromDecimals(this.props.element.emergencySurveyStaking, this.props.element.decimals));
    },
    renderQuorumChanger() {
        return this.renderDefaultChanger("The Quorum is a minimum number of Voting Tokens staked in a survey to reach the success status.", "Quorum", "quorum", window.fromDecimals(this.props.element.quorum, this.props.element.decimals));
    },
    renderProposalStakeChanger() {
        return this.renderDefaultChanger("The minimum of Token Stacked needed to create a new Proposal.", "Proposal Stake", "minimumStaking", window.fromDecimals(this.props.element.minimumStaking, this.props.element.decimals));
    },
    renderVotesHardCapChanger() {
        return this.renderDefaultChanger('If a proposal reaches a fixed number of voting tokens (example the 90% of the total Token supply) for "Approve" or "Disapprove" it, the proposal automatically ends, independently from the duration rule.', "Hard Cap", "votesHardCap", window.fromDecimals(this.props.element.votesHardCap, this.props.element.decimals));
    },
    renderDefaultChanger(text, label, id, defaultValue) {
        return (
            <ul>
                <li>
                    <p ref={ref => ref && (ref.innerHTML = text)}>{text}</p>
                </li>
                <li>
                    <section>
                        <label htmlFor={id} ref={ref => ref && (ref.innerHTML = label)}>{label}</label>
                        <input className="DFOFunctionIndexIconText" id={id} type="number" min="0" ref={ref => ref && (ref.value = defaultValue)} />
                    </section>
                </li>
            </ul>
        );
    },
    render() {
        var _this = this;
        if (!_this.props.element.token) {
            return <LoaderMini />
        }
        return (
            <section className="DFOOverview">
                <DFOMetadata element={_this.props.element} edit={_this.props.edit}/>
                <ul className="DFOHosting TheDappInfoX">
                    <section className="HostingCategoryTitle">
                        <h2>Decentralized Application</h2>
                    </section>
                    <li className="TheDappInfo1">
                        <h5 className="DFOHostingTitle">&#128587; Voting Token</h5>
                        <section className="DFOTitleSection">
                            <AsyncValue>
                                {_this.props.element.symbol && <p className="DFOLabelTitleInfo">Ticker: <b>{_this.props.element.symbol}</b></p>}
                            </AsyncValue>
                            <AsyncValue>
                                {_this.props.element.name && <p className="DFOLabelTitleInfo">Name: <b>{_this.props.element.name}</b></p>}
                            </AsyncValue>
                        </section>
                        <section className="DFOTitleSection">
                            <AsyncValue>
                                {_this.props.element.symbol && _this.props.element.totalSupply && <p className="DFOLabelTitleInfo">Supply: <b>{window.fromDecimals(_this.props.element.totalSupply, _this.props.element.decimals)}</b></p>}
                            </AsyncValue>
                        </section>
                        <section className="DFOTitleSection">
                            <a className="LinkVisualButton LinkVisualEthscan" href="javascript:;" onClick={() => _this.emit('section/change', 'Token')}>View</a>
                            <a href={window.getNetworkElement("etherscanURL") + 'token/' + _this.props.element.token.options.address} target="_blank" className="LinkVisualButton LinkVisualEthscan">&#128142; Etherscan</a>
                            <a href={window.context.uniSwapInfoURL + this.props.element.token.options.address} target="_blank" className="LinkVisualButton LinkVisualUni">&#129412; Info</a>
                            <a href={window.context.uniSwapSwapURLTemplate.format(this.props.element.token.options.address)} target="_blank" className="LinkVisualButton LinkVisualUni">&#129412; Swap</a>
                            <a href={window.context.penSwapSwapURLTemplate.format(this.props.element.token.options.address)} target="_blank" className="LinkVisualButton LinkVisualUni LinkVisualUniPEN">&#128039; Swap</a>
                        </section>
                    </li>
                    <li className="TheDappInfo05">
                        <h5 className="DFOHostingTitle">&#129302; Core:</h5>
                        <section className="DFOTitleSection">
                            <a className="LinkVisualButton LinkVisualEthscan" target="_blank" href={window.getNetworkElement("etherscanURL") + "address/" + _this.props.element.dFO.options.address}>&#128142; Etherscan</a>
                        </section>
                        <br></br>
                        <h5 className="DFOHostingTitle">&#x1F468;&#x1F3FB;&#x200D;&#x1F4BB; Wallet:</h5>
                        <section className="DFOTitleSection">
                            <a className="LinkVisualButton LinkVisualEthscan" href="javascript:;" onClick={() => _this.emit('section/change', 'Wallet')}>View</a>
                            <a className="LinkVisualButton LinkVisualEthscan" target="_blank" href={window.getNetworkElement("etherscanURL") + "tokenHoldings?a=" + _this.props.element.walletAddress}>&#128142; Etherscan</a>
                        </section>
                    </li>
                    <li className="TheDappInfo1 TheDappInfoX">
                        <h5 className="DFOHostingTitle">&#128302; ENS: </h5>
                        <section className="DFOTitleSection">
                            <AsyncValue>
                                {_this.props.element.ens !== undefined && <p className="DFOLabelTitleInfo"><a className="LinkVisualStandard" target="_blank" href={"https://" + ((_this.props.element.ens && (_this.props.element.ens.toLowerCase() + '.')) || '') + "dfohub.eth?ensd=" + ((_this.props.element.ens && (_this.props.element.ens.toLowerCase() + '.')) || '') + "dfohub.eth"}>{(_this.props.element.ens && (_this.props.element.ens.toLowerCase() + '.')) || ''}dfohub.eth</a></p>}
                            </AsyncValue>
                        </section>
                        <br></br>
                        <h5 className="DFOHostingTitle">&#128242; Front-end: </h5>
                        <section className="DFOTitleSection">
                            <AsyncValue>
                                {<a className="LinkVisualButton" href="javascript:;" onClick={() => (_this.props.element.link || _this.props.element.index) && this.setState({ change: this.state && this.state.change === 'showCode' ? null : 'showCode' })}>Code</a>}
                            </AsyncValue>
                            {_this.renderChangeButton('index')}
                        </section>
                    </li>
                    <li className="TheDappInfo05 TheDappInfoX">
                        <h5 className="DFOHostingTitle DFOHostingTitle2">&#128736; DFO Link: </h5>
                        <section className="DFOTitleSection">
                            <a className="LinkVisualButton LinkVisualEthscan" target="_blank" href={window.getHomepageLink('?addr=' + this.props.element.dFO.options.address)}>Navigate</a>
                        </section>
                        <h5 className="DFOHostingTitle DFOHostingTitle2">&#128736; Functions: </h5>
                        <section className="DFOTitleSection">
                            <p className="LinkVisualStandard MiiiiFunctionalities">
                                <AsyncValue>
                                    {_this.props.element.functionalitiesAmount}
                                </AsyncValue>
                            </p>
                            <a className="LinkVisualButton LinkVisualEthscan" onClick={() => _this.emit('section/change', 'Functions')} href="javascript:;">View All</a>
                        </section>
                    </li>
                    {_this.renderChanger(['index'])}
                    {this.state && this.state.change === 'showCode' && <section className="IndexShowCode">
                        <section className="IndexShowCodeEditorBox">
                            <h5>Distributed Layer</h5>
                            <Editor lang="html" readonly="true" link={_this.props.element.link} firstCode={_this.props.element.link ? undefined : "Distributed Index is actually unset"} />
                        </section>
                        <section className="IndexShowCodeEditorBox">
                            <h5>Decentralized Layer</h5>
                            <Editor lang="html" readonly="true" first={_this.props.element.index} firstCode={_this.props.element.index ? undefined : "Decentralized Index is actually unset"} />
                        </section>
                    </section>}
                </ul>
                <ul className="DFOHosting TheDappInfoX">
                    <section className="HostingCategoryTitle">
                        <h2>Rules and funds</h2>
                    </section>
                    <li className="TheDappInfo1">
                        <h5 className="DFOHostingTitle">&#127984; Regular Proposals: </h5>
                        <section className="DFOTitleSection">
                            {_this.props.element.blocks === undefined && <LoaderMinimino />}
                            {_this.props.element.blocks !== undefined && <p className="DFOLabelTitleInfo">Length: <b>{_this.props.element.blocks}</b><aside> Blocks </aside></p>}
                        </section>
                        <h5 className="DFOHostingTitle">&#x1F6A8; Emergency Proposals: </h5>
                        <section className="DFOTitleSection">
                            {_this.props.element.minimumBlockNumberForEmergencySurvey === undefined && <LoaderMinimino />}
                            {_this.props.element.minimumBlockNumberForEmergencySurvey !== undefined && <p className="DFOLabelTitleInfo">Length: <b>{_this.props.element.minimumBlockNumberForEmergencySurvey}</b> <aside>Blocks</aside></p>}
                            <a className="LinkVisualButton LinkVisualEthscan" onClick={() => _this.emit('section/change', 'Rules')} href="javascript:;">View All</a>
                        </section>
                    </li>
                    <li className="TheDappInfo1">
                        <h5 className="DFOHostingTitle">&#129518; Assets: </h5>
                        <section className="DFOTitleSection">
                            <AsyncValue>
                                {_this.props.element.symbol && _this.props.element.totalSupply && _this.props.element.communityTokens && <p className="DFOLabelTitleInfo DFOLabelTitleInfoS"><b>{window.tokenPercentage(_this.props.element.communityTokens, _this.props.element.totalSupply)}</b><aside> (<b>{window.fromDecimals(_this.props.element.communityTokens, _this.props.element.decimals)}</b> {_this.props.element.symbol})</aside></p>}
                            </AsyncValue>
                        </section>
                        <section className="DFOTitleSection">
                            <p className="DFOLabelTitleInfo DFOLabelTitleInfoS"><b>{window.fromDecimals(_this.props.element.walletETH, 18)}</b><aside> ETH</aside></p>
                        </section>
                        <section className="DFOTitleSection">
                            <p className="DFOLabelTitleInfo DFOLabelTitleInfoS"><b>{window.fromDecimals(_this.props.element.walletUSDC, 6)}</b><aside> USDC</aside></p>
                        </section>
                        <section className="DFOTitleSection">
                            <p className="DFOLabelTitleInfo DFOLabelTitleInfoS"><b>{window.fromDecimals(_this.props.element.walletDAI, 18)}</b><aside> DAI</aside></p>
                        </section>
                        {_this.props.element !== window.dfoHub && <section className="DFOTitleSection">
                            <p className="DFOLabelTitleInfo DFOLabelTitleInfoS"><b>{window.fromDecimals(_this.props.element.walletBUIDL, window.dfoHub.decimals)}</b><aside> BUIDL</aside></p>
                        </section>}
                        <a className="LinkVisualButton LinkVisualEthscan" onClick={() => _this.emit('section/change', 'Wallet')} href="javascript:;">View All</a>
                    </li>
                    <li className="TheDappInfo1">
                        <h5 className="DFOHostingTitle">&#128424; Fixed Inflation:</h5>
                        <section className="DFOTitleSection">
                            {this.state && this.state.fixedInflationStatus === 'loading' && <LoaderMinimino/>}
                            {this.state && this.state.fixedInflationStatus === 'active' && <p className="DFOLabelTitleInfo">Active</p>}
                            {this.state && this.state.fixedInflationStatus === 'unset' && <p className="DFOLabelTitleInfo">Not set</p>}
                            <a className="LinkVisualButton LinkVisualEthscan" onClick={() => _this.emit('section/change', 'Farming')} href="javascript:;">More</a>
                        </section>
                        <h5 className="DFOHostingTitle">&#129412; Liquidity Mining:</h5>
                        <section className="DFOTitleSection">
                            {this.state && this.state.liquidityMiningStatus === 'loading' && <LoaderMinimino/>}
                            {this.state && this.state.liquidityMiningStatus === 'active' && <p className="DFOLabelTitleInfo">Active</p>}
                            {this.state && this.state.liquidityMiningStatus === 'unset' && <p className="DFOLabelTitleInfo">Not set</p>}
                            <a className="LinkVisualButton LinkVisualEthscan" onClick={() => _this.emit('section/change', 'Farming')} href="javascript:;">More</a>
                        </section>
                    </li>
                </ul>
            </section>
        );
    }
});