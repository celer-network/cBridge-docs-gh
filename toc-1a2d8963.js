// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="index.html"><strong aria-hidden="true">1.</strong> 👋 Welcome to cBridge</a></span></li><li class="chapter-item expanded "><li class="part-title">Introduction</li></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="introduction/architectural-benefits.html"><strong aria-hidden="true">2.</strong> Architectural Benefits</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="introduction/state-guardian-network.html"><strong aria-hidden="true">3.</strong> State Guardian Network</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="introduction/sgn-and-cbridge/index.html"><strong aria-hidden="true">4.</strong> SGN and cBridge</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="introduction/sgn-and-cbridge/the-sgn-as-a-cbridge-node-gateway-and-service-level-agreement-sla-arbitrator.html"><strong aria-hidden="true">4.1.</strong> The SGN as a cBridge node gateway and Service Level Agreement (SLA) arbitrator</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="introduction/sgn-and-cbridge/the-sgn-as-a-shared-liquidity-pool-manager.html"><strong aria-hidden="true">4.2.</strong> The SGN as a Shared Liquidity Pool Manager</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="introduction/fungible-token-bridging-models.html"><strong aria-hidden="true">5.</strong> Fungible Token Bridging Models</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="introduction/cbridge-security.html"><strong aria-hidden="true">6.</strong> cBridge Security</a></span></li><li class="chapter-item expanded "><li class="part-title">Tutorial</li></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="tutorial/cross-chain-transfer.html"><strong aria-hidden="true">7.</strong> Cross-chain Transfer</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="tutorial/lp-guide.html"><strong aria-hidden="true">8.</strong> LP Guide</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="tutorial/sgn-v2-staking-guide.html"><strong aria-hidden="true">9.</strong> SGN V2 Staking Guide</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="tutorial/sgn-v1-unbonding-guide.html"><strong aria-hidden="true">10.</strong> SGN V1 Unbonding Guide</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="tutorial/smart-contract-as-lp.html"><strong aria-hidden="true">11.</strong> Smart Contract as LP</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="tutorial/aptos-bridging-guide.html"><strong aria-hidden="true">12.</strong> Aptos Bridging Guide</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="tutorial/ape-chain-bridging-guide.html"><strong aria-hidden="true">13.</strong> Ape Chain Bridging Guide</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="tutorial/flow-cadence-bridging-guide.html"><strong aria-hidden="true">14.</strong> Flow Cadence Bridging Guide</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="tutorial/flow-evm-bridging-guide.html"><strong aria-hidden="true">15.</strong> Flow EVM Bridging Guide</a></span></li><li class="chapter-item expanded "><li class="part-title">Developer</li></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/circle-cross-chain-usdc-transfer-protocol-cctp.html"><strong aria-hidden="true">16.</strong> Circle Cross-chain USDC Transfer Protocol(CCTP)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/cbridge-sdk.html"><strong aria-hidden="true">17.</strong> cBridge SDK</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/cbridge-pool-based-transfer-xliquidity/index.html"><strong aria-hidden="true">18.</strong> cBridge Pool-Based Transfer  (xLiquidity)</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/cbridge-pool-based-transfer-xliquidity/transfer.html"><strong aria-hidden="true">18.1.</strong> Transfer</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/cbridge-pool-based-transfer-xliquidity/transfer-refund.html"><strong aria-hidden="true">18.2.</strong> Transfer Refund</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/cbridge-canonical-mapping-transfer-xasset/index.html"><strong aria-hidden="true">19.</strong> cBridge Canonical Mapping Transfer (xAsset)</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/cbridge-canonical-mapping-transfer-xasset/mint.html"><strong aria-hidden="true">19.1.</strong> Mint</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/cbridge-canonical-mapping-transfer-xasset/mint-refund.html"><strong aria-hidden="true">19.2.</strong> Mint Refund</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/cbridge-canonical-mapping-transfer-xasset/burn.html"><strong aria-hidden="true">19.3.</strong> Burn</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/cbridge-canonical-mapping-transfer-xasset/burn-refund.html"><strong aria-hidden="true">19.4.</strong> Burn Refund</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/cbridge-transfer-web-widget.html"><strong aria-hidden="true">20.</strong> cBridge Transfer Web Widget</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/cbridge-aptos-transfer-xasset-only.html"><strong aria-hidden="true">21.</strong> cBridge Aptos Transfer (xAsset Only)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/custom-transfer-url-schemes.html"><strong aria-hidden="true">22.</strong> Custom Transfer URL Schemes</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/cbridge-apis-for-sui.html"><strong aria-hidden="true">23.</strong> cBridge APIs for Sui</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/referral-specific-transfer.html"><strong aria-hidden="true">24.</strong> Referral Specific Transfer</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/cbridge-limit-parameters.html"><strong aria-hidden="true">25.</strong> cBridge Limit Parameters</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/api-reference/index.html"><strong aria-hidden="true">26.</strong> API Reference</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/api-reference/gateway-gettransferconfigsforall.html"><strong aria-hidden="true">26.1.</strong> Gateway: GetTransferConfigsForAll</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/api-reference/gateway-estimateamt.html"><strong aria-hidden="true">26.2.</strong> Gateway: EstimateAmt</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/api-reference/contract-pool-based-transfer.html"><strong aria-hidden="true">26.3.</strong> Contract: Pool-Based Transfer</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/api-reference/gateway-gettransferstatus.html"><strong aria-hidden="true">26.4.</strong> Gateway: GetTransferStatus</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/api-reference/contract-pool-based-transfer-refund.html"><strong aria-hidden="true">26.5.</strong> Contract: Pool-Based Transfer Refund</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/api-reference/gateway-transferhistory.html"><strong aria-hidden="true">26.6.</strong> Gateway: TransferHistory</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/api-reference/contract-mint-canonical-token-originaltokenvault.html"><strong aria-hidden="true">26.7.</strong> Contract: Mint Canonical Token(OriginalTokenVault)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/api-reference/contract-mint-canonical-token-originaltokenvaultv2.html"><strong aria-hidden="true">26.8.</strong> Contract: Mint Canonical Token(OriginalTokenVaultV2)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/api-reference/contract-mint-canonical-token-transfer-refund.html"><strong aria-hidden="true">26.9.</strong> Contract: Mint Canonical Token Transfer Refund</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/api-reference/contract-burn-canonical-token-peggedtokenbridge.html"><strong aria-hidden="true">26.10.</strong> Contract: Burn Canonical Token(PeggedTokenBridge)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/api-reference/contract-burn-canonical-token-peggedtokenbridgev2.html"><strong aria-hidden="true">26.11.</strong> Contract: Burn Canonical Token (PeggedTokenBridgeV2)</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/api-reference/contract-burn-canonical-token-transfer-refund.html"><strong aria-hidden="true">26.12.</strong> Contract: Burn Canonical Token Transfer Refund</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/api-reference/gateway-markrefrelation.html"><strong aria-hidden="true">26.13.</strong> Gateway: MarkRefRelation</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/api-reference/contract-transferagent-mint-token-submission.html"><strong aria-hidden="true">26.14.</strong> Contract: TransferAgent Mint Token Submission</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/api-reference/contract-transferagent-burn-token-submission.html"><strong aria-hidden="true">26.15.</strong> Contract: TransferAgent Burn Token Submission</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/api-reference/contract-aptos-vault-mint-token-submission.html"><strong aria-hidden="true">26.16.</strong> Contract: Aptos Vault Mint Token Submission</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="developer/api-reference/contract-aptos-pegbridge-burn-token-submission.html"><strong aria-hidden="true">26.17.</strong> Contract: Aptos PegBridge Burn Token Submission</a></span></li></ol><li class="chapter-item expanded "><li class="part-title">NFT Bridge</li></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="nft-bridge/introduction.html"><strong aria-hidden="true">27.</strong> Introduction</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="nft-bridge/nft-bridge-fee.html"><strong aria-hidden="true">28.</strong> NFT Bridge Fee</a></span></li><li class="chapter-item expanded "><li class="part-title">List Your Tokens</li></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="list-your-tokens/simple-listing-process.html"><strong aria-hidden="true">29.</strong> Simple Listing Process</a></span></li><li class="chapter-item expanded "><li class="part-title">Reference</li></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="reference/faq.html"><strong aria-hidden="true">30.</strong> FAQ</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="reference/audit-reports.html"><strong aria-hidden="true">31.</strong> Audit Reports</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="reference/contract-addresses.html"><strong aria-hidden="true">32.</strong> Contract Addresses</a></span></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split('#')[0].split('?')[0];
        if (current_page.endsWith('/')) {
            current_page += 'index.html';
        }
        const links = Array.prototype.slice.call(this.querySelectorAll('a'));
        const l = links.length;
        for (let i = 0; i < l; ++i) {
            const link = links[i];
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The 'index' page is supposed to alias the first chapter in the book.
            if (link.href === current_page
                || i === 0
                && path_to_root === ''
                && current_page.endsWith('/index.html')) {
                link.classList.add('active');
                let parent = link.parentElement;
                while (parent) {
                    if (parent.tagName === 'LI' && parent.classList.contains('chapter-item')) {
                        parent.classList.add('expanded');
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', e => {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        const sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via
            // 'next/previous chapter' buttons
            const activeSection = document.querySelector('#mdbook-sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        const sidebarAnchorToggles = document.querySelectorAll('.chapter-fold-toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(el => {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define('mdbook-sidebar-scrollbox', MDBookSidebarScrollbox);


// ---------------------------------------------------------------------------
// Support for dynamically adding headers to the sidebar.

(function() {
    // This is used to detect which direction the page has scrolled since the
    // last scroll event.
    let lastKnownScrollPosition = 0;
    // This is the threshold in px from the top of the screen where it will
    // consider a header the "current" header when scrolling down.
    const defaultDownThreshold = 150;
    // Same as defaultDownThreshold, except when scrolling up.
    const defaultUpThreshold = 300;
    // The threshold is a virtual horizontal line on the screen where it
    // considers the "current" header to be above the line. The threshold is
    // modified dynamically to handle headers that are near the bottom of the
    // screen, and to slightly offset the behavior when scrolling up vs down.
    let threshold = defaultDownThreshold;
    // This is used to disable updates while scrolling. This is needed when
    // clicking the header in the sidebar, which triggers a scroll event. It
    // is somewhat finicky to detect when the scroll has finished, so this
    // uses a relatively dumb system of disabling scroll updates for a short
    // time after the click.
    let disableScroll = false;
    // Array of header elements on the page.
    let headers;
    // Array of li elements that are initially collapsed headers in the sidebar.
    // I'm not sure why eslint seems to have a false positive here.
    // eslint-disable-next-line prefer-const
    let headerToggles = [];
    // This is a debugging tool for the threshold which you can enable in the console.
    let thresholdDebug = false;

    // Updates the threshold based on the scroll position.
    function updateThreshold() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // The number of pixels below the viewport, at most documentHeight.
        // This is used to push the threshold down to the bottom of the page
        // as the user scrolls towards the bottom.
        const pixelsBelow = Math.max(0, documentHeight - (scrollTop + windowHeight));
        // The number of pixels above the viewport, at least defaultDownThreshold.
        // Similar to pixelsBelow, this is used to push the threshold back towards
        // the top when reaching the top of the page.
        const pixelsAbove = Math.max(0, defaultDownThreshold - scrollTop);
        // How much the threshold should be offset once it gets close to the
        // bottom of the page.
        const bottomAdd = Math.max(0, windowHeight - pixelsBelow - defaultDownThreshold);
        let adjustedBottomAdd = bottomAdd;

        // Adjusts bottomAdd for a small document. The calculation above
        // assumes the document is at least twice the windowheight in size. If
        // it is less than that, then bottomAdd needs to be shrunk
        // proportional to the difference in size.
        if (documentHeight < windowHeight * 2) {
            const maxPixelsBelow = documentHeight - windowHeight;
            const t = 1 - pixelsBelow / Math.max(1, maxPixelsBelow);
            const clamp = Math.max(0, Math.min(1, t));
            adjustedBottomAdd *= clamp;
        }

        let scrollingDown = true;
        if (scrollTop < lastKnownScrollPosition) {
            scrollingDown = false;
        }

        if (scrollingDown) {
            // When scrolling down, move the threshold up towards the default
            // downwards threshold position. If near the bottom of the page,
            // adjustedBottomAdd will offset the threshold towards the bottom
            // of the page.
            const amountScrolledDown = scrollTop - lastKnownScrollPosition;
            const adjustedDefault = defaultDownThreshold + adjustedBottomAdd;
            threshold = Math.max(adjustedDefault, threshold - amountScrolledDown);
        } else {
            // When scrolling up, move the threshold down towards the default
            // upwards threshold position. If near the bottom of the page,
            // quickly transition the threshold back up where it normally
            // belongs.
            const amountScrolledUp = lastKnownScrollPosition - scrollTop;
            const adjustedDefault = defaultUpThreshold - pixelsAbove
                + Math.max(0, adjustedBottomAdd - defaultDownThreshold);
            threshold = Math.min(adjustedDefault, threshold + amountScrolledUp);
        }

        if (documentHeight <= windowHeight) {
            threshold = 0;
        }

        if (thresholdDebug) {
            const id = 'mdbook-threshold-debug-data';
            let data = document.getElementById(id);
            if (data === null) {
                data = document.createElement('div');
                data.id = id;
                data.style.cssText = `
                    position: fixed;
                    top: 50px;
                    right: 10px;
                    background-color: 0xeeeeee;
                    z-index: 9999;
                    pointer-events: none;
                `;
                document.body.appendChild(data);
            }
            data.innerHTML = `
                <table>
                  <tr><td>documentHeight</td><td>${documentHeight.toFixed(1)}</td></tr>
                  <tr><td>windowHeight</td><td>${windowHeight.toFixed(1)}</td></tr>
                  <tr><td>scrollTop</td><td>${scrollTop.toFixed(1)}</td></tr>
                  <tr><td>pixelsAbove</td><td>${pixelsAbove.toFixed(1)}</td></tr>
                  <tr><td>pixelsBelow</td><td>${pixelsBelow.toFixed(1)}</td></tr>
                  <tr><td>bottomAdd</td><td>${bottomAdd.toFixed(1)}</td></tr>
                  <tr><td>adjustedBottomAdd</td><td>${adjustedBottomAdd.toFixed(1)}</td></tr>
                  <tr><td>scrollingDown</td><td>${scrollingDown}</td></tr>
                  <tr><td>threshold</td><td>${threshold.toFixed(1)}</td></tr>
                </table>
            `;
            drawDebugLine();
        }

        lastKnownScrollPosition = scrollTop;
    }

    function drawDebugLine() {
        if (!document.body) {
            return;
        }
        const id = 'mdbook-threshold-debug-line';
        const existingLine = document.getElementById(id);
        if (existingLine) {
            existingLine.remove();
        }
        const line = document.createElement('div');
        line.id = id;
        line.style.cssText = `
            position: fixed;
            top: ${threshold}px;
            left: 0;
            width: 100vw;
            height: 2px;
            background-color: red;
            z-index: 9999;
            pointer-events: none;
        `;
        document.body.appendChild(line);
    }

    function mdbookEnableThresholdDebug() {
        thresholdDebug = true;
        updateThreshold();
        drawDebugLine();
    }

    window.mdbookEnableThresholdDebug = mdbookEnableThresholdDebug;

    // Updates which headers in the sidebar should be expanded. If the current
    // header is inside a collapsed group, then it, and all its parents should
    // be expanded.
    function updateHeaderExpanded(currentA) {
        // Add expanded to all header-item li ancestors.
        let current = currentA.parentElement;
        while (current) {
            if (current.tagName === 'LI' && current.classList.contains('header-item')) {
                current.classList.add('expanded');
            }
            current = current.parentElement;
        }
    }

    // Updates which header is marked as the "current" header in the sidebar.
    // This is done with a virtual Y threshold, where headers at or below
    // that line will be considered the current one.
    function updateCurrentHeader() {
        if (!headers || !headers.length) {
            return;
        }

        // Reset the classes, which will be rebuilt below.
        const els = document.getElementsByClassName('current-header');
        for (const el of els) {
            el.classList.remove('current-header');
        }
        for (const toggle of headerToggles) {
            toggle.classList.remove('expanded');
        }

        // Find the last header that is above the threshold.
        let lastHeader = null;
        for (const header of headers) {
            const rect = header.getBoundingClientRect();
            if (rect.top <= threshold) {
                lastHeader = header;
            } else {
                break;
            }
        }
        if (lastHeader === null) {
            lastHeader = headers[0];
            const rect = lastHeader.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top >= windowHeight) {
                return;
            }
        }

        // Get the anchor in the summary.
        const href = '#' + lastHeader.id;
        const a = [...document.querySelectorAll('.header-in-summary')]
            .find(element => element.getAttribute('href') === href);
        if (!a) {
            return;
        }

        a.classList.add('current-header');

        updateHeaderExpanded(a);
    }

    // Updates which header is "current" based on the threshold line.
    function reloadCurrentHeader() {
        if (disableScroll) {
            return;
        }
        updateThreshold();
        updateCurrentHeader();
    }


    // When clicking on a header in the sidebar, this adjusts the threshold so
    // that it is located next to the header. This is so that header becomes
    // "current".
    function headerThresholdClick(event) {
        // See disableScroll description why this is done.
        disableScroll = true;
        setTimeout(() => {
            disableScroll = false;
        }, 100);
        // requestAnimationFrame is used to delay the update of the "current"
        // header until after the scroll is done, and the header is in the new
        // position.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // Closest is needed because if it has child elements like <code>.
                const a = event.target.closest('a');
                const href = a.getAttribute('href');
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    threshold = targetElement.getBoundingClientRect().bottom;
                    updateCurrentHeader();
                }
            });
        });
    }

    // Takes the nodes from the given head and copies them over to the
    // destination, along with some filtering.
    function filterHeader(source, dest) {
        const clone = source.cloneNode(true);
        clone.querySelectorAll('mark').forEach(mark => {
            mark.replaceWith(...mark.childNodes);
        });
        dest.append(...clone.childNodes);
    }

    // Scans page for headers and adds them to the sidebar.
    document.addEventListener('DOMContentLoaded', function() {
        const activeSection = document.querySelector('#mdbook-sidebar .active');
        if (activeSection === null) {
            return;
        }

        const main = document.getElementsByTagName('main')[0];
        headers = Array.from(main.querySelectorAll('h2, h3, h4, h5, h6'))
            .filter(h => h.id !== '' && h.children.length && h.children[0].tagName === 'A');

        if (headers.length === 0) {
            return;
        }

        // Build a tree of headers in the sidebar.

        const stack = [];

        const firstLevel = parseInt(headers[0].tagName.charAt(1));
        for (let i = 1; i < firstLevel; i++) {
            const ol = document.createElement('ol');
            ol.classList.add('section');
            if (stack.length > 0) {
                stack[stack.length - 1].ol.appendChild(ol);
            }
            stack.push({level: i + 1, ol: ol});
        }

        // The level where it will start folding deeply nested headers.
        const foldLevel = 3;

        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            const level = parseInt(header.tagName.charAt(1));

            const currentLevel = stack[stack.length - 1].level;
            if (level > currentLevel) {
                // Begin nesting to this level.
                for (let nextLevel = currentLevel + 1; nextLevel <= level; nextLevel++) {
                    const ol = document.createElement('ol');
                    ol.classList.add('section');
                    const last = stack[stack.length - 1];
                    const lastChild = last.ol.lastChild;
                    // Handle the case where jumping more than one nesting
                    // level, which doesn't have a list item to place this new
                    // list inside of.
                    if (lastChild) {
                        lastChild.appendChild(ol);
                    } else {
                        last.ol.appendChild(ol);
                    }
                    stack.push({level: nextLevel, ol: ol});
                }
            } else if (level < currentLevel) {
                while (stack.length > 1 && stack[stack.length - 1].level >= level) {
                    stack.pop();
                }
            }

            const li = document.createElement('li');
            li.classList.add('header-item');
            li.classList.add('expanded');
            if (level < foldLevel) {
                li.classList.add('expanded');
            }
            const span = document.createElement('span');
            span.classList.add('chapter-link-wrapper');
            const a = document.createElement('a');
            span.appendChild(a);
            a.href = '#' + header.id;
            a.classList.add('header-in-summary');
            filterHeader(header.children[0], a);
            a.addEventListener('click', headerThresholdClick);
            const nextHeader = headers[i + 1];
            if (nextHeader !== undefined) {
                const nextLevel = parseInt(nextHeader.tagName.charAt(1));
                if (nextLevel > level && level >= foldLevel) {
                    const toggle = document.createElement('a');
                    toggle.classList.add('chapter-fold-toggle');
                    toggle.classList.add('header-toggle');
                    toggle.addEventListener('click', () => {
                        li.classList.toggle('expanded');
                    });
                    const toggleDiv = document.createElement('div');
                    toggleDiv.textContent = '❱';
                    toggle.appendChild(toggleDiv);
                    span.appendChild(toggle);
                    headerToggles.push(li);
                }
            }
            li.appendChild(span);

            const currentParent = stack[stack.length - 1];
            currentParent.ol.appendChild(li);
        }

        const onThisPage = document.createElement('div');
        onThisPage.classList.add('on-this-page');
        onThisPage.append(stack[0].ol);
        const activeItemSpan = activeSection.parentElement;
        activeItemSpan.after(onThisPage);
    });

    document.addEventListener('DOMContentLoaded', reloadCurrentHeader);
    document.addEventListener('scroll', reloadCurrentHeader, { passive: true });
})();

