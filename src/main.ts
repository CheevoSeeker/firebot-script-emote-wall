import { Firebot } from "firebot-custom-scripts-types";

interface Params {
  emoteUrls: string;
  emoteSize: number;
  overlayWidth: number;
  overlayHeight: number;
}

const script: Firebot.CustomScript<Params> = {
  getScriptManifest: () => {
    return {
      name: "Emote Wall",
      description: "Shows chat emotes on screen",
      author: "CheevoSeeker",
      version: "1.0",
      website: "https://github.com/CheevoSeeker/firebot-script-emote-wall",
      startupOnly: false,
      firebotVersion: "5"
    };
  },
  getDefaultParameters: () => {
    return {
      emoteUrls: {
        type: "string",
        description: "URLs of the emotes to show",
        default: "$chatMessageEmoteUrls"
      },
      emoteSize: {
        type: "number",
        description: "Size of the emotes",
        default: 64
      },
      overlayWidth: {
        type: "number",
        description: "Width of the overlay",
        default: 1920
      },
      overlayHeight: {
        type: "number",
        description: "Height of the overlay",
        default: 1080
      },
    };
  },
  run: ({ parameters, modules }) => {
    const { logger } = modules;

    // Parse parameters
    const { emoteUrls, emoteSize, overlayWidth, overlayHeight } = parameters;
    const emoteUrlArr = emoteUrls.split(",");
    const randomId = "CheevoEmoteWall_" + Date.now();
    if (emoteUrlArr.length <= 0) { return; }

    // Define helper functions
    let randomPosition = function(max: number) {
      return Math.floor(Math.random() * max) - emoteSize;
    };

    // Generate HTML and JavaScript
    let imageTags = [];
    let scriptLines = [];
    for (let index = 0; index < emoteUrlArr.length; index++) {
      const emoteUrl = emoteUrlArr[index];
      const emoteId = `${randomId}_${index}`;

      const startStyle = `position: absolute; left: ${randomPosition(overlayWidth)}px; top: ${randomPosition(overlayHeight)}px;`;
      imageTags.push(`<img class="${emoteId}" src="${emoteUrl}" width="${emoteSize}" style="${startStyle}">`);

      const endStyle = `{left: ${randomPosition(overlayWidth)}, top: ${randomPosition(overlayHeight)}}`;
      scriptLines.push(`$(".${emoteId}").animate(${endStyle}, 3000);`);
    }

    // Return HTML effect
    let htmlContent = `<div class="${randomId}">${imageTags.join("")}<script>${scriptLines.join("")}</script></div>`;
    return {
      success: true,
      errorMessage: "Failed to run the script!",
      effects: [
        {
          type: "firebot:html",
          html: htmlContent,
          length: 1,
          enterAnimation: "fadeIn",
          enterDuration: 1,
          exitAnimation: "fadeOut",
          exitDuration: 1
        }
      ]
    };
  },
};

export default script;
