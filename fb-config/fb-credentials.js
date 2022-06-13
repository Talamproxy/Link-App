// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getDatabase, push, ref,onValue, remove} from "firebase/database";
// import * as firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';


// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzsqL9RSRYGm353ssstKFS-U9JnWt4SQI",
  authDomain: "reminders-a2191.firebaseapp.com",
  databaseURL: "https://reminders-a2191-default-rtdb.firebaseio.com",
  projectId: "reminders-a2191",
  storageBucket: "reminders-a2191.appspot.com",
  messagingSenderId: "392297728368",
  appId: "1:392297728368:web:9555a595b780209dff27b5",
  measurementId: "G-D84R4HR8XS"
};

// Initialize Firebase
let app;
if (firebase.apps.length===0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app=firebase.app()
}

const auth=firebase.auth()
export function initEventsDB(){
  firebase.initializeApp(firebaseConfig);
} 
export function storeEventsItem(item){

  const db = getDatabase();
  const reference=ref(db, "savedEvents/");
  //Automatically generates a key
  push(reference, item);
}
export function setupEventsListener(updateFunc){

  const db = getDatabase();
  const reference=ref(db, `savedEvents/`);
  onValue(reference, (snapshot)=>{
      console.log("Data Listener Fires Up with", snapshot);
      if(snapshot?.val()){
          //
          const fbObject = snapshot.val();
          const newArray=[];
         
          Object.keys(fbObject).map((key, index)=>{
              console.log(key, "||", index, "||", fbObject[key]);
               newArray.push({...fbObject[key], id: key});
          });
          updateFunc(newArray);
      }else{
          updateFunc([]);
      }
  })
  
  }

  export function deleteEvent(item){
    const db=getDatabase();
    const reference = ref(db, `savedEvents/${item.id}`);
    remove(reference);
} 

export {auth};
// const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);