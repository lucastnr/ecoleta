function populateUFs() {
    const uFSelect = document.querySelector("select[name=uf]")

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`)
    .then( res => res.json() )
    .then( states => {

        states.sort(function (a, b) {
	
            return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0);
         
        });

        for (state of states) {
            uFSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    } )
}

populateUFs()

function getCities (event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInpust = document.querySelector("input[name=state]")

    stateIndex = event.target.selectedIndex

    stateInpust.value = event.target.options[stateIndex].text

    ufId = event.target.value

    citySelect.innerHTML = `<option>Selecione a cidade</option>`
    citySelect.disabled = true

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufId}/municipios`)
    .then( res => res.json() )
    .then( cities => {

        for (city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            
        }
    } )
    citySelect.disabled = false

    document
        .querySelector("select[name=uf]")
        .addEventListener("change", getCities)
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// Itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (item of itemsToCollect) {
    document.addEventListener("click", handleSelectedItem)
}

let selectedItems = []

const collectedItems = document.querySelector("input[name=items]")

function handleSelectedItem(event) {
    const itemLi = event.target

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id
    
    const alreadySelected = selectedItems.findIndex(item => item == itemId)
    
    if (alreadySelected >= 0) {
        let filteredItems = selectedItems.filter(item => item != itemId)
        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)
    }
    
    for (item of selectedItems) {
        let filteredItems = selectedItems.filter(item => item != undefined)
        selectedItems = filteredItems
    }

    collectedItems.value = selectedItems
}