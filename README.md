# Newt 8

[![Build](https://github.com/garredow/newt8/actions/workflows/build.yml/badge.svg)](https://github.com/garredow/newt8/actions/workflows/build.yml) [![Tests](https://github.com/garredow/newt8/actions/workflows/test.yml/badge.svg)](https://github.com/garredow/newt8/actions/workflows/test.yml)

Newt is a replacement for your browser's new tab page.

## Where can I get it?

Newt will be available for Chrome, Firefox, and more in the near future. You can also build it yourself.

## What does it do?

![Dashboard view](/screenshots/dashboard1.png?raw=true)

The main screen is the dashboard. Here you can add as many different panels as you'd like. Each panel generally contains a card or list of cards containing websites.

- **Bookmarks**: Choose a folder in your bookmarks and a card will be created for each sub folder, which will list each site inside of it.
- **Devices**: A card for each browser window open on any other devices signed into your Chrome account.
- **New Bookmarks**: A list of your 20 most recently added bookmarks.
- **Recent Tabs**: Newt keeps track of when you look at each tab (if you give it permission). Doing so lets it show you a chronological list of the tabs you've recently viewed. After approving permissions, you may have to restart your browser to get this panel to work correctly.
- **Recently Closed Tabs**: A list of tabs you've recently closed. This allows you to easily find and reopen something you may have closed by accident.
- **Top Sites**: Just like the standard Chrome new tab page, this shows your 10 most visited sites.
- **Windows**: A card for each open browser window on your computer, excluding the window you're currently looking at. Clicking a site will focus that tab and window.
- **Empty**: Just want some extra whitespace? Throw one (or more) of these in there.

Each panel lets you adjust its width, number of columns in it, and its title. You can also reorder panels by dragging their arrow buttons.

What if you want multiple configurations though? The setup you have for casually browsing in your personal time might be different than the one you want while working. No problem, as Newt can have multiple dashboard _pages_. Click the "+" button on the bottom bar to create a new _page_ and you can have as many setups as you'd like.

## Themes

Enabling people to customize how they experience one of my projects has always been important. A powerful, robust theme engine was included in the very first version of Newt and Newt 8 continues this tradition.

![Themes view](/screenshots/themes1.png?raw=true)

Creating a theme is much easier than it was in Newt 1, but there are still a few things I'd like to go over. You get to the theme view by clicking on the artist's palette in the bottom right of the screen.

### The basics

It starts out easily enough with an option to choose your current theme. There are a few defaults, so don't worry about needing to build something yourself. Enabling _Dynamic themes_ will let you choose a light and dark theme. Newt will choose which one to apply based on your device's _dark mode_ setting.

### Building a theme

Here's where it gets fun. Click that _New Theme_ button and you'll be presented with the theme builder. It will use your current theme as the base. Now, you'll notice two big things here: A list of colors on the left and a bunch of UI components on the right. Any change you make to these colors will reflect in the preview section.

![Theme builder view](/screenshots/theme-builder.png?raw=true)

The _Configure_ side is separated into two sections:

1. **Basic**: The bare minimum you need to build a theme. This should be good enough for most theming needs.
2. **Advanced**: I know some of you want more than that though, so here you go. Every available theme option is in here, and there are a LOT. Each option in the basic section covers multiple in here, so setting one there will overwrite what you have in here.

Choosing a color is as easy as clicking the color block next to it. Your browser will show you a nice color picker that you can use. You can also type in your color manually if you'd like. Each input accepts any color format, such as HEX, RGB, RGBA, HSL, etc. (On a technical note, Newt basically just dumps this value into the CSS. So anything that should work, should work as expected). If you're like me and not great with color schemes, I highly recommend a site like [Coolors.co](https://coolors.co/) to get some ideas.

## Frequently Asked Questions

I'll fill this out as people start to ask questions.

## Building and running the project

I've been using Chrome to develop this, but will officially support more browsers soon. Also keep in mind this is still very much a work in progress. There will be bugs.

1. Clone the repo.
2. In your favorite terminal, cd to the directory and `npm install`.
3. `npm run build`
4. Enable 'Developer mode' in the Chrome [Extensions page](chrome://extensions/).
5. Click the 'Load unpacked' button and choose the `build` folder created in step 3.
6. Done!

If you got this far, I'm assuming you actually want to give Newt a try and don't mind it being a work in progress. It's already in the [Chrome Web Store](https://chrome.google.com/webstore/detail/newt-a-better-new-tab/mmkiihpjlhniddmelfelebdkccpfjcpp) as an unlisted extension, so you can just go there and install it. No need to build it yourself.
