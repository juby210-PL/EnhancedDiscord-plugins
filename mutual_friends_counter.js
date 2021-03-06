const Plugin = require('../plugin')

module.exports = new Plugin({
    name: 'Mutual Friends Counter',
    author: 'Juby210#0577',
    description: 'Mutual friends counter',
    color: 'aqua',

    load: () => {
        findModule("dispatch").subscribe("LOAD_MUTUAL_FRIENDS", module.exports.listener)
    },
    unload: () => {
        findModule("dispatch").unsubscribe("LOAD_MUTUAL_FRIENDS", module.exports.listener)
    },

    listener: arg => {
        // why { findModuleByDisplayName } = EDApi doesn't work on newest ED..
        let c2 = EDApi.findModuleByProps("item", "selected", "themed")
        let modal = document.querySelector("."+findModule(m => m.modal && m.inner && !m.close).modal.split(" ")[0])
        if(!modal) return;

        let elm = Array.from(modal.getElementsByClassName(c2.item.split(" ")[0]))[2]
        if(elm.innerText.includes(" [") && elm.innerText.includes("]")) {
            elm.innerText = elm.innerText.split(" [")[0]
        }
        elm.innerText += ` [${arg.mutualFriends.length}]`
    }
});