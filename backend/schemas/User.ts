import {text, password, relationship} from '@keystone-next/fields'
import { list } from "@keystone-next/keystone/schema";

export const User = list({
    //access
    //ui
    fields: {
        name: text({ isRequired: true }),
        email: text({ isRequired: true}),
        password: password(),
        //add role, cart, orders
    }
})