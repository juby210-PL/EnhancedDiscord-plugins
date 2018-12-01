const Plugin = require("../plugin");

function createWindow() {
    const footerContent = `<input type="text" placeholder="Footer Text" class="EmbedSender-input inputDefault-_djjkz input-cIJ7To size14-3iUx6q" id="EmbedSender-ftext">
        <input type="text" placeholder="Footer Icon URL" class="EmbedSender-input inputDefault-_djjkz input-cIJ7To size14-3iUx6q" id="EmbedSender-fimage">`;
    const content = `<input type="text" value="${JubyLib.getSelectedChannel()}" placeholder="ChannelID" class="inputDefault-_djjkz input-cIJ7To size14-3iUx6q EmbedSender-input" id="EmbedSender-cid">
        <input type="text" placeholder="Embed Title" class="EmbedSender-input inputDefault-_djjkz input-cIJ7To size14-3iUx6q" id="EmbedSender-etitle">
        <textarea placeholder="Embed Description" class="EmbedSender-input inputDefault-_djjkz input-cIJ7To size14-3iUx6q" style="resize: none; height: 80px;" id="EmbedSender-edesc" />
        <input type="text" placeholder="Embed Color (e.g. 0000FF)" class="EmbedSender-input inputDefault-_djjkz input-cIJ7To size14-3iUx6q" id="EmbedSender-ecolor">
        <input type="text" placeholder="Embed Image URL" class="EmbedSender-input inputDefault-_djjkz input-cIJ7To size14-3iUx6q" id="EmbedSender-eimage">
        ${JubyLib.popupCategory("Footer", footerContent)}
        <input type="text" placeholder="Message Content" class="EmbedSender-input inputDefault-_djjkz input-cIJ7To size14-3iUx6q" id="EmbedSender-mc">`;

    JubyLib.popup("Send Embed", content, "Send", "auto", () => JubyLib.sendEmbed(document.getElementById("EmbedSender-cid").value, document.getElementById("EmbedSender-mc").value, document.getElementById("EmbedSender-etitle").value,
        document.getElementById("EmbedSender-edesc").value, document.getElementById("EmbedSender-ecolor").value, document.getElementById("EmbedSender-eimage").value, {text: document.getElementById("EmbedSender-ftext").value, icon_url: document.getElementById("EmbedSender-fimage").value}));
}

module.exports = new Plugin({
	name: "Embed Sender",
	author: "Juby210#5831",
    description: "Send embed as user account | Use at own risk!",
	color: "#0000ff",
	load: () => {
        try {
            if(!hasJubyLib) {
                console.log("Download JubyLib: https://github.com/juby210-PL/EnhancedDiscord-plugins");
                return alert("JubyLib not found! Download:\nhttps://github.com/juby210-PL/EnhancedDiscord-plugins");
            }
        } catch(e) {
            console.log("Download JubyLib: https://github.com/juby210-PL/EnhancedDiscord-plugins");
            return alert("JubyLib not found! Download:\nhttps://github.com/juby210-PL/EnhancedDiscord-plugins");
        }
        const embedSenderStyle = `
			#EmbedSender-button {
				cursor: pointer;
				padding: 2px;
                transition: background 100ms ease;
                margin-bottom: 10px;
                margin-top: 0px;
			}
			
			#EmbedSender-button:hover {
				background: rgba(255,255,255,0.1);
			}
			
			#EmbedSender-button:active {
				background: rgba(255,255,255,0.3);
            }
            
            .EmbedSender-input {
                margin: 3px;
            }
        `;
        
        const css = document.createElement("style");
		css.id = "EmbedSender-style";
		css.innerHTML = embedSenderStyle;
        document.head.append(css);

        const friendsOnline = window.findModule("friendsOnline").friendsOnline;
        const guildClasses = window.findModule("guildsWrapper");
        const button = document.createElement("div");
		button.id = "EmbedSender-button";
		button.textContent = "Send Embed";
        button.classList.add(friendsOnline);
        button.addEventListener("click", () => {
            createWindow();
        });

        if (!document.querySelector(`.${guildClasses.guildSeparator}`)) setTimeout(() => {
            document.querySelector(`.${guildClasses.guildSeparator}`).insertAdjacentElement("afterend", button);
        }, 100); else document.querySelector(`.${guildClasses.guildSeparator}`).insertAdjacentElement("afterend", button);
	},
	unload: () => {
        const css = document.getElementById("EmbedSender-style");
        if(css) {
            document.head.removeChild(css);
        }
        const button = document.getElementById("EmbedSender-button");
        if(button) {
            button.parentElement.removeChild(button);
        }
    }
});