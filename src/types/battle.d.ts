declare namespace Battle {
    interface State {
        id: "",
        continue: boolean,
        myId: string,
        opponentId: string,
        myCards: Card.MyCard[],
        opponentCards: Card.OpponentCard[]
        thisTurnHistory: (History.Skill | History.NextTurn|History.SysMsg)[]
    }
    // interface TurnHistory{

    // }
    namespace History {
        interface Skill {
            type:"BattleHistorySkill";
            msg: TurnMsg[],
            executor: Card.MyCard | Card.OpponentCard,
            target: Card.MyCard | Card.OpponentCard,
            myCards: Card.MyCard[],
            opponentCards: Card.OpponentCard[]
        }

        interface NextTurn {
            type:"BattleHistoryNextTurn",
            msg: TurnMsg[],
            target:Card.MyCard|Card.OpponentCard,
            myCards: Card.MyCard[],
            opponentCards: Card.OpponentCard[]
        }

        interface SysMsg{
            type:"BattleHistorySysMsg",
            msg:string
        }
    }

    interface ThisTurn {
        card: Card.MyCard,
        skill_num: Number,
        targetCard: Card.OpponentCard | Card.MyCard,
        set: boolean
    }
}

