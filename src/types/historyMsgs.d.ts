interface TurnMotion {
    damaged : "::damaged",
    gurded : "::guarded::",
    ungurded : "::unguarded::",
    healed : "::healed::",
    none : "::none::"
}

interface MotionMsg{
    target: string,
    motion: TurnMotion
}

interface TurnMsg {
    msg: string
    motion:string
    target:string
}