export const submitErrorHandler = (ctx: { errors: any }) => {
  console.log(ctx, 'ctx')
  for (const error in ctx.errors) {
    window.$message.error(ctx.errors[error as keyof typeof ctx.errors]!)
  }
}
