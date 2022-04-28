const stock = [
    {
        id: 1,
        type: "rack",
        indication: "I",
    },
    {
        id: 2,
        type: "rack",
        indication: "II",
    },
    {
        id: 3,
        type: "rack",
        indication: "III",
    },
    {
        id: 4,
        type: "shelf",
        indication: "1A0C",
        parent: 1
    },
    {
        id: 5,
        type: "shelf",
        indication: "2A0C",
        parent: 1
    },
    {
        id: 6,
        type: "shelf",
        indication: "1B1E",
        parent: 2
    },
    {
        id: 7,
        type: "container",
        indication: "Ad-1R",
        parent: 4
    },
    {
        id: 8,
        type: "container",
        indication: "Ab-1Ra",
        parent: 4
    },
    {
        id: 9,
        type: "container",
        indication: "Ad-2R",
        parent: 5
    },
    {
        id: 10,
        type: "box",
        indication: "X-9rc",
        parent: 6
    },
    {
        id: 11,
        type: "box",
        indication: "X-4ah",
        parent: 8
    },
    {
        id: 12,
        type: "box",
        indication: "X-4bh",
        parent: 8
    },
    {
        id: 13,
        type: "product",
        indication: "X-4ah__13",
        parent: 11
    },
    {
        id: 14,
        type: "product",
        indication: "X-4ah__14",
        parent: 11
    },
    {
        id: 15,
        type: "product",
        indication: "X-4bh__15",
        parent: 12
    },
    {
        id: 16,
        type: "product",
        indication: "X-4bh__16",
        parent: 12
    },
];



// zmień kolejnść elementów, aby sprawdzić, czy rozwiązanie działa
// stock.sort(() => (Math.random() > 0.5 ? 1 : -1));

startFromRoot(stock);

function startFromRoot(data) {
    const parentEl = document.querySelector('ul'); // wyszukaj w drzewie DOM element <ul>, do którego trafią elementy z bazy danych
    data.forEach(root => {
        if (!root.parent) {
            // jeśli element nie ma właściwości .parent, stwórz z niego osobny element <li>
            // taki element jest korzeniem, czyli od niego rozchodzą się gałęzie (dzieci)
            generateTree(root, data, parentEl); // zagnieżdżaj w nim jego dzieci
        }
    });
}

function generateTree(item, data, destinationEl) {
    // stwórz element <li> dla pojedynczego elementu i umieść go w rodzicu
    const itemEl = document.createElement('li');
    itemEl.innerText = `${item.type}: ${item.indication}`;
    destinationEl.appendChild(itemEl);

    // sprawdź, czy element ma przypisane dzieci
    const children = data.filter(potentialChild => {
        return potentialChild.parent && potentialChild.parent === item.id;
    });

    if (children.length > 0) {
        // jeśli ma dzieci, to stwórz nową <ul> i umieść ją w elemencie <li>
        const ulElNested = document.createElement('ul');
        itemEl.appendChild(ulElNested);

        children.forEach(child => {
            generateTree(child, data, ulElNested); // zagnieżdżaj w elemencie jego dzieci
        });
    }
}
