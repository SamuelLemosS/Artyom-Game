
//Menu codes


const buttonsLevel= async()=>{
    
    const response = await fetch("fases.json");
    const data = await response.json();
    buttons.innerHTML=""
    for(let i=0;i<data.length;i++){
        buttons.innerHTML+=`<input type="button" onclick="chooseLevel(${i})" value="Level ${i+1}"><br>`;
    }
}
const chooseLevel =  async(level) => {
    const response = await fetch("fases.json");
    const data = await response.json();
    buttons.innerHTML=""
    for(let i=0;i<data[level].length;i++){
        buttons.innerHTML+=`<input type="button" onclick="choosePhase('${i}')" value="${Object.keys(data[0][i])}"/><br>`;
    }
  };

buttonsLevel()

//Game codes

const choosePhase = async(phase)=>{
    const response = await fetch("fases.json");
    const data = await response.json();
    if(phase=="palavras"){

    }else{
        buttons.innerHTML=`<br><input type="button" onclick="startArtyon()" value="Começar"/></br>`;
        const arrayText =Object.values(data[0][phase]);
        console.log(arrayText);
        for(var i=0;i<arrayText.length;i++){
                console.log(arrayText[i])
                arrayText1=arrayText[i];
        }
        for(var i=0;i<arrayText1.length;i++){
            console.log(arrayText1[i])
            text.innerHTML+=arrayText1[i];
        }

        artyom.redirectRecognizedTextOutput(function(text,isFinal){
            if(isFinal){
                let hits=0;
                var ArrayPalavras=Artyom.prototype.splitStringByChunks(text,1);
                for(var i=0;i<ArrayPalavras.length;i++){
                    console.log(ArrayPalavras[i]+"<-recebe|json->"+arrayText1[i])
                    console.log(ArrayPalavras[i]==arrayText1[i])
                    if(ArrayPalavras[i]==arrayText1[i]){
                        hits++;
                    }
                }
                if(hits>=(ArrayPalavras.length*0.9)){
                    result.innerHTML="Parabes voce conseguiu 3 estrelas<br>"
                }else if(hits>=(ArrayPalavras.length*0.75)){
                    result.innerHTML="Voce conseguiu 2 estrelas<br>"
                }else if(hits>=(ArrayPalavras.length*0.5)){
                    result.innerHTML="Voce consegiu 1 estrelas<br>"
                }else{
                    result.innerHTML="Voce nao conseguiu nenhuma estrela"
                }
                result.innerHTML+=`<input type="button" onclick="buttonsLevel()" value="Voltar ao começo"/><br>`;
                result.innerHTML+=`<input type="button" onclick="choosePhase('${phase+1}')" value="Proxima fase"/><br>`;
            }
        });
    } 

}
//Artyom codes

var artyom = new Artyom();


    artyom.addCommands([//precisa de um comando
        {
          descripition:"Lendo zebra",
          indexes:["Zebra"],
          action:function(i){  
            if(i==0){
                h3.innerHTML=`Acertou`;
            }
          }
        },
    ]); 

    function startArtyon(){//nao da pra startar 2 vezes, procurar como reiniciar
        artyom.initialize({
            lang:"pt-BR",
            continuous:false, // Listen forever, dps de um comando ele continua ouvindo
            soundex: false, // Use the soundex algorithm to increase accuracy
            debug:true, // Show messages in the console
            listen:true // Start to listen commands !
        })
    }

    function stopArtyon(){
        artyom.fatality();
    }