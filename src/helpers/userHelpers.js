export const fetchImage = function(user, social_flag) {
  if (user.avatar && !social_flag) {
    return user.avatar;
  }

  return user.social_img;
}
