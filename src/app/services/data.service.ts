import { Injectable } from "@angular/core";
import { docData, Firestore } from "@angular/fire/firestore";
import { addDoc, collection, deleteDoc, doc, Timestamp, updateDoc } from "firebase/firestore";
import { collectionData } from "@angular/fire/firestore";
import { Observable } from "rxjs";

export interface Activity{
    id?: string;
    title: string;
    adress: string;
    date: string;
    category: string;
    description: string;
    lat: number;
    lng: number;
    participators: string[];
}

@Injectable({
    providedIn: 'root'
})
export class DataService{
    constructor(private firestore: Firestore){}

    getActivities(): Observable<Activity[]>
    {
        const activitiesRef = collection(this.firestore, 'activities');
        return collectionData(activitiesRef, {idField: 'id'}) as Observable<Activity[]>;
    }

    addActivity(activity: Activity){
        const activityRef = collection(this.firestore, 'activities');
        return addDoc(activityRef, activity);
    }

    deleteActivity(activity: Activity){
        const activDocRef = doc(this.firestore, 'activities/'+activity.id);
        return deleteDoc(activDocRef);
    }

    updateActivity(activity: Activity, users: string[]){
        const activDocRef = doc(this.firestore, 'activities/'+activity.id);
        console.log(activDocRef, activity)
        return updateDoc(activDocRef, { participators : users});
    }
}