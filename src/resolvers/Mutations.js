const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Mutations = {
    async registerUser(parent, args, ctx, info) {
        // 2. lowercase their email to prevent accidents
        args.email = args.email.toLowerCase()
        // 3. hash their password             SALT LENGTH 👇
        const password = await bcrypt.hash(args.password, 10)
        // 4. create the user in the database
        const user = await ctx.db.mutation.createUser(
            {
                data: {
                    ...args,
                    password,
                    permissions: { set: ['USER'] },
                },
            },
            info
        )
        // 5. create the JWT token for them
        const token = jwt.sign(
            { userId: user.id },
            process.env.APP_SECRET_FOR_JWT
        )

        // 6. We place the jwt as a cookie in the response
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
        })

        // 7. Finalllllly we return the user to the browser
        return user
    },

    async login(parent, { email, password }, ctx, info) {
        // 1. check if there is a user with that email
        const user = await ctx.db.query.user({ where: { email } })
        if (!user) {
            throw new Error(`No such user found for email ${email}`)
        }
        // 2. Check if their password is correct
        const valid = await bcrypt.compare(password, user.password)
        if (!valid) {
            throw new Error('Invalid Password!')
        }
        // 3. generate the JWT Token
        const token = jwt.sign(
            { userId: user.id },
            process.env.APP_SECRET_FOR_JWT
        )
        // 4. Set the cookie with the token
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
        })
        // 5. Return the user
        return user
    },

    logout(parent, args, ctx, info) {
        ctx.response.clearCookie('token')
        return { message: 'Goodbye!' }
    },

    async createAdvCom(parent, args, ctx, info) {
        const AdvCom = await ctx.db.mutation.createAdvCom(
            {
                data: {
                    ...args,
                },
            },
            info
        )

        return AdvCom
    },

    updateAdvCom(parent, args, ctx, info) {
        // first take a copy of the updates
        const updates = { ...args }
        // cannot update id so remove it ferom the COPY of our args
        delete updates.id

        // run the update method
        //    one of our generated 👇  mutations
        return ctx.db.mutation.updateAdvCom(
            {
                data: updates,
                where: {
                    // we take the id directly from the args NOT from the COPY
                    id: args.id,
                },
            },
            info
        )
    },

    async deleteAdvCom(parent, args, ctx, info) {
        const where = { id: args.id }
        return ctx.db.mutation.deleteAdvCom({ where }, info)
    },

    async createSponsor(parent, args, ctx, info) {
        const Sponsor = await ctx.db.mutation.createSponsor(
            {
                data: {
                    ...args,
                },
            },
            info
        )

        return Sponsor
    },

    updateSponsor(parent, args, ctx, info) {
        // first take a copy of the updates
        const updates = { ...args }
        // cannot update id so remove it ferom the COPY of our args
        delete updates.id

        // run the update method
        //    one of our generated 👇  mutations
        return ctx.db.mutation.updateSponsor(
            {
                data: updates,
                where: {
                    // we take the id directly from the args NOT from the COPY
                    id: args.id,
                },
            },
            info
        )
    },

    async deleteSponsor(parent, args, ctx, info) {
        const where = { id: args.id }
        return ctx.db.mutation.deleteSponsor({ where }, info)
    },

    async createPartner(parent, args, ctx, info) {
        const Partner = await ctx.db.mutation.createPartner(
            {
                data: {
                    ...args,
                },
            },
            info
        )

        return Partner
    },

    updatePartner(parent, args, ctx, info) {
        // first take a copy of the updates
        const updates = { ...args }
        // cannot update id so remove it ferom the COPY of our args
        delete updates.id

        // run the update method
        //    one of our generated 👇  mutations
        return ctx.db.mutation.updatePartner(
            {
                data: updates,
                where: {
                    // we take the id directly from the args NOT from the COPY
                    id: args.id,
                },
            },
            info
        )
    },

    async deletePartner(parent, args, ctx, info) {
        const where = { id: args.id }
        return ctx.db.mutation.deletePartner({ where }, info)
    },

    async createSession(parent, args, ctx, info) {
        const Session = await ctx.db.mutation.createSession(
            {
                data: {
                    ...args,
                    speakers: { set: args.speakers },
                    supporters: { set: args.supporters },
                    sponsors: { set: args.sponsors },
                },
            },
            info
        )

        return Session
    },

    updateSession(parent, args, ctx, info) {
        // first take a copy of the updates
        const updates = { ...args }
        // cannot update id so remove it ferom the COPY of our args
        delete updates.id

        // run the update method
        // one of our generated 👇 mutations
        return ctx.db.mutation.updateSession(
            {
                data: {
                    ...updates,
                    speakers: { set: args.speakers },
                    supporters: { set: args.supporters },
                    sponsors: { set: args.sponsors },
                },
                where: {
                    // we take the id directly from the args NOT from the COPY
                    id: args.id,
                },
            },
            info
        )
    },

    async createHostSpeaker(parent, args, ctx, info) {
        const HostSpeaker = await ctx.db.mutation.createHostSpeaker(
            {
                data: {
                    ...args,
                },
            },
            info
        )

        return HostSpeaker
    },

    updateHostSpeaker(parent, args, ctx, info) {
        // first take a copy of the updates
        const updates = { ...args }
        // cannot update id so remove it ferom the COPY of our args
        delete updates.id

        // run the update method
        //    one of our generated 👇  mutations
        return ctx.db.mutation.updateHostSpeaker(
            {
                data: updates,
                where: {
                    // we take the id directly from the args NOT from the COPY
                    id: args.id,
                },
            },
            info
        )
    },

    async deleteHostSpeaker(parent, args, ctx, info) {
        const where = { id: args.id }
        return ctx.db.mutation.deleteHostSpeaker({ where }, info)
    },
}

module.exports = Mutations
