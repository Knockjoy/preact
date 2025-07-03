

    interface battleResultStatus{
        continue:"continue",
        finish:"finish"
    }


class ExecBattle {
        game_status: battleResultStatus;
        msg: string;
        history: (Battle.History.NextTurn | Battle.History.Skill | Battle.History.SysMsg)[]
}
