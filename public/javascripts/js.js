function doubledutch() {
    var s =
    "          8       8       8       8       8       8      \n" +
    "         aaa     bbb     ccc     ddd     eee     fff     \n" +
    "*       ggggg   hhhhh   iiiii   jjjjj   kkkkk   lllll    \n" +
    "         mmm     nnn     ooo     ppp     qqq     rrr     \n" +
    "          8       8       8       8       8       8      ";

    var start = false;
    var running = false;
    var whatShouldIDo;
    var position = 2, prevPosition = 2;
    var char = "d";
    (function () {
        var cycle = 0;
        var iv = setInterval(function () {
            if (start) {
                position = 2;
                char = "d";
                if (cycle % 4 === 0) {
                    running = true;
                    start = false;
                }
            }

            var action = "wait";
            if (running) {
                action = whatShouldIDo();
                switch (action) {
                    case "step":
                        position += 2;
                        break;
                    case "jump":
                        char = "D";
                        break;
                    default:
                        action = "wait";
                        break;
                }
            }

            var die = false, end = false;
            var output = s
                .replace(/aaa/, top(cycle))
                .replace(/bbb/, top(cycle+1))
                .replace(/ccc/, top(cycle+2))
                .replace(/ddd/, top(cycle+3))
                .replace(/eee/, top(cycle))
                .replace(/fff/, top(cycle+1))

                .replace(/ggggg/, mid(cycle))
                .replace(/hhhhh/, mid(cycle+1))
                .replace(/iiiii/, mid(cycle+2))
                .replace(/jjjjj/, mid(cycle+3))
                .replace(/kkkkk/, mid(cycle))
                .replace(/lllll/, mid(cycle+1))

                .replace(/mmm/, bot(cycle))
                .replace(/nnn/, bot(cycle + 1))
                .replace(/ooo/, bot(cycle + 2))
                .replace(/ppp/, bot(cycle + 3))
                .replace(/qqq/, bot(cycle))
                .replace(/rrr/, bot(cycle + 1))

                .replace(/\*.*\n/, function (m) {
                    position = Math.min(position, m.length - 2)
                    if (position >= m.length - 2) end = true;
                    var rope = m.substr(position, 1);
                    var prevRope = m.substr(prevPosition, 1);
                    if (action !== "jump" && (rope !== " " || prevRope !== " ")) {
                        die = true;
                        running = false;
                        char = "p";
                    }
                    return m.substring(0, position) + char + m.substring(position + 1);
                });
            $("#theater").text(output);

            char = char.toLowerCase();
            prevPosition = position;
            cycle++;
            if (end) {
                clearInterval(iv);
                var email = prompt("Nice! At DoubleDutch, we're always looking for talented and creative engineers. Give us your email if you'd like to send us your solution and get more info. No spam lists, we promise.")
                $.ajax("#", {
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify({ "email": email, "solution": $("#code").val() })
                }).always(function() {
                    window.location = "http://doubledutch.me/about.html"
                });
            }

        }, 400);
    })();

    function render() {
        
    }

    function top(cycle) {
        switch (cycle % 4) {
            case 0: return " | ";
            case 1: return "/  ";
            case 2: return " | ";
            case 3: return "  \\";
        }
    }

    function mid(cycle) {
        switch (cycle % 4) {
            case 0: return "  |  ";
            case 1: return "(    ";
            case 2: return "  !  ";
            case 3: return "    )";
        }
    }

    function bot(cycle) {
        switch (cycle % 4) {
            case 0: return " | ";
            case 1: return "\\  ";
            case 2: return " | ";
            case 3: return "  /";
        }
    }

    $("#go").on("click", function () {
        //var fun = eval("function() {" + $("#code").val() + "}");
        eval("__funFun = function() {" + $("#code").val() + "}");
        whatShouldIDo = __funFun();
        start = true;
    });
}