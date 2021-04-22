console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    //called the readyTranser button function 
    $(`#viewKoalas`).on('click', "readyTransfer",  putOnTransfer);
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: $(`#nameIn`).val(),// set objects to value
      age: $(`#ageIn`).val(),
      gender: $(`#genderIn`).val(),
      readyForTransfer: $(`#readyForTransferIn`).val(),
      notes: $(`#notesIn`).val(),
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $(`#viewKoalas`).empty();// set table to empty 
   $.ajax({
     type: 'GET',
     url: '/koala'
   })
   .then(function (response){
     console.log('Got it!', response);
     //created a loop to get new inputs from client
     for (let i = 0; i < response.length; i++){
      let button;
       if(response[i].readyForTransfer === Y){
        button = `${response[i].readyForTransfer}`
       } else {
         button = `<button type="button" class="readyTransfer data-id=${response[i].id}> Ready for Transfer</button>`
       }
       let newKoal = $(`
       <tr>
          <td>${response[i].name}</td>
          <td>${response[i].age}</td>
          <td>${response[i].gender}</td>
          <td>${button}</td>
          <td>${response[i].notes}</td>
       </tr>
      `)
      newKoal.data('id', response[i].id);
      $(`#viewKoalas`).append(newKoal);// appending to DOM
     } 
   });
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 $.ajax({
   type: 'POST',//to post on the DOM
   url: '/koala',
   data: newKoala
  })
  .then(function (response){
      $(`#nameIn`).val(''),//set objects to empty
      $(`#ageIn`).val(''),
      $(`#genderIn`).val(''),
      $(`#readyForTransferIn`).val(''),
      $(`#notesIn`).val('')
      getKoalas();//to get the koalas from client
  });
}

function putOnTransfer(){//to call the transfer function when button is pushed
  let id = (readyTransfer($(this).on("id")))
  readyTransfer(id);
}

function readyTransfer(koalaId){//a function to allow button to be pushed to transfer
  $.ajax({
    method: 'PUT',
    url: `/transfer/${koalaId}`,
    data: {
      direction: koalaId
    }
    .then(response => {
      getKoalas();
    })
    .catch(err => {
      console.log('ERROR ON TRANSFER', err); 
    })
  })
}