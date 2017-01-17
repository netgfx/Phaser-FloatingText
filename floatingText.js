var FloatingText = function(state, options) {

    var _obj = {};
    var floatingTextGroup = state.add.group();
    var mainFloatingTextPool;
    var easings = [
        Phaser.Easing.Cubic.InOut,
        Phaser.Easing.Sinusoidal.In,
        Phaser.Easing.Quadratic.InOut,
        Phaser.Easing.Quartic.Out,
        Phaser.Easing.Linear,
        Phaser.Easing.Cubic.In,
        Phaser.Easing.Quintic.Out,
        Phaser.Easing.Quintic.InOut
    ];

    function createFloatingText(store) {
        var _text = options.text || "";
        var _textOptions = options.textOptions || {
            fontSize: 12,
            fill: "#ffffff",
            stroke: "#1e1e1e",
            strokeThickness: 1,
            wordWrap: true,
            wordWrapWidth: 200
        };
        var _sprite = options.sprite || null;
        var _spriteAnimationName = options.spriteAnimationName || "";
        var _spriteAnimationFrames = options.spriteAnimationFrames || [];
        var _spriteAnimationFrameRate = options.spriteAnimationFrameRate || 24;
        var _spriteAnimationRepeat = options.spriteAnimationRepeat || true;
        var _spritePlayAnimationOnStart = options.playAnimationOnStart || true;
        var _spriteAnchor = options.spriteAnchor || 0.5;
        var _x = options.x || "auto";
        var _y = options.y || "auto";
        var _rotation = options.rotation || false;
        var _parentObj = options.parentObj || null;
        var _width = options.width || "auto";
        var _height = options.height || "auto";
        var _hasBackground = options.hasBackground || false;
        var _backgroundColor = options.backgroundColor || 0x000000;
        var _animation = options.animation || "explode"; // explode, smoke, custom, directional: up, down, left, right, fade, physics
        var _distance = options.distance || 40;
        var _easing = options.easing || Phaser.Easing.Quintic.Out;
        var _timeToLive = options.timeToLive || 600 // in ms
        var _fixedToCamera = options.fixedToCamera || false;
        var _align = options.align || "center";
        var _customPath = options.customPath || [];

        // create the element
        if (_sprite === null) {
            _obj = state.add.text(0, 0, _text, _textOptions);
            //_obj.anchor.setTo(_spriteAnchor);
        } else {
            _obj = state.add.sprite(_sprite.x, _sprite.y, _sprite.key, _spriteAnimationFrames[0]);
            _obj.anchor.setTo(_spriteAnchor);
            _obj.animations.add(_spriteAnimationName, _spriteAnimationFrames, _spriteAnimationFrameRate, _spriteAnimationRepeat, true);
        }

        if (_rotation !== false) {
            _obj.angle = _rotation;
        }

        if (_parentObj !== null && _parentObj !== undefined) {
            if (_x === "auto") {
                if (_parentObj.anchor === 0) {
                    _obj.x = _parentObj.x + _parentObj.width / 2 - _obj.width / 2;
                } else {
                    _obj.x = _parentObj.x - _obj.width / 2;
                }
            } else {
                _obj.x = _x;
            }

            if (_y === "auto") {
                if (_parentObj.anchor === 0) {
                    _obj.y = _parentObj.y + _parentObj.height / 2 - _obj.height / 2;
                } else {
                    _obj.y = _parentObj.y - _obj.height / 2;
                }
            } else {
                _obj.y = _y;
            }
        } else {
            if (_align === "center") {
                if (_sprite !== null) {
                    _obj.x = _x - _obj.width * _spriteAnchor / 2;
                    _obj.y = _y - _obj.height * _spriteAnchor / 2;
                } else {
                    _obj.x = _x - _obj.width / 2;
                    _obj.y = _y - _obj.height / 2;
                }
            } else if (_align === "left") {
                _obj.x = _x;
                _obj.y = _y;
            } else if (_align === "right") {
                _obj.x = _x + _obj.width;
                _obj.y = _y + _obj.height;
            } else if (_align === "none") {
                _obj.x = _x;
                _obj.y = _y;
            }
        }

        var modal;
        if (_hasBackground === true) {
            modal = state.add.graphics(_obj.width + 10, _obj.height);
            modal.beginFill(_backgroundColor, 1);
            //modal.x = _obj.x - 5;
            //modal.y = _obj.y - 5;
            floatingTextGroup.width = _obj.width+5;
            floatingTextGroup.height = _obj.width+5;
            modal.drawRoundedRect(0, 0, _obj.width+10, _obj.height, 6);
            modal.endFill();
            floatingTextGroup.add(modal);
        } else {
            floatingTextGroup.width = _obj.width;
            floatingTextGroup.height = _obj.height;
        }

        if (_fixedToCamera === true) {
            floatingTextGroup.fixedToCamera = true;
        }

        floatingTextGroup.x = _obj.x;
        floatingTextGroup.y = _obj.y;
        _obj.x = 0;
        _obj.y = 0;
        if(modal !== undefined) {
            modal.x = -5;
            modal.y = 0;
        }
        _obj._animation = _animation;
        _obj._easing = _easing;
        _obj._timeToLive = _timeToLive;
        _obj._distance = _distance;
        _obj._customPath = _customPath;
        _obj._spriteAnimationName = _spriteAnimationName;
        _obj._sprite = _sprite;
        floatingTextGroup.add(_obj);
        floatingTextGroup.visible = false;

        if(store !== true) {
        	animateFloatingText();
    	}
    	else {
    		return floatingTextGroup;
    	}
    }

    function animateFloatingText() {

        var type = _obj._animation;
        floatingTextGroup.visible = true;
        if (_obj._sprite !== null) {
            _obj.animations.play(_obj._spriteAnimationName);
        }

        if (type === "physics") {
            var startX = floatingTextGroup.x;
            var startY = floatingTextGroup.y
            var side = state.rnd.integerInRange(0, 10);
            if (side > 5) {
                var firstBezierPointX = floatingTextGroup.x + 25;
                var firstBezierPointY = floatingTextGroup.y - 50;
                var secondBezierPointX = floatingTextGroup.x + 50;
                var secondBezierPointY = floatingTextGroup.y - 25;
                var endX = floatingTextGroup.x + 100;
                var endY = floatingTextGroup.y + 50;
            } else {
                var firstBezierPointX = floatingTextGroup.x - 25;
                var firstBezierPointY = floatingTextGroup.y - 50;
                var secondBezierPointX = floatingTextGroup.x - 50;
                var secondBezierPointY = floatingTextGroup.y - 25;
                var endX = floatingTextGroup.x - 100;
                var endY = floatingTextGroup.y + 50;
            }
            var tweenObj = state.add.tween(floatingTextGroup).to({
                x: [startX, firstBezierPointX, secondBezierPointX, endX],
                y: [startY, firstBezierPointY, secondBezierPointY, endY],
            }, _obj.timeToLive, Phaser.Easing.Circular.Out, true).interpolation(function(v, k) {
                return Phaser.Math.bezierInterpolation(v, k);
            });

            tweenObj.onComplete.addOnce(function() {
                var _tweenObj = tweenProperty(this, "alpha", {
                    alpha: 0
                }, 250, 0);

                _tweenObj.onComplete.addOnce(function() {
                    this.destroy();
                }, this);
            }, floatingTextGroup);

        } else if (type === "custom") {
            var pointsX = [];
            var pointsY = [];
            for (var i = 0; i < _obj._customPath.length; i++) {
                pointsX.push(_obj._customPath[i].x);
                pointsX.push(_obj._customPath[i].y);
            }

            var tweenObj = state.add.tween(floatingTextGroup).to({
                x: pointsX,
                y: pointsY,
            }, _obj.timeToLive, Phaser.Easing.Circular.Out, true).interpolation(function(v, k) {
                return Phaser.Math.bezierInterpolation(v, k);
            });

            tweenObj.onComplete.addOnce(function() {
                var _tweenObj = tweenProperty(this, "alpha", {
                    alpha: 0
                }, 250, 0);

                _tweenObj.onComplete.addOnce(function() {
                    this.destroy();
                }, this);
            }, floatingTextGroup);
        } else if (type === "explode") {
            floatingTextGroup.pivot.setTo(0.5, 0.5);

            var textObj = floatingTextGroup.children[floatingTextGroup.children.length - 1];
            var tweenObj = tweenProperty(textObj, "size", { fontSize: textObj.fontSize * 2 }, 250, 0, Phaser.Easing.Back.Out);

            var scaleX = textObj.width * 2 - textObj.width;
            var scaleY = textObj.height * 2 - textObj.height;
            tweenProperty(floatingTextGroup.position, "position", { x: floatingTextGroup.position.x - scaleX / 2, y: floatingTextGroup.position.y - scaleY / 2 }, 250, 0, Phaser.Easing.Back.Out);


            tweenObj.onComplete.addOnce(function() {
                var _tweenObj = tweenProperty(this, "alpha", {
                    alpha: 0
                }, 250, _obj._timeToLive);

                _tweenObj.onComplete.addOnce(function() {
                    this.destroy();
                }, this);
            }, floatingTextGroup);
        } else if (type === "smoke") {
            var startX = floatingTextGroup.x;
            var startY = floatingTextGroup.y
            var side = state.rnd.integerInRange(0, 10);
            var pointsX = [];
            var pointsY = [];
            var pivot = 0;
            for (var i = 0; i < 12; i++) {
                if (pivot < 3 && pivot > 0) {
                    pointsX.push(startX + (10 * Math.abs(pivot)));
                    pointsY.push(startY - (_obj._distance / 12 * i));
                    pivot += 1;
                } else if (pivot === 3) {
                    pivot = 0;
                    pointsX.push(startX - (10 * Math.abs(pivot)));
                    pointsY.push(startY - (_obj._distance / 12 * i));
                    pivot -= 1;
                } else if (pivot === -3) {
                    pivot = 0;
                    pointsX.push(startX - (10 * Math.abs(pivot)));
                    pointsY.push(startY - (_obj._distance / 12 * i));
                    pivot += 1;
                } else if (pivot > -3) {
                    pointsX.push(startX - (10 * Math.abs(pivot)));
                    pointsY.push(startY - (_obj._distance / 12 * i));
                    pivot -= 1;
                }
            }

            var tweenObj = state.add.tween(floatingTextGroup).to({
                x: pointsX,
                y: pointsY,
            }, _obj.timeToLive, Phaser.Easing.Circular.Out, true).interpolation(function(v, k) {
                return Phaser.Math.bezierInterpolation(v, k);
            });

            tweenObj.onComplete.addOnce(function() {
                var _tweenObj = tweenProperty(this, "alpha", {
                    alpha: 0
                }, 250, 0);

                _tweenObj.onComplete.addOnce(function() {
                    this.destroy();
                }, this);
            }, floatingTextGroup);
        } else if (type === "up") {
            var tweenObj = tweenProperty(floatingTextGroup, "y", {
                y: floatingTextGroup.y - _obj._distance
            }, 400, 100, _obj._easing);

            tweenObj.onComplete.addOnce(function() {
                reg.floatingGroup = floatingTextGroup;
                var _tweenObj = tweenProperty(floatingTextGroup, "alpha", {
                    alpha: 0
                }, 150, _obj._timeToLive);

                _tweenObj.onComplete.addOnce(function() {
                    this.removeAll(true);
                    this.destroy();
                }, this);
            }, floatingTextGroup);
        } else if (type === "down") {
            var tweenObj = tweenProperty(floatingTextGroup, "y", {
                y: floatingTextGroup.y + _obj._distance
            }, 400, 100, _obj._easing);

            tweenObj.onComplete.addOnce(function() {
                var _tweenObj = tweenProperty(this, "alpha", {
                    alpha: 0
                }, 250, _obj._timeToLive);

                _tweenObj.onComplete.addOnce(function() {
                    this.destroy();
                }, this);
            }, floatingTextGroup);
        } else if (type === "left") {
            var tweenObj = tweenProperty(floatingTextGroup, "y", {
                y: floatingTextGroup.x - _obj._distance
            }, 400, 100, _obj._easing);

            tweenObj.onComplete.addOnce(function() {
                var _tweenObj = tweenProperty(this, "alpha", {
                    alpha: 0
                }, 250, _obj._timeToLive);

                _tweenObj.onComplete.addOnce(function() {
                    this.destroy();
                }, this);
            }, floatingTextGroup);
        } else if (type === "right") {
            var tweenObj = tweenProperty(floatingTextGroup, "y", {
                y: floatingTextGroup + _obj._distance
            }, 400, 100, _obj._easing);

            tweenObj.onComplete.addOnce(function() {
                var _tweenObj = tweenProperty(this, "alpha", {
                    alpha: 0
                }, 250, _obj._timeToLive);

                _tweenObj.onComplete.addOnce(function() {
                    this.destroy();
                }, this);
            }, floatingTextGroup);
        } else if (type === "fade") {
            floatingTextGroup.alpha = 0;
            var tweenObj = tweenProperty(floatingTextGroup, "alpha", {
                alpha: 1
            }, 250, 50, _obj._easing);

            tweenObj.onComplete.addOnce(function() {
                var _tweenObj = tweenProperty(this, "alpha", {
                    alpha: 0
                }, 350, _obj._timeToLive);

                _tweenObj.onComplete.addOnce(function() {
                    this.destroy();
                }, this);
            }, floatingTextGroup);
        }
    }

    function createPool() {
    	var numOfItems = options.numOfItems || 50;
    	mainFloatingTextPool = state.add.group();
    	for(var i=0;i<numOfItems;i++) {
    		mainFloatingTextPool.add(createFloatingText(true));
    	}
    }

    /**
     * [tweenProperty description]
     * @param  {[type]} item     [description]
     * @param  {[type]} property [description]
     * @param  {[type]} obj      [description]
     * @param  {[type]} duration [description]
     * @return {[type]}          [description]
     */
    function tweenProperty(item, property, obj, duration, delay, easing, yoyo, repeat, reverse) {

        delay = delay || {};
        easing = easing || Phaser.Easing.Linear.None;
        yoyo = yoyo || false;
        repeat = repeat || 0;

        var tween = state.add.tween(item).to(obj, duration, easing, true, delay, repeat, yoyo);
        tween.reverse = reverse || false;
        return tween;
    }

    if(options.numOfItems !== undefined){
    	createPool();
    }
    else {
    	createFloatingText();
	}

    // TODO: add factory

    return {
        showFloatingText: function() {
            floatingTextGroup.visible = true;
        },
        hideFloatingText: function() {
            floatingTextGroup.visible = false;
        }

    }
};
