// Import the tools we need from firebase-admin 
import { initializeApp, cert } from "firebase-admin/app"; // we use to connect to our firebase project
import { getFirestore } from "firebase-admin/firestore"; // we use to connect to Firestore

// Import our credentials from a secret file
import { credentials } from "./credentials.js";

// Connect to our Firebase project
initializeApp({
  credential: cert(credentials)
});

// Connect to Firestore DB
const db = getFirestore();

// Add a product to our products collection (a new document)
const candy2 = {
  name: "Twix",
  unitPrice: 2.99,
  size: "12 oz",
  color: "gold",
  inventory: 288,
  productNumber: 2,
}

// How to add a document to Firestore:

// db.collection('products').add(candy2) // Returns a promise not a document. While we are waiting for the promise...
//   .then((doc) => {
//     console.log("added doc: " + doc.id)
//   // I can be sure .then() that the first process was completed successfully
//   })
//   .catch(err => console.log(err))

// How to update a document
db.collection('products').doc('RHCCn8BaG7ELsVPq7qml').update({
  inventory: 555,        // updates
  customerFavorite: true // adds to document
})

// How to read a document from Firestore:

db.collection('products').doc('RHCCn8BaG7ELsVPq7qml').get()
  .then(doc => {            // don't need () around doc bc only 1 parameter
    console.log(doc.data());
  })
  .catch(err => console.log(err));
  // .catch(console.log) *can also write it this way

  // How to get a whole collection:

  db.collection('products').get()
    .then(collection => {
      const productList = collection.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      console.table(productList);
    })
    .catch(console.log);

  //To delete:
  // db.collection('products').doc('RHCCn8BaG7ELsVPq7qml').delete()
