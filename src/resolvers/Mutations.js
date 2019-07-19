const Mutations = {
  async createUser(parent, args, ctx, info) {

    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
        },
      },
      info
    );

    console.log("mutation 🏃‍ args", args);
    return user;
  },
};

module.exports = Mutations;