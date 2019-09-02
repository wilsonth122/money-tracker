import { user } from "./user";

export const appState = {
    initialState: () => Object.assign({},
        user.initialState()
    ),
    actions: (update: any) => Object.assign({},
        user.actions(update)
    )
}