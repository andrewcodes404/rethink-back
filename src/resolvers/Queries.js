const { forwardTo } = require('prisma-binding')
const Query = {
    users: forwardTo('db'),
    user(parent, args, ctx, info) {
        // check if there is a current user ID
        if (!ctx.request.userId) {
            return null
        }
        return ctx.db.query.user(
            {
                where: { id: ctx.request.userId },
            },
            info
        )
    },

    advComs: forwardTo('db'),
    sponsors: forwardTo('db'),
    sponsor: forwardTo('db'),
    partners: forwardTo('db'),
    partner: forwardTo('db'),
    sessions: forwardTo('db'),
    session: forwardTo('db'),
    hostSpeakers: forwardTo('db'),
    hostSpeaker: forwardTo('db'),
}
module.exports = Query
