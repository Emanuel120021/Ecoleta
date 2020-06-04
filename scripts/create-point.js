

function PopulateUFs(){
    const ufselect =  document.querySelector("select[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res  => res.json())
    .then( states => {
        for(const state of states) {
            
            ufselect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        }
        
    })
}

PopulateUFs()

function getCities(event){
    const cityselect =  document.querySelector("[name=city]");
    const stateInput =  document.querySelector("[name=state]");

    //console.log(event.target.value);
    
    const urlvalue = event.target.value;

    const indexOfSelctedIndexState = event.target.selectedIndex;

    stateInput.value = event.target.options[indexOfSelctedIndexState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${urlvalue}/municipios`;
    
    cityselect.innerHTML = "<option value>Selecione a cidade</option>"
    cityselect.disabled = true;



    fetch(url)
    .then( res  => res.json())
    .then( cities => {
        for(const city of cities) {
            
            cityselect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
        }

        cityselect.disabled = false;
        
    })

}



document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)




    //Items de coleta

//Pegar todod os li's

const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSlectedItem);
}


const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSlectedItem(event) {
    const itemLi = event.target;
    //add or remove a class with JS
    itemLi.classList.toggle("selected") //Add = Acicionar || Remove = Remover 
                                         //       || Toggle = Add or Remove


    const itemId = itemLi.dataset.id;

    //Verificar se existem itens selecionados. Se sim,
    //pegar os itens selecionados.
    
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId; //Isso será true ou false
        return itemFound
    })

    //Se já estiver selecionado, tirar da seleção

    if (alreadySelected >= 0){
        //tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent
        })

        selectedItems = filteredItems;
    }
    //Se não estiver selecionado, adicionar a seleção
    else {
        selectedItems.push(itemId)
        }
        
    //Atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems;
       
    };


