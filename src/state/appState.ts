import { expenses } from "./expenses";
import { user } from "./user";

export const appState = {
    initialState: () => Object.assign({},
        expenses.initialState(),
        user.initialState()
    ),
    actions: (update: any) => Object.assign({},
        expenses.actions(update),
        user.actions(update)
    )
}