import firebase from "firebase/app";
import 'firebase/firestore';

export const joinMeal = (meal) => {
    meal.peopleNbr += 1;
    meal.peoples.push(firebase.auth().currentUser.uid);

    firebase.firestore().collection("meal").doc(meal.id).update(meal);
}