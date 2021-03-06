// Select elements

const ad = document.getElementById('ad');
const soyad = document.getElementById('soyad');
const mail  = document.getElementById('mail');
const form = document.getElementById('form-rehber');

const kisiListesi = document.querySelector('.kisi-listesi');


// add event listeners

form.addEventListener('submit', kaydet);
kisiListesi.addEventListener('click', kisiIslemleriniYap); // select the wholebody of each contact elements

function kisiIslemleriniYap(event) {
     //console.log(event.target);
     if (event.target.classList.contains('fa-trash')) {
         const silinecekTr = event.target.parentElement.parentElement.parentElement; //we need this to delet from local storage
         const silinecekMail = event.target.parentElement.parentElement.previousElementSibling.textContent; //selecet mail element
         rehberdenSil(silinecekTr, silinecekMail);

         rehberdenSil(event.target.parentElement.parentElement.parentElement);
     } else if (event.target.classList.contains('fa-pen-to-square')) {
         console.log('Guncelle'); 
         document.querySelector('.kaydetGuncelle').value = 'Edit' ;
         const secilenTR = event.target.parentElement.parentElement.parentElement;
         const guncellenecekMail = secilenTR.cell[2].textContent;
         ad.value = secilenTR.cell[0].textContent;
         soyad.value = secilenTR.cell[1].textContent;
         mail.value = secilenTR.cell[2].textContent;

         secilenSatir = secilenTR;

     }
}

function rehberdenSil(silinecekTrElement, silinecekMail) {
    silinecekTrElement.remove();
    //delete from local storage based on mail

    tumKisilerDizesi.forEach((kisi, index) => {
        if (kisi.mail === silinecekMail) {
            tumKisilerDizesi.splice(index, 1 );
        }
    });
    console.log('deleted');
    console.log(tumKisilerDizesi);

     
}

// create an array for all contacts to save in local storage

const tumKisilerDizesi = [];
let secilenSatir = undefined;  // first array to edit contact list



function kaydet(e) {
    e.preventDefault();

    // check the input values if they are empty or email format
    const eklenecekKisi = {
        ad: ad.value,
        soyad: soyad.value,
        mail: mail.value
    };
   const sonuc = verileriKontrolEt(eklenecekKisi);

   if (sonuc.durum) {
       // if statement to edit contacts  
       if (secilenSatir) {
           //edit the contact list
       } else {
        kisiyiEkle(eklenecekKisi); 
       }
       
       bilgiOlustur(sonuc.mesaj, sonuc.durum)
   }else {
       bilgiOlustur(sonuc.mesaj, sonuc.durum) // print the message if any input field was empty
   }


}

function kisiyiEkle(eklenecekKisi) {
    const olusturulanTrElement = document.createElement('tr');
    olusturulanTrElement.innerHTML = `<td>${eklenecekKisi.ad}</td>
    <td>${eklenecekKisi.soyad}</td>
    <td>${eklenecekKisi.mail}</td>
    <td>
        <button class="btn btn--edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="btn btn--delete "><i class="fa-solid fa-trash"></i> </button>
    </td>`;
    kisiListesi.appendChild(olusturulanTrElement); 
    tumKisilerDizesi.push(eklenecekKisi); 
    console.log(tumKisilerDizesi);
}

// check the input values if they are empty or email format inside objects above
function verileriKontrolEt(kisi) {
     //usage of "in" objects
     for (const deger in kisi) {
         if (kisi[deger]) {
             //console.log(kisi[deger]);
         }else {
             const sonuc = {
                 durum: false,
                 mesaj: 'do not leave blank field'    // returns if any of the fields are left blank
             }
             return sonuc;
         }

     }

    alanlariTemizle(); // if there is no mistake, clear the input values 
   // returns if all input values are filled  
    return {
        durum: true,
        mesaj: 'Saved'
    }
}


// print the success, error etc messages
function bilgiOlustur (mesaj, durum) {
  const olusturulanBilgi = document.createElement('div'); // create a DIV
  olusturulanBilgi.textContent = mesaj // add the message inside this div
 // add CSS classes
  if(durum) {
      olusturulanBilgi.classList.add('bilgi--success');
      olusturulanBilgi.classList.add('bilgi');
  } else {
    olusturulanBilgi.classList.add('bilgi--error');
    olusturulanBilgi.classList.add('bilgi');
  }


  document.querySelector('.container').insertBefore(olusturulanBilgi, form) // append this div into container before form 
 
 // setTimeOut ( end after a time), setInterval(repeat in any time)

 //remove the message after 2 seconds
 setTimeout(function() {
    const silinecekDiv = document.querySelector('.bilgi');
    if(silinecekDiv) {
        silinecekDiv.remove();
    }


 },2000);

}

function alanlariTemizle() {
    ad.value = '';
    soyad.value = '';
    mail.value = '';
}