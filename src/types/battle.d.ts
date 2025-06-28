declare namespace Battle {
    interface State {
        id: "",
        myId: String,
        opponentId: String,
        myCards: Card.MyCard[],
        opponentCards: Card.OpponentCard[]
        thisTurnHistory: History[]
    }
    // interface TurnHistory{

    // }
    interface History {
        msg: String
        executor: Card.MyCard | Card.OpponentCard,
        target: Card.MyCard | Card.OpponentCard,
        myCards: Card.MyCard[],
        opponentCards: Card.OpponentCard[]

    }

    interface ThisTurn{
        cardid:String,
        skill_num:Number,
        targetCardid:String
    }
}