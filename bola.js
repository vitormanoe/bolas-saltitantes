
const palco=document.querySelector("#palco")
const btnAdd=document.querySelector("#btnAdd")
const btnRemover=document.querySelector("#btnRemover")
const txtQtde=document.querySelector("#txtQtde")
const numObejetos=document.querySelector("#numObejetos")

let larguraP=palco.offsetWidth
let alturaP=palco.offsetHeight
let bolas=[]
let numBola=0

class Bola{
    constructor(arrayBolas,palco){
        this.tam=Math.floor(Math.random()*15)+10
        this.r=Math.floor(Math.random()*255)
        this.g=Math.floor(Math.random()*255)
        this.b=Math.floor(Math.random()*255)
        this.px=Math.floor(Math.random()*(larguraP-this.tam))
        this.py=Math.floor(Math.random()*(alturaP-this.tam))
        this.velx=Math.floor(Math.random()*2)+0.5
        this.vely=Math.floor(Math.random()*2)+0.5
        this.dirx=(Math.random()*10)>5?1:-1
        this.diry=(Math.random()*10)>5?1:-1
        this.palco=palco
        this.arrayBolas=arrayBolas
        this.id=Date.now()+"_"+Math.floor(Math.random()*100000000000)
        this.desenhar()
        this.controle=setInterval(this.controlar,10)
        this.eu=document.getElementById(this.id)
        numBola++
        numObejetos.innerHTML=numBola

    }
    minhasPos=()=>{
        return this.arrayBolas.indexOf(this)
    }
      remover=()=>{
        clearInterval(this.controle)
          bolas=bolas.filter((b)=>{
            if(b.id!=this.id){
                return b
            }
        })
        this.eu.remove()
        numBola--
        numObejetos.innerHTML=numBola
    }
    desenhar=()=>{
        const div=document.createElement("div")
                div.setAttribute("id",this.id)
                div.setAttribute("class","bola")
                div.setAttribute("style",`left:${this.px}px;top:${this.py}px;width:${this.tam}px;height: ${this.tam}px;background-color:rgb(${this.r},${this.g},${this.b})`)
                this.palco.appendChild(div)
            }
    controlBordas=()=>{
        if(this.px+this.tam >= larguraP){
            this.dirx=-1
        }else if(this.px <= 0){
            this.dirx=1
        }
        if(this.py+this.tam >= alturaP){
            this.diry=-1
        }else if(this.py <= 0){
            this.diry=1
        }
    }     
   
    controlar=()=>{
     this.controlBordas()
     this.px+=this.dirx*this.velx
     this.py+=this.diry*this.vely
     this.eu.setAttribute("style",`left: ${this.px}px;top: ${this.py}px;width: ${this.tam}px;height: ${this.tam}px;background-color:rgb(${this.r},${this.g},${this.b})`)
     if((this.px > larguraP)||(this.py > alturaP)){
        this.remover()
     }

    }
}

window.addEventListener("resize",(evt)=>{
     larguraP=palco.offsetWidth
     alturaP=palco.offsetHeight

})
btnAdd.addEventListener("click",(evt)=>{
    const qtde=txtQtde.value
    for(let i=0;i<qtde;i++){
        
        //instaciar bolinhas
        bolas.push(new Bola(bolas,palco))
    }
})
btnRemover.addEventListener("click",()=>{
    bolas.map((b)=>{
        //remover bolinhas
        b.remover()

    })
})