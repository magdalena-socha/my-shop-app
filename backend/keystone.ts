import {createAuth} from '@keystone-next/auth';
import {withItemData, statelessSessions} from '@keystone-next/keystone/session';
// import { config } from 'dotenv/types';
import {config, createSchema} from '@keystone-next/keystone/schema';
import {User} from './schemas/User';
import {Product} from './schemas/Product';
import {ProductImage} from './schemas/ProductImage';
import 'dotenv/config';
import { insertSeedData } from './seed-data';
import { sendPasswordResetEmail } from './lib/mail';

const databaseURL = process.env.DATABASE_URL;

const sessionConfig = {
    maxAge: 60*60*24,
    secret: process.env.COOKIE_SECRET,
};

const {withAuth} = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password'],
        //add in initial roles later
    },
    passwordResetLink: {
        async sendToken(args) {
            await sendPasswordResetEmail(args.token, args.identity);
        }
    }
});
 
export default withAuth(config({
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true,
        },
    },
    db: {
        adapter: 'mongoose',
        url: databaseURL,
        async onConnect(keystone) {
            if (process.argv.includes('--seed-data')) {
                await insertSeedData(keystone);
            }
            
        },

    },
    lists: createSchema({
        //schemaitems
        User,
        Product,
        ProductImage,
    }),
    ui: {
        //change this for roles
        isAccessAllowed: ( {session }) => {
            return !!session?.data;
        },
    },
    session: withItemData(statelessSessions(sessionConfig),{
        User: 'id name email',
    }),
}));