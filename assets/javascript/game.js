$(document).ready(function(){
//character/stat array start 
var character = [{name: "Onoda", hp: 200,ap:25, live: true, img: '<img class="player" value="0" src="assets/images/onodakun.jpg" width="300" height="500">'},
    {name:"Manami", hp:150, ap:10, live:true, img:'<img class="player" value="1" src="assets/images/manamikun.jpg" width="300" height="500">'},
    {name:"Makishima", hp:120, ap:8, live:true, img:'<img class="player" value="2" src="assets/images/makishimakun.jpg" width="300" height="500">'},
    {name:"Midousuji", hp:90, ap:45, live:true, img:'<img class="player" value="3" src="assets/images/midousujikun.jpg" width="300" height="500">'}]
//character display
for(var i=0;i<4;i++){
    $(".gamearea").append(character[i].img);
}

var playerclickcheck = false;
var killcount = 0;
       
// first click: fighter
if(playerclickcheck == false){
    $(".gamearea").on("click", ".player", function(){
    $(this).removeClass("player");
    $(".battlearea").append($(".player"));
    $(".player").addClass("enemy").removeClass("player");
    $(this).addClass("hero");
    // character objects
    var heroindex = $(".hero").attr("value");
    heroObj = character[parseInt(heroindex)];
    // fighter stats
    $(".gamearea").prepend("<h2>"+heroObj.name+"</h2>").addClass("gamefont");
    playerclickcheck = true;
    })
}
// second click: defender(s)
$(".battlearea").on("click",".enemy", function(){
    $(this).removeClass("hero").removeClass("enemy").addClass("defender");
    $(".defendarea").append($(".defender"));
    // character objects
    var defenderindex = $(".defender").attr("value");
    defenderObj = character[parseInt(defenderindex)];
    // defender stats
    $(".defendarea").prepend("<h2>"+defenderObj.name+"</h2>").addClass("gamefont");
    });
// please work button 
$("#attack").on("click",function(){
    var heroindex = $(".hero").attr("value");
    var defenderindex = $(".defender").attr("value");

    heroObj = character[parseInt(heroindex)];
    defenderObj = character[parseInt(defenderindex)];
    $(".defenderHP").empty();
    $(".heroHP").empty();
    $(".defendarea").append("<h4 class='defenderHP'> HP: "+defenderObj.hp+"</h4>").addClass("gamefont");
    $(".gamearea").append("<h4 class='heroHP'> HP: "+heroObj.hp+"</h4>").addClass("gamefont");
    defenderObj.hp = defenderObj.hp - heroObj.ap;
    heroObj.hp = heroObj.hp - defenderObj.ap;
    heroObj.ap = heroObj.ap + 10;

    alert(character[heroindex].name+" attacks "+ character[defenderindex].name+" with "+character[parseInt(heroindex)].ap+" Attack Power");
    alert(character[defenderindex].name +" attacks "+ character[heroindex].name+" with "+character[parseInt(defenderindex)].ap+" Attack Power");
    
    if(defenderObj.hp<= 0){
        alert("You have defeated "+defenderObj.name);
        $(".defendarea").empty();
        defenderObj.live = false;
        killcount++;
        if(killcount == 3&&heroObj.hp>=0){
            $(".gamearea").empty();
            $(".defendarea").empty();
            $(".battlearea").empty();
            $(".gamearea").prepend("<h1>You Win</h1>");
        }
    }
    if(heroObj.hp<=0){
        alert(heroObj.name+" have been defeated "+defenderObj.name);
        $(".gamearea").empty();
        $(".defendarea").empty();
        $(".battlearea").empty();
        $(".gamearea").prepend("<h1>You Lose</h1>")
        heroObj.live = false;
    } 

})



});