
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, getDoc, query } from "firebase/firestore/lite"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0aDJqerAyxI9QMePKD1NgiOUc8VOFojk",
  authDomain: "van-life-6e4b2.firebaseapp.com",
  projectId: "van-life-6e4b2",
  storageBucket: "van-life-6e4b2.appspot.com",
  messagingSenderId: "34009423152",
  appId: "1:34009423152:web:1c7540afd4321d6fa83cf5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}


export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}


// export async function getHostVans(id) {
//     const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}