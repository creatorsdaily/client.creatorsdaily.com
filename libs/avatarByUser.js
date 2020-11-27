export default (user, size = 32) => {
  if (user.avatar) {
    return `${process.env.NEXT_PUBLIC_FILES}/${user.avatar.hash}-${size * 2}-${size * 2}`
  } else if (user.emailMD5) {
    return `https://www.gravatar.com/avatar/${user.emailMD5}?size=${size * 2}&d=monsterid`
  }
}
