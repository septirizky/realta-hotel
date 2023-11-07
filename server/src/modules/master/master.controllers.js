export const master = async (req, res) => {
  try {
    return res.status(200).json({ message: "Hai" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
