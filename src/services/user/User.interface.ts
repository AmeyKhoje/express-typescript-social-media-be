interface UserInterface {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: number;
  location: object;
  profileImage: string;
  coverImage: string;
  username: string;
  followers: string[];
  following: string[];
  password: string;
}

export default UserInterface;
