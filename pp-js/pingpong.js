let w = 0, h = 0, dx = 1, dy = 1, canvas = "", t = 30, l = 30, score1 = 0, score2 = 0, tout = "", isOn = true;
            let keys = new Map();

            window.onload = function(){
                canvas = document.getElementById('canvas');
                w = window.innerWidth;
                h = window.innerHeight;
                canvas.width = w;
                canvas.height = h;
                t = (Math.random() * h) - 30;
                l = (Math.random() * h) - 30;
                b1t = h/2 - 75; 
                b2t = h/2 - 75;
                startGame();
            }

            window.onresize = function(){
                canvas = document.getElementById('canvas');
                w = window.innerWidth;
                h = window.innerHeight;
                canvas.width = w;
                canvas.height = h;
                
            }

            window.onkeydown = function(e)
            {
                let evt = e || window.event;
                keys.set(evt.keyCode, true);
                if(keys.has(32))
                {
                    if(!isOn)
                    {
                        isOn = true;
                        startGame();
                    }
                    else
                    {
                        isOn = false;
                        const canvas = document.getElementById('canvas');
                        const ctx = canvas.getContext('2d');
                        ctx.font = "30px Comic Sans MS";
                        ctx.fillStyle = "orange";
                        ctx.textAlign = "center";
                        ctx.fillText("Press space to continue", w/2, h/2); 
                    }
                }
            }

            window.onkeyup = function(e)
            {
                let evt = e || window.event;
                if(keys.has(evt.keyCode))
                {
                    keys.delete(evt.keyCode);
                
                }
            }
            
            function startGame()
            {
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');
                    
                if(isOn && !gameOver)
                {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    drawBall(ctx);
                    drawBats(ctx);
                    checkValidBallLimits();
                    updateScores(ctx);
                    window.setTimeout(startGame, 1);
                }
                else
                {
                    checkForScores(ctx);
                    if(gameOver)
                    {
                        gameOver = false;
                        score1 = score2 = 0;
                        ctx.fillText("Press Space to Restart", canvas.width/2, h/2 + 30); 
                    }
                }
            }

            function drawBall(ctx)
            {
                t = isNaN(t) ? 0 : t;
                l = isNaN(l) ? 0 : l;
                if(t >= h - 30)
                {
                    dy = -1;
                }
                if(l >= w - 30)
                {
                    dx = -1;
                }
                if(t <= 0)
                {
                    dy = 1;
                }
                if(l <= 0)
                {
                    dx = 1;
                }

                t = t + (dy * 5);
                l = l + (dx * 5);
                ctx.fillStyle = 'red';
                ctx.fillRect(l, t, 30, 30);
                
            }
            let b1t = h/2 - 75, b2t = h/2 - 75;
            function drawBats(ctx)
            {
                if(keys.has(83))
                {
                    b1t = b1t + 5;
                }
                if(keys.has(87))
                {
                    b1t = b1t - 5;
                }
                b1t = b1t <= 0 ? 0 : b1t;
                b1t = b1t >= (h - 150) ? (h-150) : b1t;
                
                ctx.fillStyle = 'green';
                ctx.fillRect(0, b1t, 30, 150);

                if(keys.has(38))
                {
                    b2t = b2t - 5;
                }
                if(keys.has(40))
                {
                    b2t = b2t + 5;
                }
                b2t = b2t <= 0 ? 0 : b2t;
                b2t = b2t >= (h - 150) ? (h-150) : b2t;
                
                ctx.fillStyle = 'blue';
                ctx.fillRect(w - 30, b2t, 30, 150);
            }
            let gameOver = false;
            function checkValidBallLimits()
            {
                if(l < 30 && (!(t + 30 >= b1t && t <= b1t + 150)))
                {
                    l = 50;
                    score2++;
                    isOn = false;
                    
                }
                else if((l > w - 60) && (!(t + 30 >= b2t && t <= b2t + 150)))
                {
                    l = w - 60;
                    score1++;
                    isOn = false;
                }
               
            }

            function updateScores(ctx)
            {
                ctx.font = "30px Comic Sans MS";
                ctx.fillStyle = "red";
                ctx.textAlign = "center";
                ctx.fillText("Player1: "+score1+" | Player2: "+score2, canvas.width/2, 30); 
            }
            
            function checkForScores(ctx)
            {
                if(score1 > score2 && score1 == 7)
                {
                    gameOver = true;
                    ctx.font = "30px Comic Sans MS";
                    ctx.fillStyle = "green";
                    ctx.textAlign = "center";
                    ctx.fillText("Player1 Won the game!", w/2, h/2); 
                    dx = -dx;
                    dy = -dy;
                    
                }
                else if(score1 < score2 && score2 == 7)
                {
                    gameOver = true;
                    ctx.font = "30px Comic Sans MS";
                    ctx.fillStyle = "blue";
                    ctx.textAlign = "center";
                    ctx.fillText("Player2 Won the game!", w/2, h/2); 
                    dx = -dx;
                    dy = -dy;
                    
                }
                else
                {
                    dx = -dx;
                    dy = -dy;
                    ctx.font = "30px Comic Sans MS";
                    ctx.fillStyle = "orange";
                    ctx.textAlign = "center";
                    ctx.fillText("Press space to continue", w/2, h/2); 
                }
            }