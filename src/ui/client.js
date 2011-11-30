$(function () {
    var socket = io.connect();

    socket.on('connect', function (data) {
        console.log(data);
        $.ajax({
            type:'POST',
            url:'/commands',
            data:{name:'addCharacter', data:{id:2, name:'Lynn'}},
            success:function () {
                console.log("Success!");
            },
            dataType:'json'
        });
    });

    socket.on('characterCreated', function (data) {
        console.log(data);
    });

    socket.on('characterMoved', function (data) {
        $('#location').text(JSON.stringify(data));
    });

    $(".button").click(function () {
        $.ajax({
            type:'POST',
            url:'/commands',
            data:{name:'moveCharacter', data:{id:2, location:[$("input#x").val(), $("input#y").val(), $("input#z").val()]}},
            success:function () {
                console.log("Success!");
            },
            dataType:'json'
        });
        return false;
    });
});
