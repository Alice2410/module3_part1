import { User } from '@models/MongoDB/user';
import { UserLog } from 'api/media-info/gallery.inteface'

export async function getId(email: string) {
  let user = await User.findOne({email: email});
  let id = user._id;

  return id;
}