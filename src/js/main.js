import '../scss/styles.scss'

class ListItem { // Une classe qui prend un seul paramètre (title)
    constructor(title){
        this.title = title;
    }

    toHtml() { // Un méthode 
        const li = document.createElement('li'); // Création d'un li
        const btnDone = document.createElement('button'); // Création d'un bouton

        li.className = 'd-flex justify-content-between align-items-center list-group-item'; // Stlye au li
        li.textContent = this.title;

        btnDone.className = 'btn btn-success'; // Style au bouton
        btnDone.textContent = 'Done';

        btnDone.addEventListener('click', () => { //Écoute du bouton, au clic, trouver de quel objet on parle dans notre tableau d'objet plus bas : const listItems = [];)
            const currentTodo = listItems.find((listItem) => listItem.title === this.title);
            const listItemPosition = listItems.indexOf(currentTodo);

            listItems.splice(listItemPosition, 1) // On trouve la position de cet objet
            btnDone.parentElement.remove(); // Retirer cet objet de la liste des objets
        });

        li.appendChild(btnDone); // AppendChild le bouton dans le li

        return li; // Retourner le li
    }
}

const listItems = []; // On déclare un tableau qui contient des list-items
const listTodosHtml = document.querySelector('.list-group--todos'); // On sélectionne notre liste
const formAddToDo = document.querySelector('.form--add-todo'); // On sélectionne notre formulaire

formAddToDo.addEventListener('submit', e => { // On écoute l'évement submit de notre formulaire
    e.preventDefault(); // On prévient le comportement par défaut de soumission
    const formData = new FormData(formAddToDo); // On vient chercher les données à l'intérieur du form
    const todoName = formData.get('todo_name'); // On va chercher le nom

    if(todoName){ // Est-ce que le formulaire possèdait un nom de todo. Si oui,
        listItems.push(new ListItem(todoName)); // push à l'intérieur de notre tableau un nouveau list-item;

        listTodosHtml.innerHTML = '';//supprimer contenu de la liste
        
        listItems.reverse().forEach(item => { // On réajouté tous les listes itemps à l'intérieur du listTodo Item
            listTodosHtml.appendChild(item.toHtml());
        }); 
    }
});
