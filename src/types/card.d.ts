
declare namespace Card {
    interface MyCard {
        img: string,
        name: string,
        id: string,
        role:string,
        hp: number,
        attack: Number,
        defence: Number,
        speed: Number,
        skills:Skill[]
        }
    interface OpponentCard{
        id:string,
        name:string,
        username:string,
        userId:string,
        img:string,
        hp:Number
    }
    interface Skill{
        name:string,
        nickname:string,
        ex:string,
        lookturn:Number,
        useTimes:Number,
        nowlooktime:Number,
        target_exist:boolean
    }
    }

