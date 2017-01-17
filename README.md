
# Phaser-FloatingText
A floating text effect UI component for Phaser.io Javascript library

<h3>Run the floating text effect from anywhere</h3>
```
new FloatingText(this, {
    text: "Hello Phaser!",
    animation: "explode",
    textOptions: {
        fontSize: 32,
        fill: "#ff18aa"
    },
    x: 100,
    y: 100,
    timeToLive: 400 // ms
});
```
pass necesery options like: this or game (the state that the floating text will be created within), and the customization options

<hr>

<img src="http://i221.photobucket.com/albums/dd22/djmid71/ezgif.com-3ca0540923_zpsjqrkmldq.gif"/>

<strong>View example: <a href="http://www.netgfx.com/trunk/games/tools/phaser-floatingtext">Complete example</a></strong>

  <hr>

<strong>Game Instance</strong>
The game state that we want the floating text to appear to, such as "game"

<strong>General Options:</strong>

<ul>
    <li><strong>text:</strong> The information inside the floating text, can be String, Number</li>
    <li><strong>width:</strong> The width of the floating text (default: auto)</li>
  <li><strong>height:</strong> The height of the floating text (default: auto)</li>
  <li><strong>x</strong> The x position of the floating text (default: auto based on alignment)</li>
  <li><strong>rotation</strong> The amount of degrees to rotate the floating item (default: 0)</li>
    <li><strong>y</strong> The y position of the floating text (default: auto based on alignment)</li>
    <li><strong>parentObject</strong> The parent object that the floating text will appear at (default: null)</li>
    <li><strong>animation: </strong> The animation effect (default: up, options:explode, smoke, custom, directional: up, down, left, right, fade, physics)</li>
    <li><strong>textStyle: </strong> Declares styles for the simple text element (default: {
            fontSize: 12,
            fill: "#ffffff",
            stroke: "#1e1e1e",
            strokeThickness: 1,
            wordWrap: true,
            wordWrapWidth: 200
        }</li>
    <li><strong>fixedToCamera: </strong> Pins the floating text on the camera and moves with it (x,y are now camera offset) (default: false)</li>
    <li><strong>sprite</strong> Add a Sprite instead of a text to float (default: null)</li>
    <li><strong>spriteAnimationName</strong> If using an animation on the sprite, the name of the animation (default:"")</li>
    <li><strong>spriteAnimationFrames</strong> If using an animation on the sprite, the animation frames (default:[])</li>
    <li><strong>spriteAnimationFrameRate</strong> If using an animation on the sprite, the animation frame rate (default: 24)</li>
    <li><strong>spriteAnimationRepeat</strong> If using an animation on the sprite, if the animation should loop (default: true)</li>
    <li><strong>spriteAnchor</strong> The anchor to use on the sprite</li>
    <li><strong>hasBackground</strong> A rounded rectangle behind the text (note: doesn't play well with explode)</li>
    <li><strong>backgroundColor: </strong> The color of the rounded rectangle background (default: 0x000000)</li>
    <li><strong>distance</strong> The distance for the floating item to move (default: 40)</li>
    <li><strong>easing</strong> The easing function to use for animation (default: Phaser.Easing.Quintic.Out)</li>
    <li><strong>timeToLive</strong> How much time (in ms) for the floating item to disapear (default: 600)</li>
    <li><strong>customPath</strong> The custom path to use with bezier tweening, should be in the form of [{x:10, y:10},{x:20,y:20}] (default: [])</li>
    <li><strong>align</strong> Where to align the floating item, options: "left, right, center" (default: "center")</li>
</ul>

### Documentation is incomplete.

<strong>API Functions</strong>

<ul>
    <li><strong>showFloatingText</strong> Reveals the specific flowing text</li>
    <li><strong>hideFloatingText: </strong> Hides the specific flowing text</li>
</ul>

<i>
</i>

<hr>

<strong>Buy me a coffee or tea!</strong> <br>
<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=JCFPKZJ7Y23JJ&lc=GR&item_name=NetGfx%2ecom&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img src="https://www.paypalobjects.com/webstatic/en_US/btn/btn_donate_92x26.png"/></a>


<hr>

>The TODO list is diminising!

>Please let me know if you come across some bug or have something to contribute
