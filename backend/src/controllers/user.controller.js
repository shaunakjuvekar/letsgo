"use strict";
import User from "../models/user.model.js";
import { compare, hash } from "bcrypt";
import UserProfile from "../models/user_profile.model.js";

export async function create(req, res) {
  if (req.session.userId) {
    return res.status(400).json({
      error: true,
      message: "You are already logged in.",
      data: { id: req.session.userId },
    });
  }

  // Check for required fields
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide all required fields" });
  }

  // Check if the user already exists by their email
  try {
    let existingUser = await User.findByEmail(req.body.email);
    if (existingUser) {
      return res
        .status(400)
        .json({ error: true, message: "User with this email already exists" });
    }
  } catch (err) {
    return res.status(500).send(err);
  }

  const hashedPassword = await hash(req.body.password, 10);
  console.log("Password: ", req.body.password);
  console.log("Hashed password: ", hashedPassword);
  const newUser = new User({
    ...req.body,
    password: hashedPassword,
  });

  try {
    let userId = await User.create(newUser);
    res.json({
      error: false,
      message: "User added successfully!",
      data: { id: userId },
    });
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function login(req, res) {
  console.log("Login attempt: ", req.body);
  if (req.session.userId) {
    console.log("User already logged in with ID: ", req.session.userId);
    return res.status(400).json({
      error: true,
      message: "You are already logged in.",
      data: { id: req.session.userId },
    });
  }

  let { email, password } = req.body;

  try {
    let user = await User.findByEmail(email);
    if (!user) {
      console.log("Login error: User not found with email: ", email);
      return res
        .status(400)
        .json({ error: true, message: "User does not exist" });
    }

    console.log("User found: ", user);
    console.log(
      "Comparing passwords: input vs. stored",
      password,
      user.password
    );

    const passwordCorrect = await compare(password, user.password);
    if (!passwordCorrect) {
      console.log("Password incorrect for user ID: ", user.id);
      return res
        .status(400)
        .json({ error: true, message: "Incorrect password" });
    }

    console.log("Password correct for user ID: ", user.id);
    req.session.userId = user.id;

    let userProfile = await UserProfile.findByUserId(user.id);
    if (userProfile) {
      console.log("User profile found for user ID: ", user.id);
      req.session.userProfileId = userProfile.id;
    } else {
      console.log("No user profile found for user ID: ", user.id);
    }

    console.log("Login successful for user ID: ", user.id);
    return res.json({
      error: false,
      message: "User login successful",
      data: { id: user.id },
    });
  } catch (err) {
    console.error("Login error: ", err);
    return res.status(500).send(err);
  }
}

export async function logout(req, res) {
  // Clearing the session data by setting it to null
  req.session = null;

  // Informing the client that the logout was successful
  return res.json({
    error: false,
    message: "Logout successful",
    data: { id: null },
  });
}

export async function check(req, res) {
  if (req.session.userId) {
    return res.json({
      error: false,
      message: "You are logged in.",
      data: { id: req.session.userId },
    });
  } else {
    return res.status(401).json({
      error: true,
      message: "You are not logged in.",
      data: { id: null },
    });
  }
}
