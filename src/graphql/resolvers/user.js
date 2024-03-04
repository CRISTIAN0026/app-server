import User from "../../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";
import 'dotenv/config';


const Mutation = {
  async registerUser(_, { registerInput: { email, password, rol }}, context) {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      throw new GraphQLError("User already exists.", {
        extensions: {
          code: "BAD_REQUEST",
        },
      });
    }
    if (!email || !password || !rol) {
      throw new GraphQLError("Username, email, type, and password are required.", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }
    let encryptedPassword = await bcrypt.hash(password, 10);

    const newUSer = new User({
      email: email.toLowerCase(),
      password: encryptedPassword,
      rol
    });

    const token = jwt.sign({ user_id: newUSer._id, email }, process.env.SECRET_KEY, {
      expiresIn: "3h",
    });

    newUSer.token = token;

    const res = await newUSer.save();

    return {
      id: res.id,
      ...res._doc,
    };
  },
  async loginUser(_, { loginInput: { email, password }}, context) {
    const user = await User.findOne({ email });

    if (!email || !password ) {
      throw new GraphQLError("Correo y contraseña son requeridos.", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user._id, email }, process.env.SECRET_KEY, {
        expiresIn: "3h",
      });
      user.token = token;

      return {
        id: user.id,
        ...user._doc,
      };
    } else {
      throw new Error("Incorrect Password");
    }
  },
};
const Query = {
  user: async (_, { id }) => {
    return await User.findById(id)},
};


export { Query, Mutation };
