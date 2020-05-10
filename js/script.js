let cards = document.getElementById('cards');
let loading = document.getElementById('loading');

let arrayCards = [];
consomeDados();


function consomeDados () {
    escondeMostraLoading(true);
    fetch("https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72")
    .then(
        function(resp){
            resp.json().then(
             function (cards) {
                 arrayCards = cards;
                colocaDadosNaTela(cards);
                escondeMostraLoading(false);
             }   
            ).catch(
                function (err) {
                    deuErro(err);
                    escondeMostraLoading(false);
                } 
            )
        } 
    ).catch(
        function (err) {
            deuErro(err);
            escondeMostraLoading(false);
        }
    );
}

function deuErro (err) {
    alert('Algo inesperado aconteceu, tente novamente mais tarde');
}

function colocaDadosNaTela(cardsArray) {

    cardsArray.map(function(card) {
        cards.innerHTML += ` 
        <div class="card">
            <img class="card-img" src="${card.photo}">
            <div class="card-body">
                <h6><b>${card.name}</b></h6>
                <hr>
                <p class="card-type"><i>${card.property_type}</i></p>
                <p class="card-price"><strong>R$${card.price}</strong>/noite</p>
            </div>
        </div>
        `;
    } );
   
}

function filtraTipoLugar(tipoLugar) {
        let dadosFiltrados = [];
        if(tipoLugar === 'Todos') {
            dadosFiltrados =  arrayCards;   
        }else {
            dadosFiltrados = arrayCards.filter(function(item) {
                return item.property_type === tipoLugar;
            });
        }
       
        cards.innerHTML = ``
        colocaDadosNaTela(dadosFiltrados);
}

function escondeMostraLoading(aberto) {
    if(aberto) {
        loading.style.display='flex';
    } else {
        loading.style.display='none';
    }
}