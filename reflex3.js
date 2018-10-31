 var maxBox;
        var index;
        var objBox;
        var box;
        var blnGameStarted;
        var wrongClicks;
        var displayCount;
        var tlog;
        var intervalTime;
        var timer;
        var game;
        var btnStart;
        var btnRestart;
        index = 11;
        blnGameStarted = false;
        wrongClicks = 0;
        displayCount = 0;
        var boxes = [];
        var clicked = false;
        var is_ie8 = false;
        var slider;
        var txtScore;
        var txtTime;
        var timeValue;
        var scoreValue = 0;
        var lastSpeedValue = 100;
        var timeBase = 600;
        var timeMin = 400;
        var timeOut = 1000;
        if (localStorage && localStorage.lastSpeedValue) {
            lastSpeedValue = JSON.parse(localStorage.lastSpeedValue);
            updateSpeed(lastSpeedValue)
        }
        var isInit = false;

        function init() {
            if (!isInit) {
                slider = $("#speed_slider");
                slider.slider({
                    min: 0,
                    max: 100,
                    value: lastSpeedValue,
                    slide: updateSpeedHndlr
                });
                txtScore = document.getElementById("txtScore");
                txtTime = document.getElementById("txtTime");
                btnStart = document.getElementById("btnStart");
                btnRestart = document.getElementById("btnRestart");
                tlog = document.getElementById("logg");
                intervalTime = document.getElementById("intervalTime");
                updateSpeedStr();
                initialize();
                if (is_ie8) {
                    intervalTime.style.color = "black";
                    txtScore.style.color = "black";
                    txtTime.style.color = "black";
                    btnRestart.style.color = "black";
                    btnStart.style.color = "black";
                    txtScore.innerHTML = 0;
                    document.styleSheets[0].addRule("#txtScore:after", "content: '" + scoreValue + "';")
                }
                isInit = true
            }
        }
        $.ready(init);
        if (window.addEventListener) {
            window.addEventListener("unload", function () {
                if (localStorage) {
                    localStorage.lastSpeedValue = lastSpeedValue
                }
            });
            window.addEventListener("load", init);
            window.addEventListener("DOMContentLoaded", init)
        } else {
            window.onload = init;
            is_ie8 = true
        }

        function updateSpeedStr() {
            intervalTime.innerHTML = "Speed: " + (timeOut / 1000) + "s"
        }

        function updateSpeedHndlr(a, b) {
            lastSpeedValue = b.value;
            updateSpeed(lastSpeedValue);
            updateSpeedStr()
        }

        function updateSpeed(a) {
            timeOut = Math.floor(timeBase * (a / 100)) + timeMin
        }
        var totalTime = 60;

        function initialize() {
            var checkBox = document.getElementById("myCheck");
            logf("...");
            displayCount = 0;
            wrongClicks = 0;
            txtTime.value = totalTime;
            timeValue = totalTime;
            txtScore.value = 0;
            scoreValue = 0;
            blnGameStarted = 1;
            if (checkBox.checked == true) {
                maxBox = elementNum;
                setupRandom();
                box = 10;
                setTimeout(startTime, 10);
                disableStart();
                highlightRandomBox();
                game = setInterval(gameLoop, timeOut)
            } else {
                enableStart()
            }
            if (displayCount != 0) {
                throw "bad displayCount: " + displayCount
            }
        }

        function resetGame() {
            var checkBox = document.getElementById("myCheck");
            checkBox.checked = false;
            clearInterval(timer);
            clearInterval(game);
            dehighlight();
            initialize()
        }
        var animSpeed = 75;

        function animate() {
            btnStart.disabled = true;
            if (index < maxBox + 1) {
                document.getElementById("td" + (index - 1)).style.backgroundColor = "white";
                document.getElementById("td" + index).style.backgroundColor = "yellowgreen";
                setTimeout(animate, animSpeed);
                index = index + 1
            } else {
                setTimeout(function () {
                    var a = document.getElementsByTagName("td");
                    a.map(function (b) {
                        b.style.backgroundColor = "white"
                    })
                }, animSpeed);
                initialize()
            }
        }

        function incrementScore() {
            scoreValue++;
            txtScore.value = scoreValue;
            if (is_ie8) {
                txtScore.innerHTML = scoreValue;
                document.styleSheets[0].addRule("#txtScore:after", "content: '" + scoreValue + "';")
            }
        }

        function checkClick(a) {
            if (blnGameStarted) {
                if (a.id == box) {
                    if (!clicked) {
                        incrementScore()
                    }
                } else {
                    wrongClicks++;
                    a.style.backgroundColor = "red";
                    setTimeout(clearBoxes, 200);
                    boxes.push(a.style)
                }
                clicked = true
            }
        }

        function clearBoxes() {
            if (boxes.length) {
                boxes.map(function (a) {
                    a.backgroundColor = "white"
                })
            }
        }
        var randBag;
        var oldRand;

        function setupRandom() {
            randBag = [];
            for (var b = 10; b < maxBox; b++) {
                randBag.push(b)
            }
            var a = randRange(0, maxBox - 10);
            oldRand = randBag.splice(a, 1)[0]
        }

        function randRange(b, a) {
            return (Math.floor(Math.random() * (a))) + b
        }

        function randMax(a) {
            return (Math.floor(Math.random() * (a)))
        }

        function getRandom() {
            var a = randMax(maxBox - 11);
            var b = randBag.splice(a, 1)[0];
            randBag.push(oldRand);
            oldRand = b;
            console.log(oldRand);
            return oldRand
        }

        function highlightRandomBox() {
            box = "td" + getRandom();
            document.getElementById(box).style.backgroundColor = "yellowgreen";
            clicked = false
        }

        function dehighlight() {
            displayCount++;
            document.getElementById(box).style.backgroundColor = "white"
        }

        function gameLoop() {
            dehighlight();
            if (blnGameStarted) {
                highlightRandomBox()
            }
        }

        function disableStart() {
            slider.slider({
                disabled: true
            });
            btnStart.disabled = true;
            blnGameStarted = true
        }

        function enableStart() {
            slider.slider({
                disabled: false
            });
            btnStart.disabled = false;
            blnGameStarted = false
        }

        function logf(a) {
            if (tlog && tlog.innerHTML) {
                tlog.innerHTML = a
            } else {
                if (a != "...") {
                    alert(a)
                }
            }
        }

        function decTimer() {
            timeValue--;
            txtTime.value = timeValue;
            if (timeValue == 0) {
                logf("Time Up!! You Scored " + txtScore.value + " out of " + displayCount + "\n\n No. of drunkard%$# clicks: " + wrongClicks);
                enableStart();
                dehighlight();
                clearInterval(timer);
                clearInterval(game)
            }
        }

        function startTime() {
            timer = setInterval(decTimer, 1000)
        };