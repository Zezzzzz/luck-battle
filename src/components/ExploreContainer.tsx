import './ExploreContainer.css';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div className="container">
      <div className="numberContainer"><p id="luck"></p></div>
      <div className="pigContainer">
        <img className="pig" id="pig" src="assets/IdlePigS.gif"></img>
      </div>
      <div id="startButtonContainer" onClick={handleClick}>
        <div className="text-box">
          <h4>Start</h4>
        </div>
        <img src="assets/startButton.png"></img>
      </div>
    </div>
  );
};

function handleClick(){
  var startButton = document.getElementById("startButtonContainer") as HTMLDivElement;
  startButton.style.pointerEvents = "none";
  var luck = document.getElementById("luck") as HTMLParagraphElement;
  function rollAnimation(time: number,callback: () => void){
    var startTime = new Date().getTime();
    var i = setInterval(function(){
        luck.innerHTML = Math.floor(Math.random() * (100 - (-100)) - 100).toString();
        if(new Date().getTime() - startTime > time){
            clearInterval(i);
            callback();
        }
    }, 100);
  }
  let date = new Date().toJSON().slice(0,10).replace(/-/g,'-');
  let id = Math.floor((Math.random() * 100) + 1);
  var imgTag = document.getElementById("pig") as HTMLImageElement;
  fetch(`http://localhost:8080/luck/add?date=${date}&id=${id}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  })
  .then(function(response) {
    return response.json();
  })
  .then((myJson)=>{
    if(myJson["luck"] < 0){
      imgTag.src = "assets/StupidPig.gif";
      rollAnimation(3200,function(){
        imgTag.src = "assets/BadPig.gif";
        luck.innerHTML = Math.round(myJson["luck"]).toString();
        startButton.style.pointerEvents = "auto";
      })
    } else{
      imgTag.src = "assets/SuccessPig.gif";
      rollAnimation(3000,function(){
        imgTag.src = "assets/SSPig.gif";
        luck.innerHTML = Math.round(myJson["luck"]).toString();
        startButton.style.pointerEvents = "auto";
      })
    }
  })
  .catch(function() {
    console.log("error");
  });
}


export default ExploreContainer;
