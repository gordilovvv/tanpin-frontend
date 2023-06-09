import { create } from 'zustand';
import {  ActivityTransaction } from '../types';

type State = {
	notificationsCount: number,
	userActivity: ActivityTransaction[] | undefined
    tokenActivity: ActivityTransaction[] | undefined
}

type Actions = {
	setActivityList: (type: ActivityType, list: ActivityTransaction[] | undefined) => void
	appendToActivityList: (type: ActivityType, transaction: ActivityTransaction) => void
}

export enum ActivityType {
    USER = 'user',
    TOKEN =  'token',
}

export const useActivityStore = create<State & Actions>()(
    (set) => ({
        notificationsCount: 0,
        userActivity: undefined,
        tokenActivity: undefined,
        
        setActivityList: (type, list) => {
            switch (type) {
            case ActivityType.USER:
                set({userActivity: list});
                return;
            case ActivityType.TOKEN:
                set({tokenActivity: list});
                return;
            }
        },
        appendToActivityList: (type, transaction)=>{
            switch (type) {
            case ActivityType.USER:
                set(state => {
                    if (!state.userActivity)  {
                        return { 
                            userActivity: [transaction]
                        };
                    }
                    
                    return {
                        userActivity: [
                            ...state.userActivity,
                            transaction
                        ]
                    };
                });
                return;
            case ActivityType.TOKEN:
                set(state => {
                    if (!state.tokenActivity)  {
                        return { 
                            tokenActivity: [transaction]
                        };
                    }
                    
                    return {
                        tokenActivity: [
                            ...state.tokenActivity,
                            transaction
                        ]
                    };
                });  
                return;
               
            }
        }
    })      
);
   
