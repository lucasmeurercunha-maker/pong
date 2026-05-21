let y = 0;
let x = 0;
let inter = false;
let by = 540;
let bx = 198;
let velocidadeX = 10
let velocidadeY = Math.floor(Math.random() * 15);
let rebatendoX = false
let rebatendoY = false
let ms = 0
let seg = 0
let min = 0
let tela_morte = false
const teclas = {}

const bastao = document.getElementById('bastao');
const bola = document.getElementById('bola');
const body = document.body;
const cima = document.getElementById('cima')
const baixo = document.getElementById('baixo')

function andar(tecla){
    if (tecla == 'w') y -= 10;
    if (tecla == 's') y += 10;
    bastao.style.marginTop = y + 'px'
    inter = true
}
document.addEventListener('keydown', (evento) => {
    teclas[evento.key] = true
})

document.addEventListener('keyup', (evento) => {
    teclas[evento.key] = false
})

function loop() {
    if (teclas['w']) andar('w')
    if (teclas['s']) andar('s')
    requestAnimationFrame(loop)
}
loop()
//posicao bola
setInterval(() => {
    const hitbastao = bastao.getBoundingClientRect();
    const hitbola = bola.getBoundingClientRect();
    const hitbody = body.getBoundingClientRect();
    const hitcima = cima.getBoundingClientRect();
    const hitbaixo = baixo.getBoundingClientRect();
    if (inter){
        bx += velocidadeX;
        by += velocidadeY;
        bola.style.right = bx + 'px';
        bola.style.bottom = by + 'px'
    }
    //colisoes
    const bateubastao =
        hitbastao.right >= hitbola.left &&
        hitbastao.left <= hitbola.right &&
        hitbastao.bottom >= hitbola.top &&
        hitbastao.top <= hitbola.bottom;
    
    const bateucima =
        hitcima.right >= hitbola.left &&
        hitcima.left <= hitbola.right &&
        hitcima.top <= hitbola.bottom;

    const bateubaixo =
        hitbaixo.right >= hitbola.left &&
        hitbaixo.left <= hitbola.right &&
        hitbaixo.bottom >= hitbola.top;

    const bateuparede =
        hitbola.right >= window.innerWidth;
    
    const bateuteto = 
        hitbola.top <= 0 ||
        hitbola.bottom >= window.innerHeight;

    const rebater = bateubastao || bateuparede;
    //
    const tempoTotal = min*60000 + seg*1000 + ms*10
        const recordeSalvo = Number(localStorage.getItem('recorde')) || 0
        const novoRecorde = Math.max(tempoTotal, recordeSalvo)
        localStorage.setItem('recorde', novoRecorde)

        const rMin = Math.floor(novoRecorde / 60000)
        const rSeg = Math.floor((novoRecorde % 60000) / 1000)
        const rMs = Math.floor((novoRecorde % 1000) / 10)
        minR.textContent = String(rMin).padStart(2, '0')
        segR.textContent = String(rSeg).padStart(2, '0')
        msR.textContent = String(rMs).padStart(2, '0')
    // perder
    if (hitbola.left <= 20 && !rebatendoX){
        velocidadeX = 0;
        velocidadeY = 0;
        tela_morte = true;
        bola.style.backgroundColor = 'red';
        bola.style.width = '100px'
        bola.style.height = '100px'
        inter = false
        //atualiza o timer
        minR.textContent = String(rMin).padStart(2, '0')
        segR.textContent = String(rSeg).padStart(2, '0')
        msR.textContent = String(rMs).padStart(2, '0')
        //cria a tela de reiniciar
        if (!document.querySelector('.Rbody')){
            const Rbody = document.createElement('div');
            Rbody.classList.add('Rbody');
            document.body.appendChild(Rbody);
            Rbody.textContent = 'APERTE ESPACO PARA CONTINUAR...'
        }
    }
    //rebater cima ou baixo
    if (bateubaixo || (bateucima && !rebatendoY)) velocidadeY = Math.floor(Math.random() * 15);
    //rebater bastao ou parede
    if (rebater && !rebatendoX){
        velocidadeX *= -1;
        rebatendoX = true;
    }
    //rebater teto ou chao
    if (bateuteto && !rebatendoY){
        velocidadeY *= -1;
        rebatendoY = true;
    }
    //colocar verificador
    if (!rebater) rebatendoX = false;
    if (!bateuteto) rebatendoY = false;
},10)
//funcao resetar
function resetar(){
    const Rbody = document.querySelector('.Rbody')
    if (Rbody){
        Rbody.remove()
        by = 540;
        bx = 198;
        velocidadeX = 10;
        velocidadeY = Math.floor(Math.random() * 15);
        inter = true;
        tela_morte = false;
        ms = 0;
        seg = 0;
        min = 0;
        bola.style.width = '20px'
        bola.style.height = '20px'
        bola.style.backgroundColor = 'white'
        bola.style.right = bx + 'px'
        bola.style.bottom = by + 'px'
        let tempo = setInterval(() => {
            if (inter && !tempo){
                ms++;
                if (ms >= 100){ms = 0; seg++;}
                if (seg >= 60){seg = 0; min++;}
                minutos.textContent = String(min).padStart(2, '0');
                segundos.textContent = String(seg).padStart(2, '0');
                milisegundos.textContent = String(ms).padStart(2, '0');
            }
        },10)
    }
}
document.addEventListener('keypress', (evento) => {
    if (evento.key == ' ' && tela_morte) resetar()
})
//timer
const minutos = document.getElementById('min');
const segundos = document.getElementById('seg');
const milisegundos = document.getElementById('ms');
let tempo = setInterval(() => {
    if (inter){
        ms++;
        if (ms >= 100){ms = 0; seg++;}
        if (seg >= 60){seg = 0; min++;}
        minutos.textContent = String(min).padStart(2, '0');
        segundos.textContent = String(seg).padStart(2, '0');
        milisegundos.textContent = String(ms).padStart(2, '0');
    }
},10)