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
    $(`#viewKoalas`).on('click', "readyTransfer",  putOnTransfer);
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: $(`#nameIn`).val(),
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
  $(`#viewKoalas`).empty();
   $.ajax({
     type: 'GET',
     url: '/koala'
   })
   .then(function (response){
     console.log('Got it!', response);
     for (let i = 0; i < response.length; i++){
       let newKoal = $(`
       <tr>
          <td>${response[i].name}</td>
          <td>${response[i].age}</td>
          <td>${response[i].gender}</td>
          <td>${response[i].readyForTransfer}</td>
          <td>${response[i].notes}</td>
          <td>
            <button type="button" class="readyTransfer data-id="${response[i].id}"> Ready for Transfer</button>
          </td>
       </tr>
      `)
      newKoal.data('id', response[i].id);
      $(`#viewKoalas`).append(newKoal);
     } 
   });
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 $.ajax({
   type: 'POST',
   url: '/koala',
   data: newKoala
  })
  .then(function (response){
      $(`#nameIn`).val(''),
      $(`#ageIn`).val(''),
      $(`#genderIn`).val(''),
      $(`#readyForTransferIn`).val(''),
      $(`#notesIn`).val('')
      getKoalas();
  });
}

function putOnTransfer(){
  let id = (readyTransfer($(this).on("id")))
  readyTransfer(id);
}

function readyTransfer(koalaId){
  $.ajax({
    method: 'PUT',
    url: `/transfer/${koalaId}`,
    data: {
      direction: koalaId// should i make an if statment and what goes here.
    }
    .then(response => {
      getKoalas();
    })
    .catch(err => {
      console.log('ERROR ON TRANSFER', err); 
    })
  })
}