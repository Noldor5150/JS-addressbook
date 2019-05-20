

let addressBook= [];
let searchValue = "";
let submitButton = document.getElementById("submit");

submitButton.addEventListener('click', event => {
  let name = document.getElementById("name");
  let phone = document.getElementById("phone");
  let object = {name: name.value,  phone: phone.value, isEdit: false, isFav: false};
  addressBook.push(object);
  console.log(addressBook);

  clearList();
  document.getElementById("safeplace").appendChild(render());
  window.localStorage.setItem ("list", JSON.stringify(addressBook));
  console.log(addressBook);
});



window.addEventListener("load", (event)=>{
  let data = window.localStorage.getItem("list");
  if(data != null) {
    data = JSON.parse(data)
    addressBook = data;
    render();
  }
});

function render() {
  let paragraph = document.createElement ("ul");
  addressBook.filter(obj => obj.name.includes(searchValue)).forEach((obj, index)=>{
    let listItem = document.createElement("li");
    let nameParagraph = document.createElement (obj.isEdit ? "input" : "span");
    let phoneParagraph  = document.createElement (obj.isEdit ? "input" : "span");
    if(obj.isEdit){
      nameParagraph.type= "text";
      phoneParagraph.type= "text";
    }

    nameParagraph[obj.isEdit ? "value" : "textContent"] = obj.name;
    listItem.appendChild(nameParagraph);

    phoneParagraph[obj.isEdit ? "value" : "textContent"] = obj.phone;
    listItem.appendChild(phoneParagraph);

    let editButton = document.createElement("button");
    if(obj.isEdit) {
      editButton.textContent ="Save";
    } else {
      editButton.textContent ="Edit";
    }
    editButton.type = "button";
    editButton.id = "edit";

    editButton.addEventListener("click", event => {
      if (addressBook[index].isEdit) {
        addressBook[index].name = nameParagraph.value;
        addressBook[index].phone = phoneParagraph.value;
      }

      addressBook[index].isEdit = !addressBook[index].isEdit;
      clearList();
      render();
      console.log(`${index} Edit`);
      window.localStorage.setItem("list", JSON.stringify(addressBook));
    });

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.type = "button";

    deleteButton.addEventListener("click", event => {
      addressBook.splice(index, 1);
      console.log(addressBook);
      clearList();
      render();
      window.localStorage.setItem("list", JSON.stringify(addressBook));
    });

    let favButton = document.createElement("button");
    favButton.textContent = obj.isFav ? "remove Fav": "make Fav";
    favButton.type = "button";

    favButton.addEventListener("click", event => {
     addressBook[index].isFav = !addressBook[index].isFav;
     clearList();
     render();
      window.localStorage.setItem("list", JSON.stringify(addressBook));
    });

    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    listItem.appendChild(favButton);
    paragraph.appendChild(listItem);
  });

  return document.getElementById("safeplace").appendChild(paragraph);
};

// const userInput = selector =>{
//   return document.querySelector(selector).value;
// }

function clearList() {
  document.getElementById("safeplace").innerHTML = " ";
}

let searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", event => {

  searchValue = event.target.value;
  clearList();
  render();
  // let data = window.localStorage.getItem("list");
  // if(data != null || data !== undefined ) {
  //   data = JSON.parse(data)
  //   addressBook = data;
    
  //   if(addressBook.find( person => person.name === searchInput.value )){
  //     let foundPerson = addressBook.find( person => person.name === searchInput.value );
  //     console.log(foundPerson );
  //     let foundPersonArray = [];
  //     foundPersonArray.push(foundPerson);
  //     addressBook = foundPersonArray ;
  //     clearList();
  //     render();
  //   }
  //   else{
  //     clearList();
  //     let element = document.createElement("p");
  //     element.textContent= "there is no person with such name";
  //     document.getElementById("safeplace").appendChild(element);
  //   }
  // }
  // else {
  //   clearList();
  //   let elementTwo = document.createElement("p");
  //   elementTwo.textContent= "adress book is empty!";
  //   document.getElementById("safeplace").appendChild(elementTwo);
  // }
});


// function paintArray(array){
//   console.log(array);
//   paragraph = document.createElement ("p");
 
//   array.forEach((obj, index) => {
//     let nameParagraph = document.createElement ("span");
//     let phoneParagraph  = document.createElement ("span");
//     nameParagraph.textContent = obj.name;
//     phoneParagraph.textContent = obj.phone;
//     paragraph.appendChild(nameParagraph);
//     paragraph.appendChild(phoneParagraph);
//     let editBtn = document.createElement("BUTTON");
//     editBtn.innerHTML = "EDIT";
//     paragraph.appendChild(editBtn);
//     // editBtn.addEventListener("click", function(event){
           
//     // );
//     let deleteBtn = document.createElement("BUTTON");
//     deleteBtn.innerHTML = "DELETE";
//     paragraph.appendChild(deleteBtn);
//     deleteBtn.addEventListener("click", function (event){
//       buttonDelete(array, index);
//     });
   
//     paragraph.appendChild(document.createElement('br'));
// });
// document.getElementById("safeplace").appendChild(paragraph);
// };


// condition ? value-if-true : value-if-false
