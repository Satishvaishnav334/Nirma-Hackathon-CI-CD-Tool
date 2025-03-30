import dotenv from 'dotenv';

dotenv.config();

const authenticateFigma = (req, res, next) => {
  const accessToken = process.env.FIGMA_ACCESS_TOKEN;
  
  if (!accessToken) {
    return res.status(401).json({ error: "Figma Access Token is missing" });
  }

  req.accessToken = accessToken; // Attach token to request
  next(); // Move to the next middleware/controller
};

export default authenticateFigma;
