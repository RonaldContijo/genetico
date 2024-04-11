

var id = 1;
class Item {
    constructor(nome, image, weight, value) {
        this.id = id++;
        this.nome = nome;
        this.image = image;
        this.weight = weight;
        this.value = value;
    }
}
var bola = new Item("Bola", "./bola.png", 2, 10);
var tijolo = new Item("Tijolo", "./tijolo.jpeg", 20, 1);
var gato = new Item("Gato", "./gato.JPG", 9, 9);
var pedra = new Item("Pedra", "./pedra.jpg", 5, 1);

var banana = new Item("Banana", "./banana.jpg", 2, 3);
var maca = new Item("Maça", "./maca.jpg", 2, 3);
var uva = new Item("Uva", "./uva.png", 2, 3);
var calanguinho = new Item("Calanguinho", "./calango.jpg", 1, 5);
var ouro = new Item("Ouro", "./ouro.jpg", 15, 15);
var jaca = new Item("Jaca", "./jaca.jpg", 8, 5);

var listaPossiveisPredef = [];
// Adicionando os itens ao vetor listaPossiveisPredef
listaPossiveisPredef.push(bola, calanguinho, tijolo, gato, pedra, banana, maca, uva, ouro, jaca,);

function mostraItensPreDefinidos() {
    var pre = document.getElementById('pre_definidos');
    pre.style.display = 'block';

    var gridContainer = document.getElementById('grid-container');
    listaPossiveisPredef.forEach(function (item, index) {
        if (index % 5 === 0) {
            var rowDiv = document.createElement('div');
            rowDiv.classList.add('grid');
            gridContainer.appendChild(rowDiv);
        }
        var itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
            <h3>${item.nome}</h3>
            <img src="${item.image}" alt="${item.nome}">
            <p>Peso: ${item.weight}</p>
            <p>Valor: ${item.value}</p>
        `;
        gridContainer.lastElementChild.appendChild(itemDiv);
    });
}

// Chame a função para exibir os itens

class Mochila {
    constructor(ListaDeItens) {
        this.ListaDeItens = [...ListaDeItens];

        let listaIds = [];
        for (let i = 0; i < ListaDeItens.length; i++) {
            listaIds.push(ListaDeItens[i].id);
        }

        this.listaIds = listaIds;


        let weight = 0;
        for (let i = 0; i < ListaDeItens.length; i++) {
            weight += ListaDeItens[i].weight;
        }
        this.totalWeight = weight;

        // Embuti o cálculo do fitness aqui no construtor da classe para ser mais elegante
        let value = 0;
        for (let i = 0; i < ListaDeItens.length; i++) {
            value += ListaDeItens[i].value;
        }
        this.value = value;
    }
}
var melhoresIndividuo = [];
var pioresIndividuo = [];
var mediaIndividuos = [];
var numeroGeracoes = 0;
var melhorIndividuoResposta = null;

function algoritmoGenetico(
    MUTATION_RATE,
    POPULATION_SIZE,
    MAX_GENERATIONS,
    ELITISMO,
    SELECTION_METHOD,
    MAX_WEIGHT,
    listaPossiveis
) {

    /*
        function geraMochilaAleatoria() {
            let mochila = [];
            let pesoTotal = 0;
            let listaPos = [...listaPossiveis]
    
            // Enquanto houver espaço na mochila e ainda houver itens não adicionados
            while (pesoTotal < MAX_WEIGHT && listaPos.length > 0) {
                // Escolhe um índice aleatório dentro do tamanho atual da lista de itens possíveis
                let indiceAleatorio = Math.floor(Math.random() * listaPos.length);
    
                // Obtém o item correspondente ao índice aleatório
                let itemAleatorio = listaPos[indiceAleatorio];
    
                // Verifica se adicionar este item não ultrapassa o peso máximo
                if (pesoTotal + itemAleatorio.weight <= MAX_WEIGHT) {
                    // Adiciona o item à mochila
                    mochila.push(itemAleatorio);
                    // Atualiza o peso total da mochila
                    pesoTotal += itemAleatorio.weight;
                }
    
                // Remove o item da lista de itens possíveis para evitar repetições
                listaPos.splice(indiceAleatorio, 1);
            }
    
            // Retorna a mochila gerada
    
            //console.log(mochila);
            //console.log(pesoTotal);
            return mochila;
        }
    
    */
    function geraMochilaAleatoria() {
        let mochila = [];
        let pesoTotal = 0;
        let listaPos = [...listaPossiveis]

        const numeroElementosMochila = Math.floor(Math.random() * listaPos.length);

        for(let i=0;i<=numeroElementosMochila;i++){
            let indiceAleatorio = Math.floor(Math.random() * listaPos.length);
            let itemAleatorio = listaPos[indiceAleatorio];
            mochila.push(itemAleatorio);
            listaPos.splice(indiceAleatorio, 1);
        }
        return mochila;
    }

    function temNumerosRepetidos(vetor) {
        const numerosVistos = new Set(); // Conjunto para armazenar os números vistos até o momento

        for (let i = 0; i < vetor.length; i++) {
            // Se o número já foi visto anteriormente, significa que há um número repetido
            if (numerosVistos.has(vetor[i])) {
                return true;
            }
            // Adiciona o número ao conjunto de números vistos
            numerosVistos.add(vetor[i]);
        }

        // Se nenhum número repetido foi encontrado até agora, retorna falso
        return false;
    }

    // ''''calculate''''
    //a imbecilidade humana é presumir que as coisas serão simples
    function calculateFitness(mochilaMochila) {
        let dinheiros = mochilaMochila.value;
        let peso = mochilaMochila.totalWeight;
        let mochila = [...mochilaMochila.ListaDeItens];

        if (temNumerosRepetidos(mochila)) {
            //console.log('============itens duplicados===========');
            return mochilaMochila.value * 0;
        }
        if (peso > 20) {
            return mochilaMochila.value * 0;
        }
        //penalizar mochilas não completas
        //console.log(`Mochila = ${mochilaMochila.totalWeight}`)
        /*
        Muito interessante...
        */
        if (mochilaMochila.totalWeight / MAX_WEIGHT <= 0.8) {
            console.log('Mochila nao ocmpleta');
            return mochilaMochila.value * (mochilaMochila.totalWeight / MAX_WEIGHT);
        }
        return mochilaMochila.value;
    }
    function gambi(t) {
        return 0;
    }
    function crossover(parent1, parent2) {
        //se os itens forem iguais não pode trocar!!!
        let indiceItem1 = Math.floor(Math.random() * parent1.ListaDeItens.length);
        let indiceItem2 = Math.floor(Math.random() * parent2.ListaDeItens.length);

        let item1 = parent1.ListaDeItens[indiceItem1];
        let item2 = parent2.ListaDeItens[indiceItem2];
        let contador = 0;
        while (item1 === item2 || contador == 10) {
            indiceItem1 = Math.floor(Math.random() * parent1.ListaDeItens.length);
            indiceItem2 = Math.floor(Math.random() * parent2.ListaDeItens.length);

            item1 = parent1.ListaDeItens[indiceItem1];
            item2 = parent2.ListaDeItens[indiceItem2];
        }

        contador = 0;


        let filho1 = parent1.ListaDeItens.slice();
        let filho2 = parent2.ListaDeItens.slice();
        //console.log("===========FILHO1==========");
        //console.log(...filho1);
        //console.log("===========item para troca==========");
        //console.log(parent1.ListaDeItens[indiceItem1]);


        //console.log("===========ITEM RETIRADO==========");
        gambi(...filho1.splice(indiceItem1, 1));

        //console.log("===========filho ja sem item==========");
        //console.log(...filho1);
        //console.log("===========item novo adiciona==========");
        //console.log(item2);
        filho1.push(item2);
        //console.log("===========filho com item novo==========");
        //console.log(...filho1);

        //console.log("===========FILHO2==========");
        //console.log(...filho2);
        //console.log("===========item para troca==========");
        //console.log(parent2.ListaDeItens[indiceItem2]);


        //console.log("===========ITEM RETIRADO==========");
        gambi(...filho2.splice(indiceItem2, 1));

        //console.log("===========filho ja sem item==========");
        //console.log(...filho2);
        //console.log("===========item novo adiciona==========");
        //console.log(item1);
        filho2.push(item1);
        //console.log("===========filho com item novo==========");
        //console.log(...filho2);
        return [filho1, filho2];
    }

    function rouletteWheelSelection(population) {
        const totalFitness = population.reduce((total, individual) => total + individual[1], 0);
        const randomValue = Math.random() * totalFitness;
        let currentSum = 0;
        for (const individual of population) {
            currentSum += individual[1];
            if (currentSum >= randomValue) {
                return individual;
            }
        }
    }
    function tournamentSelection(population) {
        const tournamentSize = 5;
        const tournament = [];

        //seleciona 5 individuos aleatoriamente
        for (let i = 0; i < tournamentSize; i++) {
            tournament.push(population[Math.floor(Math.random() * population.length)]);
        }
        return tournament.reduce((max, current) => (current[1] > max[1] ? current : max));
        //return tournament.reduce((min, current) => (current[1] < min[1] ? current : min));

    }
    function mutate(mochila) {
        return geraMochilaAleatoria();

    }

    let population = Array.from({ length: POPULATION_SIZE }, () => [new Mochila(geraMochilaAleatoria()), 0]);
    population = population.map(([func]) => [func, calculateFitness(func)]);
    //console.log(rouletteWheelSelection(population));


    let generation = 1;
    for (generation; generation < MAX_GENERATIONS; generation++) {
        population = population.map(([func]) => [func, calculateFitness(func)]);


        let fitness = population.map(function (item) {
            return item[1];
        });


        // eExibir a nova lista na console
        //console.log(fitness);

        //informaçoes
        console.log("=========================================");
        console.log(`estamos na ${generation} geração`);
        console.log(`O melhor individuo tem ${Math.max(...fitness)}`);
        console.log(`O pior individuo tem ${Math.min(...fitness)}`);
        const meanFitness = population.reduce((total, [, fitness]) => total + fitness, 0) / POPULATION_SIZE;
        console.log(`A média dos individuos é ${meanFitness}`);

        //armazendando infos pra msotrar no grafico
        melhoresIndividuo.push(Math.max(...fitness));
        pioresIndividuo.push(Math.min(...fitness));
        mediaIndividuos.push(meanFitness);
        numeroGeracoes = generation;


        var bestfunc = Math.max(...fitness);
        let maxIndex = fitness.indexOf(bestfunc);
        melhorIndividuoResposta = population[maxIndex];

        //se existe algum individuo onde não há nenhum par de rainhas se atacando
        //(lembrar q esse 28 é lá de cima do máximo número de ruindade possivel)

        //cria a nova população, os filhos
        const newPopulation = [];

        //Se o usupario selecionar a opção de elitismo o melhor individuo da população
        //anterior sempre vai ser passado pra próxima população
        if (ELITISMO) {
            //alert("Elitismo ligado");
            newPopulation.push(melhorIndividuoResposta);
        }


        while (newPopulation.length < POPULATION_SIZE) {
            /*
            const parent1 = tournamentSelection(population);
            const parent2 = tournamentSelection(population);
            rouletteWheelSelection//implem,entar depois
            */
            //seleção dos individuos
            let parent1 =
                SELECTION_METHOD ?
                    rouletteWheelSelection(population) : tournamentSelection(population);
            let parent2 =
                SELECTION_METHOD ?
                    rouletteWheelSelection(population) : tournamentSelection(population);
            //reprodução dos individuos
            //do amor de duas variaveis nasce uma criancinha
            //que será brutalmente assasinada caso não seja util para a resolução do problema

            //agora está corrigido
            while (parent1 === parent2) {
                parent1 =
                    SELECTION_METHOD ?
                        rouletteWheelSelection(population) : tournamentSelection(population);
                parent2 =
                    SELECTION_METHOD ?
                        rouletteWheelSelection(population) : tournamentSelection(population);
            }
            if (parent1 === parent2) {
                alert("PAIS IGUAIS");
            }
            let litleChild = crossover(parent1[0], parent2[0]);
            //console.log(litleChild);

            //colocar mutação

            //verificação de mutação
            if (Math.random() < MUTATION_RATE) {
                litleChild[0] = mutate(litleChild[0]);//uma criancinha
                litleChild[1] = mutate(litleChild[1]);

            }

            newPopulation.push([new Mochila(litleChild[0]), 0]);
            newPopulation.push([new Mochila(litleChild[1]), 0]);
            //console.log('aqui');
            //break;
        }
        console.log(newPopulation[0]);

        //Atualiza a população
        population = newPopulation;

        //então...
        //Por algum motivo tinha um desgraçado que era sempre 0
        //population[0] = population[1];
        //agora sumiu
        population = population.map(([func]) => [func, calculateFitness(func)]);
    }
    console.log(melhorIndividuoResposta);
}


/*
algoritmoGenetico(
    MUTATION_RATE = 0.2,
    POPULATION_SIZE = 20,
    MAX_GENERATIONS = 100,
    ELITISMO = false,
    ELECTION_METHOD = true,
    MAX_WEIGHT = 20,
    listaPossiveisPredef
);
const MUTATION_RATE = 0.2;
const POPULATION_SIZE = 20;
const MAX_GENERATIONS = 100;
const ELITISMO = false;
const SELECTION_METHOD = true;
const MAX_WEIGHT = 20;
*/

function criarLista(numero) {
    var lista = [];
    for (var i = 1; i <= numero; i++) {
        lista.push(i);
    }
    return lista;
}
var pointStyleD = 'circle';
var grossuraLinha = 3;
var suavidadeInterpolacao = 0.2;

function criaGrafico(melhorIndividuo, pioresIndividuo, mediaIndividuos, geracoes) {
    // Lógica para preencher melhorIndividuo, mediaIndividuos, pioresIndividuo e geracoes
    geracoes = criarLista(geracoes);

    var canvas = document.getElementById('myChart');
    if (canvas) {
        // Remove o canvas do DOM
        canvas.parentNode.removeChild(canvas);
    }

    // Cria um novo canvas
    var newCanvas = document.createElement('canvas');
    newCanvas.id = 'myChart';
    document.getElementById('grafico-container').appendChild(newCanvas);

    // Criar um gráfico com Chart.js
    var ctx = document.getElementById('myChart').getContext('2d');
    /*
    var pointStyleD = 'circle';
var grossuraLinha = 3;
var suavidadeInterpolacao=0.2;
*/
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: geracoes, // Usar o número de gerações como rótulos no eixo x
            datasets: [{
                label: 'Melhor Indivíduo',
                data: melhorIndividuo,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: grossuraLinha,
                fill: false,
                pointStyle: pointStyleD,//'circle'
                tension: suavidadeInterpolacao
            }, {
                label: 'Média dos Indivíduos',
                data: mediaIndividuos,
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: grossuraLinha,
                fill: false,
                pointStyle: pointStyleD,
                tension: suavidadeInterpolacao
            }, {
                label: 'Pior Indivíduo',
                data: pioresIndividuo,
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: grossuraLinha,
                fill: false,
                pointStyle: pointStyleD,
                tension: suavidadeInterpolacao
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    min: Math.min(...pioresIndividuo) - 5
                }
            }
        }
    });
}

function start() {
    fechaMenu();
    let resultado = document.getElementById("resultado");
    let graficoContainer = document.getElementById("grafico-container");

    resultado.style.display = "block";
    graficoContainer.style.display = "block";



    let tamanhoPopu = document.getElementById("tamanhoPopu").value;
    console.log(tamanhoPopu);
    let mutacao = document.getElementById("mutacao").value;
    console.log(mutacao);
    let geracoes = document.getElementById("geracoes").value;
    console.log(geracoes);
    let metodoSelecao = document.getElementById("metodoSelecao").value;
    console.log(metodoSelecao);

    let pesoMaimoMochila = document.getElementById("pesoMaimoMochila").value;
    console.log(pesoMaimoMochila);


    let elitismo = document.getElementById("elitismo").checked;
    console.log(elitismo);

    if (metodoSelecao === "") {
        console.log("Undefined");
        metodoSelecao = true;
    }
    if (metodoSelecao === "Roleta") {
        console.log("Roleta");
        metodoSelecao = false;

    } if (metodoSelecao === "") {
        console.log("Torneio");
        metodoSelecao = true;
    }

    if (elitismo) {
        //alert("Elitismo = true")
        elitismo = true;
    } else {
        //alert("Elitismo = false")
        //elitismo = false;
    }

    let solucaoOtima = document.getElementById("solucaoOtima");

    let results = algoritmoGenetico(
        MUTATION_RATE = mutacao / 100,
        POPULATION_SIZE = tamanhoPopu,
        MAX_GENERATIONS = geracoes,
        ELITISMO = elitismo,
        ELECTION_METHOD = metodoSelecao,
        MAX_WEIGHT = pesoMaimoMochila,
        listaPossiveisPredef
    );

    if (!results) {
        //alert("Não foi possivel resolver");
        solucaoOtima.innerText = "O sistema não foi capaz de encontrar uma boa solução com os parametros selecionados";
    } else {
        solucaoOtima.innerText = "Uma solução boa foi encontrada";
    }



    document.getElementById("geracoesNecessarias").innerText = numeroGeracoes;
    criaGrafico(melhoresIndividuo, pioresIndividuo, mediaIndividuos, numeroGeracoes);
    /*
    console.log(melhoresIndividuo);
    console.log(mediaIndividuos);
    console.log(pioresIndividuo);
    */
    //reseta as variaveis
    //isso deu uma dor de cabeça tremenda
    melhoresIndividuo = [];
    pioresIndividuo = [];
    mediaIndividuos = [];
    numeroGeracoes = 0;
    melhorIndividuoResposta = null;



}

