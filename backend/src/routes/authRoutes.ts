import { Router } from "express";
import bcrypt from "bcrypt";
import { pool } from "../config/db";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { fullName, businessName, email, password } = req.body;

    if (!fullName || !businessName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (full_name, business_name, email, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING id, full_name, business_name, email, created_at`,
      [fullName, businessName, email, passwordHash]
    );

    return res.status(201).json({
      message: "Account created successfully.",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      message: "Something went wrong while creating the account.",
    });
  }
});


/* LOGIN */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const result = await pool.query(
      `SELECT id, full_name, business_name, email, password_hash
       FROM users
       WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const user = result.rows[0];

    const passwordMatches = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    return res.status(200).json({
      message: "Login successful.",
      user: {
        id: user.id,
        fullName: user.full_name,
        businessName: user.business_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Something went wrong while logging in.",
    });
  }
});

export default router;