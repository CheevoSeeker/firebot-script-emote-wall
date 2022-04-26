# Emote Wall Firebot Script

## How to use
1. Download the latest **emoteWall.js** file from [Releases](https://github.com/CheevoSeeker/firebot-script-emote-wall/releases)
2. Copy the **emoteWall.js** file to Firebot's scripts folder
3. Add a `Chat Message (Twitch)` event
    - Add a `Conditional Effects` effect
        - If `$textLength[$chatMessageEmoteUrls]` is greater than `0`
            - Add a `Run Custom Script` effect
                - Select `emoteWall.js`
                - Set the various options

## Developers

### Setup
1. Clone or fork this repository
2. `npm install`

### Building
Dev:
1. `npm run build:dev`
    - Automatically copies the compiled `emoteWall.js` to Firebot's `scripts` folder.

Release:
1. `npm run build`
2. Copy the `emoteWall.js` file in `/dist` to Firebot's `scripts` folder
