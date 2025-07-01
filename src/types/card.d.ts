
declare namespace Card {
    interface MyCard {
        type:"my";
        img: string,
        name: string,
        id: string,
        role:string,
        hp: number,
        hpmax:number,
        attack: number,
        defence: number,
        speed: number,
        skills:Skill[]
        }
    interface OpponentCard{
        type:"op";
        id:string,
        name:string,
        username:string,
        userId:string,
        img:string,
        hp:number,
        hpmax:number

    }
    interface Skill{
        name:string,
        nickname:string,
        ex:string,
        lookturn:number,
        useTimes:number,
        nowlooktime:number,
        target_exist:boolean,
    }
    }

